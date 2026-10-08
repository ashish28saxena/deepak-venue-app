import { useDispatch, useSelector } from "react-redux";
import { removeShortlist, clearShortlist } from "../store/shortlistSlice";

const css = `
.sl-page{font-family:'Poppins',system-ui,sans-serif;background:#faf6f1;min-height:100vh;padding:32px 20px;color:#2a1a1a}
.sl-wrap{max-width:1120px;margin:0 auto}
.sl-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:24px;flex-wrap:wrap;gap:8px}
.sl-head h2{margin:0;font-size:28px;font-weight:600;color:#6b1a2a}
.sl-head-r{display:flex;align-items:center;gap:16px;font-size:14px;color:#7d6a6a}
.sl-link{color:#6b1a2a;font:600 13.5px 'Poppins',sans-serif;text-decoration:underline;text-underline-offset:3px;background:none;border:0;padding:0;cursor:pointer}
.sl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px}
.sl-card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 14px rgba(107,26,42,.08);display:flex;flex-direction:column}
.sl-photo{position:relative;aspect-ratio:4/3;background:#eadfd2}
.sl-photo img{width:100%;height:100%;object-fit:cover;display:block}
.sl-rate{position:absolute;left:0;bottom:0;background:#2f7d4f;color:#fff;font-weight:600;font-size:13px;padding:5px 12px 5px 10px;border-top-right-radius:12px}
.sl-body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:10px;flex:1}
.sl-name{margin:0;font-size:16px;font-weight:600}
.sl-city{font-size:13px;color:#7d6a6a}
.sl-price{font-size:22px;font-weight:600}
.sl-btn{margin-top:auto;border:1.5px solid #6b1a2a;border-radius:10px;background:#fff;color:#6b1a2a;padding:12px;font:600 14px 'Poppins',sans-serif;cursor:pointer}
.sl-btn:hover{background:#f6ede3}
.sl-btn:focus-visible,.sl-link:focus-visible,.sl-cta:focus-visible{outline:3px solid #c9962b;outline-offset:2px}
.sl-empty{padding:28px;border-left:4px solid #c9962b;background:#fbf3e2;border-radius:0 12px 12px 0;line-height:1.7;max-width:520px}
.sl-empty p{margin:0 0 14px}
.sl-cta{display:inline-block;background:#6b1a2a;color:#fff;text-decoration:none;border-radius:10px;padding:12px 20px;font:600 14px 'Poppins',sans-serif}
`;

export default function Shortlisted() {
  const dispatch = useDispatch();
  const userId = useSelector((s) => s.shortlist.userId);
  const items = useSelector((s) => s.shortlist.items);

  return (
    <div className="sl-page">
      <style>{css}</style>
      <div className="sl-wrap">
        <div className="sl-head">
          <h2>My shortlist</h2>
          {userId && items.length > 0 && (
            <div className="sl-head-r">
              <span>{items.length} {items.length === 1 ? "venue" : "venues"}</span>
              <button className="sl-link" onClick={() => dispatch(clearShortlist())}>Clear all</button>
            </div>
          )}
        </div>

        {!userId ? (
          <div className="sl-empty">
            <p>Log in to see the venues you have shortlisted.</p>
            <a className="sl-cta" href="/login">Log in or sign up</a>
          </div>
        ) : items.length === 0 ? (
          <div className="sl-empty">
            <p>You have not shortlisted any venue yet. Tap "Shortlist" on a venue to save it here.</p>
            <a className="sl-cta" href="/venues/resorts">Browse venues</a>
          </div>
        ) : (
          <div className="sl-grid">
            {items.map((v) => (
              <article className="sl-card" key={v.id}>
                <div className="sl-photo">
                  <img src={v.image} alt={v.name} loading="lazy" />
                  <div className="sl-rate">★ {Number(v.rating).toFixed(1)}</div>
                </div>
                <div className="sl-body">
                  <h3 className="sl-name">{v.name}</h3>
                  <span className="sl-city">{v.city}</span>
                  <div className="sl-price">
                    {v.price ? `₹${v.price.toLocaleString("en-IN")}` : "Contact for details"}
                  </div>
                  <button className="sl-btn" onClick={() => dispatch(removeShortlist(v.id))}>
                    Remove from shortlist
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}