import React from 'react';

const ContactUsPage = () => (
  <div style={{ maxWidth: 600, margin: '40px auto', background: '#f7f9fc', borderRadius: 16, boxShadow: '0 4px 24px #1976d211', padding: '2.5rem 2rem' }}>
    <h1 style={{ color: '#1976d2', fontWeight: 700, marginBottom: 18 }}>Contact Us</h1>
    <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: 18 }}>
      Have questions, feedback, or need support? Reach out to us!
    </p>
    <div style={{ fontSize: '1rem', color: '#222', marginBottom: 10 }}>
      <b>Email:</b> <a href="mailto:support@bankaggregator.com" style={{ color: '#1976d2' }}>support@bankaggregator.com</a>
    </div>
    <div style={{ fontSize: '1rem', color: '#222', marginBottom: 10 }}>
      <b>Phone:</b> <a href="tel:+18001234567" style={{ color: '#1976d2' }}>+1 800 123 4567</a>
    </div>
    <div style={{ fontSize: '1rem', color: '#222', marginBottom: 10 }}>
      <b>Address:</b> 123 Fintech Avenue, Suite 100, City, Country
    </div>
    <div style={{ marginTop: 30, color: '#555', fontSize: '0.98rem' }}>
      We aim to respond to all queries within 1 business day.
    </div>
  </div>
);

export default ContactUsPage;
