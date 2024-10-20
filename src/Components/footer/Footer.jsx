import React from 'react';
import vcpLogo from '../../assets/logo.png';
import './footer.css';

const Footer = () => (
  <div className="vcp__footer section__padding">
    <div className="vcp__footer-heading">
      <h1 className="gradient__text">Get 20% off your first service when you book online today. Don't miss out on this exclusive deal!</h1>
    </div>

    <div className="vcp__footer-btn">
    <button className="book-appointment-btn">Claim Your Discounts</button>
    </div>

    <div className="vcp__footer-links">
      <div className="vcp__footer-links_logo">
        <img src={vcpLogo} alt="vcp_logo" />
        <p>© 2024 Vehicle Care Platform.<br /> All Rights Reserved</p>
      </div>
      <div className="vcp__footer-links_div">
        <h4>Links</h4>
        <p>Instagram</p>
        <p>Facebook</p>
        <p>KOO</p>
        <p>Twiitter</p>
      </div>
      <div className="vcp__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="vcp__footer-links_div">
        <h4>Get in touch</h4>
        <p>Vehicle Care Platform</p>
        <p>1-800-555-1234</p>
        <p>support@vehiclecare.com</p>
      </div>
    </div>

    <div className="vcp__footer-copyright">
      <p>@2024 Vehicle Care Platform. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;