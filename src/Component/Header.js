// import { useState } from "react";
// import { Navbar, Container, Button, Dropdown, Offcanvas, Nav } from "react-bootstrap";
// import {
//   BiMenu,
//   BiChevronRight,
//   BiChevronDown,
//   BiSearch,
//   BiUser,
//   BiTargetLock,
// } from "react-icons/bi";
// import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
// import "./Header.css";


// const CITIES = ["Etawah", "Agra", "Kanpur", "Lucknow", "Delhi", "Noida"];

// const MENU_MAIN = ["Venues", "Shortlisted", "Top Cities"];
// const MENU_INFO = ["About Us", "Contact Us", "Blogs", "Terms & Conditions", "Privacy Policy"];

// export default function Header({ onSearchClick }) {
//   const [showMenu, setShowMenu] = useState(false);
//   const [city, setCity] = useState("Etawah");

//   const closeMenu = () => setShowMenu(false);

//   return (
//     <>
//       <Navbar className="mh-header" expand={false}>
//         <Container fluid className="mh-container">
//           {/* Left: hamburger + logo */}
//           <div className="d-flex align-items-center gap-3">
//             <button
//               type="button"
//               className="mh-icon-btn"
//               aria-label="Open menu"
//               onClick={() => setShowMenu(true)}
//             >
//               <BiMenu size={36} />
//             </button>

//             <Navbar.Brand href="/" className="mh-logo m-0">
//   <img src="/logo-web.jpeg" alt="Logo" width="100px" height="70px"/>
// </Navbar.Brand>
//           </div>

//           {/* Right: search, city, user */}
//           <div className="d-flex align-items-center gap-3">
//             <Button
//               variant="light"
//               className="mh-pill mh-search d-none d-md-inline-flex"
//               onClick={onSearchClick}
//             >
//               <BiSearch size={20} className="mh-accent" />
//               <span>Search by locality &amp; type</span>
//               <BiChevronRight size={18} />
//             </Button>

//             <Dropdown align="end">
//               <Dropdown.Toggle variant="light" className="mh-pill mh-city">
//                 <BiTargetLock size={18} className="mh-accent" />
//                 <span>{city}</span>
//               </Dropdown.Toggle>
//               <Dropdown.Menu className="mh-dropdown">
//                 {CITIES.map((c) => (
//                   <Dropdown.Item
//                     key={c}
//                     active={c === city}
//                     onClick={() => setCity(c)}
//                   >
//                     {c}
//                   </Dropdown.Item>
//                 ))}
//               </Dropdown.Menu>
//             </Dropdown>

//             <Dropdown align="end">
//               <Dropdown.Toggle as="button" className="mh-user" aria-label="Account">
//                 <BiUser size={34} />
//                 <BiChevronDown size={18} />
//               </Dropdown.Toggle>
//               <Dropdown.Menu className="mh-dropdown">
//                 <Dropdown.Item href="/login">Login</Dropdown.Item>
//                 <Dropdown.Item href="/register">Register</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//         </Container>
//       </Navbar>

//       {/* Side menu */}
//       <Offcanvas show={showMenu} onHide={closeMenu} placement="start" className="mh-offcanvas">
//         <Offcanvas.Header closeButton />
//         <Offcanvas.Body>
//           <Nav className="flex-column">
//             {MENU_MAIN.map((item) => (
//               <Nav.Link key={item} href="#" className="mh-link" onClick={closeMenu}>
//                 {item}
//                 <BiChevronRight size={22} />
//               </Nav.Link>
//             ))}
//           </Nav>

//           <hr className="mh-hr" />
//           <a href="tel:+918124222266" className="mh-helpline">
//             Helpline +91 8124222266
//           </a>
//           <hr className="mh-hr" />

//           <Nav className="flex-column">
//             {MENU_INFO.map((item) => (
//               <Nav.Link key={item} href="#" className="mh-link" onClick={closeMenu}>
//                 {item}
//                 <BiChevronRight size={22} />
//               </Nav.Link>
//             ))}
//           </Nav>

