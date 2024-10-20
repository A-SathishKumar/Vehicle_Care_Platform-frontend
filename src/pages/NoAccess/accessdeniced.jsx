import React from 'react';
import './AccessDenied.css'; // Import your custom CSS

const AccessDenied = () => {
  return (
    <div className="access-denied-container">
      <div className="access-denied-card">
        <span className="emoji">🚫</span>
        <h1>Access Denied</h1>
        <p>
          You are trying to access a page that you don't have permission for. Your attempt has been noted.
        </p>
        <p>If you believe this is an error, please contact support.</p>
        <button className="go-back-button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
