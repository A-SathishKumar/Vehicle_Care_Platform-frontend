import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png';
import './navbar.css';
import { useLocation } from 'react-router-dom';
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const isAuthenticated = Boolean(localStorage.getItem('user'));
  const isAdmin = Boolean(localStorage.getItem('role'));

  const location = useLocation();

  return (
    <div className="vcp__navbar">
      <div className="vcp__navbar-links">
        <div className="vcp__navbar-links_logo">
          <a href='/'>
            <img src={logo} />
          </a>

        </div>
        {location.pathname === "/" && (
          <div className="vcp__navbar-links_container">
            <p><a href="#home">Home</a></p>
            <p><a href="#detail">What is VCP?</a></p>
            <p><a href="#why">Why VCP?</a></p>
            <p><a href="#faq">Car Service</a></p>
          </div>
        )}
      </div>
      <div className="vcp__navbar-sign">
        {isAdmin && (<a href='/admin'>
          <button type="button">Admin Panel</button>
        </a>)}
        {isAuthenticated ? (<a href='/profile'>
          <button type="button">Profile</button>
        </a>) : (<a href='/register'>
          <button type="button">Sign Up</button>
        </a>)}
      </div>
      <div className="vcp__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="vcp__navbar-menu_container scale-up-center">
            <div className="vcp__navbar-menu_container-links">
              <p><a href="#home">Home</a></p>
              <p><a href="#wvcp">What is vcp?</a></p>
              <p><a href="#possibility">Open AI</a></p>
              <p><a href="#features">Case Studies</a></p>
              <p><a href="#blog">Library</a></p>
            </div>
            <div className="vcp__navbar-menu_container-links-sign">
              <p>Sign in</p>
              <button type="button">Sign up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;