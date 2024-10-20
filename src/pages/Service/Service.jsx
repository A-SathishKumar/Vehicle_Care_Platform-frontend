import './Service.css'; // Include your styles here
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { FaUser, FaHistory, FaCar } from 'react-icons/fa'; // Icons for tabs
import { IoIosAddCircle } from "react-icons/io";
import { FetchServiceAPI, AddBookingAPI, FetchBookingAPI, AddCarAPI, FetchCarAPI, DeleteCarAPI, ActivationSentAPI, StripePaymentAPI } from '../../apis.js';


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ make: '', model: '', year: '' });
  const [loading, setLoading] = useState(false);

  const carBrands = ['TATA', 'BMW', 'Hyundai', 'Ford', 'Jaguar', 'KIA', 'Mahindra', 'Porsche', 'Suzuki'];
  const carBrandLogos = {
    TATA: 'src/assets/tata.png',
    Ford: 'src/assets/ford.png',
    BMW: 'src/assets/BMW.png',
    Hyundai: 'src/assets/hyundai.png',
    Jaguar: 'src/assets/jaguar.png',
    KIA: 'src/assets/kia.png',
    Mahindra: 'src/assets/mahindra.png',
    Porsche: 'src/assets/porsche.png',
    Suzuki: 'src/assets/suzuki.png'
  };


  const SendActivationLink = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const email = { email: userData.email, name: userData.name };
    const response = await ActivationSentAPI(email);
    alert(response.msg);
  }
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);

    } else {
      navigate('/login');
    }
  }, [history]);

  const FetchService = async () => {
    setLoading(true);
    try {
      const response = await FetchServiceAPI();
      setServices(response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      FetchService();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "activities") {
      FetchBookings();
    } else if (activeTab === "addcar") {
      Fetchcars();
    }
  }, [activeTab]);

  const FetchBookings = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const email = userData.email;
    const response = await FetchBookingAPI({ email });
    setActivities(response);
    return null;
  }

  if (activeTab === "activities") {
    FetchBookings();
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedService(null);
  };

  const handleBookService = (service) => {
    alert("Kindly Fill the Below Form to Confirm Your Booking")
    setSelectedService(service);
  };

  const handlelogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  }
  if (!user) {
    return <div>Loading...</div>;
  }

  // const handleSubmit = async () => {
  //   console.log(selectedService);
  //   const userData = JSON.parse(localStorage.getItem('user'));
  //   const phone = userData.phone;
  //   const bookingDetails = {
  //     serviceName: selectedService.title,
  //     carBrand,
  //     carModel,
  //     vehicle: `${carBrand} ${carModel}`,
  //     date,
  //     timeSlot,
  //     price: selectedService.price,
  //     status: 'Upcoming',
  //     email: user.email,
  //     phone: phone,
  //     name: userData.name
  //   };
  //   localStorage.setItem('SeletedService', selectedService);
  //   //const service = {}
  //   const response = await makepayment(selectedService);
  //   //const response = await AddBooking(bookingDetails);
  //   const data = await response.json();
  //   if (data.success) {
  //     alert(data.msg);
  //   } else {
  //     alert(data.msg);
  //   }
  // }

  const Fetchcars = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const email = userData.email;
    const response = await FetchCarAPI({ email });
    setCars(response);
    return null;
  }

  if (activeTab === "addcar") {
    Fetchcars();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const addCar = async (e) => {
    e.preventDefault();
    if (newCar.make && newCar.model && newCar.year) {
      const userData = JSON.parse(localStorage.getItem('user'));
      const email = userData.email;
      const response = await AddCarAPI({ ...newCar, email })
      if (response.success) {
        alert(response.msg)
        setCars([...cars, { id: cars.length + 1, ...newCar }]);
        setNewCar({ make: '', model: '', year: '' });
      } else {
        alert(response.msg);
      }

    }
  };
  const removeCar = async (cars) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const email = userData.email;
    const response = await DeleteCarAPI({ ...cars, email });
    alert(response.msg);
  };

  //Payment Intergaration

  const makepayment = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const bookingDetails = {
      serviceName: selectedService.title,
      carBrand,
      carModel,
      vehicle: `${carBrand} ${carModel}`,
      date,
      timeSlot,
      price: selectedService.price,
      status: 'Upcoming',
      email: user.email,
      phone: user.phone,
      name: userData.name,
      title:selectedService.title,
    };
    localStorage.setItem('service', JSON.stringify(bookingDetails));
    const response = await StripePaymentAPI(bookingDetails);

  }


  return (
    <>
      <div className="profile-page">
        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabChange('profile')}
          >
            <FaUser /> My Profile
          </button>
          <button
            className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => handleTabChange('activities')}
          >
            <FaHistory /> My Activities
          </button>
          <button
            className={`tab-button ${activeTab === 'addcar' ? 'active' : ''}`}
            onClick={() => handleTabChange('addcar')}
          >
            <IoIosAddCircle /> Add a Car
          </button>
          <button
            className={`tab-button ${activeTab === 'bookService' ? 'active' : ''}`}
            onClick={() => handleTabChange('bookService')}
          >
            <FaCar /> Book a Service
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-container">
              <div className="profile-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <div className="card-header">
                  <p className="account-status-title"><strong>Account Status</strong></p>
                  <div className={`status-badge ${user.isVerified ? 'verified' : 'not-verified'}`}>
                    {user.isVerified ? (
                      <p className="status-text verified">Verified</p>
                    ) : (
                      <>
                        <p className="status-text not-verified">Not Verified</p>
                        <button onClick={SendActivationLink} className="btn-send-link">Send Activation Link</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={handlelogout} className="logout-btn">Logout</button>
            </div>
          )}

          {activeTab === 'activities' && (
            activities.length > 0 ? (
              <div className="my-activities">
                <div className="activities-list">
                  {activities.map(activity => (
                    <div key={activity.id} className={`activity-card ${activity.status === 'Upcoming' ? 'upcoming' : 'completed'}`}>
                      <div className="card-header">
                        <h3>{activity.vehicle}</h3>
                        <span className={`status-badge ${activity.status.toLowerCase()}`}>{activity.status}</span>
                      </div>
                      <p><strong>Service:</strong> {activity.serviceName}</p>
                      <p><strong>Date:</strong> {activity.date}</p>
                      <p><strong>Price:</strong> {activity.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p
                className="no-cars-message"
              >
                You haven't Booked any Services yet.
              </p>
            ))}
          {activeTab === 'addcar' && (
            <div className="car-section">
              <h3>My Cars</h3>
              <div className="car-list">
                {cars.length > 0 ? (
                  cars.map(car => (
                    <div key={car.id} className="car-card">
                      <div className="car-logo-container">
                        <img
                          src={carBrandLogos[car.make]}
                          alt={`${car.make} logo`}
                          className="car-logo"
                        />
                      </div>
                      <div className="car-details">
                        <h4>{car.make} {car.model}</h4>
                        <p><strong>Year:</strong> {car.year}</p>
                      </div>
                      <button className="remove-car" onClick={() => removeCar(car)}>Remove</button>
                    </div>
                  ))
                ) : (
                  <p>You haven't added any cars yet.</p>
                )}
              </div>

              {/* Add New Car Form */}
              <div className="add-car">
                <h3>Add a New Car</h3>
                <form onSubmit={addCar} className="add-car-form">
                  <label>Make:</label>
                  <select name="make" value={newCar.make} onChange={handleInputChange} required>
                    <option value="">Select a Car Brand</option>
                    {carBrands.map((brand, index) => (
                      <option key={index} value={brand}>{brand}</option>
                    ))}
                  </select>
                  <label>Model:</label>
                  <input
                    type="text"
                    name="model"
                    value={newCar.model}
                    onChange={handleInputChange}
                    placeholder="Car Model"
                    required
                  />
                  <label>Year:</label>
                  <input
                    type="year"
                    name="year"
                    value={newCar.year}
                    onChange={handleInputChange}
                    placeholder="Car Year"
                    required
                  />
                  <button type="submit">Add Car</button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'bookService' && (
            <div>
              <ul>
                <div className="services-list">
                  {loading ? () => showAlert("Loading...", "warning"):(services.map(service => (
                    <div key={service._id} className="service-card">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <p>Price: ${service.price}</p>
                      <p>Category: {service.category}</p>
                      <button onClick={() => handleBookService(service)}>Book an Appointment</button>
                    </div>
                  )))}
                </div>
              </ul>

              {selectedService && (
                <div className="booking-form-main">
                  <div className="booking-form">
                    <h3 className="booking-title">Book a Appointment:</h3>
                      <div className="form-group">
                        <label htmlFor="service-name">Service Name:</label>
                        <input
                          disabled="disabled"
                          id="service-name"
                          type="text"
                          placeholder={selectedService.title}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="car-brand">Car Brand:</label>
                        <select
                          id="car-brand"
                          required
                          className="form-input"
                          value={carBrand}
                          onChange={(e) => setCarBrand(e.target.value)}
                        >
                          <option value="" disabled>Select a Car Brand</option>
                          <option value="TATA">TATA</option>
                          <option value="Audi">Audi</option>
                          <option value="BMW">BMW</option>
                          <option value="Maruti Suzuki">Maruti Suzuki</option>
                          <option value="KIA">KIA</option>
                          <option value="Toyota">Toyota</option>
                          <option value="Honda">Honda</option>
                          <option value="Ford">Ford</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="car-model">Car Model:</label>
                        <input
                          id="car-model"
                          type="text"
                          placeholder="Enter your car model"
                          required
                          className="form-input"
                          value={carModel}
                          onChange={(e) => setCarModel(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                          id="date"
                          type="date"
                          required
                          className="form-input"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]} 
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="time-slot">Time Slot:</label>
                        <select
                          id="time-slot"
                          required
                          className="form-input"
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                        >
                          <option value="" disabled>Select a time slot</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                        </select>
                      </div>

                      <button className="btn-primary" onClick={makepayment}>
                        Pay Now
                      </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </>

  );
};

export default ProfilePage;
