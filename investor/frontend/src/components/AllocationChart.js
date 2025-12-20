import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import "./AllocationChart.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const AllocationChart = ({ data }) => {
  const chartData = {
    labels: ["SIP", "FD", "Stocks"],
    datasets: [
      {
        label: "Investment Allocation",
        data: [data.SIP, data.FD, data.Stocks],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
        hoverBackgroundColor: ["#2563EB", "#059669", "#D97706"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Your Investment Distribution",
        color: "#1E293B",
        font: {
          size: 20,
          weight: "bold",
        },
        padding: { bottom: 20 },
      },
      legend: {
        position: "bottom",
        labels: {
          color: "#334155",
          font: { size: 14 },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#f8fafc",
        bodyColor: "#e2e8f0",
        borderWidth: 1,
        borderColor: "#334155",
        cornerRadius: 10,
        padding: 10,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="allocation-chart-container">
      <h3 className="chart-heading">📊 Investment Allocation Overview</h3>
      <p className="chart-subtext">
        A visual summary of your financial portfolio diversification.
      </p>

      <div className="chart-card">
        <Pie data={chartData} options={options} />
      </div>

      <div className="chart-summary">
        <div className="summary-item sip">
          <span className="dot" style={{ backgroundColor: "#3B82F6" }}></span>
          SIP: {data.SIP}%
        </div>
        <div className="summary-item fd">
          <span className="dot" style={{ backgroundColor: "#10B981" }}></span>
          FD: {data.FD}%
        </div>
        <div className="summary-item stocks">
          <span className="dot" style={{ backgroundColor: "#F59E0B" }}></span>
          Stocks: {data.Stocks}%
        </div>
      </div>
    </div>
  );
};

export default AllocationChart;
