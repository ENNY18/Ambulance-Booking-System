import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../../Components/user/BookingForm';
import { createBooking } from '../../services/bookingService';
import { useGeolocation } from '../../hooks/useGeolocation';

export default function BookingPage() {
  const navigate = useNavigate();
  const { location, error: geoError } = useGeolocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    emergencyType: 'other',
    symptoms: '',
    address: '',
    phoneNumber: '',
    name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const booking = await createBooking({
        ...formData,
        location: {
          lat: location.latitude,
          lng: location.longitude
        }
      });
      
      navigate(`/status/${booking._id}`); 
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <h2 className='text-center'>Ambulance Request</h2>
      <BookingForm 
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
        geoError={geoError}
      />
    </div>
  );
}