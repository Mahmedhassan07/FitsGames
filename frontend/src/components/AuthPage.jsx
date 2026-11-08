import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "https://api.fitsgames.com/v2";

const CATEGORY_CHIPS = [
  "ARCADE", "PUZZLE", "IQ", "SHOOTING", "ADVENTURE", "EDUCATIONAL",
  "RACING", "STRATEGY", "PHYSICS", "SPORTS", "LEISURE", "CASUAL",
];

export default function AuthPage() {
    const {user,login} = useContext(AuthContext);
    const [mode, setMode] = useState("login");
    const [contactType, setContactType] = useState("email"); // "email" | "phone"
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = mode === "login" ? "/auth/login" : "/auth/register";

    // Build payload based on contactType — never send both
    const contactPayload = contactType === "email"
      ? { email: form.email }
      : { phoneNumber: form.phone };

    const payload =
      mode === "login"
        ? { ...contactPayload, password: form.password }
        : { name: form.name, ...contactPayload, password: form.password };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }

      if (mode === "login") {
        let user;
        try {
            const res = await fetch(`${API_BASE}/auth/me`, {
                headers: { Authorization: `Bearer ${data.token}` }
            });
            if (!res.ok) throw new Error("Invalid Session");
            user = await res.json();
            console.log(user);
        } catch(err) {
            console.log(err);
            setError(err.message);
        }

        login(user, data.token);
        navigate("/");
      } else {
        setMode("login");
        setForm((f) => ({ ...f, password: "" }));
      }
    } catch (err) {
      setError("Could not reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&display=swap');

        .auth-page {
          --bg: #0b0f17;
          --surface: #141a24;
          --surface-2: #1b2330;
          --accent: #38c6f4;
          --accent-dim: #38c6f433;
          --text: #f2f4f7;
          --text-dim: #8b93a1;
          --border: #232b39;
          --danger: #ef4444;

          min-height: 100vh;
          width: 100%;
          background: var(--bg);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          padding: 24px;
        }

        .marquee-layer {
          position: absolute;
          inset: -10% -10%;
          display: flex;
          flex-direction: column;
          gap: 28px;
          transform: rotate(-8deg);
          opacity: 0.5;
          pointer-events: none;
        }

        .marquee-row {
          display: flex;
          gap: 14px;
          white-space: nowrap;
          animation: scroll-x 38s linear infinite;
        }

        .marquee-row.reverse {
          animation-direction: reverse;
          animation-duration: 44s;
        }

        @keyframes scroll-x {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .chip {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.14em;
          color: var(--accent);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 8px 18px;
          flex-shrink: 0;
        }

        .auth-page::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, var(--bg) 78%);
        }

        .card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 420px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px 36px 32px;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6);
        }

        .wordmark {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: var(--text);
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }

        .wordmark span { color: var(--accent); }

        .subtitle {
          font-size: 13px;
          color: var(--text-dim);
          margin-bottom: 28px;
        }

        .tabs {
          display: flex;
          background: var(--surface-2);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 28px;
        }

        .tab {
          flex: 1;
          text-align: center;
          padding: 10px 0;
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.02em;
          color: var(--text-dim);
          border-radius: 9px;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
          border: none;
          background: transparent;
        }

        .tab.active {
          color: var(--bg);
          background: var(--accent);
        }

        .field {
          margin-bottom: 16px;
        }

        .field-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .field label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-dim);
        }

        .contact-toggle {
          display: flex;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 2px;
          gap: 2px;
        }

        .contact-toggle button {
          padding: 4px 10px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          background: transparent;
          color: var(--text-dim);
          transition: background 0.15s ease, color 0.15s ease;
        }

        .contact-toggle button.active {
          background: var(--accent);
          color: var(--bg);
        }

        .field input {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 14px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: var(--text);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          box-sizing: border-box;
        }

        .field input::placeholder { color: #4d5566; }

        .field input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-dim);
        }

        .error-box {
          background: #2a1418;
          border: 1px solid #4a1f26;
          color: #fca5a5;
          font-size: 13px;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }

        .submit-btn {
          width: 100%;
          background: var(--accent);
          color: var(--bg);
          border: none;
          border-radius: 10px;
          padding: 13px 0;
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.02em;
          cursor: pointer;
          margin-top: 8px;
          transition: filter 0.15s ease, transform 0.1s ease;
        }

        .submit-btn:hover { filter: brightness(1.08); }
        .submit-btn:active { transform: scale(0.99); }
        .submit-btn:disabled { opacity: 0.6; cursor: default; }

        .switch-line {
          text-align: center;
          font-size: 13px;
          color: var(--text-dim);
          margin-top: 20px;
        }

        .switch-line button {
          background: none;
          border: none;
          color: var(--accent);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          padding: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-row { animation: none; }
        }
      `}</style>

      <div className="marquee-layer" aria-hidden="true">
        <div className="marquee-row">
          {[...CATEGORY_CHIPS, ...CATEGORY_CHIPS].map((c, i) => (
            <span className="chip" key={`a${i}`}>{c}</span>
          ))}
        </div>
        <div className="marquee-row reverse">
          {[...CATEGORY_CHIPS, ...CATEGORY_CHIPS].reverse().map((c, i) => (
            <span className="chip" key={`b${i}`}>{c}</span>
          ))}
        </div>
        <div className="marquee-row">
          {[...CATEGORY_CHIPS, ...CATEGORY_CHIPS].map((c, i) => (
            <span className="chip" key={`c${i}`}>{c}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="wordmark">Fits<span>Games</span></div>
        <div className="subtitle">
          {mode === "login" ? "Sign in to keep playing." : "Create an account to get started."}
        </div>

        <div className="tabs">
          <button
            type="button"
            className={`tab ${mode === "login" ? "active" : ""}`}
            onClick={() => { setMode("login"); setError(""); }}
          >
            LOG IN
          </button>
          <button
            type="button"
            className={`tab ${mode === "register" ? "active" : ""}`}
            onClick={() => { setMode("register"); setError(""); }}
          >
            REGISTER
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>
          )}

          {/* Email / Phone field with toggle */}
          <div className="field">
            <div className="field-label-row">
              <label htmlFor="contact">
                {contactType === "email" ? "Email" : "Phone Number"}
              </label>
              <div className="contact-toggle">
                <button
                  type="button"
                  className={contactType === "email" ? "active" : ""}
                  onClick={() => { setContactType("email"); setError(""); }}
                >
                  Email
                </button>
                <button
                  type="button"
                  className={contactType === "phone" ? "active" : ""}
                  onClick={() => { setContactType("phone"); setError(""); }}
                >
                  Phone
                </button>
              </div>
            </div>

            {contactType === "email" ? (
              <input
                id="contact"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            ) : (
              <input
                id="contact"
                type="tel"
                placeholder="+1 234 567 8900"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            )}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <div className="switch-line">
          {mode === "login" ? (
            <>New here? <button onClick={() => setMode("register")}>Create an account</button></>
          ) : (
            <>Already have an account? <button onClick={() => setMode("login")}>Log in</button></>
          )}
        </div>
      </div>
    </div>
  );
}