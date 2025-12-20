import React, { useEffect, useState } from "react";
import { getGoals, deleteGoal } from "../api/goalService";
import "./DashboardGoals.css";
import { useNavigate } from "react-router-dom";

export default function DashboardGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadGoals = async () => {
    try {
      const res = await getGoals();
      setGoals(res.data || []);
    } catch (err) {
      console.error("Error fetching goals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this goal?")) return;
    await deleteGoal(id);
    loadGoals();
  };

  const calcProgress = (g) => {
    if (!g.target || g.target === 0) return 0;
    return Math.min(100, (g.currentSaved / g.target) * 100);
  };

  if (loading) return <div className="dg-loading">Loading goals...</div>;

  return (
    <div className="dg-container">
      <div className="dg-header">
        <h2>Your Goals</h2>
        <button className="dg-add" onClick={() => navigate("/goalwizard")}>
          + New Goal
        </button>
      </div>

      {goals.length === 0 && (
        <div className="dg-empty">No goals yet. Create your first goal!</div>
      )}

      <div className="dg-grid">
        {goals.map((g) => {
          const progress = calcProgress(g);

          return (
            <div className="dg-card" key={g.id}>
              <div className="dg-card-header">
                <h3 className="dg-title">{g.name}</h3>
                <button
                  className="dg-delete"
                  onClick={() => handleDelete(g.id)}
                >
                  ✖
                </button>
              </div>

              <div className="dg-card-stats">
                <div className="stat">
                  <small>Target</small>
                  <span>₹{g.target.toLocaleString("en-IN")}</span>
                </div>
                <div className="stat">
                  <small>Saved</small>
                  <span>₹{g.currentSaved.toLocaleString("en-IN")}</span>
                </div>
                <div className="stat">
                  <small>SIP</small>
                  <span>₹{g.sip}/mo</span>
                </div>
              </div>

              <div className="dg-progress-container">
                <div className="dg-progress-bar">
                  <div
                    className="dg-progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="dg-progress-text">
                  {progress.toFixed(1)}% completed
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
