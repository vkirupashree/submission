import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../services/accountService';
import { fetchBanks } from '../services/bankService';
import { fetchUsers } from '../services/userService';

// @ts-nocheck
const BankDetailsPage = () => {
  const [banks, setBanks] = useState([]);
  const [users, setUsers] = useState([]);

  // Type assertions to avoid 'never' property errors
  /** @type {any[]} */
  const banksArr = banks;
  /** @type {any[]} */
  const usersArr = users;
  const [bankId, setBankId] = useState('');
  const [userId, setUserId] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('Savings');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');


  // Try to get userId from localStorage (after registration or login)
  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && user.id) setUserId(user.id);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const loadBanksAndUsers = async () => {
      try {
        const [banksData, usersData] = await Promise.all([
          fetchBanks(token),
          fetchUsers(token)
        ]);
        setBanks(banksData);
        setUsers(usersData);
        if (banksData.length > 0) setBankId(banksData[0].bankId || banksData[0].BankId || banksData[0].id);
        if (usersData.length > 0 && !userId) setUserId(usersData[0].id || usersData[0].userId);
      } catch (e) {
        setError('Failed to load banks or users');
      }
    };
    loadBanksAndUsers();
    // eslint-disable-next-line
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!bankId) {
      setError('Please select a bank.');
      return;
    }
    if (!userId) {
      setError('Please select a user.');
      return;
    }
    try {
      await createAccount({
        userId: parseInt(userId),
        bankId: parseInt(bankId),
        accountNumber,
        balance: parseFloat(balance),
        accountType
      }, token);
      setSuccess('Account created successfully!');
      setTimeout(() => navigate('/accounts'), 1200);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    }
  };

  return (
    <div className="auth-container">
      <h1>Enter Bank Details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bankId">Bank</label>
        <select
          id="bankId"
          value={bankId}
          onChange={e => setBankId(e.target.value)}
          required
        >
          <option value="">Select a bank</option>
          {banksArr.map((b) => (
            <option key={b.bankId || b.BankId || b.id} value={b.bankId || b.BankId || b.id}>
              {b.bankName || b.BankName || b.name}
            </option>
          ))}
        </select>

        <label htmlFor="userId">User</label>
        <select
          id="userId"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        >
          <option value="">Select a user</option>
          {usersArr.map((u) => (
            <option key={u.id || u.userId} value={u.id || u.userId}>
              {u.fullName || u.FullName || u.email || u.Email}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={e => setAccountNumber(e.target.value)}
          required
        />
        <select
          value={accountType}
          onChange={e => setAccountType(e.target.value)}
          required
        >
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
        </select>
        <input
          type="number"
          placeholder="Initial Balance"
          value={balance}
          onChange={e => setBalance(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default BankDetailsPage;
