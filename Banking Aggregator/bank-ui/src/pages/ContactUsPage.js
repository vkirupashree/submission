import React from 'react';
import './ContactUsPage.css';

const tamilPunch = 'நான் ஒருத்தன் சொன்னா நம்பாதீங்க, இரண்டு பேரு சொன்னா யோசிங்க, மூன்று பேரு சொன்னா விசாரிங்க!'; // Famous punch dialog

const ContactUsPage = () => (
  <div className="contact-root">
    <div className="contact-card">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-punch">{tamilPunch}</div>
      <div className="contact-info">
        <b>Email:</b> <a href="mailto:support@bankaggregator.com">support@bankaggregator.com</a>
      </div>
      <div className="contact-info">
        <b>Phone:</b> <a href="tel:+18001234567">+1 800 123 4567</a>
      </div>
      <div className="contact-address">
        <b>Address:</b> 456 Anna Salai, Teynampet, Chennai, Tamil Nadu 600018, India
      </div>
      <div className="contact-note">
        We aim to respond to all queries within 1 business day.<br/>
        <span style={{fontSize: '0.95rem', color: '#fb923c'}}>வணக்கம்! தமிழ்நாட்டில் இருந்து உங்கள் சேவையில்...</span>
      </div>
    </div>
  </div>
);

export default ContactUsPage;
