import React, { useEffect, useState } from "react";
import axios from "axios";
import TopicCard from "./TopicCard";
import "./LearningHub.css";

export default function LearningHub() {
  const [topics, setTopics] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("all");

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lh_bookmarks") || "[]");
    } catch {
      return [];
    }
  });

  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    localStorage.setItem("lh_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  async function fetchTopics() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://127.0.0.1:5500/learning-hub");
      setTopics(res.data.topics || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load learning content. Check backend or network.");
    }
    setLoading(false);
  }

  function toggleBookmark(title) {
    setBookmarks((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  }

  function filteredTopics() {
    let list = topics;

    if (difficulty !== "all")
      list = list.filter((t) => t.level === difficulty);

    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter((t) =>
        (t.title + " " + t.description + " " + (t.details || "")).toLowerCase().includes(term)
      );
    }

    return list;
  }

  return (
    <div className="lh-container">

      {/* ----------------------------- */}
      {/* HERO SECTION */}
      {/* ----------------------------- */}
      <header className="lh-hero">
        <div className="hero-left">
          <h1>📘 Investment Learning Hub</h1>
          <p className="muted">Master investing step-by-step with simple lessons, examples, tips & visuals.</p>
          <p className="highlight-text">Start small • Learn fast • Invest smart • Grow wealth</p>
        </div>

        <div className="lh-hero-actions">
          <input
            placeholder="Search: SIP, mutual funds, stock market…"
            className="lh-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select
            className="lh-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <button className="btn" onClick={() => { setQ(""); fetchTopics(); }}>
            Refresh
          </button>
        </div>
      </header>


      {/* ----------------------------- */}
      {/* LEARNING CATEGORIES */}
      {/* ----------------------------- */}
      <section className="category-section">
        <h2>📂 Learning Categories</h2>
        <div className="category-grid">
          <div className="cat-card">⭐ Mutual Funds</div>
          <div className="cat-card">📈 Stock Market Basics</div>
          <div className="cat-card">🟢 SIP & Wealth Building</div>
          <div className="cat-card">🛡 Risk Management</div>
          <div className="cat-card">🏦 Safe Investments</div>
          <div className="cat-card">👨‍🎓 Beginner Roadmap</div>
        </div>
      </section>


      {/* ----------------------------- */}
      {/* ROADMAP */}
      {/* ----------------------------- */}
      <section className="roadmap-section">
        <h2>🧭 Learning Roadmap</h2>

        <div className="roadmap">
          <div className="step">1. Start with Basics</div>
          <div className="arrow">→</div>

          <div className="step">2. Understand Markets</div>
          <div className="arrow">→</div>

          <div className="step">3. Build Strategy</div>
          <div className="arrow">→</div>

          <div className="step">4. Begin Investing</div>
          <div className="arrow">→</div>

          <div className="step">5. Track & Improve</div>
          <div className="arrow">→</div>

          <div className="step">6. Grow Wealth</div>
        </div>
      </section>


      {/* ----------------------------- */}
      {/* SIDE + TOPICS  */}
      {/* ----------------------------- */}
      <main className="lh-main">

      
        {/* TOPIC LIST */}
        <section className="lh-list">
          {loading && <p className="muted">Loading…</p>}
          {error && <p className="error">{error}</p>}

          {!loading && filteredTopics().length === 0 && (
            <p className="muted">No topics found.</p>
          )}

          <div className="grid">
            {filteredTopics().map((t, idx) => (
              <TopicCard
                key={t.title || idx}
                topic={{ ...t, id: idx }}
                onBookmark={() => toggleBookmark(t.title)}
                bookmarked={bookmarks.includes(t.title)}
                expanded={expandedId === idx}
                onToggleExpand={() => setExpandedId(expandedId === idx ? null : idx)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="lh-footer">
        <small>📘 SmartInvest Learning Hub — Learn • Invest • Grow</small>
      </footer>
    </div>
  );
}
