import { useState } from "react";
import "./AboutUs.css";

const Icon = ({ children, size = 22 }) => (
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

const icons = {
  compare: (
    <Icon>
      <path d="M7 4v16M17 4v16M3 8l4-4 4 4M13 16l4 4 4-4" />
    </Icon>
  ),
  verified: (
    <Icon>
      <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  ),
  rupee: (
    <Icon>
      <path d="M7 5h10M7 9h10M7 5c5 0 7 2 6 5s-4 3-6 3l7 6" />
    </Icon>
  ),
  support: (
    <Icon>
      <path d="M4 14v-2a8 8 0 0116 0v2M4 14h3v5H5a1 1 0 01-1-1zM20 14h-3v5h2a1 1 0 001-1z" />
    </Icon>
  ),
  phone: (
    <Icon size={18}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </Icon>
  ),
  whatsapp: (
    <Icon size={18}>
      <path d="M4 20l1.3-4.2A8 8 0 1112 20a8 8 0 01-3.8-1L4 20z" />
      <path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .5c-.8-.4-1.6-1.2-2-2l.5-1-1-2L9 9z" />
    </Icon>
  ),
  check: (
    <Icon size={28}>
      <path d="M5 12l5 5 9-10" />
    </Icon>
  ),
};

/* ---------- Content (yahan se edit karo) ---------- */
const BRAND_NAME = "Shubhlagnmart";
const PHONE = "+91 8630955571";
const WHATSAPP = "918630955571";

const VENUE_TYPES = ["Banquet Halls", "Lawns", "Resorts", "Marriage Gardens", "Farmhouses"];

const STEPS = [
  {
    title: "Search your city",
    text: "Choose your city and the type of venue you need, whether that is a lawn, banquet hall or resort.",
  },
  {
    title: "Compare and shortlist",
    text: "Check photos, ratings, capacity and starting prices, then save your favourites to your shortlist.",
  },
  {
    title: "Contact the venue",
    text: "Call or message the venue directly, or ask our team to help you visit and finalise your booking.",
  },
];

const REASONS = [
  {
    icon: icons.compare,
    title: "Everything in one place",
    text: "Browse venues, photos, ratings and prices together instead of visiting each place first.",
  },
  {
    icon: icons.verified,
    title: "Listings you can trust",
    text: "We list venues with clear details so you know what to expect before you visit.",
  },
  {
    icon: icons.rupee,
    title: "Clear pricing",
    text: "See starting prices upfront and plan your budget with confidence.",
  },
  {
    icon: icons.support,
    title: "Real people to help",
    text: "Not sure where to start? Call our helpline and we will guide you to the right choice.",
  },
];

const EVENT_TYPES = ["Wedding", "Engagement", "Reception", "Birthday party", "Corporate event", "Other"];
const CITIES = ["Etawah", "Agra", "Kanpur", "Lucknow", "Mainpuri", "Firozabad", "Other"];

const EMPTY = { name: "", phone: "", event: "", city: "Etawah", date: "", guests: "", message: "" };

export default function AboutUs({ onSubmit }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) {
      er.phone = "Enter a valid 10-digit mobile number.";
    }
    if (!form.event) er.event = "Please select an event type.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.(form); // TODO: yahan apni API call lagao
    setSent(true);
    setForm(EMPTY);
  };

  const whatsappLink = () => {
    const text =
      `Hi ${BRAND_NAME}, I need help finding a venue.\n` +
      `Name: ${form.name || "-"}\nEvent: ${form.event || "-"}\nCity: ${form.city}\n` +
      `Date: ${form.date || "-"}\nGuests: ${form.guests || "-"}\n${form.message}`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className="ab">
      {/* Hero */}
      <section className="ab-hero">
        <div className="ab-wrap ab-hero-inner">
          <h1>Find the right venue for your big day.</h1>
          <p>
            {BRAND_NAME} helps families in Etawah and nearby cities discover and compare banquet
            halls, lawns and resorts for weddings, parties and every celebration in between.
          </p>
          <div className="ab-hero-actions">
            <a className="ab-btn ab-btn-red" href="/">
              Browse venues
            </a>
            <a className="ab-btn ab-btn-outline" href={`tel:${PHONE.replace(/\s/g, "")}`}>
              {icons.phone} {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="ab-wrap ab-story">
        <h2>Who we are</h2>
        <div className="ab-story-text">
          <p>
            Planning a wedding or a family function is exciting, but finding the right place can be
            tiring. Calling many venues, asking for prices and travelling to see each one takes time
            you would rather spend on the celebration itself.
          </p>
          <p>
            We built {BRAND_NAME} to make that first step easy. You can see venues in your city,
            compare them side by side and shortlist the ones you like, all from your phone.
          </p>
        </div>
      </section>

      {/* Venue types */}
      <section className="ab-wrap ab-types">
        <h2>Venues for every occasion</h2>
        <ul>
          {VENUE_TYPES.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section className="ab-wrap ab-steps">
        <h2>How it works</h2>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="ab-step-no">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why us */}
      <section className="ab-wrap ab-why">
        <h2>Why families choose {BRAND_NAME}</h2>
        <div className="ab-why-grid">
          {REASONS.map((r) => (
            <article key={r.title}>
              <span className="ab-why-icon">{r.icon}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Enquiry form */}
      <section className="ab-wrap ab-contact" id="enquiry">
        <div className="ab-contact-info">
          <h2>Tell us what you need</h2>
          <p>
            Share a few details about your event and our team will get back to you with venue
            suggestions that fit your date, guest count and budget.
          </p>
          <a className="ab-call" href={`tel:${PHONE.replace(/\s/g, "")}`}>
            {icons.phone} Prefer to talk? Call {PHONE}
          </a>
        </div>

        <div className="ab-card">
          {sent ? (
            <div className="ab-success" role="status">
              <span>{icons.check}</span>
              <h3>Thank you!</h3>
              <p>We have received your enquiry and will contact you shortly.</p>
              <button type="button" className="ab-link" onClick={() => setSent(false)}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="ab-row">
                <label className={errors.name ? "has-error" : ""}>
                  Full name
                  <input value={form.name} onChange={set("name")} placeholder="Your name" autoComplete="name" />
                  {errors.name && <small>{errors.name}</small>}
                </label>
                <label className={errors.phone ? "has-error" : ""}>
                  Mobile number
                  <input
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="10-digit number"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  {errors.phone && <small>{errors.phone}</small>}
                </label>
              </div>

              <div className="ab-row">
                <label className={errors.event ? "has-error" : ""}>
                  Event type
                  <select value={form.event} onChange={set("event")}>
                    <option value="">Select event</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  {errors.event && <small>{errors.event}</small>}
                </label>
                <label>
                  City
                  <select value={form.city} onChange={set("city")}>
                    {CITIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="ab-row">
                <label>
                  Event date
                  <input type="date" value={form.date} onChange={set("date")} />
                </label>
                <label>
                  Number of guests
                  <input
                    type="number"
                    min="1"
                    value={form.guests}
                    onChange={set("guests")}
                    placeholder="e.g. 300"
                  />
                </label>
              </div>

              <label>
                Message (optional)
                <textarea
                  rows="3"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Budget, preferred area or anything else we should know"
                />
              </label>

              <div className="ab-actions">
                <button type="submit" className="ab-btn ab-btn-red">
                  Send enquiry
                </button>
                <a className="ab-btn ab-btn-wa" href={whatsappLink()} target="_blank" rel="noreferrer">
                  {icons.whatsapp} WhatsApp us
                </a>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}