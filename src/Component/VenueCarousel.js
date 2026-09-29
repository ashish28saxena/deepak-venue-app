import { useRef } from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "./VenueCarousel.css";

// Apna data yahan badlo (image ke liye apni URL daalo)
const venues = [
  { id: 1, name: "Prashant Marriage Garden", city: "Etawah", price: null, rating: 4.5, photos: "5+", image: "https://picsum.photos/seed/garden1/700/640" },
  { id: 2, name: "Manas Shehnai Sthal Resort", city: "Etawah", price: 80000, rating: 4.5, photos: "7+", image: "https://picsum.photos/seed/garden2/700/640" },
  { id: 3, name: "Royal Palace Lawn", city: "Etawah", price: 70000, rating: 4.5, photos: "7+", image: "https://picsum.photos/seed/garden3/700/640" },
  { id: 4, name: "Shiv Vatika Lawn", city: "Etawah", price: 55000, rating: 4.3, photos: "6+", image: "https://picsum.photos/seed/garden4/700/640" },
  { id: 5, name: "Anand Vatika Lawn", city: "Etawah", price: 90000, rating: 4.6, photos: "8+", image: "https://picsum.photos/seed/garden5/700/640" },
  { id: 6, name: "Krishna Palace Banquet", city: "Etawah", price: 65000, rating: 4.2, photos: "5+", image: "https://picsum.photos/seed/garden6/700/640" },
  { id: 7, name: "Sagar Resort & Lawn", city: "Etawah", price: 120000, rating: 4.7, photos: "9+", image: "https://picsum.photos/seed/garden7/700/640" },
  { id: 8, name: "Ganga Jamuna Garden", city: "Etawah", price: 45000, rating: 4.4, photos: "6+", image: "https://picsum.photos/seed/garden8/700/640" },
  { id: 9, name: "Shree Ram Vatika", city: "Etawah", price: null, rating: 4.1, photos: "7+", image: "https://picsum.photos/seed/garden9/700/640" },
  { id: 10, name: "Grand Regency Banquet", city: "Etawah", price: 60000, rating: 4.8, photos: "10+", image: "https://picsum.photos/seed/garden10/700/640" },
  { id: 11, name: "Maa Durga Marriage Lawn", city: "Etawah", price: 52000, rating: 4.3, photos: "6+", image: "https://picsum.photos/seed/garden11/700/640" },
  { id: 12, name: "Lakshmi Palace", city: "Etawah", price: 95000, rating: 4.6, photos: "8+", image: "https://picsum.photos/seed/garden12/700/640" },
  { id: 13, name: "Green Valley Resort", city: "Etawah", price: 110000, rating: 4.7, photos: "9+", image: "https://picsum.photos/seed/garden13/700/640" },
  { id: 14, name: "Sharda Marriage Home", city: "Etawah", price: null, rating: 4.0, photos: "5+", image: "https://picsum.photos/seed/garden14/700/640" },
  { id: 15, name: "Radhika Garden", city: "Etawah", price: 48000, rating: 4.2, photos: "6+", image: "https://picsum.photos/seed/garden15/700/640" },
  { id: 16, name: "Ashirwad Lawn", city: "Etawah", price: 58000, rating: 4.4, photos: "7+", image: "https://picsum.photos/seed/garden16/700/640" },
  { id: 17, name: "Star Banquet Hall", city: "Etawah", price: 72000, rating: 4.5, photos: "8+", image: "https://picsum.photos/seed/garden17/700/640" },
  { id: 18, name: "Kesar Vatika", city: "Etawah", price: 40000, rating: 4.1, photos: "5+", image: "https://picsum.photos/seed/garden18/700/640" },
  { id: 19, name: "Moti Mahal Lawn", city: "Etawah", price: 85000, rating: 4.6, photos: "9+", image: "https://picsum.photos/seed/garden19/700/640" },
  { id: 20, name: "Sunrise Resort", city: "Etawah", price: 130000, rating: 4.8, photos: "10+", image: "https://picsum.photos/seed/garden20/700/640" },
  { id: 21, name: "Jai Maa Vatika", city: "Etawah", price: 50000, rating: 4.3, photos: "6+", image: "https://picsum.photos/seed/garden21/700/640" },
  { id: 22, name: "Rajdhani Banquet", city: "Etawah", price: 68000, rating: 4.4, photos: "7+", image: "https://picsum.photos/seed/garden22/700/640" },
  { id: 23, name: "Yamuna View Garden", city: "Etawah", price: null, rating: 4.2, photos: "5+", image: "https://picsum.photos/seed/garden23/700/640" },
  { id: 24, name: "Chandra Palace", city: "Etawah", price: 78000, rating: 4.5, photos: "8+", image: "https://picsum.photos/seed/garden24/700/640" },
  { id: 25, name: "Silver Oak Lawn", city: "Etawah", price: 62000, rating: 4.3, photos: "6+", image: "https://picsum.photos/seed/garden25/700/640" },
  { id: 26, name: "Vrindavan Garden", city: "Etawah", price: 56000, rating: 4.4, photos: "7+", image: "https://picsum.photos/seed/garden26/700/640" },
  { id: 27, name: "Shubh Aashirwad Banquet", city: "Etawah", price: 88000, rating: 4.6, photos: "9+", image: "https://picsum.photos/seed/garden27/700/640" },
  { id: 28, name: "Dream Land Resort", city: "Etawah", price: 105000, rating: 4.7, photos: "10+", image: "https://picsum.photos/seed/garden28/700/640" },
  { id: 29, name: "Om Sai Vatika", city: "Etawah", price: 42000, rating: 4.0, photos: "5+", image: "https://picsum.photos/seed/garden29/700/640" },
  { id: 30, name: "Heritage Lawn", city: "Etawah", price: 75000, rating: 4.5, photos: "8+", image: "https://picsum.photos/seed/garden30/700/640" },
];

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
        
        <Link to={`/venues/lawns/${venue.id}`} >
    
    <h5 className="venue-name">{venue.name}</h5>
</Link>
        <Link to={`/venues/lawns/${venue.id}`}  className="venue-city">
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
  title = "Lawns in Etawah",
  count = venues.length,
  autoPlay = true,
  interval = 3000, // milliseconds (3000 = 3 second)
}) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // Ek card + gap ki chaudai nikalta hai
  const getStep = () => {
    const el = trackRef.current;
    const card = el?.querySelector(".venue-card");
    if (!el || !card) return 340;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    const atStart = el.scrollLeft <= 5;

    // Aakhir mein pahunche to shuru par wapas, shuru mein peeche jaaye to aakhir par
    if (dir > 0 && atEnd) return el.scrollTo({ left: 0, behavior: "smooth" });
    if (dir < 0 && atStart) return el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });

    el.scrollBy({ left: dir * getStep(), behavior: "smooth" });
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
          <a href="#!" className="view-all">
            View all <i className="bi bi-chevron-right"></i>
          </a>
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