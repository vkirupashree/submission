import React from 'react';

const AboutPage = () => {


  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2.5rem 1rem' }}>
      <div style={{ background: 'linear-gradient(120deg, #f7f9fc 60%, #e3e9f7 100%)', borderRadius: 18, boxShadow: '0 2px 16px rgba(26,35,126,0.10)', padding: '2.5rem 2rem', marginBottom: 32 }}>
        <h1 style={{ color: '#1976d2', fontWeight: 700, fontSize: '2.1rem', marginBottom: 12 }}>About Us</h1>
        <p style={{ fontSize: '1.15rem', color: '#333', marginBottom: 0 }}>
          Welcome to our <b>Banking Aggregator</b> platform. We help you manage all your bank accounts in one place with ease and security.<br />
          Our mission is to simplify your financial life with a modern, secure, and user-friendly experience.
        </p>
      </div>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', padding: '2.2rem 2rem', maxWidth: 650, margin: '0 auto' }}>
        <h2 style={{ color: '#1976d2', fontWeight: 600, fontSize: '1.3rem', marginBottom: 18, textAlign: 'center' }}>Why Choose Us?</h2>
        <ul style={{ fontSize: '1.08rem', color: '#333', marginBottom: 18, lineHeight: 1.7, paddingLeft: 24 }}>
          <li><b>Unified Dashboard:</b> View and manage all your bank accounts from different banks in one secure place.</li>
          <li><b>Modern UI/UX:</b> Enjoy a beautiful, responsive, and intuitive interface designed for ease of use on any device.</li>
          <li><b>Powerful Admin Tools:</b> Sysadmins can manage users, banks, and accounts with advanced controls and real-time updates.</li>
          <li><b>Secure Authentication:</b> Robust login and account management with role-based access for users and sysadmins.</li>
          <li><b>Self-Service Account Creation:</b> Users can create their own accounts after registration, with clear guidance and instant feedback.</li>
          <li><b>Comprehensive Support:</b> Dedicated support team available via the Contact Us page for any queries or issues.</li>
        </ul>
        <h3 style={{ color: '#1976d2', fontWeight: 600, fontSize: '1.1rem', marginBottom: 10 }}>Our Values</h3>
        <ul style={{ fontSize: '1.05rem', color: '#444', marginBottom: 0, lineHeight: 1.6, paddingLeft: 24 }}>
          <li><b>Transparency:</b> No hidden fees, clear communication, and open processes.</li>
          <li><b>Security:</b> Your data and privacy are our top priority, with industry-standard encryption and best practices.</li>
          <li><b>Innovation:</b> We continuously improve our platform to bring you the latest in fintech convenience.</li>
          <li><b>Customer Focus:</b> Your experience matters—our features and support are built around your needs.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
