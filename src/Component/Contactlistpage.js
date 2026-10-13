import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api/contact";

const STATUS_STYLES = {
  new: { bg: "#e6f0ff", fg: "#1d4ed8" },
  read: { bg: "#fef3c7", fg: "#92400e" },
  resolved: { bg: "#dcfce7", fg: "#166534" },
};

const formatDate = (iso) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function ContactListPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [openId, setOpenId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Server error (${res.status})`);
      const json = await res.json();
      setContacts(json.data || []);
    } catch (e) {
      setError(e.message || "Could not load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const statuses = useMemo(
    () => ["all", ...new Set(contacts.map((c) => c.status))],
    [contacts]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return contacts.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      if (!q) return true;
      return [c.fullName, c.email, c.mobileNumber, c.subject, c.message]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [contacts, search, status]);

  return (
    <div className="cl-wrap">
      <style>{css}</style>

      <header className="cl-head">
        <div>
          <h1>Contact requests</h1>
          <p>{loading ? "Loading…" : `${filtered.length} of ${contacts.length} shown`}</p>
        </div>
        <button className="cl-btn" onClick={load} disabled={loading}>
          Refresh
        </button>
      </header>

      <div className="cl-filters">
        <input
          type="search"
          placeholder="Search name, email, phone or subject"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All statuses" : s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="cl-state cl-error">
          {error}. Check that the API is running on port 5000.
          <button className="cl-btn" onClick={load}>Try again</button>
        </div>
      )}

      {!error && !loading && filtered.length === 0 && (
        <div className="cl-state">No contact requests match your filters.</div>
      )}

      {!error && filtered.length > 0 && (
        <div className="cl-table">
          <div className="cl-row cl-th">
            <span>Name</span>
            <span>Contact</span>
            <span>Subject</span>
            <span>Received</span>
            <span>Status</span>
          </div>

          {filtered.map((c) => {
            const open = openId === c._id;
            const s = STATUS_STYLES[c.status] || { bg: "#eee", fg: "#333" };
            return (
              <div key={c._id} className={`cl-item ${open ? "is-open" : ""}`}>
                <button
                  className="cl-row cl-main"
                  onClick={() => setOpenId(open ? null : c._id)}
                  aria-expanded={open}
                >
                  <span className="cl-name" data-label="Name">{c.fullName}</span>
                  <span data-label="Contact">
                    {c.mobileNumber}
                    <small>{c.email}</small>
                  </span>
                  <span data-label="Subject">{c.subject}</span>
                  <span data-label="Received">{formatDate(c.createdAt)}</span>
                  <span data-label="Status">
                    <em className="cl-badge" style={{ background: s.bg, color: s.fg }}>
                      {c.status}
                    </em>
                  </span>
                </button>

                {open && (
                  <div className="cl-detail">
                    <h3>Message</h3>
                    <p>{c.message}</p>
                    <div className="cl-actions">
                      <a className="cl-btn" href={`tel:${c.mobileNumber}`}>Call</a>
                      <a
                        className="cl-btn"
                        href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}`}
                      >
                        Reply by email
                      </a>
                      <a
                        className="cl-btn"
                        href={`https://wa.me/91${c.mobileNumber}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const css = `
.cl-wrap{max-width:1100px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#1f2430}
.cl-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px}
.cl-head h1{margin:0;font-size:24px}
.cl-head p{margin:4px 0 0;color:#667085;font-size:14px}
.cl-filters{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap}
.cl-filters input,.cl-filters select{padding:10px 12px;border:1px solid #d0d5dd;border-radius:8px;font-size:14px;background:#fff;color:inherit}
.cl-filters input{flex:1;min-width:220px}
.cl-btn{display:inline-block;padding:8px 14px;border:1px solid #d0d5dd;border-radius:8px;background:#fff;color:#1f2430;font-size:14px;cursor:pointer;text-decoration:none}
.cl-btn:hover{background:#f4f5f7}
.cl-btn:focus-visible,.cl-main:focus-visible{outline:2px solid #1d4ed8;outline-offset:2px}
.cl-state{padding:32px;text-align:center;color:#667085;border:1px dashed #d0d5dd;border-radius:10px;display:flex;flex-direction:column;gap:12px;align-items:center}
.cl-error{color:#b42318;border-color:#fda29b;background:#fef3f2}
.cl-table{border:1px solid #e4e7ec;border-radius:10px;overflow:hidden;background:#fff}
.cl-row{display:grid;grid-template-columns:1.2fr 1.6fr 1.4fr 1.2fr .7fr;gap:12px;align-items:center;padding:14px 16px;text-align:left}
.cl-th{background:#f9fafb;font-size:13px;font-weight:600;color:#667085;border-bottom:1px solid #e4e7ec}
.cl-item{border-bottom:1px solid #e4e7ec}
.cl-item:last-child{border-bottom:0}
.cl-main{width:100%;border:0;background:none;font:inherit;color:inherit;cursor:pointer}
.cl-main:hover,.is-open .cl-main{background:#f9fafb}
.cl-main small{display:block;color:#667085;font-size:12px;margin-top:2px;overflow-wrap:anywhere}
.cl-name{font-weight:600}
.cl-badge{font-style:normal;font-size:12px;font-weight:600;padding:3px 10px;border-radius:999px;text-transform:capitalize}
.cl-detail{padding:4px 16px 18px;background:#f9fafb}
.cl-detail h3{margin:0 0 6px;font-size:13px;color:#667085}
.cl-detail p{margin:0 0 14px;white-space:pre-wrap;line-height:1.5;max-width:70ch}
.cl-actions{display:flex;gap:8px;flex-wrap:wrap}
@media (max-width:760px){
  .cl-th{display:none}
  .cl-row{grid-template-columns:1fr;gap:6px}
  .cl-main span::before{content:attr(data-label);display:block;font-size:11px;color:#98a2b3;margin-bottom:1px}
}
@media (prefers-color-scheme:dark){
  .cl-wrap{color:#e6e8ee}
  .cl-table,.cl-filters input,.cl-filters select,.cl-btn{background:#161a22;border-color:#2b3140;color:#e6e8ee}
  .cl-th,.cl-main:hover,.is-open .cl-main,.cl-detail{background:#1c212b}
  .cl-item,.cl-th{border-color:#2b3140}
  .cl-btn:hover{background:#1c212b}
}
`;