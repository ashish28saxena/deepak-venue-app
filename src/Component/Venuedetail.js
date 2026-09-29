import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Venuedetail.css";


export const VENUES = {
  "gayatridham-vatika": {
    name: "Gayatridham Vatika",
    type: "Lawns",
    typeHref: "/venues/lawns",
    city: "Etawah",
    address: "Manikpur Mohan, Uttar Pradesh 206003",
    price: "₹50,000",
    priceUnit: "Per Day",
    rating: 4.5,
    phone: "+91 8124222266",
    images: ["https://picsum.photos/seed/garden1/700/640", "https://picsum.photos/seed/garden2/700/640", "https://picsum.photos/seed/garden3/700/640"],
    highlights: ["300 Hall capacity", "20 car parking", "Air conditioning", "7 Rooms"],
    amenities: [
      "7 Rooms available",
      "7 AC Rooms",
      "20 Car parking",
      "Electricity Back-up",
      "Bridal Room",
      "Parking",
    ],
    info: [
      "Property Type - Lawn",
      "Price Type - Time Based Rent",
      "Valet Parking - Yes",
      "Allowed Cuisine - Veg",
    ],
    policies: [
      "Outside Decorators allowed",
      "Outside DJ allowed",
      "Outside Catering not allowed",
      "Alcohol not allowed",
    ],
    payments: [
      "50% advance to confirm the booking",
      "Balance payable before the event",
      "Cancellation: advance is non-refundable",
    ],
    albums: [],
  },
};



const TABS = [
  { id: "amenities", label: "Venue Amenities" },
  { id: "info", label: "Other Information" },
  { id: "policies", label: "Venue Policies" },
  { id: "payments", label: "Payment Policies" },
  { id: "albums", label: "Albums" },
];

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
  const [broken, setBroken] = useState({});
  const go = (d) => setI((cur) => (cur + d + images.length) % images.length);

  return (
    <div className="vd-gallery">
      {!images.length ? (
        <div className="vd-noimg">Photo coming soon</div>
      ) : (
        <img
          src={images[i]}
          alt={`${alt} - photo ${i + 1}`}
          onError={() => setBroken((b) => ({ ...b, [i]: true }))}
        />
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

/* ---------- Page ---------- */
export default function VenueDetail({ shortlist = [], onToggleShortlist }) {
  const { slug } = useParams();
 // const venue = VENUES[slug];
  const venue=VENUES["gayatridham-vatika"]

  const [tab, setTab] = useState("amenities");
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [localSaved, setLocalSaved] = useState(false);

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

  if (!venue) {
    return (
      <main className="vd vd-notfound">
        <h2>Venue not found {slug}</h2>
        <p>Ye venue ab available nahi hai ya link galat hai.</p>
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
            {venue.albums.length ? (
              <div className="vd-albums">
                {venue.albums.map((src, n) => (
                  <img key={src} src={src} alt={`${venue.name} album ${n + 1}`} loading="lazy" />
                ))}
              </div>
            ) : (
              <p className="vd-empty">Albums will be added soon.</p>
            )}
          </section>
        </div>

        
      </div>
    </main>
  );
}