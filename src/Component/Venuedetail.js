import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Venuedetail.css";

const API_BASE = "http://localhost:5000/api/venues";

const TABS = [
  { id: "amenities", label: "Venue Amenities" },
  { id: "info", label: "Other Information" },
  { id: "policies", label: "Venue Policies" },
  { id: "payments", label: "Payment Policies" },
  { id: "albums", label: "Albums" },
];

const ALBUM_LABELS = {
  images: "Photos",
  entranceExterior: "Entrance & Exterior",
  foodCatering: "Food & Catering",
  stageMandap: "Stage & Mandap",
  banquetHall: "Banquet Hall",
};

/* ---------- API data -> UI shape ---------- */
const formatPrice = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

function mapVenue(d) {
  // albums: [{ images: [], entranceExterior: [...], ... }] -> [{ key, label, images }]
  const albumObj = Array.isArray(d.albums) ? d.albums[0] || {} : d.albums || {};
  const albumGroups = Object.entries(albumObj)
    .filter(([, urls]) => Array.isArray(urls) && urls.length)
    .map(([key, urls]) => ({ key, label: ALBUM_LABELS[key] || key, images: urls }));

  // gallery ke liye sabhi photos (duplicates hata ke)
  const images = [...new Set(albumGroups.flatMap((g) => g.images))];

  const am = d.amenities || {};
  const amenities = [];
  if (d.totalRooms) amenities.push(`${d.totalRooms} Rooms available`);
  if (d.acRooms) amenities.push(`${d.acRooms} AC Rooms`);
  if (d.carParking) amenities.push(`${d.carParking} Car parking`);
  if (am.airConditioning) amenities.push("Air conditioning");
  if (am.bridalRoom) amenities.push("Bridal Room");
  if (am.parking) amenities.push("Parking");
  if (am.valetParking) amenities.push("Valet Parking");

  const highlights = [];
  if (d.hallCapacity) highlights.push(`${d.hallCapacity} Hall capacity`);
  if (d.carParking) highlights.push(`${d.carParking} car parking`);
  if (d.acRooms) highlights.push(`${d.acRooms} AC rooms`);
  if (d.totalRooms) highlights.push(`${d.totalRooms} Rooms`);

  const info = [
    d.propertyType && `Property Type - ${d.propertyType}`,
    d.priceType && `Price Type - ${d.priceType}`,
    `Valet Parking - ${am.valetParking ? "Yes" : "No"}`,
    d.allowedCuisine && `Allowed Cuisine - ${d.allowedCuisine}`,
    d.establishedYear && `Established - ${d.establishedYear}`,
    d.weddingsDone && `Weddings done - ${d.weddingsDone}`,
    d.yearsInBusiness && `Years in business - ${d.yearsInBusiness}`,
  ].filter(Boolean);

  return {
    name: d.venueName,
    type: d.propertyType,
    typeHref: `/venues/${(d.propertyType || "").toLowerCase()}s`,
    city: d.city,
    address: d.address,
    price: formatPrice(d.pricePerPlate),
    priceUnit: d.priceType,
    rating: d.rating,
    phone: d.phone,
    images,
    highlights,
    amenities,
    info,
    policies: d.policies || [], // API mein abhi policies nahi hain
    payments: d.paymentPolicy ? [d.paymentPolicy] : [],
    about: d.aboutVenue,
    detail: d.detailInformation,
    albumGroups,
  };
}

