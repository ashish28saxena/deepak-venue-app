import { useMemo, useState } from "react";

const POSTS = [
  { id: 1, cat: "Planning", title: "How to Choose the Right Wedding Venue in Etawah", date: "2 Oct 2026", mins: 6,
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200",
    excerpt: "Capacity, parking, rooms and budget: a simple checklist to compare banquet halls before you pay an advance.",
    body: [
      "Choosing a venue is usually the first big decision in a wedding, and it shapes your budget, guest list and date. Start by fixing a rough guest count, because capacity is the one number that rules venues in or out.",
      "Next, visit at least three venues in person, ideally at the time of day your function will take place. Check lighting, sound, washrooms, the entry for elderly guests and how easily cars can enter and leave.",
      "Ask what the quoted price includes. Electricity, generator backup, cleaning, decoration and catering are often charged separately, and overtime can add up quickly.",
      "Finally, get the date, rate, advance amount and cancellation terms in writing and keep the receipt.",
    ]},
  { id: 2, cat: "Budget", title: "Wedding Budget Breakdown: Where the Money Really Goes", date: "24 Sep 2026", mins: 5,
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200",
    excerpt: "Venue, catering, decoration and clothing: a realistic split to help you plan without surprises.",
    body: [
      "For most families, catering and venue together take more than half of the total budget. Setting a limit for each before you start talking to vendors keeps decisions calm.",
      "Keep 10 percent aside for things you did not plan for. Extra guests, last-minute decoration changes and transport are the usual causes.",
      "Compare per-plate and per-day pricing carefully. A lower per-plate rate with a high guest minimum can cost more than a flat daily rate.",
    ]},
  { id: 3, cat: "Venues", title: "Banquet Hall, Lawn or Resort: Which Suits Your Wedding?", date: "15 Sep 2026", mins: 5,
    img: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200",
    excerpt: "Each type of venue has its own strengths. Here is how to match one to your guests, season and style.",
    body: [
      "Banquet halls are air-conditioned and weather-proof, which makes them a safe choice for summer and monsoon weddings.",
      "Lawns and gardens suit large guest lists and evening functions in winter, but you will need a backup plan for rain and cold.",
      "Resorts bring stay, food and ceremony into one place, which is convenient when many guests are travelling.",
    ]},
  { id: 4, cat: "Planning", title: "A 6-Month Wedding Planning Timeline", date: "8 Sep 2026", mins: 7,
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200",
    excerpt: "What to book, and when, from the venue and date down to the final guest count.",
    body: [
      "Six months out, fix your budget, guest estimate and venue. Good dates in the wedding season are booked early.",
      "Four months out, confirm catering, photographer and decoration. Three months out, order clothing and send the first invitations.",
      "In the final month, confirm every vendor in writing, finalise the guest count and plan the day's schedule hour by hour.",
    ]},
  { id: 5, cat: "Tips", title: "10 Questions to Ask Before Booking a Venue", date: "30 Aug 2026", mins: 4,
    img: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1200",
    excerpt: "From power backup to overtime charges, the questions that save you money and stress.",
    body: [
      "Ask about power backup, parking, number of rooms, outside catering rules, music timings and the closing time.",
      "Ask what happens if it rains, what the cancellation policy is, and whether the advance is refundable.",
      "Note every answer and ask for it in writing before you pay.",
    ]},
  { id: 6, cat: "Budget", title: "Smart Ways to Save on Your Wedding Without Cutting Corners", date: "21 Aug 2026", mins: 5,
    img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200",
    excerpt: "Off-peak dates, flexible timings and smaller guest lists can lower costs a lot.",
    body: [
      "Weekday and off-peak dates often cost less. Ask venues about their quieter periods.",
      "Trim the guest list first, since every guest adds to catering, seating and decoration.",
      "Choose a venue that already looks good, so you spend less on decoration.",
    ]},
];