//           <hr className="mh-hr" />
//           <p className="mh-follow">For instant updates follow us on</p>
//           <div className="d-flex gap-3">
//             <a href="#" aria-label="Facebook" className="mh-social"><FaFacebookF /></a>
//             <a href="#" aria-label="Instagram" className="mh-social"><FaInstagram /></a>
//             <a href="#" aria-label="YouTube" className="mh-social"><FaYoutube /></a>
//           </div>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }


import { useEffect, useMemo, useRef, useState } from "react";
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
  check: (
    <Icon size={16}>
      <path d="M5 12l5 5 9-10" />
    </Icon>
  ),
};

/* ---------- Data (yahan se edit karo) ---------- */
const BRAND_NAME = "Shubhlagnmart";
const DEFAULT_LOGO = "/logo-web.jpeg";

const NAV = [
  { label: "Banquet Halls", href: "/venues/banquet-halls" },
  { label: "Lawns", href: "/venues/lawns" },
  { label: "Resorts", href: "/venues/resorts" },
  { label: "Gardens", href: "/venues/gardens" },
  { label: "About Us", href: "/venues/gardens" },
  { label: "Contact Us", href: "/venues/gardens" },
];

const CITIES = ["Etawah", "Agra", "Kanpur", "Lucknow", "Mainpuri", "Firozabad"];

const VENUE_TYPES = ["Banquet Halls", "Lawns", "Resorts", "Marriage Gardens"];
const LOCALITIES = ["Civil Lines", "Collectorate Road", "Bharthana Road", "Railway Road", "Kachahri Road"];

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
  city = "Etawah",
  onCityChange,
  onSearch,
  shortlistCount = 0,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [panel, setPanel] = useState(null); // "search" | "city" | "profile" | null
  const [query, setQuery] = useState("");

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

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = [
      ...VENUE_TYPES.map((t) => ({ label: t, kind: "Venue type" })),
      ...LOCALITIES.map((l) => ({ label: l, kind: "Locality" })),
    ];
    return q ? all.filter((s) => s.label.toLowerCase().includes(q)) : all;
  }, [query]);

  const runSearch = (value) => {
    onSearch?.({ query: value, city });
    setQuery(value);
    closePanel();
  };

  const toggle = (name) => setPanel((cur) => (cur === name ? null : name));

  return (
    <header className={`hd ${scrolled ? "is-scrolled" : ""}`}>
      <div className="hd-inner">
        {/* Left: menu + logo */}
        <div className="hd-left">
          <HeaderMenu
            shortlistCount={shortlistCount}
            onCitySelect={(c) => onCityChange?.(c)}
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

        {/* Right: search, city, profile */}
        <div className="hd-right">
          
          

          {/* City */}
          <div className="hd-pop" ref={cityRef}>
            <button
              type="button"
              className="hd-pill hd-city"
              onClick={() => toggle("city")}
              aria-expanded={panel === "city"}
            >
              <span className="hd-pill-icon hd-red">{icons.pin}</span>
              <span>{city}</span>
              <span className={`hd-caret ${panel === "city" ? "is-up" : ""}`}>{icons.caret}</span>
            </button>

            {panel === "city" && (
              <div className="hd-panel hd-panel-city">
                <p className="hd-panel-title">Choose your city</p>
                <ul className="hd-list">
                  {CITIES.map((c) => (
                    <li key={c}>
                      <button
                        type="button"
                        className={c === city ? "is-active" : ""}
                        onClick={() => {
                          onCityChange?.(c);
                          closePanel();
                        }}
                      >
                        <span className="hd-list-icon">{icons.pin}</span>
                        <span>{c}</span>
                        {c === city && <span className="hd-tick">{icons.check}</span>}
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
              aria-label="Account menu"
            >
              {icons.user}
              <span className={`hd-caret ${panel === "profile" ? "is-up" : ""}`}>{icons.caret}</span>
            </button>

            {panel === "profile" && (
              <div className="hd-panel hd-panel-profile">
                <a className="hd-cta" href="/login">
                  {icons.login} Log in or sign up
                </a>
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
                      <span>Help & support</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}