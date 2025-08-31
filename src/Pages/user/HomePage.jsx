import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../../hooks/useGeolocation';
import EmergencyButton from '../../Components/user/EmergencyButton';
import Header from '../../Components/common/Header';
import Ambulance from '../../Assets/ambulance-hero.png'
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate();
  const { location, error: geoError } = useGeolocation();
  const [loading, setLoading] = useState(false);

  const handleEmergencyClick = () => {
    if (geoError) {
      alert('Please enable location services to continue');
      return;
    }
    navigate('/booking');
  };

  return (
    <div className="home-container">
      <Header />
      <main className="home-content">
        <section className="hero">
           <div className="hero-image">
            <img src={Ambulance} alt="Ambulance" />
          </div>
          <div className="hero-text">
            <h1>Fast Emergency Response, Anytime</h1>
            <p>Reliable and quick ambulance services at your fingertips.</p>
          </div>
         
        </section>

        <section className="about">
          <h2>About Us</h2>
          <p>
            We provide timely emergency medical transport with a dedicated team ready 24/7. Our goal is to save lives by ensuring ambulances reach patients as quickly as possible.
          </p>
        </section>

        <section className="services">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <span className="logo-icon">🚑</span>
              <h3>Emergency Dispatch</h3>
              <p>Quick dispatch of ambulances in emergencies.</p>
            </div>
            <div className="service-card">
              <span className="logo-icon">📍</span>
              <h3>Live Tracking</h3>
              <p>Track ambulance real-time as it comes to you.</p>
            </div>
            <div className="service-card">
              <img src="/icons/support.png" alt="24/7 Support" />
              <h3>24/7 Support</h3>
              <p>Always available support to assist you in emergencies.</p>
            </div>
          </div>
        </section>

        <section className="contact">
          <h2>Contact Us</h2>
          <p>Email: support@ems.com</p>
          <p>Phone: +234 700 000 0000</p>
          <p>Location: Lagos, Nigeria</p>
        </section>

        <EmergencyButton 
          onClick={handleEmergencyClick}
          loading={loading}
        />
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} EMS. All rights reserved.</p>
      </footer>
    </div>
  );
}
