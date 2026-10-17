import { useEffect,  useRef, useState } from "react";
import HeaderMenu from "./Headermenu";
import "./Header.css";

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
  search: (
    <Icon>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </Icon>
  ),
  pin: (
    <Icon>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </Icon>
  ),
  caret: (
    <Icon size={16}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  ),
  user: (
    <Icon size={22}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 4.5-6 8-6s7 2 8 6" />
    </Icon>
  ),
  heart: (
    <Icon>
      <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
    </Icon>
  ),
  help: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1-1.5 2M12 17h.01" />
    </Icon>
  ),
  login: (
    <Icon>
      <path d="M14 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4M10 8l-4 4 4 4M6 12h10" />
    </Icon>
  ),
  logout: (
    <Icon>
      <path d="M10 4H6a2 2 0 00-2 2v12a2 2 0 002 2h4M16 8l4 4-4 4M20 12H10" />
    </Icon>
  ),
  check: (
    <Icon size={16}>
      <path d="M5 12l5 5 9-10" />
    </Icon>
  ),
};

/* ---------- Data (yahan se edit karo) ---------- */
const BRAND_NAME = "Shubhlagnmart";
const DEFAULT_LOGO = "/logo-web.jpeg";

const user = JSON.parse(sessionStorage.getItem("user") || "null");

const NAV = [
  { label: "Banquet Halls", href: "/venues/banquet-halls" },
  { label: "Lawns", href: "/venues/lawns" },
  { label: "Resorts", href: "/venues/resorts" },
  { label: "Gardens", href: "/venues/gardens" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },

  ...(user?.email === "admin@gmail.com"
    ? [{ label: "Add Venue", href: "/add-venue" },
      { label: "Lead", href: "/lead" }
    ]
    : []),
];

