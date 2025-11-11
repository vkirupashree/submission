import React from "react";

export default function Contact() {
  return (
    <div className="page contact">
      <h2>Contact Me</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
