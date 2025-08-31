import { useState } from 'react';

const emergencyTypes = [
  { value: 'Accident', label: 'Accident' },
  { value: 'Heart Attack', label: 'Heart Attack' },
  { value: 'Stroke', label: 'Stroke' },
  { value: 'Other Medical', label: 'Other Medical Emergency' },
  { value: 'Other', label: 'Other' }
];

export default function BookingForm({ formData, setFormData, onSubmit, loading, geoError }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="booking-form" onSubmit={onSubmit}>
      <div className="form-section">
        <h3>Patient Information</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="patientAge"
            value={formData.patientAge}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Emergency Details</h3>
        <div className="form-group">
          <label>Emergency Type</label>
          <select
            name="emergencyType"
            value={formData.emergencyType}
            onChange={handleChange}
            required
          >
            {emergencyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Symptoms (Optional)</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            rows="3"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Your Information</h3>
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {geoError && (
        <div className="geo-warning">
          ⚠️ Unable to access your location. Ambulance may take longer to arrive.
        </div>
      )}

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Submitting...' : 'Request Ambulance'}
      </button>
    </form>
  );
}