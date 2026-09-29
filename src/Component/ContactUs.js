import { useState } from "react";
import "./ContactUs.css";

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
  phone: (
    <Icon>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </Icon>
  ),
  whatsapp: (
    <Icon>
      <path d="M4 20l1.3-4.2A8 8 0 1112 20a8 8 0 01-3.8-1L4 20z" />
      <path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .5c-.8-.4-1.6-1.2-2-2l.5-1-1-2L9 9z" />
    </Icon>
  ),
  mail: (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Icon>
  ),
  pin: (
    <Icon>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </Icon>
  ),
  clock: (
    <Icon size={18}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  ),
  check: (
    <Icon size={28}>
      <path d="M5 12l5 5 9-10" />
    </Icon>
  ),
  plus: (
    <Icon size={18}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  ),
};

/* ---------- Content (yahan se edit karo) ---------- */
const PHONE = "+91 8124222266";
const WHATSAPP = "918124222266";
const EMAIL = "support@yourwebsite.com"; // apna asli email daalo
const ADDRESS = "Etawah, Uttar Pradesh"; // poora address yahan likh sakte ho
const HOURS = "Mon to Sat, 10:00 AM to 7:00 PM"; // apna asli time daalo
const MAP_SRC = ""; // Google Maps "Embed a map" ka src yahan paste karo (optional)

const TOPICS = [
  "Help finding a venue",
  "List my venue",
  "Booking support",
  "Feedback or complaint",
  "Something else",
];

const FAQS = [
  {
    q: "Is it free to use the website?",
    a: "Yes. Browsing venues, comparing them and building your shortlist is free for families.",
  },
  {
    q: "Do you take the booking payment?",
    a: "You finalise the booking and payment directly with the venue. Our team can help you with visits and questions along the way.",
  },
  {
    q: "How can I list my venue?",
    a: "Choose “List my venue” in the form above or call us. We will get in touch and help you add your venue.",
  },
  {
    q: "How soon will I get a reply?",
    a: "We usually reply within one working day. For anything urgent, please call or message us on WhatsApp.",
  },
];

const EMPTY = { name: "", phone: "", email: "", topic: TOPICS[0], message: "" };

export default function ContactUs({ onSubmit }) {
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
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) er.message = "Please write at least a short message.";
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

  const cards = [
    {
      icon: icons.phone,
      title: "Call us",
      text: PHONE,
      href: `tel:${PHONE.replace(/\s/g, "")}`,
    },
    {
      icon: icons.whatsapp,
      title: "WhatsApp",
      text: "Chat with our team",
      href: `https://wa.me/${WHATSAPP}`,
      external: true,
    },
    {
      icon: icons.mail,
      title: "Email",
      text: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: icons.pin,
      title: "Location",
      text: ADDRESS,
    },
  ];

  return (
    <main className="ct">
      {/* Hero */}
      <section className="ct-hero">
        <div className="ct-wrap">
          <h1>Contact us</h1>
          <p>
            Have a question about a venue, a booking or listing your own place? Send us a message
            and we will help.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="ct-wrap ct-cards">
        {cards.map((c) => {
          const Tag = c.href ? "a" : "div";
          const props = c.href
            ? { href: c.href, ...(c.external && { target: "_blank", rel: "noreferrer" }) }
            : {};
          return (
            <Tag key={c.title} className="ct-card-item" {...props}>
              <span className="ct-card-icon">{c.icon}</span>
              <span className="ct-card-title">{c.title}</span>
              <span className="ct-card-text">{c.text}</span>
            </Tag>
          );
        })}
      </section>

      {/* Form + side info */}
      <section className="ct-wrap ct-main">
        <div className="ct-formbox">
          <h2>Send us a message</h2>

          {sent ? (
            <div className="ct-success" role="status">
              <span>{icons.check}</span>
              <h3>Message sent</h3>
              <p>Thank you for reaching out. We will get back to you soon.</p>
              <button type="button" className="ct-link" onClick={() => setSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="ct-row">
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

              <div className="ct-row">
                <label className={errors.email ? "has-error" : ""}>
                  Email (optional)
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <small>{errors.email}</small>}
                </label>
                <label>
                  What is this about?
                  <select value={form.topic} onChange={set("topic")}>
                    {TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className={errors.message ? "has-error" : ""}>
                Message
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us how we can help"
                />
                {errors.message && <small>{errors.message}</small>}
              </label>

              <button type="submit" className="ct-btn">
                Send message
              </button>
            </form>
          )}
        </div>

        <aside className="ct-side">
          <div className="ct-hours">
            <h3>{icons.clock} Working hours</h3>
            <p>{HOURS}</p>
            <p className="ct-note">For urgent help, call or message us on WhatsApp.</p>
          </div>

          {MAP_SRC ? (
            <iframe
              className="ct-map"
              title="Our location"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="ct-map ct-map-empty">
              {icons.pin}
              <span>{ADDRESS}</span>
            </div>
          )}
        </aside>
      </section>

      {/* FAQ */}
      <section className="ct-wrap ct-faq">
        <h2>Frequently asked questions</h2>
        <div>
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span>{icons.plus}</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}