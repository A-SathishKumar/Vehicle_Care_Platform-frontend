import React, { useState } from 'react';
import './FAQ.css'
import faqImage from '../../assets/faq.png';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item" id='faq'>
      <div className="faq-question" onClick={toggleFAQ}>
        <h4>{question}</h4>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      <div
        className="faq-answer"
        style={{
          maxHeight: isOpen ? '1000px' : '0px',
          transition: 'max-height 0.4s ease',
          overflow: 'hidden',
        }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: 'What services do you provide?',
      answer: 'We provide services such as oil changes, tire replacement, engine diagnostics, and more.',
    },
    {
      question: 'How do I schedule a service?',
      answer: 'You can schedule a service by contacting us through our website or calling our customer support.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and online payment methods.',
    },
    {
        question: 'What is your cancellation policy?',
        answer: 'You can cancel your appointment up to 24 hours before the scheduled time for a full refund. Cancellations made within 24 hours may incur a fee.',
    },
  ];

  return (
    <section className="section__padding">
      <div className="faq-container">
      {/* <div className="faq-right">
          <img src={faqImage} alt="FAQ Illustration"/>
        </div> */}
        <div className="faq-right">
            
        <div className="contact-card">
            <h2>Have Any Questions?</h2>
            <h3>Contact Us</h3>
            <p>Toll-Free Number: 1-800-555-1234</p>
            <p>Email: support@vehiclecare.com</p>
            <button className="book-appointment-btn">Book an Appointment</button>
          </div>
        </div>
        <div className="faq-left">
          <h1 className="gradient__text"><b>Frequently Asked Questions</b></h1>
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FAQ;
