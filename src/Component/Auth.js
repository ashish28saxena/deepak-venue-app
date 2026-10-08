import { useState } from "react";

/* ---------------- API ---------------- */
const BASE = "http://localhost:5000/api/auth";

async function post(path, body) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not connect to the server. Please check your connection.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data;
}

export async function loginApi({ email, password }) {
  const data = await post("/login", { email, password });
  // Save session details in sessionStorage
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("userId", data.user.id);
  sessionStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function signupApi({ name, username, email, password, role }) {
  return post("/signup", {
    fullName: name,
    username,
    email,
    password,
    lookingForVenue: role === "seeker",
  });
}

/* ---------------- Validation ---------------- */
const USERNAME_RE = /^[a-zA-Z0-9_]{4,20}$/;
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap');
.au{--maroon:#6b1a2a;--gold:#c9962b;--ivory:#faf6f1;--ink:#2a1a1a;--soft:#6f5d5d;--line:#d9c9b8;--err:#b3261e;font-family:'Poppins',system-ui,sans-serif;color:var(--ink);min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:var(--ivory)}
.au *{box-sizing:border-box}
.au-side{background:linear-gradient(rgba(77,18,32,.88),rgba(77,18,32,.92)),url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400') center/cover;color:#fff;padding:56px 48px;display:flex;flex-direction:column;justify-content:space-between;border-right:4px solid var(--gold)}
.au-brand{font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:700;text-decoration:none;color:#fff}
.au-side h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.4vw,40px);line-height:1.2;margin:0 0 14px}
.au-side p{margin:0;max-width:40ch;line-height:1.7;color:#f0dfe2;font-size:15px}
.au-side ul{list-style:none;margin:28px 0 0;padding:0;display:grid;gap:10px;font-size:14.5px}
.au-side li::before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--gold);margin-right:12px}
.au-main{display:flex;align-items:center;justify-content:center;padding:40px 20px}
.au-box{width:100%;max-width:420px}
.au-tabs{display:grid;grid-template-columns:1fr 1fr;border-bottom:2px solid var(--line);margin-bottom:28px}
.au-tab{background:none;border:0;padding:12px;font:600 15px 'Poppins',sans-serif;color:var(--soft);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px}
.au-tab.on{color:var(--maroon);border-bottom-color:var(--gold)}
.au h1{font-family:'Playfair Display',Georgia,serif;font-size:28px;color:var(--maroon);margin:0 0 6px}
.au-sub{margin:0 0 24px;font-size:14.5px;color:var(--soft);line-height:1.6}
.au-f{display:grid;gap:16px}
.au-l{display:grid;gap:6px;font-size:13.5px;font-weight:500}
.au-in{width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:10px;font:400 15px 'Poppins',sans-serif;background:#fff;color:var(--ink)}
.au-in[aria-invalid="true"]{border-color:var(--err)}
.au-pw{position:relative}
.au-pw .au-in{padding-right:70px}
.au-show{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:0;padding:6px 8px;font:600 13px 'Poppins',sans-serif;color:var(--maroon);cursor:pointer}
.au :is(input,button,a,select):focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.au-hint{margin:0;font-size:12.5px;color:var(--soft)}
.au-err{color:var(--err);font-size:13px;margin:0}
.au-btn{border:0;border-radius:10px;background:var(--maroon);color:#fff;padding:14px;font:600 15px 'Poppins',sans-serif;cursor:pointer}
.au-btn:hover:not(:disabled){background:#561421}
.au-btn:disabled{opacity:.6;cursor:not-allowed}
.au-link{color:var(--maroon);font:600 13.5px 'Poppins',sans-serif;text-decoration:underline;text-underline-offset:3px;background:none;border:0;padding:0;cursor:pointer}
.au-row{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.au-seg{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.au-seg label{border:1px solid var(--line);border-radius:10px;padding:11px 12px;text-align:center;font-size:13.5px;cursor:pointer;background:#fff}
.au-seg input{position:absolute;opacity:0;pointer-events:none}
.au-seg label:has(input:checked){border-color:var(--maroon);background:#f6ede3;color:var(--maroon);font-weight:600}
.au-seg label:has(input:focus-visible){outline:3px solid var(--gold);outline-offset:2px}
.au-chk{display:flex;gap:10px;align-items:flex-start;font-size:13.5px;line-height:1.5;color:var(--soft)}
.au-chk input{margin-top:3px;accent-color:var(--maroon)}
.au-chk a{color:var(--maroon);font-weight:500}
.au-done{padding:20px;border-left:4px solid var(--gold);background:#fbf3e2;border-radius:0 12px 12px 0;line-height:1.6}
.au-swap{margin-top:22px;font-size:14px;color:var(--soft);text-align:center}
@media (max-width:860px){.au{grid-template-columns:1fr}.au-side{padding:28px 24px;gap:20px;border-right:0;border-bottom:4px solid var(--gold)}.au-side ul{display:none}}
`;

function Field({ id, label, error, hint, children }) {
  return (
    <div className="au-l">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <p className="au-err" id={id + "-e"} role="alert">{error}</p> : hint ? <p className="au-hint">{hint}</p> : null}
    </div>
  );
}

function PasswordInput({ id, value, onChange, invalid, autoComplete, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="au-pw">
      <input
        id={id}
        className="au-in"
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={invalid}
      />
      <button type="button" className="au-show" onClick={() => setShow(!show)} aria-pressed={show}>
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}

function LoginForm({ onLogin, goSignup }) {
  const [f, setF] = useState({ email: "", password: "" });
  const [errs, setErrs] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!f.email.trim()) er.email = "Enter your email address.";
    else if (!isEmail(f.email.trim())) er.email = "Enter a valid email address.";
    if (!f.password) er.password = "Enter your password.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      await onLogin({ email: f.email.trim(), password: f.password });
      setDone(true);
    } catch (x) {
      setErrs({ form: x.message || "Incorrect username or password." });
    } finally {
      setBusy(false);
    }
  };

  if (done) return <div className="au-done" role="status">You are logged in. Welcome back!</div>;

  return (
    <>
      <h1>Welcome back</h1>
      <p className="au-sub">Log in with your email and password.</p>
      <form className="au-f" onSubmit={submit} noValidate>
        <Field id="l-email" label="Email" error={errs.email}>
          <input id="l-email" className="au-in" type="email" autoComplete="email" value={f.email} onChange={set("email")} aria-invalid={!!errs.email} />
        </Field>
        <Field id="l-pass" label="Password" error={errs.password}>
          <PasswordInput id="l-pass" value={f.password} onChange={set("password")} invalid={!!errs.password} autoComplete="current-password" />
        </Field>
        <div className="au-row" style={{ justifyContent: "flex-end" }}>
          <a className="au-link" href="/forgot-password">Forgot password?</a>
        </div>
        {errs.form && <p className="au-err" role="alert">{errs.form}</p>}
        <button className="au-btn" type="submit" disabled={busy}>{busy ? "Logging in..." : "Log in"}</button>
      </form>
      <p className="au-swap">New here? <button className="au-link" onClick={goSignup}>Create an account</button></p>
    </>
  );
}

function SignupForm({ onSignup, goLogin }) {
  const [f, setF] = useState({ name: "", username: "", email: "", password: "", confirm: "", role: "seeker", agree: false });
  const [errs, setErrs] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = "Enter your full name.";
    if (!USERNAME_RE.test(f.username)) er.username = "Use 4 to 20 letters, numbers or underscores.";
    if (!isEmail(f.email.trim())) er.email = "Enter a valid email address.";
    if (f.password.length < 8 || !/[a-zA-Z]/.test(f.password) || !/\d/.test(f.password))
      er.password = "Use at least 8 characters with a letter and a number.";
    if (f.confirm !== f.password) er.confirm = "Passwords do not match.";
    if (!f.agree) er.agree = "Please accept the Terms & Conditions to continue.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      await onSignup({ name: f.name.trim(), username: f.username, email: f.email.trim(), password: f.password, role: f.role });
      setDone(true);
    } catch (x) {
      setErrs({ form: x.message || "Could not create your account. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  if (done) return <div className="au-done" role="status">Your account is ready. Welcome to Shubhlagun Mart! <button className="au-link" onClick={goLogin}>Log in now</button></div>;

  return (
    <>
      <h1>Create your account</h1>
      <p className="au-sub">It takes less than a minute.</p>
      <form className="au-f" onSubmit={submit} noValidate>
        <Field id="s-name" label="Full name" error={errs.name}>
          <input id="s-name" className="au-in" autoComplete="name" value={f.name} onChange={set("name")} aria-invalid={!!errs.name} />
        </Field>
        <Field id="s-user" label="Username" error={errs.username} hint="4 to 20 letters, numbers or underscores.">
          <input id="s-user" className="au-in" autoComplete="username" value={f.username} onChange={set("username")} aria-invalid={!!errs.username} />
        </Field>
        <Field id="s-email" label="Email" error={errs.email} hint="You will use this email to log in.">
          <input id="s-email" className="au-in" type="email" autoComplete="email" value={f.email} onChange={set("email")} aria-invalid={!!errs.email} />
        </Field>
        <Field id="s-pass" label="Password" error={errs.password} hint="At least 8 characters, with a letter and a number.">
          <PasswordInput id="s-pass" value={f.password} onChange={set("password")} invalid={!!errs.password} autoComplete="new-password" />
        </Field>
        <Field id="s-conf" label="Confirm password" error={errs.confirm}>
          <PasswordInput id="s-conf" value={f.confirm} onChange={set("confirm")} invalid={!!errs.confirm} autoComplete="new-password" />
        </Field>
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 6 }}>I am</legend>
          <div className="au-seg">
            <label><input type="radio" name="role" value="seeker" checked={f.role === "seeker"} onChange={set("role")} />Looking for a venue</label>
            <label><input type="radio" name="role" value="owner" checked={f.role === "owner"} onChange={set("role")} />A venue owner</label>
          </div>
        </fieldset>
        <div>
          <label className="au-chk">
            <input type="checkbox" checked={f.agree} onChange={set("agree")} />
            <span>I agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</a>.</span>
          </label>
          {errs.agree && <p className="au-err" role="alert" style={{ marginTop: 6 }}>{errs.agree}</p>}
        </div>
        {errs.form && <p className="au-err" role="alert">{errs.form}</p>}
        <button className="au-btn" type="submit" disabled={busy}>{busy ? "Creating account..." : "Create account"}</button>
      </form>
      <p className="au-swap">Already have an account? <button className="au-link" onClick={goLogin}>Log in</button></p>
    </>
  );
}

/*
  Usage:
    <Auth />   // login ke baad apne aap "/" (home) par redirect hota hai
    <Auth onLoginSuccess={() => navigate("/")} />   // react-router se redirect chahiye to
*/
export default function Auth({
  initialTab = "login",
  onLogin = loginApi,
  onSignup = signupApi,
  onLoginSuccess,
}) {
  const [tab, setTab] = useState(initialTab);

  const handleLogin = async (values) => {
    const data = await onLogin(values);
    if (onLoginSuccess) onLoginSuccess(data);
    else window.location.assign("/"); // home page (http://localhost:3000/)
    return data;
  };

  return (
    <div className="au">
      <style>{css}</style>

      <aside className="au-side">
        <a className="au-brand" href="/">Shubhlagun Mart</a>
        <div>
          <h2>Find the right venue for your big day</h2>
          <p>Compare banquet halls, lawns, resorts and gardens in Etawah and nearby cities, and talk to owners directly.</p>
          <ul>
            <li>Shortlist venues and view them anytime</li>
            <li>See capacity, parking, rooms and price</li>
            <li>Contact venue owners without any middleman</li>
          </ul>
        </div>
        <span />
      </aside>

      <main className="au-main">
        <div className="au-box">
          <div className="au-tabs" role="tablist">
            <button role="tab" aria-selected={tab === "login"} className={"au-tab" + (tab === "login" ? " on" : "")} onClick={() => setTab("login")}>Log in</button>
            <button role="tab" aria-selected={tab === "signup"} className={"au-tab" + (tab === "signup" ? " on" : "")} onClick={() => setTab("signup")}>Sign up</button>
          </div>
          {tab === "login"
            ? <LoginForm key="l" onLogin={handleLogin} goSignup={() => setTab("signup")} />
            : <SignupForm key="s" onSignup={onSignup} goLogin={() => setTab("login")} />}
        </div>
      </main>
    </div>
  );
}