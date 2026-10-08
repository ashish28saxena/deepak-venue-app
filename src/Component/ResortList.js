import { useState } from "react";

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
  { id: 31, name: "Balaji Marriage Garden", city: "Etawah", price: 54000, rating: 4.2, photos: "6+", image: "https://picsum.photos/seed/garden31/700/640" },
  { id: 32, name: "Hotel Paradise Banquet", city: "Etawah", price: 98000, rating: 4.6, photos: "9+", image: "https://picsum.photos/seed/garden32/700/640" },
  { id: 33, name: "Kailash Vatika", city: "Etawah", price: null, rating: 4.1, photos: "5+", image: "https://picsum.photos/seed/garden33/700/640" },
  { id: 34, name: "Pushpanjali Lawn", city: "Etawah", price: 66000, rating: 4.4, photos: "7+", image: "https://picsum.photos/seed/garden34/700/640" },
  { id: 35, name: "Bharat Palace", city: "Etawah", price: 82000, rating: 4.5, photos: "8+", image: "https://picsum.photos/seed/garden35/700/640" },
  { id: 36, name: "Sapna Garden", city: "Etawah", price: 46000, rating: 4.0, photos: "5+", image: "https://picsum.photos/seed/garden36/700/640" },
  { id: 37, name: "Riverside Resort", city: "Etawah", price: 125000, rating: 4.8, photos: "10+", image: "https://picsum.photos/seed/garden37/700/640" },
  { id: 38, name: "Gopal Marriage Lawn", city: "Etawah", price: 51000, rating: 4.3, photos: "6+", image: "https://picsum.photos/seed/garden38/700/640" },
  { id: 39, name: "Ambika Banquet", city: "Etawah", price: 73000, rating: 4.5, photos: "8+", image: "https://picsum.photos/seed/garden39/700/640" },
  { id: 40, name: "Tulsi Vatika", city: "Etawah", price: 44000, rating: 4.1, photos: "5+", image: "https://picsum.photos/seed/garden40/700/640" },
  { id: 41, name: "Jashn Lawn", city: "Etawah", price: 92000, rating: 4.6, photos: "9+", image: "https://picsum.photos/seed/garden41/700/640" },
  { id: 42, name: "Neelkanth Garden", city: "Etawah", price: 59000, rating: 4.3, photos: "7+", image: "https://picsum.photos/seed/garden42/700/640" },
  { id: 43, name: "Raj Mahal Banquet", city: "Etawah", price: 115000, rating: 4.7, photos: "10+", image: "https://picsum.photos/seed/garden43/700/640" },
  { id: 44, name: "Sanskar Vatika", city: "Etawah", price: null, rating: 4.2, photos: "6+", image: "https://picsum.photos/seed/garden44/700/640" },
  { id: 45, name: "Mayur Resort", city: "Etawah", price: 108000, rating: 4.7, photos: "9+", image: "https://picsum.photos/seed/garden45/700/640" },
  { id: 46, name: "Anmol Marriage Home", city: "Etawah", price: 47000, rating: 4.1, photos: "5+", image: "https://picsum.photos/seed/garden46/700/640" },
  { id: 47, name: "Aangan Lawn", city: "Etawah", price: 64000, rating: 4.4, photos: "7+", image: "https://picsum.photos/seed/garden47/700/640" },
  { id: 48, name: "Sitara Palace", city: "Etawah", price: 86000, rating: 4.6, photos: "8+", image: "https://picsum.photos/seed/garden48/700/640" },
  { id: 49, name: "Shagun Garden", city: "Etawah", price: 53000, rating: 4.2, photos: "6+", image: "https://picsum.photos/seed/garden49/700/640" },
  { id: 50, name: "Kohinoor Banquet", city: "Etawah", price: 100000, rating: 4.8, photos: "10+", image: "https://picsum.photos/seed/garden50/700/640" },
];

