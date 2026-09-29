import { useEffect, useState } from "react";
import "./Headermenu.css";

/* ---------- Small inline icons (no extra library needed) ---------- */
const Icon = ({ children, size = 20 }) => (
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
  menu: (
    <Icon size={24}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Icon>
  ),
  close: (
    <Icon>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  ),
  chevron: (
    <Icon size={18}>
      <path d="M9 6l6 6-6 6" />
    </Icon>
  ),
  venue: (
    <Icon>
      <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
    </Icon>
  ),
  heart: (
    <Icon>
      <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
    </Icon>
  ),
  city: (
    <Icon>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </Icon>
  ),
  phone: (
    <Icon>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </Icon>
  ),
  info: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </Icon>
  ),
  mail: (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Icon>
  ),
  blog: (
    <Icon>
      <path d="M5 4h11l3 3v13H5zM9 11h6M9 15h6" />
    </Icon>
  ),
  file: (
    <Icon>
      <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 13h5M10 17h5" />
    </Icon>
  ),
  shield: (
    <Icon>
      <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" />
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
};

/* ---------- Menu data (yahan se items edit kar sakte ho) ---------- */
const HELPLINE = "+91 8124222266";

const MAIN_ITEMS = [
  {
    id: "venues",
    label: "Venues",
    hint: "Banquets, lawns, resorts and more",
    icon: icons.venue,
    children: [
      { label: "Banquet Halls", href: "/venues/banquet-halls" },
      { label: "Lawns & Farmhouses", href: "/venues/lawns" },
      { label: "Resorts", href: "/venues/resorts" },
      { label: "Marriage Gardens", href: "/venues/gardens" },
    ],
  },
  {
    id: "shortlisted",
    label: "Shortlisted",
    hint: "Venues you saved",
    icon: icons.heart,
    href: "/shortlisted",
    badge: 0, // Header se shortlistCount prop se aata hai
  },
  {
    id: "cities",
    label: "Top Cities",
    hint: "Browse venues in your city",
    icon: icons.city,
    cities: ["Etawah", "Agra", "Kanpur", "Lucknow", "Mainpuri", "Firozabad"],
  },
];

const INFO_ITEMS = [
  { label: "About Us", href: "/about", icon: icons.info },
  { label: "Contact Us", href: "/contact", icon: icons.mail },
  { label: "Blogs", href: "/blogs", icon: icons.blog },
  { label: "Terms & Conditions", href: "/terms", icon: icons.file },
  { label: "Privacy Policy", href: "/privacy", icon: icons.shield },
];

const SOCIALS = [
  { label: "Facebook", href: "#", icon: icons.facebook },
  { label: "Instagram", href: "#", icon: icons.instagram },
  { label: "YouTube", href: "#", icon: icons.youtube },
];

/* ---------- Component ---------- */
function HeaderMenu({ onCitySelect, shortlistCount = 0 }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  // Escape se band ho + background scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const toggle = (id) => setExpanded((cur) => (cur === id ? null : id));
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="hm-trigger"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {icons.menu}
      </button>

      <div
        className={`hm-overlay ${open ? "is-open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={`hm-drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        aria-hidden={!open}
      >
        {/* Top */}
        <div className="hm-top">
          <div className="hm-welcome">
            <span className="hm-avatar">
              <Icon size={22}>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1-4 4.5-6 8-6s7 2 8 6" />
              </Icon>
            </span>
            <div>
              <p className="hm-welcome-title">Welcome!</p>
              <a className="hm-welcome-link" href="/login" onClick={close}>
                Log in or sign up
              </a>
            </div>
          </div>
          <button
            type="button"
            className="hm-close"
            aria-label="Close menu"
            onClick={close}
          >
            {icons.close}
          </button>
        </div>

        <div className="hm-scroll">
          {/* Main navigation */}
          <nav className="hm-group" aria-label="Primary">
            {MAIN_ITEMS.map((item) => {
              const expandable = item.children || item.cities;
              const isOpen = expanded === item.id;
              const Row = expandable ? "button" : "a";
              const rowProps = expandable
                ? {
                    type: "button",
                    onClick: () => toggle(item.id),
                    "aria-expanded": isOpen,
                  }
                : { href: item.href, onClick: close };

              return (
                <div key={item.id} className={`hm-item ${isOpen ? "is-open" : ""}`}>
                  <Row className="hm-row" {...rowProps}>
                    <span className="hm-icon">{item.icon}</span>
                    <span className="hm-text">
                      <span className="hm-label">{item.label}</span>
                      <span className="hm-hint">{item.hint}</span>
                    </span>
                    {(item.id === "shortlisted" ? shortlistCount : item.badge) > 0 && (
                      <span className="hm-badge">
                        {item.id === "shortlisted" ? shortlistCount : item.badge}
                      </span>
                    )}
                    <span className="hm-chevron">{icons.chevron}</span>
                  </Row>

                  {item.children && (
                    <div className="hm-sub" hidden={!isOpen}>
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <a href={c.href} onClick={close}>
                              {c.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.cities && (
                    <div className="hm-sub" hidden={!isOpen}>
                      <div className="hm-chips">
                        {item.cities.map((city) => (
                          <button
                            key={city}
                            type="button"
                            className="hm-chip"
                            onClick={() => {
                              onCitySelect?.(city);
                              close();
                            }}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Helpline */}
          <a className="hm-helpline" href={`tel:${HELPLINE.replace(/\s/g, "")}`}>
            <span className="hm-helpline-icon">{icons.phone}</span>
            <span>
              <span className="hm-helpline-title">Need help? Call us</span>
              <span className="hm-helpline-number">{HELPLINE}</span>
            </span>
          </a>

          {/* Info links */}
          <nav className="hm-group hm-info" aria-label="Company">
            {INFO_ITEMS.map((l) => (
              <a key={l.label} className="hm-row hm-row-small" href={l.href} onClick={close}>
                <span className="hm-icon hm-icon-plain">{l.icon} ********</span>
                <span className="hm-label">{l.label}</span>
                <span className="hm-chevron">{icons.chevron}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="hm-footer">
          <p>Follow us for instant updates</p>
          <div className="hm-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default HeaderMenu;