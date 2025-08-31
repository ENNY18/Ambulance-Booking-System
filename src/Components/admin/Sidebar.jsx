// components/admin/Sidebar.jsx
import { NavLink } from 'react-router-dom';

export default function Sidebar({ onLogout }) {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h3>Ambulance Dispatch</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/requests" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Requests
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/ambulances" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Ambulances
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/admins" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Admins
            </NavLink>
          </li>
          <li>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}