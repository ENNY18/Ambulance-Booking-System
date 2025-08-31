// pages/user/StatusPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/bookingService";
import { getAmbulanceById } from "../../services/ambulance";
import StatusTracker from "../../Components/user/StatusTracker";
import AmbulanceInfo from "../../Components/user/AmbulanceInfo";
import "./StatusPage.css";

const statusStages = [
  { id: 1, name: "Request Received", status: "pending", icon: "🕒" },
  { id: 2, name: "Ambulance Assigned", status: "dispatched", icon: "🚑" },
  { id: 3, name: "En Route", status: "en-route", icon: "📍" },
  { id: 4, name: "Arrived at Location", status: "arrived", icon: "🏥" },
  { id: 5, name: "Transport Complete", status: "completed", icon: "✅" }
];

export default function StatusPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [ambulance, setAmbulance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingData = await getBooking(id);
        setBooking(bookingData);

        if (bookingData.assignedAmbulance) {
          const ambulanceData = await getAmbulanceById(
            bookingData.assignedAmbulance
          );
          setAmbulance(ambulanceData);
        }
      } catch (err) {
        setError("Failed to load booking status");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <div className="status-loading">Loading status...</div>;
  if (error) return <div className="status-error">{error}</div>;
  if (!booking) return <div className="status-error">Booking not found</div>;

  return (
    <div className="status-page-container">
      <header className="status-header">
        <h1>Ambulance Status</h1>
        <p>Request ID: {id.slice(-6)}</p>
      </header>

      <div className="status-content">
        <div className="status-section">
          <h2>Patient Details</h2>
          <div className="patient-info">
            <p>
              <strong>Name:</strong> {booking.patientName}
            </p>
            <p>
              <strong>Age:</strong> {booking.patientAge}
            </p>
            <p>
              <strong>Emergency:</strong>{" "}
              {booking.emergencyType
                ? booking.emergencyType.replace("-", " ")
                : "N/A"}
            </p>

            {booking.symptoms && (
              <p>
                <strong>Symptoms:</strong> {booking.symptoms}
              </p>
            )}
          </div>
        </div>

        <div className="status-section">
          <h2>Status Updates</h2>
          <StatusTracker stages={statusStages} currentStatus={booking.status} />
        </div>

        {ambulance && (
          <div className="status-section">
            <h2>Ambulance Information</h2>
            <AmbulanceInfo ambulance={ambulance} />
          </div>
        )}

        <div className="status-actions">
          <button className="emergency-call-btn">
            <span className="icon">📞</span> Call Emergency Services
          </button>
        </div>
      </div>
    </div>
  );
}
