import React from 'react';
// import './AccessDenied.css'; // Import your custom CSS

const PaymentCancel = () => {
  return (
    <div className="access-denied-container">
      <div className="access-denied-card">
        <span className="emoji">😔</span>
        <h1>Payment Failed!</h1>
        <p>
        Unfortunately, there was an issue processing your payment. Please review your payment details and try again.
        </p>
        <p>If the problem persists, you can contact our support team for assistance.</p>
        <h3><b>Note:</b> Your booking has not been confirmed due to the failed payment.</h3>
        <button className="go-back-button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
