import React, { useState } from 'react';
import { AddBookingAPI } from '../apis';
import { useNavigate } from 'react-router-dom';


const PaymentSuccess = () => {

  const [paymentsuccess, SetpaymentSuccess] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/profile');
  };
  const AddBooking = async (bookingDetails) => {
    const response = await AddBookingAPI(bookingDetails);
    return response;
  }

  const handlebooking = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const ServiceData = JSON.parse(localStorage.getItem('service'));
    const phone = userData.phone;
    const bookingDetails = {
      serviceName: ServiceData.title,
      carBrand: ServiceData.carBrand,
      carModel: ServiceData.carModel,
      vehicle: `${ServiceData.carBrand} ${ServiceData.carModel}`,
      date: ServiceData.date,
      timeSlot: ServiceData.timeSlot,
      price: ServiceData.price,
      status: 'Upcoming',
      email: userData.email,
      phone: phone,
      name: userData.name
    };
    const response = await AddBooking(bookingDetails);
    const data = await response;
    if (data.success) {
      
      SetpaymentSuccess(true);
      alert(data.msg);
      localStorage.removeItem('service');
      
    } else {
      alert(data.msg);
    }
  }
  return (
    <div className="access-denied-container">
      <div className="access-denied-card">
        <span className="emoji">✔️</span>
        

        {
          paymentsuccess ? (
            <>
              <h1>Booking Confirmed!</h1>
              <p>
              Your booking has been successfully confirmed. You're all set!
              </p>
              <p>
              You can now close this window. If you need to make any changes to your booking, please visit your account or contact support.
              </p>
              <button className="go-back-button" onClick={handleButtonClick}>Go Back</button>
            </>
          ) :
            
            <>
            <h1>Your Payment made Successfully...</h1>
            <p>
              Your Payment has been successfully Received. Please note that your booking is not confirmed yet.
            </p>
            <p>
              To confirm your booking, click on the "Confirm Booking" button below. If you do not confirm, your booking will not be finalized.
            </p>
            <button onClick={handlebooking}>Confirm Booking</button>
          </>
        }

        <p>Thank you for choosing our service!</p>


      </div>
    </div>
  );
};

export default PaymentSuccess;
