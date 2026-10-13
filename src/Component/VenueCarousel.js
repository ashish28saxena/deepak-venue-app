
import { useRef } from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "./BanquetHalls.css";

const API_URL = "http://localhost:5000/api/venues/";
const SERVER = "http://localhost:5000";

// "/uploads/a.jpg" jaise relative path ko full URL bana deta hai
const toUrl = (src) =>
  typeof src === "string" && src.trim()
    ? /^https?:\/\//i.test(src)
      ? src
      : `${SERVER}/${src.replace(/^\/+/, "")}`
    : null;

// API ke dono formats ko card ke format me convert karta hai
function toCardData(x) {
  const images = (x.albums || [])
    .flatMap((album) => Object.values(album).filter(Array.isArray).flat())
    .map(toUrl)
    .filter(Boolean);

  return {
    id: x.id || x._id,
    name: x.name || x.venueName,
    city: x.city,
    price: Number(x.pricePerPlate) || null,
    rating: x.rating,
    photos: images.length ? `${images.length}+` : "",
    image: images[0] || "https://picsum.photos/seed/venue/700/640",
    type: x.propertyType,
  };
}

function VenueCard({ venue }) {
  return (
    <div className="venue-card">
      <div className="venue-img-wrap">
        <img src={venue.image} alt={venue.name} className="venue-img" />

        <button className="btn shortlist-btn" type="button">
          <i className="bi bi-star me-2"></i>Shortlist
        </button>

        <span className="rating-badge">
          <i className="bi bi-star-fill me-1"></i>
          {venue.rating}
        </span>

        <span className="photo-count">{venue.photos}</span>

        <div className="dots">
          <span className="active"></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="venue-body">
        
        <Link to={`/venues/banquet-halls/${venue.id}`} >
    
    <h5 className="venue-name">{venue.name}</h5>
</Link>
        
        <Link to={`/venues/banquet-halls/${venue.id}`} className="venue-city">
    <i className="bi bi-geo-alt-fill me-1"></i>
    {venue.city}
</Link>
        <p className="venue-price">
          {venue.price
            ? `₹${venue.price.toLocaleString("en-IN")}`
            : "Contact for details"}
        </p>
      </div>
    </div>
  );
}

export default function VenueCarousel({
  title = "Lawns",
  autoPlay = true,
  interval = 3000, // 3000 = 3 second
}) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [venues, setVenues] = useState([]);
  const count = venues.length;

  // API se sirf Banquet Halls ka data
  useEffect(() => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((json) => {
      const list = Array.isArray(json) ? json : json.data || [];
      setVenues(
        list
          .map(toCardData)
          .filter((v) => (v.type || "").toLowerCase().includes("lawn"))
      );
    })
    .catch((err) => console.error("Venues load nahi hue:", err));
}, []);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector(".venue-card");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : 340;

    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    const atStart = el.scrollLeft <= 5;

    // Aakhir mein pahunche to shuru par, shuru mein peeche jaaye to aakhir par
    if (dir > 0 && atEnd) return el.scrollTo({ left: 0, behavior: "smooth" });
    if (dir < 0 && atStart) return el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });

    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Autoplay
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!autoPlay || paused || reduceMotion) return;

    const id = setInterval(() => scroll(1), interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, interval]);

  return (
    <section className="venue-section py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title m-0">
            {title} ({count})
          </h2>
          
        </div>

        <div
          className="position-relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}
        >
          <button
            type="button"
            className="nav-arrow left"
            onClick={() => scroll(-1)}
            aria-label="Previous"
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <div className="venue-track" ref={trackRef}>
            {venues.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>

          <button
            type="button"
            className="nav-arrow right"
            onClick={() => scroll(1)}
            aria-label="Next"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}