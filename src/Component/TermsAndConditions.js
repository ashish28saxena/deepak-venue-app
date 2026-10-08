import { useEffect, useState } from "react";

const SUMMARY = [
  "Shubhlagun Mart helps you find and contact wedding venues. We are not the venue owner.",
  "Bookings and payments are agreed directly between you and the venue.",
  "Always confirm price, date and cancellation terms in writing before paying.",
  "Listing details come from venue owners and may change without notice.",
];

const SECTIONS = [
  { id: "acceptance", title: "Acceptance of these terms", body: [
    "By accessing or using the Shubhlagun Mart website or app (the \"Platform\"), you agree to these Terms & Conditions. If you do not agree, please do not use the Platform.",
  ]},
  { id: "about", title: "What we do", body: [
    "Shubhlagun Mart is an online directory that lets you browse banquet halls, lawns, resorts and gardens in Etawah and nearby areas, shortlist them, and contact their owners.",
    "We act only as an intermediary. Any booking, rate or service is a contract between you and the venue owner. We are not a party to it.",
  ]},
  { id: "eligibility", title: "Eligibility", body: [
    "You must be at least 18 years old and legally able to enter into a contract under Indian law to use the Platform.",
  ]},
  { id: "account", title: "Your account", list: [
    "Provide accurate details, including your name, phone number and email.",
    "Keep your login details safe. You are responsible for all activity on your account.",
    "We may suspend or close accounts that contain false or misleading information.",
  ]},
  { id: "listings", title: "Venue information", body: [
    "Photos, prices, capacity, parking, rooms and other details are supplied by venue owners. We try to keep them accurate but cannot guarantee that every detail is complete or current.",
    "Please visit the venue and confirm the rate, date and facilities in writing before you book. Where a listing says \"Contact for details\", ask the owner for the price directly.",
  ]},
  { id: "booking", title: "Bookings and payments", list: [
    "Bookings and payments are made directly with the venue owner, unless the Platform clearly offers online payment for a particular listing.",
    "Always ask for a written receipt when you pay an advance.",
    "Additional charges such as electricity, decoration, catering, cleaning and overtime are set by the venue.",
  ]},
  { id: "cancellation", title: "Cancellations and refunds", body: [
    "Each venue sets its own cancellation and refund policy. Please ask about it before you book.",
    "Shubhlagun Mart is not responsible for refunds owed by a venue. If a dispute arises, we will make reasonable efforts to help both sides communicate.",
  ]},
  { id: "owners", title: "Responsibilities of venue owners", list: [
    "Keep your listing accurate and up to date.",
    "Upload only genuine photos of your own venue.",
    "Honour confirmed bookings and do not cancel without a valid reason.",
    "Hold all licences and permissions required to run your venue, such as fire safety and music permits.",
  ]},
  { id: "conduct", title: "Acceptable use", body: [
    "You agree not to:",
  ], list: [
    "Scrape phone numbers or other data, or use them for spam.",
    "Post fake listings or reviews, or pretend to be someone else.",
    "Attempt to hack, overload or disrupt the Platform.",
    "Upload unlawful, abusive or offensive content.",
  ]},
  { id: "reviews", title: "Ratings and reviews", body: [
    "Reviews should reflect your genuine experience. We may remove content that is abusive, false or contains personal information.",
  ]},
  { id: "ip", title: "Intellectual property", body: [
    "The Shubhlagun Mart name, logo, design and content belong to us. You may not copy or use them commercially without our written permission.",
  ]},
  { id: "liability", title: "Limitation of liability", body: [
    "To the extent permitted by law, Shubhlagun Mart is not liable for the quality of any venue, for booking disputes, or for any loss, damage or injury that occurs at or because of a venue. Our liability, where it exists, is limited to the maximum extent the law allows.",
  ]},
  { id: "privacy", title: "Your data", body: [
    "We handle your personal information as described in our Privacy Policy. When you tap \"View Phone Number\", the venue owner may be told that you viewed their number.",
  ]},
  { id: "changes", title: "Changes to these terms", body: [
    "We may update these terms from time to time. Changes take effect when posted on this page. Continuing to use the Platform after a change means you accept the updated terms.",
  ]},
  { id: "law", title: "Governing law", body: [
    "These terms are governed by the laws of India. Courts in Etawah, Uttar Pradesh have jurisdiction over any dispute.",
  ]},
  { id: "contact", title: "Contact us", body: [
    "Questions about these terms? Write to support@shubhlagunmart.com or call +91 8630955571",
  ]},
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap');
:root{--maroon:#6b1a2a;--maroon-d:#4d1220;--gold:#c9962b;--ivory:#faf6f1;--ink:#2a1a1a;--soft:#6f5d5d;--line:#eadfd2;--tint:#f6ede3}
.tc{font-family:'Poppins',system-ui,sans-serif;background:var(--ivory);color:var(--ink);min-height:100vh}
.tc *{box-sizing:border-box}
.tc-hero{background:var(--maroon);color:#fff;padding:56px 20px 88px;border-bottom:4px solid var(--gold)}
.tc-in{max-width:1080px;margin:0 auto}
.tc-hero h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(30px,5vw,46px);font-weight:700;margin:0 0 12px;letter-spacing:.2px}
.tc-hero p{margin:0;max-width:58ch;font-size:15px;line-height:1.7;color:#f0dfe2}
.tc-meta{margin-top:18px;font-size:13px;color:#e3c9a0}
.tc-main{max-width:1080px;margin:-48px auto 0;padding:0 20px 72px}
.tc-sum{background:#fff;border:1px solid var(--line);border-top:4px solid var(--gold);border-radius:14px;padding:22px 26px;box-shadow:0 8px 30px rgba(77,18,32,.1)}
.tc-sum h2{margin:0 0 10px;font-size:16px;font-weight:600;color:var(--maroon)}
.tc-sum ul{margin:0;padding-left:20px}
.tc-sum li{font-size:14.5px;line-height:1.7;margin-bottom:4px;max-width:80ch}
.tc-sum li::marker{color:var(--gold)}
.tc-grid{display:grid;grid-template-columns:250px minmax(0,1fr);gap:48px;margin-top:40px;align-items:start}
.tc-toc{position:sticky;top:16px;max-height:calc(100vh - 32px);overflow:auto;padding-right:8px}
.tc-toc h3{margin:0 0 10px;font-size:13px;font-weight:600;color:var(--soft)}
.tc-toc a{display:block;padding:7px 12px;font-size:13.5px;color:var(--soft);text-decoration:none;border-left:2px solid var(--line);transition:color .15s,border-color .15s}
.tc-toc a:hover{color:var(--maroon)}
.tc-toc a.on{color:var(--maroon);font-weight:600;border-left-color:var(--gold);background:linear-gradient(90deg,var(--tint),transparent)}
.tc-toc a:focus-visible,.tc-print:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.tc-sec{padding:26px 0;border-bottom:1px solid var(--line);scroll-margin-top:16px}
.tc-sec:first-child{padding-top:0}
.tc-sec h2{display:flex;gap:14px;align-items:baseline;margin:0 0 12px;font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:600;color:var(--maroon)}
.tc-num{font-family:'Poppins',sans-serif;font-size:13px;font-weight:600;color:var(--gold);min-width:24px}
.tc-sec p,.tc-sec li{font-size:15.5px;line-height:1.8;color:#3d2c2c;max-width:68ch}
.tc-sec p{margin:0 0 10px;padding-left:38px}
.tc-sec ul{margin:0;padding-left:60px}
.tc-sec li{margin-bottom:6px}
.tc-sec li::marker{color:var(--gold)}
.tc-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-top:28px;font-size:13.5px;color:var(--soft)}
.tc-print{border:1.5px solid var(--maroon);background:#fff;color:var(--maroon);border-radius:10px;padding:10px 18px;font:600 13.5px 'Poppins',sans-serif;cursor:pointer}
.tc-print:hover{background:var(--maroon);color:#fff}
@media (max-width:860px){
  .tc-grid{grid-template-columns:1fr;gap:24px}
  .tc-toc{position:static;max-height:none;display:flex;gap:6px;overflow-x:auto;padding:0 0 8px}
  .tc-toc h3{display:none}
  .tc-toc a{white-space:nowrap;border-left:0;border-bottom:2px solid var(--line);padding:8px 10px}
  .tc-toc a.on{border-bottom-color:var(--gold);background:none}
  .tc-sec p{padding-left:0}
  .tc-sec ul{padding-left:22px}
  .tc-hero{padding:40px 20px 72px}
}
@media print{.tc-toc,.tc-print{display:none}.tc-grid{display:block}.tc-hero{background:#fff;color:#000;border-bottom:1px solid #000}.tc-hero p,.tc-meta{color:#000}}
@media (prefers-reduced-motion:reduce){.tc-toc a{transition:none}}
`;

export default function TermsAndConditions() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-10% 0px -75% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  return (
    <div className="tc">
      <style>{css}</style>

      <header className="tc-hero">
        <div className="tc-in">
          <h1>Terms &amp; Conditions</h1>
          <p>
            Please read these terms before using Shubhlagun Mart to find, shortlist or
            contact wedding venues.
          </p>
          <div className="tc-meta">Last updated: 8 October 2026</div>
        </div>
      </header>

      <div className="tc-main">
        <aside className="tc-sum" aria-label="Summary">
          <h2>The short version</h2>
          <ul>
            {SUMMARY.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </aside>

        <div className="tc-grid">
          <nav className="tc-toc" aria-label="Table of contents">
            <h3>On this page</h3>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={active === s.id ? "on" : ""}
                aria-current={active === s.id ? "true" : undefined}
                onClick={(e) => go(e, s.id)}
              >
                {s.title}
              </a>
            ))}
          </nav>

          <main>
            {SECTIONS.map((s, i) => (
              <section key={s.id} id={s.id} className="tc-sec">
                <h2>
                  <span className="tc-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body && s.body.map((p, k) => <p key={k}>{p}</p>)}
                {s.list && (
                  <ul>
                    {s.list.map((l, k) => (
                      <li key={k}>{l}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <div className="tc-foot">
              <span>By using the Platform, you agree to these terms.</span>
              <button className="tc-print" onClick={() => window.print()}>
                Print this page
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}