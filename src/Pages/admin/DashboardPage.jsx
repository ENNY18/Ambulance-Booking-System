import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAmbulances, getRequests } from "../../api/admin";
import AdminHeader from "../../Components/admin/AdminHeader";
import Button from "../../Components/common/Button";
import {
  FaAmbulance,
  FaPlus,
  FaList,
  FaClipboardList,
  FaBell,
  FaMoon,
  FaSun,
  FaUser,
  FaChartLine
} from "react-icons/fa";
import NotificationBadge from "../../Components/common/NotificationBadge";
import StatsChart from "../../Components/admin/StatsChart";

import "../../styles/admin.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [stats, setStats] = useState({
    ambulances: 0,
    activeAmbulances: 0,
    completedRequests: 0,
    pendingRequests: 0
  });
  const [loading, setLoading] = useState({
    stats: true,
    activity: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ambulancesRes, requestsRes] = await Promise.all([
          getAmbulances(),
          getRequests()
        ]);

        console.log("🚑 Ambulance Response:", ambulancesRes);
        console.log("📦 Requests Response:", requestsRes);

        const ambulances = ambulancesRes?.data?.data?.ambulances || [];
        const requests = requestsRes?.data || [];

        console.log("✅ Parsed Ambulances:", ambulances);
        console.log("✅ Parsed Requests:", requests);

        const activeRequests = requests.filter((a) => {
          const status = a.status?.toLowerCase().trim();
          return ["assigned", "arrived", "on route"].includes(status);
        });

        const pendingRequests = requests.filter(
          (r) => r.status.toLowerCase() === "pending"
        );
        const completedToday = requests.filter(
          (r) => r.status.toLowerCase() === "completed"
        );

        setStats({
          ambulances: ambulances.length,
          active: activeRequests.length,
          pendingRequests: pendingRequests.length,
          completedRequests: completedToday.length
        });
      } catch (error) {
        console.error(
          "❌ Failed to load data:",
          error.response?.data || error.message
        );
      } finally {
        setLoading({ stats: false, activity: false });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  if (loading.stats) {
    return <div className="loading-spinner">Loading Dashboard...</div>;
  }

  return (
    <div className={`dashboard-panel ${darkMode ? "dark" : ""}`}>
      <AdminHeader pendingRequests={stats.pendingRequests} admin={admin} />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-actions">
            <button
              onClick={handleToggleTheme}
              className="theme-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <Button onClick={logout} variant="danger" small>
              Logout
            </Button>
          </div>

          <div className="admin-profile">
            <div className="profile-icon">
              {admin?.username?.charAt(0).toUpperCase() || <FaUser />}
            </div>
            <div className="profile-info">
              <h2>Welcome back, {admin?.username || "Admin"}</h2>
              <p>Last login: {new Date().toLocaleString()}</p>
            </div>
          </div>

          <div className="quick-stats">
            <div className="stat-card">
              <h3>Total Ambulances</h3>
              <p>{stats.ambulances}</p>
            </div>
            <div className="stat-card">
              <h3>Active Now</h3>
              <p>{stats.active}</p>
            </div>
            <div className="stat-card">
              <h3>Pending Requests</h3>
              <p>{stats.pendingRequests}</p>
            </div>
            <div className="stat-card">
              <h3>Completed Today</h3>
              <p>{stats.completedRequests}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-main">
          <div className="dashboard-section">
            <h3>
              <FaChartLine /> System Overview
            </h3>
            <StatsChart stats={stats} />
          </div>

          <div className="dashboard-section">
            <h3>
              <FaBell /> Recent Activity
            </h3>
            {/*<ActivityFeed activities={activity} loading={loading.activity} />*/}
          </div>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <FaAmbulance className="card-icon" />
            <h3>Ambulance Management</h3>
            <p>View and manage all ambulance units</p>
            <Button
              onClick={() => navigate("/admin/ambulances")}
              variant="primary"
              className="card-button"
            >
              <FaList /> View Ambulances
            </Button>
          </div>

          <div className="dashboard-card">
            <FaPlus className="card-icon" />
            <h3>Add New Ambulance</h3>
            <p>Register a new ambulance unit</p>
            <Button
              onClick={() => navigate("/admin/ambulances")}
              variant="success"
              className="card-button"
            >
              <FaPlus /> Create New
            </Button>
          </div>

          <div className="dashboard-card">
            <FaClipboardList className="card-icon" />
            <h3>Emergency Requests</h3>
            <p>View all emergency dispatch requests</p>
            <Button
              onClick={() => navigate("/admin/requests")}
              variant="info"
              className="card-button"
            >
              <FaClipboardList /> View Requests
              {stats.pendingRequests > 0 && (
                <NotificationBadge count={stats.pendingRequests} />
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
