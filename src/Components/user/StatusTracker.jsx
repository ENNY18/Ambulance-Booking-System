import React from "react";
import "./StatusTracker.css";

export default function StatusTracker({ stages, currentStatus }) {
  const statusOrder = stages.map((s) => s.status);
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="status-tracker">
      {stages.map((stage, index) => {
        const isActive = index <= currentIndex;
        return (
          <div key={stage.id} className="status-stage">
            <div
              className={`status-icon-wrapper ${isActive ? "active" : ""}`}
            >
              <span className="status-icon">{stage.icon}</span>
            </div>
            <div className={`status-label ${isActive ? "active" : ""}`}>
              {stage.name}
            </div>
            {index < stages.length - 1 && (
              <div className={`status-line ${isActive ? "active" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
