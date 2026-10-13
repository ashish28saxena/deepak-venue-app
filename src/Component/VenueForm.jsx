import { useEffect, useState } from "react";
import "./VenueForm.css";

const API_URL = "http://localhost:5000/api/venues";
const MAX_IMAGES = 10;
const MAX_SIZE_MB = 5;

// album category -> backend upload field name
const ALBUMS = [
  { category: "Entrance & Exterior", field: "entranceImages" },
  { category: "Food & Catering", field: "foodImages" },
  { category: "Stage & Mandap", field: "stageImages" },
  { category: "Banquet Hall", field: "hallImages" },
];

const emptyAlbums = () => Object.fromEntries(ALBUMS.map((a) => [a.field, []]));

const initialState = {
  name: "",
  address: "",
  city: "",
  pincode: "",
  phoneNumber: "",
  pricePerPlate: "",
  priceType: "Cost Per Plate",
  rating: "",
  hallCapacity: "",
  carParking: "",
  airConditioning: false,
  rooms: "",
  acRooms: "",
  bridalRoom: false,
  parking: false,
  propertyType: "Banquet Hall",
  valetParking: false,
  allowedCuisine: "Veg",
  paymentPolicies: "",
  aboutVenue: "",
  detailInformation: "",
  establishedYear: "",
  weddingsCount: "",
};

function Field({ label, name, type = "text", required, form, errors, onChange, ...rest }) {
  return (
    <div className={`vf-field ${errors[name] ? "has-error" : ""}`}>
      <label htmlFor={name}>
        {label}
        {required && <span className="vf-req"> *</span>}
      </label>
      <input id={name} name={name} type={type} value={form[name]} onChange={onChange} {...rest} />
      {errors[name] && <span className="vf-err">{errors[name]}</span>}
    </div>
  );
}

