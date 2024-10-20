import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { SendOTPAPI,VerifyOTPAPI,ResetPasswordAPI } from '../../apis';
import './ForgetPass.css';

function ForgotPassword() {
  const [step, setStep] = useState(1); // Track the current step (1: Email, 2: OTP, 3: Reset Password)
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const SendOTP = async ()=>{
    const response = await SendOTPAPI({email});
    console.log(response)
    return response;
  };
  const VerifyOTP = async ()=>{
    const data = {
      email:email,
      otp:otp
    }
    const response = await VerifyOTPAPI(data);
    console.log(response);
    return response;
  }

  const ResetPassword = async()=>{
    const data = {
      email:email,
      password:password
    };
    const response = await ResetPasswordAPI(data);
    console.log(response);
    return response;
  }

  // Step 1: Handle email submission and send OTP
  const handleEmailSubmit = async (e) => {

    e.preventDefault();
    try{
      const response =   await SendOTP();
      if(response.success){
        alert(response.msg);
        setStep(2);
      }else{
        alert(response);
      }
      // setStep(2); 
    }catch(e){
      alert(e);
    }
    // const emailExists = true;

    // if (emailExists) {
    //   // Simulate generating and sending OTP
    //   try{
    //     const response =   await SendOTP();
    //     if(response.success){
    //       alert(response.msg);
    //       setStep(2);
    //     }else{
    //       alert(response);
    //     }
    //     // setStep(2); 
    //   }catch(e){
    //     alert(e);
    //   }
    //   // Proceed to OTP verification
    // } else {
    //   setErrorMessage('Email does not exist.');
    // }
  };

  // Step 2: Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await VerifyOTP();
      if(response.success){
        alert("OTP Verfied Successfully");
        setStep(3);
      }else{
        alert(response);
      }
    }catch(e){
      console.log(e.message);
    }
  };

  // Step 3: Handle password reset
  const handlePasswordReset = async(e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const response = await ResetPassword();
      if(response.success){
        setStep(4);
      }else{
        alert("Somthing Went Wrong, Please Try again Later");
      }
    } else {
      setErrorMessage('Passwords do not match.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Step 1: Enter Email */}
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <div className="form-group">
            <label htmlFor="email">Enter your email address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
            />
          </div>
          <button type="submit">Send OTP</button>
        </form>
      )}

      {/* Step 2: Enter OTP */}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <div className="form-group">
            <label htmlFor="otp">Enter OTP sent to your email:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {/* Step 3: Reset Password */}
      {step === 3 && (
        <form onSubmit={handlePasswordReset}>
          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}

      {/* Step 4: Password Reset Success */}
      {step === 4 && (
        <div>
          <p>Password reset successful! You can now log in with your new password. <Link to="/login" className="text-decoration-none">
                                        Click Here To Login{' '}
                                    </Link></p>
        </div>
      )}
    </div>
    </>
  );
}

export default ForgotPassword;
