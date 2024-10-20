
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaUserGroup } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { BiMailSend } from "react-icons/bi";
import './Admin.css';


import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/footer/Footer'
import { FetchUsersAPI, FetchBookingsAPI, EditStatusAPI, SendNotificationAPI } from '../../apis';

function Admin() {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedService, setSelectedService] = useState(null);
  const [user, setUser] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [sortOption, setSortOption] = useState('');

  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');



  // Helper function to parse date strings in 'DD/MM/YYYY' format
  const parseDateString = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`); // Convert to 'YYYY-MM-DD' format for Date()
  };

  const sortByDate = () => {
    const sortedBookings = [...bookings].sort((a, b) => {
      const dateA = parseDateString(a.date);
      const dateB = parseDateString(b.date);

      return dateA - dateB; // Ascending order by date
    });

    // Update state with the sorted bookings
    setBookings(sortedBookings);
  };

  const sortByStatus = () => {
    const sortedBookings = [...bookings].sort((a, b) => {
      // Sorting in alphabetical order by status
      if (a.status.toLowerCase() < b.status.toLowerCase()) return 1;
      if (a.status.toLowerCase() > b.status.toLowerCase()) return -1;
      return 0;
    });
    // Update state with the sorted bookings
    setBookings(sortedBookings);
  };




  const [users, setUsers] = useState([{
    "_id": "670b66cf5e635e9b8af0daca",
    "name": "Sample",
    "email": "Sample@gmail.com",
    "phone": "XXXXXXXXX",
    "isVerified": false,
    "createdAt": "2024-10-13T06:21:03.884Z"
  }]);

  const fetchUsers = async () => {
    try {
      const response = await FetchUsersAPI();
      const data = await response;
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const fetchBookings = async () => {
    let query = '';
    if (searchEmail) query += `email=${searchEmail}&`;
    if (sortOption) query += `sortBy=${sortOption}`;

    const response = await FetchBookingsAPI(query);
    const data = await response
    setBookings(data);
  };

  const handleStatusChange = async (bookingId) => {
    const id = { bookingId };
    const response = await EditStatusAPI(id);
    const data = await response.msg;
    alert(data);
    fetchBookings(); // Refresh the bookings list
  };


  const navigate = useNavigate();
  useEffect(() => {
    fetchUsers();
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);

    } else {
      navigate('/login');
    }
  }, [history]);

  useEffect(() => {
    fetchBookings();
  }, [searchEmail, sortOption]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedService(null);
  };

  const handlelogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  if (!users) {
    return <div>Loading...</div>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const mailDetails = { subject, content };
    const response = await SendNotificationAPI(mailDetails);

    const data = await response;
    if (response.ok) {
      alert('Notification sent successfully!');
      setSubject('');
      setContent('');
    } else {
      alert('Error sending notification: ' + data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange('profile')}
        >
          <FaUser /> My Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'listusers' ? 'active' : ''}`}
          onClick={() => handleTabChange('listusers')}
        >
          <FaUserGroup /> List Of User
        </button>
        <button
          className={`tab-button ${activeTab === 'listbookings' ? 'active' : ''}`}
          onClick={() => handleTabChange('listbookings')}
        >
          <TbBrandBooking /> List of Bookings
        </button>
        <button
          className={`tab-button ${activeTab === 'notification' ? 'active' : ''}`}
          onClick={() => handleTabChange('Notification')}
        >
          <BiMailSend /> Push Notification
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
                <p><strong>Account Status</strong> </p>
                <span className={`status-badge ${user.isVerified}`}>{user.isVerified ? <p>Verifed</p> : <p>Not Verified</p>}</span>
              </div>
            </div>
            <button onClick={handlelogout} className="logout-btn">Logout</button>
          </div>
        )}

        {activeTab === 'listusers' && (
          <div className="admin-panel">
            <h2>User List</h2>
            <table class="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Verified</th>
                </tr>
              </thead>
              <tbody id="user-list">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.isVerified ? 'Yes' : 'No'}</td>
                    {/* <td>
                      <button onClick={() => removeUser(user._id)}>Remove</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'listbookings' && (
          <div className="admin-bookings-container">
            <div className="search-sort-container">
              <input
                type="text"
                placeholder="Search by email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <button onClick={sortByStatus} className="sort-button">
                Sort by Status
              </button>
              <button onClick={sortByDate} className="sort-button">
                Sort by Appointment Date
              </button>
            </div>
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Vehicle Name</th>
                  <th>Service</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.email}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.vehicle}</td>
                    <td>{booking.serviceName}</td>
                    <td>{booking.date}</td>
                    <td>{booking.timeSlot}</td>
                    <td>{booking.price}</td>
                    <td>{booking.status}</td>
                    <td>
                      {booking.status === 'Completed' ? (<p></p>) : (<button onClick={() => handleStatusChange(booking.id)}>
                        Mark as Completed
                      </button>)}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {activeTab === 'Notification' && (
        <div className="notification-form">
          <h2>Send Push Notification</h2>
          <form onSubmit={handleSubmit} className="notification-form-content">
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="btn-submit">Send Notification</button>
          </form>
        </div>

      )}
      <div className="vcp__footer-copyright">
        <p>@2024 Vehicle Care Platform. All rights reserved.</p>
      </div>
    </>
  )
}

export default Admin;