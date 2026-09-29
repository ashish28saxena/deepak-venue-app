import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

import VenueCarousel from "./Component/VenueCarousel";
import BanquetHalls from "./Component/BanquetHalls";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import AboutUs from "./Component/AboutUs";
import ContactUs from "./Component/ContactUs";
import Resort from "./Component/Resort";
import Gardens from "./Component/Gardens";
import VenueDetail from "./Component/Venuedetail"

/* Har route change par page top se khule */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* Home page: saare sections ek saath */
const Home = () => (
  <>
    <VenueCarousel />
    <BanquetHalls />
    <Resort />
    <Gardens />
   
    
  </>
);

/* Jo pages abhi bane nahi, unke liye placeholder */
const Placeholder = ({ title }) => (
  <div style={{ padding: "80px 20px", textAlign: "center" }}>
    <h2>{title}</h2>
    <p>Coming soon.</p>
  </div>
);

const NotFound = () => (
  <div style={{ padding: "80px 20px", textAlign: "center" }}>
    <h2>404 - Page not found</h2>
    <Link to="/">Go to Home</Link>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/venues/banquet-halls" element={<BanquetHalls />} />
          <Route path="/venues/lawns" element={<VenueCarousel />} />
          <Route path="/venues/resorts" element={<Resort />} />
          <Route path="/venues/gardens" element={<Gardens />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/shortlisted" element={<Placeholder title="My Shortlist" />} />
          <Route path="/login" element={<Placeholder title="Log in / Sign up" />} />
          <Route path="/blogs" element={<Placeholder title="Blogs" />} />
          <Route path="/terms" element={<Placeholder title="Terms & Conditions" />} />
          <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
          <Route path="/venues/:type/:slug" element={<VenueDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;