import React, { useState } from 'react';
import axios from 'axios';


const DriverDashboardPage = () => {
  const [driverName, setDriverName] = useState('');
  const [ambulanceNumber, setAmbulanceNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [assignedRequest, setAssignedRequest] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data: requests } = await axios.get('/api/requests');
      const matchedRequest = requests.find(
        (req) =>
          req.assignedAmbulance &&
          req.assignedAmbulance.ambulanceNumber === ambulanceNumber &&
          req.assignedAmbulance.driverName.toLowerCase() === driverName.toLowerCase()
      );

      if (matchedRequest) {
        setAssignedRequest(matchedRequest);
        setIsLoggedIn(true);
      } else {
        alert('No request assigned to this driver and ambulance.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred while logging in.');
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await axios.put(`/api/requests/${assignedRequest._id}/status`, {
        status: statusUpdate,
      });

      setAssignedRequest({ ...assignedRequest, status: response.data.status });
      alert('Status updated successfully.');
    } catch (err) {
      console.error('Status update error:', err);
      alert('Failed to update status.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Ambulance Driver Login</h2>
          <div className="form-group">
            <label>Driver Name</label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Ambulance Number</label>
            <input
              type="text"
              value={ambulanceNumber}
              onChange={(e) => setAmbulanceNumber(e.target.value)}
              required
              placeholder="Enter ambulance number"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
  <div className="dashboard-container">
    <header className="dashboard-header">
      <h2>Welcome, {driverName} 🚑</h2>
      <p>Ambulance Number: <strong>{ambulanceNumber}</strong></p>
    </header>

    <h1>Driver Dashboard</h1>
    <div className="request-card">
      <h2>Assigned Request Details</h2>
      <p><strong>Patient Name:</strong> <span className='cap'>{assignedRequest.patientName}</span></p>
      <p><strong>Phone:</strong> <span className='cap'>{assignedRequest.phoneNumber}</span></p>
      <p><strong>Location:</strong> <span className='cap'>{assignedRequest.address}</span></p>
      <p><strong>Request Type:</strong> <span className='cap'>{assignedRequest.emergencyType}</span></p>
      <p><strong>Current Status:</strong> <span className="status">{assignedRequest.status}</span></p>

      <div className="status-update">
        <label>Update Status</label>
        <select value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value)}>
          <option value="">Select new status</option>
          <option value="On Route">On Route</option>
          <option value="Arrived">Arrived</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleStatusUpdate}>Update Status</button>
      </div>
    </div>
  </div>
);

};

export default DriverDashboardPage;
