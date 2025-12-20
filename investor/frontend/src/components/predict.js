import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./pridict.css";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

const Home = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [age, setAge] = useState("");
  const [risk, setRisk] = useState(3);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!income || !expenses || !age) {
      setError("⚠️ Please fill all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5500/predict", {
        income: parseFloat(income),
        expenses: parseFloat(expenses),
        age: parseInt(age),
        risk: parseInt(risk),
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Prediction failed.");
    }

    setLoading(false);
  };

  const chartData =
    result?.allocation
      ? [
          { name: "SIP (Mutual Funds)", value: result.allocation.SIP },
          { name: "Fixed Deposits", value: result.allocation.FD },
          { name: "Stocks/Equity", value: result.allocation.Stocks },
        ]
      : [];

  return (
    <div className="dash-wrap">
      <h1 className="dash-title">Smart Investment Planner</h1>

      {/* Buttons */}
      <div className="card-grid">
        <Link to="/GoalWizard" className="card"><h3>📈 Goal Wizard</h3></Link>
        <Link to="/analytics" className="card"><h3>📉 Analytics</h3></Link>
        <Link to="/dashboard" className="card"><h3>🧭 Dashboard</h3></Link>
      </div>

      {/* Inputs */}
      <div className="card input-section">
        <h3>Enter Your Investment Details</h3>

        <div className="input-grid">
          <input className="inp" type="number" placeholder="💰 Income" value={income} onChange={(e) => setIncome(e.target.value)} />
          <input className="inp" type="number" placeholder="💸 Expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
          <input className="inp" type="number" placeholder="🎂 Age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <label className="risk-label">Risk Level: {risk}</label>
        <input type="range" min="1" max="5" value={risk} onChange={(e) => setRisk(e.target.value)} className="slider" />

        <button className="submit-btn" onClick={handlePredict} disabled={loading}>
          {loading ? "Processing..." : "✨ Get Recommendation"}
        </button>

        {error && <p className="err-box">{error}</p>}
      </div>

      {/* OUTPUT */}
      {result && (
        <>
          {/* Result Summary Cards */}
          <div className="card-grid">
            <div className="card">
              <h3>💼 SIP</h3>
              <p>₹{result.allocation.SIP.toFixed(0)}</p>
            </div>
            <div className="card">
              <h3>🏦 Fixed Deposits</h3>
              <p>₹{result.allocation.FD.toFixed(0)}</p>
            </div>
            <div className="card">
              <h3>📊 Stocks</h3>
              <p>₹{result.allocation.Stocks.toFixed(0)}</p>
            </div>
            <div className="card">
              <h3>Total Investment</h3>
              <p>₹{result.allocation.Total.toFixed(0)}</p>
            </div>
          </div>

          {/* Chart + AI Insights */}
          <div className="chart-grid">

            {/* PIE CHART */}
            <div className="chart-box">
              <h3>Investment Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={95}
                    label
                  >
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* AI INSIGHTS */}
            <div className="chart-box">
              <h3>🤖 Smart Investment Tip</h3>
              <p className="ai-msg">{result.advice}</p>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Home;
