import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./InvestmentDashboard.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:5500";

const InvestmentDashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/history`);
      const data = Array.isArray(res.data)
        ? res.data.map((r) => ({
            ...r,
            created_at: r.created_at || r.createdAt || "",
          }))
        : [];
      setHistory(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  // Line Chart Historical Data
  const portfolioData = history.map((r, i) => ({
    month: `#${i + 1}`,
    total: Number(r.sip || 0) + Number(r.fd || 0) + Number(r.stocks || 0),
    sip: Number(r.sip || 0),
    fd: Number(r.fd || 0),
    stocks: Number(r.stocks || 0),
  }));

  // Average Allocation
  const avgAllocation =
    history.length > 0
      ? {
          sip: history.reduce((s, r) => s + Number(r.sip || 0), 0) / history.length,
          fd: history.reduce((s, r) => s + Number(r.fd || 0), 0) / history.length,
          stocks:
            history.reduce((s, r) => s + Number(r.stocks || 0), 0) / history.length,
        }
      : { sip: 0, fd: 0, stocks: 0 };

  const pieData = [
    { name: "SIP", value: avgAllocation.sip, color: "#3B82F6" },
    { name: "FD", value: avgAllocation.fd, color: "#10B981" },
    { name: "Stocks", value: avgAllocation.stocks, color: "#F59E0B" },
  ];

  // Risk Distribution
  const riskDist = history.reduce((acc, r) => {
    acc[r.risk] = (acc[r.risk] || 0) + 1;
    return acc;
  }, {});

  const riskData = Object.entries(riskDist).map(([risk, count]) => ({
    risk: `R${risk}`,
    count,
  }));

  // 🔮 Predict Future Wealth Projection (Compound Growth)
  const calculateFutureProjection = () => {
    if (avgAllocation.sip === 0) return [];

    const monthlySIP = avgAllocation.sip;
    const monthlyReturn = 0.01; // 1% monthly = approx 12.7% yearly
    const futureMonths = [12, 24, 36, 60, 120]; // 1yr, 2yr, 3yr, 5yr, 10yr

    return futureMonths.map((m) => {
      const fv =
        monthlySIP * (((1 + monthlyReturn) ** m - 1) / monthlyReturn);

      return {
        period: `${m} mo`,
        value: Math.round(fv),
      };
    });
  };

  const futureProjectionData = calculateFutureProjection();

  if (loading)
    return (
      <div className="ld-wrap">
        <div className="spinner"></div>
      </div>
    );

  if (error)
    return (
      <div className="err-box">
        {error}
        <button className="retry-btn" onClick={fetchHistory}>
          Retry
        </button>
      </div>
    );

  return (
    <div className="dash-wrap">
      <h1 className="dash-title">📈 Investment Dashboard</h1>

      {history.length === 0 ? (
        <div className="empty">
          <p>No investment history found.</p>
          <span>Make your first prediction to get started!</span>
        </div>
      ) : (
        <div className="dash-content">
          {/* Allocation & Risk Grid */}
          <div className="chart-grid">
            <ChartBox title="Portfolio Allocation (Avg)">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    dataKey="value"
                  >
                    {pieData.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `₹${Number(v).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </ChartBox>

            <ChartBox title="Risk Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="risk" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </ChartBox>
          </div>

          {/* Historical Trend */}
          <ChartBox title="Portfolio Trend (Historical)">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v) => `₹${Number(v).toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="sip" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="fd" stroke="#10B981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="stocks" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* 🔮 Future Wealth Projection */}
          <ChartBox title="🔮 Future Wealth Projection (Compound Growth)">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={futureProjectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(v) => `₹${Number(v).toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Projected Wealth"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* Table of Recent Predictions */}
          <ChartBox title="Recent Predictions">
            <div className="tbl-wrap">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Income</th>
                    <th>Age</th>
                    <th>Risk</th>
                    <th>SIP</th>
                    <th>FD</th>
                    <th>Stocks</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(0, 10).map((r, i) => {
                    const date = r.created_at ? new Date(r.created_at) : null;

                    return (
                      <tr key={i}>
                        <td>{date ? date.toLocaleString() : "—"}</td>
                        <td>₹{Number(r.income || 0).toLocaleString()}</td>
                        <td>{r.age}</td>
                        <td>{r.risk}/5</td>
                        <td className="sip">₹{Number(r.sip).toLocaleString()}</td>
                        <td className="fd">₹{Number(r.fd).toLocaleString()}</td>
                        <td className="stocks">₹{Number(r.stocks).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ChartBox>
        </div>
      )}
    </div>
  );
};

const ChartBox = ({ title, children }) => (
  <div className="chart-box">
    <h3 className="chart-title">{title}</h3>
    {children}
  </div>
);

export default InvestmentDashboard;