function Check({ label, name, form, onChange }) {
  return (
    <label className="vf-check">
      <input type="checkbox" name={name} checked={form[name]} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

// Ek album category ka multiple image picker + preview
function AlbumPicker({ category, field, files, error, onAdd, onRemove }) {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  return (
    <div className={`vf-field vf-album ${error ? "has-error" : ""}`}>
      <label htmlFor={field}>
        {category} <span className="vf-count">({files.length}/{MAX_IMAGES})</span>
      </label>
      <input
        id={field}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple
        onChange={(e) => {
          onAdd(field, Array.from(e.target.files));
          e.target.value = ""; // same file dobara choose kar sakein
        }}
      />
      {error && <span className="vf-err">{error}</span>}
      {previews.length > 0 && (
        <div className="vf-previews">
          {previews.map((src, i) => (
            <div className="vf-thumb" key={src}>
              <img src={src} alt={`${category} ${i + 1}`} />
              <button type="button" aria-label="Image hatayein" onClick={() => onRemove(field, i)}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function VenueForm() {
  const [form, setForm] = useState(initialState);
  const [albums, setAlbums] = useState(emptyAlbums());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", messages: [] }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const addImages = (field, newFiles) => {
    const problems = [];
    const valid = newFiles.filter((f) => {
      if (!f.type.startsWith("image/")) {
        problems.push(`${f.name}: sirf image allowed hai`);
        return false;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        problems.push(`${f.name}: ${MAX_SIZE_MB}MB se badi hai`);
        return false;
      }
      return true;
    });

    setAlbums((prev) => {
      const merged = [...prev[field], ...valid];
      if (merged.length > MAX_IMAGES) problems.push(`Maximum ${MAX_IMAGES} images allowed hain`);
      return { ...prev, [field]: merged.slice(0, MAX_IMAGES) };
    });
    setErrors((prev) => ({ ...prev, [field]: problems.length ? problems.join(", ") : undefined }));
  };

  const removeImage = (field, index) => {
    setAlbums((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Venue ka naam likhein";
    if (!form.address.trim()) e.address = "Address likhein";
    if (!form.city.trim()) e.city = "City likhein";
    if (form.pincode && !/^\d{6}$/.test(form.pincode)) e.pincode = "6 digit pincode likhein";
    if (!/^[6-9]\d{9}$/.test(form.phoneNumber)) e.phoneNumber = "10 digit valid mobile number likhein";
    if (form.pricePerPlate === "" || Number(form.pricePerPlate) < 0) e.pricePerPlate = "Price per plate likhein";
    if (!form.hallCapacity || Number(form.hallCapacity) < 1) e.hallCapacity = "Hall capacity likhein";
    if (form.rating !== "" && (Number(form.rating) < 0 || Number(form.rating) > 5))
      e.rating = "Rating 0 se 5 ke beech honi chahiye";
    if (Number(form.acRooms) > Number(form.rooms)) e.acRooms = "AC rooms, total rooms se zyada nahi ho sakte";
    setErrors((prev) => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  };

  // multipart/form-data: text fields + image files
  const buildFormData = () => {
    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === "boolean") fd.append(key, value);
      else if (String(value).trim() !== "") fd.append(key, String(value).trim());
    });

    ALBUMS.forEach(({ field }) => {
      albums[field].forEach((file) => fd.append(field, file));
    });

    return fd;
  };

  const resetAll = () => {
    setForm(initialState);
    setAlbums(emptyAlbums());
    setErrors({});
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) {
      setStatus({ type: "error", messages: ["Form me kuch galtiyan hain, check karein."] });
      return;
    }

    setLoading(true);
    try {
      // Content-Type header mat lagana, browser boundary ke saath khud set karta hai
      const res = await fetch(API_URL, { method: "POST", body: buildFormData() });
      const data = await res.json();

      if (res.ok) {
        resetAll();
        setStatus({ type: "success", messages: ["Venue save ho gaya."] });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatus({ type: "error", messages: data.errors || [data.message || "Venue save nahi hua."] });
      }
    } catch (err) {
      setStatus({ type: "error", messages: ["Server se connect nahi ho pa raha. Backend chal raha hai ya nahi check karein."] });
    } finally {
      setLoading(false);
    }
  };

  const common = { form, errors, onChange: handleChange };

  return (
    <div className="vf-page">
      <form className="vf-form" onSubmit={handleSubmit} noValidate>
        <h1>Venue add karein</h1>
        <p className="vf-sub">Banquet hall ki details aur photos bharein, phir save karein.</p>

        {status && (
          <div className={`vf-alert ${status.type}`} role="alert">
            {status.messages.map((m, i) => (
              <div key={i}>{m}</div>
            ))}
          </div>
        )}

        <fieldset>
          <legend>Basic details</legend>
          <div className="vf-grid">
            <Field {...common} label="Venue name" name="name" required placeholder="Shivam Banquet Hall" />
            <Field {...common} label="Phone number" name="phoneNumber" required inputMode="numeric" maxLength={10} placeholder="9876543210" />
            <div className="vf-span2">
              <Field {...common} label="Address" name="address" required placeholder="Fun cine plaza ramleela road, Etawah" />
            </div>
            <Field {...common} label="City" name="city" required placeholder="Etawah" />
            <Field {...common} label="Pincode" name="pincode" inputMode="numeric" maxLength={6} placeholder="206001" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Price</legend>
          <div className="vf-grid">
            <Field {...common} label="Price per plate (₹)" name="pricePerPlate" type="number" min="0" required placeholder="500" />
            <div className="vf-field">
              <label htmlFor="priceType">Price type</label>
              <select id="priceType" name="priceType" value={form.priceType} onChange={handleChange}>
                <option>Cost Per Plate</option>
                <option>Rental</option>
              </select>
            </div>
            <Field {...common} label="Rating (0 - 5)" name="rating" type="number" min="0" max="5" step="0.1" placeholder="4.5" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Venue amenities</legend>
          <div className="vf-grid">
            <Field {...common} label="Hall capacity" name="hallCapacity" type="number" min="1" required placeholder="200" />
            <Field {...common} label="Car parking (gaadi)" name="carParking" type="number" min="0" placeholder="40" />
            <Field {...common} label="Total rooms" name="rooms" type="number" min="0" placeholder="8" />
            <Field {...common} label="AC rooms" name="acRooms" type="number" min="0" placeholder="8" />
          </div>
          <div className="vf-checks">
            <Check {...common} label="Air conditioning" name="airConditioning" />
            <Check {...common} label="Bridal room" name="bridalRoom" />
            <Check {...common} label="Parking" name="parking" />
            <Check {...common} label="Valet parking" name="valetParking" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Other information</legend>
          <div className="vf-grid">
            <Field {...common} label="Property type" name="propertyType" />
            <div className="vf-field">
              <label htmlFor="allowedCuisine">Allowed cuisine</label>
              <select id="allowedCuisine" name="allowedCuisine" value={form.allowedCuisine} onChange={handleChange}>
                <option>Veg</option>
                <option>Non-Veg</option>
                <option>Both</option>
              </select>
            </div>
            <Field {...common} label="Established year" name="establishedYear" type="number" min="1900" max={new Date().getFullYear()} placeholder="2019" />
            <Field {...common} label="Weddings done" name="weddingsCount" type="number" min="0" placeholder="30" />
          </div>
          <div className="vf-field">
            <label htmlFor="paymentPolicies">Payment policies</label>
            <textarea id="paymentPolicies" name="paymentPolicies" rows={3} value={form.paymentPolicies} onChange={handleChange} placeholder="50% advance at booking" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Albums</legend>
          <p className="vf-hint">
            Har category me {MAX_IMAGES} tak images chun sakte hain (JPG, PNG, WEBP, GIF, har image {MAX_SIZE_MB}MB tak).
          </p>
          <div className="vf-grid">
            {ALBUMS.map(({ category, field }) => (
              <AlbumPicker
                key={field}
                category={category}
                field={field}
                files={albums[field]}
                error={errors[field]}
                onAdd={addImages}
                onRemove={removeImage}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>About</legend>
          <div className="vf-field">
            <label htmlFor="aboutVenue">About the venue</label>
            <textarea id="aboutVenue" name="aboutVenue" rows={4} value={form.aboutVenue} onChange={handleChange} />
          </div>
          <div className="vf-field">
            <label htmlFor="detailInformation">Detail information</label>
            <textarea id="detailInformation" name="detailInformation" rows={5} value={form.detailInformation} onChange={handleChange} />
          </div>
        </fieldset>

        <div className="vf-actions">
          <button type="button" className="vf-btn ghost" onClick={resetAll}>
            Form saaf karein
          </button>
          <button type="submit" className="vf-btn" disabled={loading}>
            {loading ? "Save ho raha hai..." : "Venue save karein"}
          </button>
        </div>
      </form>
    </div>
  );
}
