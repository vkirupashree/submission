import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import { FaUserCircle } from 'react-icons/fa';
import '../../AppTheme.css';


const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  // Fallback: if accountNumber or accountId is present, treat as logged in
  const accountNumber = localStorage.getItem('accountNumber');
  const accountId = localStorage.getItem('accountId');
  if (accountNumber || accountId) return { accountNumber, accountId };
  return null;
};


const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!getUser());
  const [currentUser, setCurrentUser] = useState(getUser());

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setCurrentUser(null);
    navigate('/login');
  };

  React.useEffect(() => {
    const syncUser = () => {
      const user = getUser();
      setCurrentUser(user);
      setLoggedIn(!!user);
    };
    syncUser();
    window.addEventListener('storage', syncUser);
    return () => {
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Banking Aggregator</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {currentUser && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/transactions">Transactions</Link>
            {currentUser.role === 'Sysadmin' && <Link to="/manage-users">Manage Users</Link>}
            {currentUser.role === 'Sysadmin' && <Link to="/manage-banks">Manage Banks</Link>}
          </>
        )}
        <Link to="/contact">Contact Us</Link>
        {!currentUser && <Link to="/login">Login</Link>}
        {currentUser && (
          <div className="navbar-profile" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '1rem' }}>
            <FaUserCircle size={24} style={{ marginRight: '0.5rem' }} />
            <span style={{ marginRight: '1rem' }}>{currentUser.name || currentUser.username || currentUser.accountNumber || 'User'}</span>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
