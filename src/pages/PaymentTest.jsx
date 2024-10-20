import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe
const stripePromise = loadStripe('pk_test_51Q9mD7D0THC1TI31mKxd6BLikEPWyT5EqXoG1sURBhujR04zIrspYnQMqvhFQU9VXQfloFAYR3pzut1cAQdPGHGO001VQazkkC');

const ServicePayment = ({ bookingDetails }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Send bookingDetails to the server to create a payment intent
    const { clientSecret } = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: bookingDetails.price }),
    }).then((res) => res.json());

    // Confirm payment using Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent.status === 'succeeded') {
      // Payment was successful, call the booking API
      const bookingResponse = await fetch('/api/bookings/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (bookingResponse.ok) {
        alert('Booking confirmed!');
      } else {
        alert('Booking failed. Please try again.');
      }

      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Confirm Payment</h2>
      <form onSubmit={handlePaymentSubmit}>
        <CardElement />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading || !stripe}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default ServicePayment;
