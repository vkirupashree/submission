import React from 'react';
import './AboutPage.css';
import { FaUniversity, FaLock, FaUsers, FaChartLine, FaRegHandshake } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-root">
      <section className="about-hero">
        <div className="about-hero-content">
          <FaUniversity className="about-hero-icon" />
          <h1>About <span>Banking Aggregator</span></h1>
          <p className="about-hero-tagline">Empowering your financial journey with security, innovation, and trust.</p>
        </div>
      </section>
      <section className="about-main">
        <div className="about-section about-mission">
          <h2>Our Mission</h2>
          <p>To simplify and secure your financial life by providing a unified platform for managing all your bank accounts, empowering you to make smarter financial decisions with confidence.</p>
        </div>
        <div className="about-section about-vision">
          <h2>Our Vision</h2>
          <p>To be the most trusted and innovative banking aggregator, setting new standards in digital finance and customer experience.</p>
        </div>
        <div className="about-section about-features">
          <h2>Why Choose Us?</h2>
          <div className="about-features-list">
            <div className="about-feature-card"><FaUsers /><span>Unified Dashboard</span><p>Manage all your accounts from different banks in one secure place.</p></div>
            <div className="about-feature-card"><FaLock /><span>Bank-Grade Security</span><p>Industry-standard encryption and privacy for your peace of mind.</p></div>
            <div className="about-feature-card"><FaChartLine /><span>Modern Experience</span><p>Beautiful, responsive, and intuitive interface for all devices.</p></div>
            <div className="about-feature-card"><FaRegHandshake /><span>Dedicated Support</span><p>Our team is here to help you every step of the way.</p></div>
          </div>
        </div>
        <div className="about-section about-values">
          <h2>Our Values</h2>
          <ul>
            <li><b>Transparency:</b> No hidden fees, clear communication, and open processes.</li>
            <li><b>Security:</b> Your data and privacy are our top priority, with industry-standard encryption and best practices.</li>
            <li><b>Innovation:</b> We continuously improve our platform to bring you the latest in fintech convenience.</li>
            <li><b>Customer Focus:</b> Your experience matters—our features and support are built around your needs.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
