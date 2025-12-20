// src/components/DashboardGoals.jsx
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
      setLoading(true);
      const res = await getGoals();
      setGoals(res.data || []);
    } catch (err) {
      console.error("Error fetching goals:", err);
      alert("Could not load goals. Is the backend running?");
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
    if (!g || !g.target) return 0;
    // progress based on currentSaved; cap at 100
    return Math.min(100, ((Number(g.currentSaved || 0) / Number(g.target)) * 100));
  };

  if (loading) return <div className="dg-loading">Loading goals...</div>;

  return (
    <div className="dg-container">
      <div className="dg-header">
        <h2>Your Goals</h2>
        <button onClick={() => navigate("/goalwizard")} className="dg-add">+ New Goal</button>
      </div>

      {goals.length === 0 && (
        <div className="dg-empty">
          <p>No goals yet. Click “New Goal” to create one.</p>
        </div>
      )}

      <div className="dg-grid">
        {goals.map((g) => {
          const progress = calcProgress(g);
          return (
            <div className="dg-card" key={g._id}>
              <div className="dg-card-header">
                <h3>{g.name}</h3>
                <div className="dg-actions">
                  <button onClick={() => navigate(`/goal/${g._id}`)} className="dg-btn">View</button>
                  <button onClick={() => handleDelete(g._id)} className="dg-btn danger">Delete</button>
                </div>
              </div>

              <div className="dg-stats">
                <div><small>Target</small><div>₹{Number(g.target).toLocaleString("en-IN")}</div></div>
                <div><small>Saved</small><div>₹{Number(g.currentSaved).toLocaleString("en-IN")}</div></div>
                <div><small>SIP</small><div>₹{Number(g.sip).toLocaleString("en-IN")}/mo</div></div>
              </div>

              <div className="dg-progress">
                <div className="dg-progress-bar">
                  <div className="dg-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="dg-progress-text">{progress.toFixed(1)}% completed</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