const CATS = ["All", ...Array.from(new Set(POSTS.map((p) => p.cat)))];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap');
.bl{--maroon:#6b1a2a;--gold:#c9962b;--ivory:#faf6f1;--ink:#2a1a1a;--soft:#6f5d5d;--line:#eadfd2;--tint:#f6ede3;font-family:'Poppins',system-ui,sans-serif;background:var(--ivory);color:var(--ink);min-height:100vh}
.bl *{box-sizing:border-box}
.bl-hero{background:var(--maroon);color:#fff;padding:52px 20px 56px;border-bottom:4px solid var(--gold)}
.bl-in{max-width:1120px;margin:0 auto}
.bl-hero h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(30px,5vw,44px);margin:0 0 10px}
.bl-hero p{margin:0;max-width:56ch;line-height:1.7;font-size:15px;color:#f0dfe2}
.bl-main{max-width:1120px;margin:0 auto;padding:32px 20px 72px}
.bl-bar{display:flex;gap:12px;justify-content:space-between;flex-wrap:wrap;margin-bottom:28px}
.bl-pills{display:flex;gap:8px;flex-wrap:wrap}
.bl-pill{border:1px solid #d9c9b8;background:#fff;border-radius:999px;padding:8px 16px;font:500 14px 'Poppins',sans-serif;color:var(--ink);cursor:pointer}
.bl-pill.on{background:var(--maroon);border-color:var(--maroon);color:#fff}
.bl-search{border:1px solid #d9c9b8;border-radius:999px;padding:9px 18px;font:400 14px 'Poppins',sans-serif;min-width:240px;background:#fff}
.bl :is(button,input,a):focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.bl-feat{display:grid;grid-template-columns:1.2fr 1fr;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 4px 22px rgba(107,26,42,.1);margin-bottom:36px;cursor:pointer;border:0;text-align:left;width:100%;padding:0;font:inherit;color:inherit}
.bl-feat img{width:100%;height:100%;min-height:300px;object-fit:cover;display:block;background:var(--tint)}
.bl-feat-b{padding:34px;display:flex;flex-direction:column;justify-content:center;gap:12px}
.bl-feat-b h2{font-family:'Playfair Display',Georgia,serif;font-size:28px;line-height:1.25;margin:0;color:var(--maroon)}
.bl-cat{font-size:13px;font-weight:600;color:var(--gold)}
.bl-ex{margin:0;font-size:15px;line-height:1.7;color:#4a3a3a}
.bl-meta{font-size:13px;color:var(--soft)}
.bl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:26px}
.bl-card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 14px rgba(107,26,42,.08);display:flex;flex-direction:column;cursor:pointer;border:0;text-align:left;padding:0;font:inherit;color:inherit}
.bl-card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;background:var(--tint)}
.bl-card-b{padding:18px 20px 22px;display:flex;flex-direction:column;gap:8px;flex:1}
.bl-card h3{margin:0;font-family:'Playfair Display',Georgia,serif;font-size:19px;line-height:1.3;color:var(--ink)}
.bl-card:hover h3,.bl-feat:hover h2{text-decoration:underline;text-decoration-color:var(--gold);text-underline-offset:4px}
.bl-card .bl-meta{margin-top:auto;padding-top:6px}
.bl-empty{padding:48px 0;color:var(--soft);text-align:center}
.bl-art{max-width:720px;margin:0 auto;padding:32px 20px 72px}
.bl-back{border:1.5px solid var(--maroon);background:#fff;color:var(--maroon);border-radius:10px;padding:9px 16px;font:600 13.5px 'Poppins',sans-serif;cursor:pointer;margin-bottom:28px}
.bl-back:hover{background:var(--maroon);color:#fff}
.bl-art h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,5vw,40px);line-height:1.2;color:var(--maroon);margin:8px 0 12px}
.bl-art img{width:100%;border-radius:16px;margin:24px 0;display:block;background:var(--tint)}
.bl-art p{font-size:17px;line-height:1.85;color:#3d2c2c;margin:0 0 18px}
.bl-cta{margin-top:36px;padding:22px 24px;background:var(--tint);border-left:4px solid var(--gold);border-radius:0 12px 12px 0}
.bl-cta b{display:block;margin-bottom:4px;color:var(--maroon)}
.bl-cta span{font-size:14.5px;color:#4a3a3a}
@media (max-width:820px){.bl-feat{grid-template-columns:1fr}.bl-feat img{min-height:220px}.bl-feat-b{padding:22px}.bl-search{width:100%}}
`;

const Meta = ({ p }) => <div className="bl-meta">{p.date} | {p.mins} min read</div>;

export default function Blog() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);

  const list = useMemo(
    () =>
      POSTS.filter(
        (p) =>
          (cat === "All" || p.cat === cat) &&
          (p.title + p.excerpt).toLowerCase().includes(q.trim().toLowerCase())
      ),
    [cat, q]
  );
  const [feat, ...rest] = list;
  const post = POSTS.find((p) => p.id === open);

  if (post) {
    return (
      <div className="bl">
        <style>{css}</style>
        <article className="bl-art">
          <button className="bl-back" onClick={() => { setOpen(null); window.scrollTo(0, 0); }}>Back to all articles</button>
          <div className="bl-cat">{post.cat}</div>
          <h1>{post.title}</h1>
          <Meta p={post} />
          <img src={post.img} alt={post.title} />
          {post.body.map((t, i) => <p key={i}>{t}</p>)}
          <div className="bl-cta">
            <b>Looking for a venue?</b>
            <span>Browse banquet halls, lawns, resorts and gardens in Etawah on Shubhlagun Mart.</span>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="bl">
      <style>{css}</style>
      <header className="bl-hero">
        <div className="bl-in">
          <h1>Wedding planning, made simple</h1>
          <p>Practical guides on venues, budgets and timelines from the Shubhlagun Mart team.</p>
        </div>
      </header>

      <div className="bl-main">
        <div className="bl-bar">
          <div className="bl-pills">
            {CATS.map((c) => (
              <button key={c} className={"bl-pill" + (c === cat ? " on" : "")} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <input className="bl-search" type="search" placeholder="Search articles" aria-label="Search articles" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        {!feat && <div className="bl-empty">No articles match your search. Try a different word or category.</div>}

        {feat && (
          <button className="bl-feat" onClick={() => setOpen(feat.id)}>
            <img src={feat.img} alt="" />
            <div className="bl-feat-b">
              <span className="bl-cat">{feat.cat}</span>
              <h2>{feat.title}</h2>
              <p className="bl-ex">{feat.excerpt}</p>
              <Meta p={feat} />
            </div>
          </button>
        )}

        <div className="bl-grid">
          {rest.map((p) => (
            <button key={p.id} className="bl-card" onClick={() => setOpen(p.id)}>
              <img src={p.img} alt="" loading="lazy" />
              <div className="bl-card-b">
                <span className="bl-cat">{p.cat}</span>
                <h3>{p.title}</h3>
                <p className="bl-ex">{p.excerpt}</p>
                <Meta p={p} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}