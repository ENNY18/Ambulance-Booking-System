// pages/user/StatusPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, CircularProgress } from "@mui/material";
import StatusTracker from "../../Components/user/StatusTracker";

import "./StatusPage.css";

const statusStages = [
  { id: 1, name: "Request Pending", status: "Pending", icon: "🕒" },
  { id: 2, name: "Ambulance Assigned", status: "Dispatched", icon: "🚑" },
  { id: 3, name: "En Route", status: "en-route", icon: "📍" },
  { id: 4, name: "Arrived at Location", status: "Arrived", icon: "🏥" },
  { id: 5, name: "Transport Complete", status: "Completed", icon: "✅" }
];

const StatusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ambulancePosition, setAmbulancePosition] = useState({
    lat: 6.5244,
    lng: 3.3792
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`API`);
        const data = res.data.data;
        setRequest(data);
      } catch (error) {
        console.error("Failed to fetch request", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  

  
  useEffect(() => {
    const target = { lat: 6.5969, lng: 3.3426 }; 
    const interval = setInterval(() => {
      setAmbulancePosition((prev) => {
        const deltaLat = (target.lat - prev.lat) * 0.02;
        const deltaLng = (target.lng - prev.lng) * 0.02;

        const newLat = prev.lat + deltaLat;
        const newLng = prev.lng + deltaLng;

        if (
          Math.abs(target.lat - newLat) < 0.0001 &&
          Math.abs(target.lng - newLng) < 0.0001
        ) {
          clearInterval(interval);
          return target;
        }

        return { lat: newLat, lng: newLng };
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="centered">
        <CircularProgress />
      </div>
    );
  }

  if (!request) {
    return <Typography variant="h6">Booking not found</Typography>;
  }

  return (
    <div className="status-page-container">
      <header className="status-header">
        <h1>Ambulance Status</h1>
        <p>Request ID: {request.requestId}</p>
      </header>

      <div className="status-content">
        <div className="status-section">
          <h2>Patient Details</h2>
          <div className="patient-info">
            <p>
              <strong>Name:</strong>{" "}
              <span className="cap">
                <strong>{request.patientName}</strong>
              </span>
            </p>
            <p>
              <strong>Emergency:</strong>{" "}
              <span className="cap">
                <strong>
                  {request.emergencyType
                    ? request.emergencyType.replace("-", " ")
                    : "N/A"}
                </strong>
              </span>
            </p>
            <p>
              <strong>Phone Number:</strong>{" "}
              <span className="cap">
                <strong>{request.phoneNumber}</strong>
              </span>
            </p>
            <p>
              <strong>Address:</strong>{" "}
              <span className="cap">
                <strong>{request.address}</strong>
              </span>
            </p>
          </div>
        </div>

        <div className="status-section">
          <h2>Status Updates</h2>
          <StatusTracker stages={statusStages} currentStatus={request.status} />
        </div>

        {request.assignedAmbulance ? (
          <div className="status-section">
            <h2>Ambulance Details</h2>
            <div className="patient-info">
              <p>
                <strong>Ambulance Number:</strong>{" "}
                <span className="cap">
                  <strong>{request.assignedAmbulance.ambulanceNumber}</strong>
                </span>
              </p>
              <p>
                <strong>Driver Name:</strong>{" "}
                <span className="cap">
                  <strong>{request.assignedAmbulance.driverName}</strong>
                </span>
              </p>
              <p>
                <strong>Phone Number:</strong>{" "}
                <span className="cap">
                  <strong>{request.assignedAmbulance.driverContact}</strong>
                </span>
              </p>
            </div>
          </div>
        ) : (
          <Typography color="error">No ambulance assigned yet.</Typography>
        )}

        <div className="status-section">
          <div className="status-actions">
            <button
              className="emergency-call-btn"
              disabled={
                request.status === "Pending" || request.status === "Dispatched" || request.status === "Arrived" || request.status === "Completed"
              }
              onClick={() => navigate("/map")}
            >
              <span className="icon">🗺️</span> Track Ambulance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
