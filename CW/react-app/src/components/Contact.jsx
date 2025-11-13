import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    setShowPopup(true);

    // Hide popup automatically after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    // Optionally clear form
    e.target.reset();
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact Me 📩</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Your message was sent!</h3>
              <p>Thank you for reaching out 😊</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
