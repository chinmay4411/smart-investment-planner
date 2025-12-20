import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import {
  Home,
  BarChart2,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";

import HomePage from "./components/predict";
import InvestmentDashboard from "./components/InvestmentDashboard";
import LearningHub from "./components/LearningHub";
import GoalWizard from "./components/GoalWizard";
import DashboardGoals from "./components/DashboardGoals";
import Chatbot from "./components/Chatbot";   // ✅ IMPORT CHATBOT

import "./App.css";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <Link to="/" className="brand-glow">
            <span className="logo-icon">💼</span> SmartInvest
          </Link>

          <div className="nav-links">
            <NavLink to="/" label="Home" icon={<Home size={18} />} />
            <NavLink to="/goalwizard" label="Goal Planner" icon={<BarChart2 size={18} />} />
            <NavLink to="/dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} />
            <NavLink to="/learning" label="Learning Hub" icon={<BookOpen size={18} />} />
            <NavLink to="/analytics" label="Analytics" icon={<BarChart2 size={18} />} />
          </div>
        </div>
      </nav>

      {/* Page Body */}
      <main key={location.pathname} className="page-transition">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardGoals />} />
          <Route path="/learning" element={<LearningHub />} />
          <Route path="/analytics" element={<InvestmentDashboard />} />
          <Route path="/goalwizard" element={<GoalWizard />} />
        </Routes>
      </main>

      {/* 💬 CHATBOT FLOATING BUTTON */}
      <Chatbot />  {/* ← THIS MAKES THE CHATBOT APPEAR */}

      {/* Footer */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="highlight">SmartInvest</span> — Designed by{" "}
          <span className="highlight name">Chinmay Deshmukh</span>
        </p>
      </footer>
    </div>
  );
}

function NavLink({ to, label, icon }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link to={to} className={`nav-link ${active ? "active" : ""}`}>
      {icon && <span className="nav-icon">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}

export default App;
