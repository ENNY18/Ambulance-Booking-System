// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/common/ProtectedRoute";
import AdminLayout from "./Components/admin/AdminLayout";
import HomePage from "./Pages/user/HomePage";
import BookingPage from "./Pages/user/BookingPage";
import StatusPage from "./Pages/user/TrackingPage";
import Map from "./Pages/user/MapSimulation";
import AdminDashboard from "./Pages/admin/DashboardPage";
import LoginPage from "./Pages/admin/LoginPage";
import RegisterPage from "./Pages/admin/RegisterPage";
import DriverDashboardPage from './Pages/admin/DriverDashboardPage';
import DriverLogin from './Pages/admin/DriverLogin';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/status/:id" element={<StatusPage />} />
          <Route path="/driver-dashboard" element={<DriverDashboardPage />} />
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/map" element={<Map />} />

          {/* Admin routes */}
          <Route path="/admin/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
