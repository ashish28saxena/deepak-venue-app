import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShortlist } from "../store/shortlistSlice";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:5000/api/venues/";
const PLACEHOLDER = "https://picsum.photos/seed/venue-placeholder/700/640";

function normalizeVenue(x) {
  const a = x.amenities || null;

  const images = (x.albums || [])
    .flatMap((album) => Object.values(album).filter(Array.isArray).flat())
    .filter((src) => typeof src === "string" && src.startsWith("http"));

  const priceType = (x.priceType || "").toLowerCase();

  return {
    id: x.id || x._id,
    name: x.name || x.venueName || "Unnamed venue",
    city: x.city || "",
    address: x.address || "",
    type: x.propertyType || "Banquet Hall",
    price: Number(x.pricePerPlate) || null,
    priceUnit: priceType.includes("plate") ? "per plate" : priceType ? priceType : "",
    rating: Number(x.rating) || 0,
    capacity: x.hallCapacity || null,
    parking: x.carParking || null,
    rooms: x.totalRooms ?? x.rooms ?? 0,
    ac: a ? !!a.airConditioning : !!x.airConditioning,
    cuisine: x.allowedCuisine || "",
    phone: x.phone || x.phoneNumber || "",
    images,
    image: images[0] || PLACEHOLDER,
  };
}

const css = `
.sm-page{font-family:'Poppins',system-ui,sans-serif;background:#faf6f1;min-height:100vh;padding:32px 20px;color:#2a1a1a}
.sm-wrap{max-width:1120px;margin:0 auto}
.sm-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:20px;flex-wrap:wrap;gap:8px}
.sm-head h2{margin:0;font-size:28px;font-weight:600;color:#6b1a2a}
.sm-head span{font-size:14px;color:#7d6a6a}
.sm-bar{display:flex;gap:10px;margin-bottom:24px;flex-wrap:wrap;align-items:center}
.sm-pill{border:1px solid #d9c9b8;background:#fff;border-radius:999px;padding:8px 16px;font:500 14px 'Poppins',sans-serif;cursor:pointer;color:#2a1a1a}
.sm-pill.on{background:#6b1a2a;color:#fff;border-color:#6b1a2a}
.sm-select{border:1px solid #d9c9b8;background:#fff;border-radius:999px;padding:8px 14px;font:500 14px 'Poppins',sans-serif;color:#2a1a1a}
.sm-pill:focus-visible,.sm-btn:focus-visible,.sm-save:focus-visible,.sm-select:focus-visible{outline:3px solid #c9962b;outline-offset:2px}
.sm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px}
.sm-card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 14px rgba(107,26,42,.08);display:flex;flex-direction:column}
.sm-photo{position:relative;aspect-ratio:4/3;background:#eadfd2}
.sm-photo img{width:100%;height:100%;object-fit:cover;display:block}
.sm-rate{position:absolute;left:0;bottom:0;background:#2f7d4f;color:#fff;font-weight:600;font-size:13px;padding:5px 12px 5px 10px;border-top-right-radius:12px}
.sm-count{position:absolute;right:0;bottom:0;background:rgba(30,15,15,.62);color:#fff;font-size:12px;padding:5px 10px;border-top-left-radius:12px}
.sm-save{position:absolute;top:12px;right:12px;background:rgba(30,15,15,.62);color:#fff;border:0;border-radius:10px;padding:8px 12px;font:500 13px 'Poppins',sans-serif;cursor:pointer}
.sm-body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:10px;flex:1}
.sm-name{margin:0;font-size:16px;font-weight:600}
.sm-area{font-size:13px;color:#b0392f}
.sm-price{font-size:22px;font-weight:600;color:#2a1a1a}
.sm-price small{font-size:13px;font-weight:400;color:#7d6a6a;margin-left:4px}
.sm-chips{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.sm-chip{border:1px solid #eadfd2;border-radius:999px;padding:5px 12px;font-size:12.5px;color:#4a3a3a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sm-btn{margin-top:auto;border:0;border-radius:10px;background:#6b1a2a;color:#fff;padding:13px;font:600 14px 'Poppins',sans-serif;cursor:pointer;text-align:center;text-decoration:none;display:block}
.sm-btn:hover{background:#561421}
.sm-btn.shown{background:#fff;color:#6b1a2a;border:1.5px solid #6b1a2a}
.sm-state{padding:60px 20px;text-align:center;color:#7d6a6a;font-size:15px}
.sm-state button{margin-top:12px}
`;

