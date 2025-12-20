import React, { useState } from "react";
import "./GoalPath.css";

export default function GoalPath() {
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [risk, setRisk] = useState("Low");
  const [plan, setPlan] = useState(null);

  const generatePlan = () => {
    const monthlyRate =
      risk === "Low" ? 0.005 :
      risk === "Medium" ? 0.009 :
      0.012;

    const r = monthlyRate;
    const n = parseInt(months);

    const sip =
      (amount * r) / (Math.pow(1 + r, n) - 1);

    const milestones = {
      "25%": Math.ceil(n * 0.25),
      "50%": Math.ceil(n * 0.50),
      "75%": Math.ceil(n * 0.75),
      "100%": n
    };

    setPlan({
      monthlySIP: sip.toFixed(0),
      milestones,
      recommended:
        months <= 12 ? "Liquid Fund"
        : months <= 36 ? "Hybrid Fund"
        : "Equity SIP",
      duration: months
    });
  };

  return (
    <div className="goal-path-container">
      <h2>Goal Achievement Path</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Goal (Buy Laptop)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <input
          type="number"
          placeholder="Target Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="Months to Achieve"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
        />

        <select value={risk} onChange={(e) => setRisk(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button onClick={generatePlan}>Generate Path</button>
      </div>

      {plan && (
        <div className="plan-output">
          <h3>Plan for: {goal}</h3>

          <p><strong>Required SIP:</strong> ₹{plan.monthlySIP}/month</p>
          <p><strong>Recommended Investment:</strong> {plan.recommended}</p>

          <h4>Milestones</h4>
          <ul>
            <li>25% Goal → Month {plan.milestones["25%"]}</li>
            <li>50% Goal → Month {plan.milestones["50%"]}</li>
            <li>75% Goal → Month {plan.milestones["75%"]}</li>
            <li>100% Goal → Month {plan.milestones["100%"]}</li>
          </ul>

          <h4>Tips</h4>
          <ul>
            <li>Automate SIP every month.</li>
            <li>Don’t withdraw before goal completion.</li>
            <li>Review after every milestone.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
