import { Component, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomeScreen from './pages/HomeScreen'
import Login from './pages/login';
import Register from './pages/register';
import UserPage from './pages/UserPage/UserPage';
import AccountActivation from './pages/AccountActivation';
import ForgetPass from './pages/ForgetPass/ForgetPass';
import ServiceList from './pages/Service/Service';
import Admin from './pages/AdminPage/Admin';
import AccessDenied from './pages/NoAccess/accessdeniced';
import ServicePayment from './pages/PaymentTest';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
  
const PrivateRoute = ({ Component }) => {
  const isAuthenticated = Boolean(localStorage.getItem('user'));
  if (isAuthenticated) {
    return Component
  } else {
    return <Navigate to="/login" />
  }
}

const IsAuthorizated = ({ Component }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('role'));
  if (isAuthenticated === 'admin') {
    return Component
  } else {
    return <Navigate to="/access-denied" />
  }
}

function App() {
  const role = localStorage.getItem('role');
  return (
    <Router>
      <Routes>
        <Route path='/profile' element={<PrivateRoute Component={<UserPage />} />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account" element={<AccountActivation />} />
        <Route path='/forget-password' element={<ForgetPass />} />
        <Route path='/service' element={<ServiceList />} />
        <Route path='/admin' element={<IsAuthorizated Component={<Admin/>}/>} />
        <Route path='/access-denied' element={<AccessDenied/>}/>
        <Route path='/payment-success' element={<PaymentSuccess/>}/>
        <Route path='/payment-cancel' element={<PaymentCancel/>}/>
        <Route path='/test' element={<ServicePayment/>}/>
      </Routes>


    </Router>
  )
}

export default App

