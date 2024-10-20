import React from 'react';
import serviceImage from '../../assets/service1.png';
import serviceImage1 from '../../assets/service.png';
import './Detail.css';

const Detail = () => (
    <>
    <div className="vcp__detail section__padding" id="detail">
        <div className="vcp__detail-image">
            <img src={serviceImage} alt="detail" />
        </div>
        <div className="vcp__detail-content">
            <h4>About US</h4>
            <h1 className="gradient__text">Why Choose VehicleCare for Car Services in Chennai?</h1>
            <p>Your Car is your asset, your prized possession you care about. But do you care about your car the right way? Take care of your car the right way with VehicleCare. We bring you India's best Car service near you in Chennai, at the most affordable prices.</p>
            <button className="book-appointment-btn">Schedule a Service</button>
        </div>
     </div>

     <div className="vcp__detail section__padding" id="why">
        <div className="vcp__detail-content">
            <h4>Why Vehicle Care Platform</h4>
            <h1 className="gradient__text">VehicleCare for Repairs</h1>
            <p>Welcome to VehicleCare for Repairers. We provide a platform for auto repair shops and technicians to connect with customers and expand their business. Our solution streamlines the entire process from damage assessment to repair. This makes it easier for repairers to manage their workflow and offer quick and efficient service to customers.</p>
            <button className="book-appointment-btn">Schedule a Service</button>
        </div>
        <div className="vcp__detail-image">
            <img src={serviceImage1} alt="detail" />
        </div>
     </div>
    </>
  

  
);

export default Detail;