import React from 'react';
import { Navigate } from 'react-router-dom';


const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  // Fallback: allow if accountNumber is present (account-based login)
  const accountNumber = localStorage.getItem('accountNumber');
  if (accountNumber) return { accountNumber };
  return null;
};

const ProtectedRoute = (props) => {
  const { children, role } = props;
  const token = localStorage.getItem('token');
  const user = getUser();
  // Allow if user exists (from user or accountNumber)
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
