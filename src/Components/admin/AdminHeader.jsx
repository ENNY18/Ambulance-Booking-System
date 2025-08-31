import { Link } from 'react-router-dom';
import './AdminHeader.css'


const AdminHeader = ({ pendingRequests = 0, admin }) => {
  return (
    <header className="admin-header">
      <div className="header-container">
        <Link to="/admin/dashboard" className="logo">
          <span>🚑</span> EMS Admin
        </Link>
        
        <nav className="admin-nav">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/ambulances">Ambulances</Link>
          <Link to="/admin/requests">
            Requests
            
          </Link>
          <Link to="/admin/profile" className="profile-link">
            {admin?.username || 'Profile'}
          </Link>

          
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;