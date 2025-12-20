import React, { useEffect, useState } from "react";
import API from "../App";
import "./History.css";

const History = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/history");
        setRecords(res.data || []);
      } catch (err) {
        setError("⚠️ Failed to fetch history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="history-loading">
        <div className="spinner"></div>
        <p>Loading your investment history...</p>
      </div>
    );
  }

  if (error) {
    return <div className="history-error">{error}</div>;
  }

  if (records.length === 0) {
    return <div className="history-empty">No history records found.</div>;
  }

  return (
    <div className="history-container">
      <h2 className="history-title">📜 Investment History</h2>
      <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Income</th>
              <th>Expenses</th>
              <th>Age</th>
              <th>Risk</th>
              <th>SIP</th>
              <th>FD</th>
              <th>Stocks</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, index) => (
              <tr key={r.id || index}>
                <td>{r.income}</td>
                <td>{r.expenses}</td>
                <td>{r.age}</td>
                <td>{r.risk}</td>
                <td className="sip-cell">{r.sip}</td>
                <td className="fd-cell">{r.fd}</td>
                <td className="stocks-cell">{r.stocks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