const css = `
.sm-page{font-family:'Poppins',system-ui,sans-serif;background:#faf6f1;min-height:100vh;padding:32px 20px;color:#2a1a1a}
.sm-wrap{max-width:1120px;margin:0 auto}
.sm-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:20px;flex-wrap:wrap;gap:8px}
.sm-head h2{margin:0;font-size:28px;font-weight:600;color:#6b1a2a}
.sm-head span{font-size:14px;color:#7d6a6a}
.sm-bar{display:flex;gap:10px;margin-bottom:24px;flex-wrap:wrap}
.sm-pill{border:1px solid #d9c9b8;background:#fff;border-radius:999px;padding:8px 16px;font:500 14px 'Poppins',sans-serif;cursor:pointer;color:#2a1a1a}
.sm-pill.on{background:#6b1a2a;color:#fff;border-color:#6b1a2a}
.sm-pill:focus-visible,.sm-btn:focus-visible,.sm-save:focus-visible{outline:3px solid #c9962b;outline-offset:2px}
.sm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px}
.sm-card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 14px rgba(107,26,42,.08);display:flex;flex-direction:column}
.sm-photo{position:relative;aspect-ratio:4/3;background:#eadfd2}
.sm-photo img{width:100%;height:100%;object-fit:cover;display:block}
.sm-rate{position:absolute;left:0;bottom:0;background:#2f7d4f;color:#fff;font-weight:600;font-size:13px;padding:5px 12px 5px 10px;border-top-right-radius:12px}
.sm-save{position:absolute;top:12px;right:12px;background:rgba(30,15,15,.62);color:#fff;border:0;border-radius:10px;padding:8px 12px;font:500 13px 'Poppins',sans-serif;cursor:pointer}
.sm-body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:10px;flex:1}
.sm-name{margin:0;font-size:16px;font-weight:600}
.sm-area{font-size:13px;color:#b0392f;text-decoration:underline}
.sm-price{font-size:22px;font-weight:600;color:#2a1a1a}
.sm-price small{font-size:13px;font-weight:400;color:#7d6a6a;margin-left:4px}
.sm-chips{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.sm-chip{border:1px solid #eadfd2;border-radius:999px;padding:5px 12px;font-size:12.5px;color:#4a3a3a;white-space:nowrap}
.sm-btn{margin-top:auto;border:0;border-radius:10px;background:#6b1a2a;color:#fff;padding:13px;font:600 14px 'Poppins',sans-serif;cursor:pointer}
.sm-btn:hover{background:#561421}
.sm-btn.shown{background:#fff;color:#6b1a2a;border:1.5px solid #6b1a2a}
`;

function VenueCard({ v }) {
  const [saved, setSaved] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <article className="sm-card">
      <div className="sm-photo">
        <img src={v.image} alt={v.name} loading="lazy" />
        <button className="sm-save" onClick={() => setSaved(!saved)} aria-pressed={saved}>
          {saved ? "★ Shortlisted" : "☆ Shortlist"}
        </button>
        <div className="sm-rate">★ {v.rating.toFixed(1)}</div>
      </div>
      <div className="sm-body">
        <h3 className="sm-name">{v.name}</h3>
        <a className="sm-area" href="#">{v.area}</a>
        {v.price ? (
          <div className="sm-price">₹{v.price.toLocaleString("en-IN")}<small>{v.unit}</small></div>
        ) : (
          <div className="sm-price">Contact for details</div>
        )}
        <div className="sm-chips">
          <span className="sm-chip">{v.capacity} Hall capacity</span>
          <span className="sm-chip">{v.parking} car parking</span>
          {v.ac && <span className="sm-chip">Air conditioning</span>}
          <span className="sm-chip">{v.rooms} Rooms</span>
        </div>
        <button className={"sm-btn" + (show ? " shown" : "")} onClick={() => setShow(true)}>
          {show ? v.phone : "View Phone Number"}
        </button>
      </div>
    </article>
  );
}

export default function ResortList() {
  const [type, setType] = useState("Resort");
 
  return (
    <div className="sm-page">
      <style>{css}</style>
      <div className="sm-wrap">
        <div className="sm-head">
          <h2>{type} in Etawah</h2>
          <span>{venues.length} venues</span>
        </div>
        
        <div className="sm-grid">
          {venues.map((v) => <VenueCard key={v.id} v={v} />)}
        </div>
      </div>
    </div>
  );
}