
import React from 'react';
import '../AppTheme.css';

const cardStyle = {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 12px #0001',
    padding: '2rem 1.5rem',
    minWidth: 220,
    maxWidth: 260,
    flex: '1 1 220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    transition: 'transform 0.15s',
    cursor: 'pointer',
    border: '1.5px solid #e3e9f7',
    marginBottom: 8,
};
const iconStyle = {
    fontSize: '2.3rem',
    marginBottom: 8,
};
const titleStyle = {
    color: '#1976d2',
    fontWeight: 700,
    fontSize: '1.15rem',
    margin: 0,
};
const descStyle = {
    color: '#333',
    fontSize: '1rem',
    textAlign: 'center',
    margin: 0,
};

const Home = () => (
    <div className="page-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1rem' }}>
        <h2 style={{ color: '#1976d2', fontWeight: 700, fontSize: '2.1rem', marginBottom: 10 }}>Welcome to Banking Aggregator</h2>
        <p style={{ fontSize: '1.15rem', color: '#333', marginBottom: 32 }}>
            <strong>Banking Aggregator</strong> is your one-stop solution to manage all your bank accounts, transactions, and financial activities in a single, secure platform.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', marginBottom: 40 }}>
            {/* Feature Cards */}
            <div style={cardStyle}>
                <span style={iconStyle}>🏦</span>
                <h3 style={titleStyle}>Multi-Bank Accounts</h3>
                <p style={descStyle}>View and manage accounts from multiple banks in one place.</p>
            </div>
            <div style={cardStyle}>
                <span style={iconStyle}>💳</span>
                <h3 style={titleStyle}>Real-Time Transactions</h3>
                <p style={descStyle}>Track all your deposits, withdrawals, and balances instantly.</p>
            </div>
            <div style={cardStyle}>
                <span style={iconStyle}>🔄</span>
                <h3 style={titleStyle}>Fund Transfer</h3>
                <p style={descStyle}>Easily transfer funds between accounts and close accounts securely.</p>
            </div>
            <div style={cardStyle}>
                <span style={iconStyle}>📊</span>
                <h3 style={titleStyle}>Advanced Data Grids</h3>
                <p style={descStyle}>Sort, search, and filter your data with powerful grid features.</p>
            </div>
            <div style={cardStyle}>
                <span style={iconStyle}>🛡️</span>
                <h3 style={titleStyle}>Admin Controls</h3>
                <p style={descStyle}>Manage users, banks, and branches with advanced admin tools.</p>
            </div>
            <div style={cardStyle}>
                <span style={iconStyle}>💡</span>
                <h3 style={titleStyle}>Modern UI</h3>
                <p style={descStyle}>Enjoy a beautiful, responsive interface on all your devices.</p>
            </div>
            <div style={cardStyle}>
                <span style={iconStyle}>📱</span>
                <h3 style={titleStyle}>Mobile Friendly</h3>
                <p style={descStyle}>Access your banking dashboard anytime, anywhere.</p>
            </div>
            <div style={cardStyle}>
                <span style={iconStyle}>📬</span>
                <h3 style={titleStyle}>Contact & Support</h3>
                <p style={descStyle}>Reach out to us anytime via the About page contact form.</p>
            </div>
        </div>
        <p style={{ fontSize: '1.08rem', color: '#444', textAlign: 'center', marginTop: 24 }}>
            Get started by registering or logging in. Enjoy seamless banking with <strong>Banking Aggregator</strong>!
        </p>
    </div>
);

export default Home;