/* State -> cities (yahan se edit karo / naye state-city add karo) */
const STATE_CITIES = {
  "Uttar Pradesh": ["Etawah", "Agra", "Kanpur", "Lucknow", "Mainpuri", "Firozabad", "Auraiya", "Jhansi", "Varanasi", "Prayagraj"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Morena"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bharatpur"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Karnal"],
  Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
};
const STATES = Object.keys(STATE_CITIES);
const DEFAULT_STATE = "Uttar Pradesh";
const stateOfCity = (c) => STATES.find((s) => STATE_CITIES[s].includes(c)) || DEFAULT_STATE;



/* Login ke baad save hua user (sessionStorage pehle, phir localStorage) */
const getStoredUser = () => {
  try {
    const raw = sessionStorage.getItem("user") || localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const clearSession = () => {
  ["token", "user", "userId"].forEach((k) => {
    try {
      sessionStorage.removeItem(k);
      localStorage.removeItem(k);
    } catch {}
  });
};

/* Bahar click par dropdown band karne ke liye */
function useOutsideClose(ref, onClose, active) {
  useEffect(() => {
    if (!active) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && onClose();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, onClose, active]);
}

export default function Header({
  logo = DEFAULT_LOGO,
  city: cityProp = "Etawah",
  onCityChange,
  onSearch,
  shortlistCount = 0,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [panel, setPanel] = useState(null); // "search" | "city" | "profile" | null
  

  /* Logged-in user (null = logged out) */
  const [user, setUser] = useState(getStoredUser);
  const firstName = user?.fullName?.trim().split(" ")[0] || user?.username || "";

  /* Selected city ki value state mein (refresh ke baad bhi yaad rahegi) */
  const [city, setCity] = useState(() => {
    try {
      return localStorage.getItem("city") || cityProp;
    } catch {
      return cityProp;
    }
  });

  /* Selected state (city usi state ki hoti hai) */
  const [stateName, setStateName] = useState(() => {
    try {
      return localStorage.getItem("state") || stateOfCity(city);
    } catch {
      return stateOfCity(city);
    }
  });
  /* Dropdown mein abhi dikh raha state (city click karne par hi save hota hai) */
  const [draftState, setDraftState] = useState(stateName);

  const searchRef = useRef(null);
  const cityRef = useRef(null);
  const profileRef = useRef(null);

  const closePanel = () => setPanel(null);
  useOutsideClose(searchRef, () => panel === "search" && closePanel(), panel === "search");
  useOutsideClose(cityRef, () => panel === "city" && closePanel(), panel === "city");
  useOutsideClose(profileRef, () => panel === "profile" && closePanel(), panel === "profile");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Dusre tab mein login/logout ho to header bhi update ho */
  useEffect(() => {
    const sync = () => setUser(getStoredUser());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  



  const toggle = (name) => setPanel((cur) => (cur === name ? null : name));

  /* City select karne par: state update + save + parent ko batana + dropdown band */
  const handleCityChange = (c, st) => {
    const s = st || stateOfCity(c); // HeaderMenu sirf city bhejta hai, to state city se nikal lete hain
    setCity(c);
    setStateName(s);
    setDraftState(s);
    try {
      localStorage.setItem("city", c);
      localStorage.setItem("state", s);
    } catch {}
    onCityChange?.(c, s);
    closePanel();
  };

  const openCityPanel = () => {
    setDraftState(stateName); // kholte waqt selected state dikhao
    toggle("city");
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    closePanel();
    window.location.assign("/");
  };

  return (
    <header className={`hd ${scrolled ? "is-scrolled" : ""}`}>
      <div className="hd-inner">
        {/* Left: menu + logo */}
        <div className="hd-left">
          <HeaderMenu
            shortlistCount={shortlistCount}
            onCitySelect={handleCityChange}
          />
          <a className="hd-logo" href="/" aria-label={`${BRAND_NAME} home`}>
            {logoFailed ? (
              <span>{BRAND_NAME}</span>
            ) : (
              <img src={logo} alt={BRAND_NAME} onError={() => setLogoFailed(true)} />
            )}
          </a>
        </div>

        {/* Center: quick links (desktop) */}
        <nav className="hd-nav" aria-label="Venue types">
          {NAV.map((n) => (
            <a key={n.label} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        {/* Right: city, profile */}
        <div className="hd-right">
          {/* City */}
          <div className="hd-pop" ref={cityRef}>
            <button
              type="button"
              className="hd-pill hd-city"
              onClick={openCityPanel}
              aria-expanded={panel === "city"}
              aria-haspopup="listbox"
            >
              <span className="hd-pill-icon hd-red">{icons.pin}</span>
              <span>{city}</span>
              <span className={`hd-caret ${panel === "city" ? "is-up" : ""}`}>{icons.caret}</span>
            </button>

            {panel === "city" && (
              <div className="hd-panel hd-panel-city">
                <label className="hd-panel-title" htmlFor="hd-state">
                  Choose your state
                </label>
                <select
                  id="hd-state"
                  className="hd-select"
                  value={draftState}
                  onChange={(e) => setDraftState(e.target.value)}
                >
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <p className="hd-panel-title">Choose your city in {draftState}</p>
                <ul className="hd-list hd-city-list" role="listbox" aria-label={`Cities in ${draftState}`}>
                  {STATE_CITIES[draftState].map((c) => (
                    <li key={c} role="option" aria-selected={c === city && draftState === stateName}>
                      <button
                        type="button"
                        className={c === city && draftState === stateName ? "is-active" : ""}
                        onClick={() => handleCityChange(c, draftState)}
                      >
                        <span className="hd-list-icon">{icons.pin}</span>
                        <span>{c}</span>
                        {c === city && draftState === stateName && (
                          <span className="hd-tick">{icons.check}</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="hd-pop" ref={profileRef}>
            <button
              type="button"
              className="hd-profile"
              onClick={() => toggle("profile")}
              aria-expanded={panel === "profile"}
              aria-label={user ? `Account menu for ${user.fullName}` : "Account menu"}
            >
              {icons.user}
              {user && (
                <span style={{ fontSize: 14, fontWeight: 500, maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {firstName}
                </span>
              )}
              <span className={`hd-caret ${panel === "profile" ? "is-up" : ""}`}>{icons.caret}</span>
            </button>

            {panel === "profile" && (
              <div className="hd-panel hd-panel-profile">
                {user ? (
                  <div style={{ padding: "4px 4px 12px", borderBottom: "1px solid rgba(0,0,0,.1)", marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{user.fullName}</div>
                    <div style={{ fontSize: 13, opacity: 0.7, overflowWrap: "anywhere" }}>{user.email}</div>
                  </div>
                ) : (
                  <a className="hd-cta" href="/login">
                    {icons.login} Log in or sign up
                  </a>
                )}
                <ul className="hd-list">
                  <li>
                    <a href="/shortlisted">
                      <span className="hd-list-icon">{icons.heart}</span>
                      <span>My shortlist</span>
                      {shortlistCount > 0 && <b className="hd-count">{shortlistCount}</b>}
                    </a>
                  </li>
                  <li>
                    <a href="/contact">
                      <span className="hd-list-icon">{icons.help}</span>
                      <span>Help &amp; support</span>
                    </a>
                  </li>
                  {user && (
                    <li>
                      <button type="button" onClick={handleLogout}>
                        <span className="hd-list-icon">{icons.logout}</span>
                        <span>Log out</span>
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}