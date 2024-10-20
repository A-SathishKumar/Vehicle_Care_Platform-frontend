
import React from 'react';
// import people from '../../assets/people.png';
import ai from '../../assets/service2.png';
import './header.css';

const Header = () => (
  <div className="vcp__header section__padding" id="home">
    <div className="vcp__header-content">
      <h1 className="gradient__text">Drive Worry-Free with Our Expert Vehicle Care</h1>
      <p>Your Car is your asset, your prized possession you care about. But do you care about your car the right way? Take care of your car the right way with VehicleCare. We bring you India's best Car service near you in Chennai, at the most affordable prices.</p>
      <button className="book-appointment-btn">Schedule a Service</button>
    </div>

    <div className="vcp__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;