import React from 'react';
import '../AppTheme.css';
import './HomePage.css';

const features = [
  { icon: '🏦', title: 'Multi-Bank Accounts', desc: 'View and manage accounts from multiple banks in one place.' },
  { icon: '💳', title: 'Real-Time Transactions', desc: 'Track all your deposits, withdrawals, and balances instantly.' },
  { icon: '🔄', title: 'Fund Transfer', desc: 'Easily transfer funds between accounts and close accounts securely.' },
  { icon: '📊', title: 'Advanced Data Grids', desc: 'Sort, search, and filter your data with powerful grid features.' },
  { icon: '🛡️', title: 'Admin Controls', desc: 'Manage users, banks, and branches with advanced admin tools.' },
  { icon: '💡', title: 'Modern UI', desc: 'Enjoy a beautiful, responsive interface on all your devices.' },
  { icon: '📱', title: 'Mobile Friendly', desc: 'Access your banking dashboard anytime, anywhere.' },
  { icon: '📬', title: 'Contact & Support', desc: 'Reach out to us anytime via the About page contact form.' },
];

const Home = () => (
  <div className="home-root">
    <section className="home-hero">
      <h1>Welcome to <span>Banking Aggregator</span></h1>
      <p className="home-hero-tagline">
        Your one-stop solution to manage all your bank accounts, transactions, and financial activities in a single, secure platform.
      </p>
    </section>
    <section className="home-features">
      {features.map((f, i) => (
        <div className="home-feature-card" key={f.title} style={{ animationDelay: `${0.1 * i}s` }}>
          <span className="home-feature-icon">{f.icon}</span>
          <h3 className="home-feature-title">{f.title}</h3>
          <p className="home-feature-desc">{f.desc}</p>
        </div>
      ))}
    </section>
    <div className="home-footer">
      Get started by registering or logging in. Enjoy seamless banking with <strong>Banking Aggregator</strong>!
    </div>
  </div>
);

export default Home;
