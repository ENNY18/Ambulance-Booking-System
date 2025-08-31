import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="admin-layout">
      <Sidebar onLogout={logout} />
      <div className="admin-content">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}