/* ---------- Icons ---------- */
const Icon = ({ children, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const I = {
  star: (
    <Icon size={13}>
      <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" />
    </Icon>
  ),
  heart: (
    <Icon>
      <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
    </Icon>
  ),
  share: (
    <Icon>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 11l7.6-4M8.2 13l7.6 4" />
    </Icon>
  ),
  pin: (
    <Icon>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </Icon>
  ),
  check: (
    <Icon>
      <path d="M5 12l5 5 9-10" />
    </Icon>
  ),
  left: (
    <Icon size={20}>
      <path d="M15 6l-6 6 6 6" />
    </Icon>
  ),
  right: (
    <Icon size={20}>
      <path d="M9 6l6 6-6 6" />
    </Icon>
  ),
  phone: (
    <Icon>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </Icon>
  ),
};

/* ---------- Sub components ---------- */
function Gallery({ images, rating, alt }) {
  const [i, setI] = useState(0);
  const go = (d) => setI((cur) => (cur + d + images.length) % images.length);

  return (
    <div className="vd-gallery">
      {!images.length ? (
        <div className="vd-noimg">Photo coming soon</div>
      ) : (
        <img src={images[i]}  />
      )}

      {images.length > 1 && (
        <>
          <button type="button" className="vd-arrow vd-prev" onClick={() => go(-1)} aria-label="Previous photo">
            {I.left}
          </button>
          <button type="button" className="vd-arrow vd-next" onClick={() => go(1)} aria-label="Next photo">
            {I.right}
          </button>
          <div className="vd-dots">
            {images.map((_, n) => (
              <button
                key={n}
                type="button"
                className={n === i ? "is-active" : ""}
                onClick={() => setI(n)}
                aria-label={`Show photo ${n + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <span className="vd-rating">
        {I.star} {rating}
      </span>
    </div>
  );
}

const List = ({ items, empty }) =>
  items.length ? (
    <ul className="vd-list">
      {items.map((t) => (
        <li key={t}>
          <span className="vd-tick">{I.check}</span>
          {t}
        </li>
      ))}
    </ul>
  ) : (
    <p className="vd-empty">{empty}</p>
  );

/* Albums slider: ek hi slider, sabhi categories ki photos, swipe + arrows + dots */
function AlbumSlider({ groups, name }) {
  const slides = groups.flatMap((g) => g.images.map((src) => ({ src, key: g.key, label: g.label })));
  const [i, setI] = useState(0);
  const touchX = useRef(null);
  const total = slides.length;

  const go = (d) => setI((cur) => (cur + d + total) % total);
  const jumpTo = (key) => setI(slides.findIndex((s) => s.key === key));

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div className="vd-as">
      <div className="vd-as-chips">
        {groups.map((g) => (
          <button
            key={g.key}
            type="button"
            className={slides[i].key === g.key ? "is-active" : ""}
            onClick={() => jumpTo(g.key)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="vd-as-view" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="vd-as-track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map((s, n) => (
            <div className="vd-as-slide" key={`${s.key}-${n}`}>
              <img src={s.src} alt={`${name} ${s.label} ${n + 1}`} loading={n === 0 ? "eager" : "lazy"} />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button type="button" className="vd-as-btn vd-as-prev" onClick={() => go(-1)} aria-label="Previous photo">
              {I.left}
            </button>
            <button type="button" className="vd-as-btn vd-as-next" onClick={() => go(1)} aria-label="Next photo">
              {I.right}
            </button>
          </>
        )}

        <span className="vd-as-count">
          {i + 1} / {total}
        </span>
      </div>

      {total > 1 && (
        <div className="vd-as-dots">
          {slides.map((_, n) => (
            <button
              key={n}
              type="button"
              className={n === i ? "is-active" : ""}
              onClick={() => setI(n)}
              aria-label={`Show photo ${n + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Page ---------- */
export default function VenueDetail({ shortlist = [], onToggleShortlist }) {
  const { slug } = useParams(); // route: /venue/:slug  -> slug = venue ka _id

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [tab, setTab] = useState("amenities");
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [localSaved, setLocalSaved] = useState(false);

  /* Fetch venue */
  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/${slug}`, { signal: controller.signal });
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Venue not found");
        }
        setVenue(mapVenue(json.data));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setVenue(null);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [slug]);

  const saved = onToggleShortlist ? shortlist.includes(slug) : localSaved;
  const toggleSave = () => (onToggleShortlist ? onToggleShortlist(slug) : setLocalSaved((s) => !s));

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: venue.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* user ne share cancel kiya */
    }
  };

  const goTab = (id) => {
    setTab(id);
    document.getElementById(`vd-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <main className="vd vd-notfound">
        <p>Loading venue...</p>
      </main>
    );
  }

  if (error || !venue) {
    return (
      <main className="vd vd-notfound">
        <h2>Venue not found</h2>
        <p>{error || "Ye venue ab available nahi hai ya link galat hai."}</p>
        <Link to="/">Go to Home</Link>
      </main>
    );
  }

  return (
    <main className="vd">
      <section className="vd-card vd-top">
        <Gallery images={venue.images} rating={venue.rating} alt={venue.name} />

        <div className="vd-summary">
          <div className="vd-actions">
            <button
              type="button"
              className={`vd-btn-dark ${saved ? "is-saved" : ""}`}
              onClick={toggleSave}
              aria-pressed={saved}
            >
              {I.heart} {saved ? "Shortlisted" : "Shortlist"}
            </button>
            <button type="button" className="vd-btn-round" onClick={share} aria-label="Share venue">
              {I.share}
            </button>
            {copied && <span className="vd-toast">Link copied</span>}
          </div>

          <h1 className="vd-name">{venue.name}</h1>
          <p className="vd-address">{venue.address}</p>
          <Link className="vd-city" to={venue.typeHref}>
            {I.pin} {venue.city}
          </Link>

          <p className="vd-price">
            {venue.price} <small>{venue.priceUnit}</small>
          </p>

          <ul className="vd-chips">
            {venue.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          {showPhone ? (
            <a className="vd-cta" href={`tel:${venue.phone.replace(/\s/g, "")}`}>
              {I.phone} {venue.phone}
            </a>
          ) : (
            <button type="button" className="vd-cta" onClick={() => setShowPhone(true)}>
              View Phone Number
            </button>
          )}
        </div>
      </section>

      {/* Body */}
      <div className="vd-body">
        <div className="vd-main">
          {(venue.about || venue.detail) && (
            <section className="vd-section">
              <h2>About {venue.name}</h2>
              {venue.about && <p>{venue.about}</p>}
              {venue.detail && <p>{venue.detail}</p>}
            </section>
          )}

          <div className="vd-tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={tab === t.id ? "is-active" : ""}
                onClick={() => goTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <section id="vd-amenities" className="vd-section">
            <h2>What this place has to offer</h2>
            <List items={venue.amenities} empty="No amenities listed." />
          </section>

          <section id="vd-info" className="vd-section">
            <h2>Other Information</h2>
            <List items={venue.info} empty="No details listed." />
          </section>

          <section id="vd-policies" className="vd-section">
            <h2>Venue Policies</h2>
            <List items={venue.policies} empty="No policies listed." />
          </section>

          <section id="vd-payments" className="vd-section">
            <h2>Payment Policies</h2>
            <List items={venue.payments} empty="Contact the venue for payment terms." />
          </section>

          <section id="vd-albums" className="vd-section">
            <h2>Albums</h2>
            {venue.albumGroups.length ? (
              <AlbumSlider groups={venue.albumGroups} name={venue.name} />
            ) : (
              <p className="vd-empty">Albums will be added soon.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}