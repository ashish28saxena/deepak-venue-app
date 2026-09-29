import { useState } from "react";
import "./Footer.css";

const Icon = ({ children, size = 18 }) => (
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
  facebook: (
    <Icon>
      <path d="M14 8h2V4h-2.5A3.5 3.5 0 0010 7.5V10H8v4h2v6h4v-6h2l.5-4H14V8z" />
    </Icon>
  ),
  instagram: (
    <Icon>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.5 7.5h.01" />
    </Icon>
  ),
  youtube: (
    <Icon>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.5v5l4-2.5z" />
    </Icon>
  ),
  send: (
    <Icon>
      <path d="M4 12l16-8-6 16-3-7-7-1z" />
    </Icon>
  ),
};

/* ---------- Data (yahan se edit karo) ---------- */
const PHONE = "+91 8630955571";
const EMAIL = "support@shubhlagnmart.com"; // apna email daalo
const WHATSAPP = "918630955571";
const BRAND_NAME = "Shubhlagnmart";
const DEFAULT_LOGO = "/logo-web.jpeg"; // public/ folder mein hai to ye chalega

const COLUMNS = [
  {
    title: "Venues",
    links: [
      { label: "Banquet Halls", href: "/venues/banquet-halls" },
      { label: "Lawns & Farmhouses", href: "/venues/lawns" },
      { label: "Resorts", href: "/venues/resorts" },
      { label: "Marriage Gardens", href: "/venues/gardens" },
    ],
  },
  {
    title: "Top cities",
    links: [
      { label: "Etawah", href: "/city/etawah" },
      { label: "Agra", href: "/city/agra" },
      { label: "Kanpur", href: "/city/kanpur" },
      { label: "Lucknow", href: "/city/lucknow" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blogs", href: "/blogs" },
      { label: "List your venue", href: "/list-your-venue" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "#", icon: icons.facebook },
  { label: "Instagram", href: "#", icon: icons.instagram },
  { label: "YouTube", href: "#", icon: icons.youtube },
];

export default function Footer({ logo = DEFAULT_LOGO }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: yahan apni API call lagao
    setDone(true);
    setEmail("");
  };

  return (
    <footer className="ft">
      {/* Help strip */}
      <div className="ft-help">
        <div className="ft-wrap ft-help-inner">
          <div>
            <h2>Need help choosing a venue?</h2>
            <p>Tell us your date, budget and guest count, and our team will suggest the best venues for free.</p>
          </div>
          <div className="ft-help-actions">
            <a className="ft-btn ft-btn-solid" href={`tel:${PHONE.replace(/\s/g, "")}`}>
              {icons.phone} Call us
            </a>
            <a
              className="ft-btn ft-btn-ghost"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
            >
              {icons.whatsapp} WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="ft-wrap ft-main">
        <div className="ft-brand">
          <a className="ft-logo" href="/" aria-label={`${BRAND_NAME} home`}>
            {logoFailed ? (
              BRAND_NAME
            ) : (
              <img src={logo} alt={BRAND_NAME} onError={() => setLogoFailed(true)} />
            )}
          </a>

          <ul className="ft-contact">
            <li>
              {icons.phone}
              <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
            </li>
            <li>
              {icons.mail}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              {icons.pin}
              <span>Etawah, Uttar Pradesh</span>
            </li>
          </ul>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} className="ft-col" aria-label={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="ft-col ft-news">
          <h3>New venues and offers</h3>
          <p>Get the latest venues and deals straight to your inbox.</p>
          <form onSubmit={subscribe} className="ft-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setDone(false);
              }}
              placeholder="Your email"
              aria-label="Email address"
            />
            <button type="submit" aria-label="Subscribe">
              {icons.send}
            </button>
          </form>
          {done && <p className="ft-ok">Thanks! You are subscribed.</p>}

          <div className="ft-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <div className="ft-wrap ft-bottom-inner">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="ft-legal">
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}