function VenueCard({ v }) {
  const dispatch = useDispatch();
  const userId = useSelector((s) => s.shortlist.userId);
  const saved = useSelector((s) =>
    s.shortlist.items.some((item) => item.id === v.id)
  );

  const [show, setShow] = useState(false);
  const [imgSrc, setImgSrc] = useState(v.image);

  const handleShortlist = () => {
    if (!userId) {
      window.location.href = "/login"; // ya navigate("/login")
      return;
    }
    // slice ka toggle add/remove dono sambhalta hai
    dispatch(
      toggleShortlist({
        id: v.id,
        name: v.name,
        city: v.city,
        price: v.price,
        rating: v.rating,
        image: v.image,
      })
    );
  };

  return (
    <article className="sm-card">
      <div className="sm-photo">
        <img
          src={imgSrc}
          alt={v.name}
          loading="lazy"
          onError={() => setImgSrc(PLACEHOLDER)}
        />
        <button
          className="sm-save"
          onClick={handleShortlist}
          aria-pressed={saved}
        >
          {saved ? "★ Shortlisted" : "☆ Shortlist"}
        </button>
        {v.rating > 0 && <div className="sm-rate">★ {v.rating.toFixed(1)}</div>}
        {v.images.length > 1 && <div className="sm-count">{v.images.length} photos</div>}
      </div>
<Link to={`/venues/banquet-halls/${v.id}`} >
      <div className="sm-body">
        <h3 className="sm-name">{v.name}</h3>
        <span className="sm-area">{v.city}</span>

        {v.price ? (
          <div className="sm-price">
            ₹{v.price.toLocaleString("en-IN")}
            {v.priceUnit && <small>{v.priceUnit}</small>}
          </div>
        ) : (
          <div className="sm-price">Contact for details</div>
        )}

        <div className="sm-chips">
          {v.capacity && <span className="sm-chip">{v.capacity} Hall capacity</span>}
          {v.parking && <span className="sm-chip">{v.parking} car parking</span>}
          {v.ac && <span className="sm-chip">Air conditioning</span>}
          {v.rooms > 0 && <span className="sm-chip">{v.rooms} Rooms</span>}
          {v.cuisine && <span className="sm-chip">{v.cuisine}</span>}
        </div>

        {show && v.phone ? (
          <a className="sm-btn shown" href={`tel:${v.phone}`}>{v.phone}</a>
        ) : (
          <button className="sm-btn" onClick={() => setShow(true)} disabled={!v.phone}>
            View Phone Number
          </button>
        )}
      </div>
      </Link>
    </article>
  );
}

export default function VenueList() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // ---- API se data fetch ----
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error (${res.status})`);
        return res.json();
      })
      .then((json) => {
        const list = Array.isArray(json) ? json : json.data || [];
        setVenues(
          list
            .map(normalizeVenue)
            .filter((v) => v.type.toLowerCase().includes("lawn"))
        );
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || "Data load nahi ho paya");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [reloadKey]);

  return (
    <div className="sm-page">
      <style>{css}</style>
      <div className="sm-wrap">
        <div className="sm-head">
          <h2>Garden</h2>
          {!loading && !error && <span>{venues.length} venues</span>}
        </div>

        {loading && <div className="sm-state">Venues load ho rahe hain…</div>}

        {error && (
          <div className="sm-state">
            Venues load nahi ho paye: {error}
            <br />
            <button className="sm-pill" onClick={() => setReloadKey((k) => k + 1)}>
              Dobara try karein
            </button>
          </div>
        )}

        {!loading && !error && venues.length === 0 && (
          <div className="sm-state">Koi banquet hall nahi mila.</div>
        )}

        <div className="sm-grid">
          {venues.map((v) => (
            <VenueCard key={v.id} v={v} />
          ))}
        </div>
      </div>
    </div>
  );
}