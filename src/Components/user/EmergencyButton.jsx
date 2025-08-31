import React from 'react';
import './EmergencyButton.css';

export default function EmergencyButton({ onClick, loading }) {
  return (
    <button 
      className={`emergency-btn ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <span className="btn-loader"></span>
      ) : (
        <>
          <span className="btn-icon">🚑</span>
          <span className="btn-text">Request Ambulance</span>
        </>
      )}
    </button>
  );
}