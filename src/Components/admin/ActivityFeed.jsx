import React from 'react';
import { FaClock, FaCheckCircle, FaAmbulance, FaUserMd } from 'react-icons/fa';

const ActivityFeed = ({ activities, loading }) => {
  if (loading) {
    return <div className="loading-activity">Loading activity...</div>;
  }

  if (activities.length === 0) {
    return <div className="no-activity">No recent activity</div>;
  }

  return (
    <ul className="activity-feed">
      {activities.map((activity, index) => (
        <li key={index} className="activity-item">
          <div className="activity-icon">
            {activity.type === 'dispatch' ? <FaAmbulance /> : 
             activity.type === 'completion' ? <FaCheckCircle /> : <FaUserMd />}
          </div>
          <div className="activity-content">
            <p>{activity.message}</p>
            <small>
              <FaClock /> {new Date(activity.timestamp).toLocaleTimeString()}
            </small>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActivityFeed;