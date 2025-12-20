import React, { useState, useEffect } from "react";
import "./GoalWizard.css";
import { saveGoal } from "../api/goalService";

import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

// 🔥 FIX: Move risk mapping OUTSIDE component
const monthlyRateByRisk = {
  Low: 0.004,
  Medium: 0.008,
  High: 0.012,
};

export default function GoalWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [months, setMonths] = useState(12);
  const [currentSaved, setCurrentSaved] = useState(0);
  const [risk, setRisk] = useState("Medium");
  const [monthlyReturn, setMonthlyReturn] = useState(0.008);

  useEffect(() => {
    setMonthlyReturn(monthlyRateByRisk[risk]);
  }, [risk]);

  function formatINR(n) {
    try {
      return "₹" + Number(n).toLocaleString("en-IN");
    } catch {
      return "₹" + n;
    }
  }

  function calcMonthlySIP(target, currentSaved, months, monthlyReturn) {
    const r = monthlyReturn;
    const n = Math.max(1, Math.floor(months));
    const fvSaved = currentSaved * Math.pow(1 + r, n);
    const remaining = Math.max(0, target - fvSaved);
    if (remaining <= 0) return 0;
    const factor = (Math.pow(1 + r, n) - 1) / r;
    return remaining / factor;
  }

  function generateProjection(sip, currentSaved, months, monthlyReturn) {
    const rows = [];
    let balance = Number(currentSaved) || 0;
    const r = monthlyReturn;

    for (let m = 1; m <= months; m++) {
      balance = (balance + Number(sip)) * (1 + r);
      rows.push({
        month: m,
        contributionThisMonth: Number(sip),
        balance: Number(balance),
      });
    }
    return rows;
  }

  function generateMilestones(target, projectionRows) {
    const milestones = [];
    const levels = [0.25, 0.5, 0.75, 1.0];

    levels.forEach((t) => {
      const want = target * t;
      const found = projectionRows.find((r) => r.balance >= want);

      milestones.push({
        percent: t * 100,
        month: found ? found.month : null,
        balance: found ? found.balance : projectionRows.at(-1)?.balance || 0,
        achieved: !!found,
      });
    });

    return milestones;
  }

  const sip = calcMonthlySIP(
    Number(target),
    Number(currentSaved),
    Number(months),
    monthlyReturn
  );

  const projectionRows = generateProjection(
    sip,
    currentSaved,
    months,
    monthlyReturn
  );

  const milestones = generateMilestones(Number(target), projectionRows);

  const finalBalance = projectionRows.length
    ? projectionRows.at(-1).balance
    : Number(currentSaved);

  const progressPercent = Math.min(
    (Number(currentSaved) / Number(target || 1)) * 100,
    100
  );

  const next = () => {
    if (step === 1 && (!name || !target || Number(target) <= 0)) {
      alert("Enter a valid goal name and target amount.");
      return;
    }
    if (step === 2 && Number(months) <= 0) {
      alert("Enter valid months.");
      return;
    }
    setStep((p) => p + 1);
  };

  const prev = () => setStep((p) => p - 1);

  const handleSave = async () => {
    const payload = {
      name,
      target: Number(target),
      months: Number(months),
      currentSaved: Number(currentSaved),
      risk,
      sip: Math.ceil(sip),
      projection: projectionRows,
      milestones,
      createdAt: new Date().toISOString(),
    };

    try {
      await saveGoal(payload);
      alert("🎯 Goal saved successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Goal save error:", err);
      alert("Error saving goal. Check backend.");
    }
  };

  return (
    <div className="gw-container">
      <div className="gw-card">
        <h2 className="gw-title">Goal Achievement Wizard</h2>

        {/* Step Indicators */}
        <div className="gw-steps">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <div key={n} className={`gw-step ${step >= n ? "active" : ""}`}>
              {n}
            </div>
          ))}
        </div>

        {/* STEP SECTIONS */}
        {step === 1 && (
          <div className="gw-step-panel fade-step">
            <h3 className="gw-step-title">🎯 Start Your Goal</h3>
            <p className="gw-step-sub">
              Define your goal to generate a personalized investment strategy.
            </p>

            <div className="gw-step1-card">
              <label className="gw-label">Goal Name</label>
              <div className="gw-field">
                <span className="gw-icon">📝</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Buy a Laptop, Bike Downpayment, iPhone 16"
                  className="gw-input"
                />
              </div>

              <label className="gw-label">Target Amount (₹)</label>
              <div className="gw-field">
                <span className="gw-icon">💰</span>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="Enter amount needed"
                  className="gw-input"
                />
              </div>

              <p className="gw-hint">💡 You can modify this anytime later.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="gw-step-panel fade-step">
            <h3 className="gw-step-title">⏳ Select Your Timeline</h3>
            <div className="gw-step1-card">
              <label className="gw-label">Months Needed</label>
              <input
                type="number"
                value={months}
                className="gw-input"
                onChange={(e) => setMonths(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="gw-step-panel fade-step">
            <h3 className="gw-step-title">💼 Current Savings</h3>
            <div className="gw-step1-card">
              <label className="gw-label">Amount Already Saved</label>
              <input
                type="number"
                value={currentSaved}
                onChange={(e) => setCurrentSaved(e.target.value)}
                className="gw-input"
              />
              <div className="gw-mini">
                <b>Progress:</b> {progressPercent.toFixed(1)}%
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="gw-step-panel fade-step">
            <h3 className="gw-step-title">📊 Pick Your Risk Level</h3>

            <div className="gw-step1-card">
              <label className="gw-label">Choose Risk Level</label>
              <select
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                className="gw-input"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <p className="muted">
                Expected Monthly Return: {(monthlyReturn * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="gw-step-panel fade-step">
            <h3 className="gw-step-title">📈 Recommended Plan</h3>

            <div className="gw-step1-card">
              <p><b>Required SIP:</b> {formatINR(Math.ceil(sip))}/month</p>
              <p><b>Goal Duration:</b> {months} months</p>
              <p><b>Recommended:</b>{" "}
                {months <= 12
                  ? "Liquid / Short Duration Funds"
                  : months <= 36
                  ? "Hybrid Conservative Funds"
                  : "Equity SIP (Large/Mid Cap)"}
              </p>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="gw-step-panel fade-step">
            <h3 className="gw-step-title">📊 Milestones & Projection</h3>

            <p>
              <b>Final Expected Value:</b>{" "}
              {formatINR(finalBalance.toFixed(0))}
            </p>

            <div className="gw-chart-box">
              <LineChart
                width={330}
                height={240}
                data={projectionRows.map((row) => ({
                  month: row.month,
                  balance: Math.round(row.balance),
                  targetValue: target,
                }))}
              >
                <CartesianGrid stroke="#ddd" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="targetValue"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </div>

            <h4 className="gw-subtitle">Milestones</h4>
            {milestones.map((m, i) => (
              <div key={i} className="milestone">
                <b>{m.percent}%</b> →{" "}
                {m.achieved ? `Month ${m.month}` : "Not achieved"}
              </div>
            ))}

            <h4 className="gw-subtitle">First 12 Months Projection</h4>
            <div className="gw-table">
              <div className="gw-table-head">
                <div>Month</div>
                <div>Contribution</div>
                <div>Balance</div>
              </div>

              {projectionRows.slice(0, 12).map((r) => (
                <div className="gw-table-row" key={r.month}>
                  <div>{r.month}</div>
                  <div>{formatINR(Math.round(r.contributionThisMonth))}</div>
                  <div>{formatINR(Math.round(r.balance))}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="gw-step-panel fade-step">
            <h3 className="gw-step-title">🎉 Final Summary</h3>

            <div className="gw-step1-card">
              <p><b>Goal:</b> {name}</p>
              <p><b>Target:</b> {formatINR(target)}</p>
              <p><b>SIP Needed:</b> {formatINR(Math.ceil(sip))}/month</p>
              <p><b>Timeframe:</b> {months} months</p>

              <button className="primary" onClick={handleSave}>
                Save Goal
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="gw-nav">
          {step > 1 && (
            <button className="ghost" onClick={prev}>
              Back
            </button>
          )}
          {step < 7 && (
            <button className="primary" onClick={next}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
