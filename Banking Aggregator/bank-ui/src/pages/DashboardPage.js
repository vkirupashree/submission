import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../services/apiConfig';
import '../AppTheme.css';


function getUserName() {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return 'Demo User';
    const user = JSON.parse(userStr);
    if (user && user.fullName) return user.fullName;
    if (user && user.name) return user.name;
  } catch (err) {}
  return 'Demo User';
}

const DashboardPage = () => {

  /** @type {[any, Function]} */
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [txnType, setTxnType] = useState('deposit');
  const [txnError, setTxnError] = useState('');
  const [txnSuccess, setTxnSuccess] = useState('');
  const [txnLoading, setTxnLoading] = useState(false);
  const [deactivateMsg, setDeactivateMsg] = useState("");
  const [deactivateError, setDeactivateError] = useState("");
  const accountNumber = localStorage.getItem('accountNumber');

  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_BASE_URL}/accounts`);
        if (!response.ok) throw new Error('Failed to fetch accounts');
        const accounts = await response.json();
        // Find the account matching the user's account number
        const data = Array.isArray(accounts) ? accounts.find(a => a.accountNumber === accountNumber) : null;
        if (!data) throw new Error('Account not found');
        setAccount(data);
        if (data && data.accountId) {
          localStorage.setItem('accountId', data.accountId);
        }
      } catch (err) {
        setError('Failed to load account');
      }
      setLoading(false);
    };
    if (accountNumber) {
      fetchAccount();
    } else {
      setLoading(false);
      setError('No account number found.');
    }
  }, [accountNumber]);

  const handleTransaction = async (event) => {
    if (event) event.preventDefault(); // ⭐ Added from the other DashboardPage.js

    setTxnError('');
    setTxnSuccess('');
    setTxnLoading(true);
    try {
      if (!account || !account.accountId) throw new Error('No account loaded');
      const response = await fetch(`${API_BASE_URL}/accounts/${account.accountId}/transaction?amount=${amount}&type=${txnType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Transaction failed');
      const data = await response.json();
      setTxnSuccess(data.Message || 'Transaction successful');

      // Refresh account info
      const accRes = await fetch(`${API_BASE_URL}/accounts`);
      if (accRes.ok) {
        const accounts = await accRes.json();
        const accData = Array.isArray(accounts) ? accounts.find(a => a.accountNumber === account.accountNumber) : null;
        if (accData) setAccount(accData);
      }
      setAmount('');
    } catch (err) {
      let msg = 'Transaction failed';
      if (err && typeof err === 'object') {
        if ('message' in err && typeof err.message === 'string') msg = err.message;
        else if (err.toString && typeof err.toString === 'function') msg = String(err.toString());
      }
      setTxnError(String(msg));
    }
    setTxnLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!account) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>No account data found.</div>;
  }

  const handleDeactivate = async () => {
    setDeactivateMsg("");
    setDeactivateError("");
    if (!window.confirm("Are you sure you want to deactivate your account? This cannot be undone.")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/user/${account.userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to deactivate account');
      setDeactivateMsg("Your account has been deactivated. You will be logged out.");
      setTimeout(() => {
        localStorage.clear();
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      let msg = 'Failed to deactivate account';
      if (err && typeof err === 'object') {
        if ('message' in err && typeof err.message === 'string') msg = err.message;
        else if (err.toString && typeof err.toString === 'function') msg = String(err.toString());
      }
      setDeactivateError(String(msg));
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: 40, minHeight: 220, padding: '2.5rem 2rem' }}>
      <div
        className="dashboard-card"
        style={{
          minWidth: 400,
          maxWidth: 500,
          background: 'linear-gradient(120deg, #f7f9fc 60%, #e3e9f7 100%)',
          borderRadius: 28,
          boxShadow: '0 4px 32px rgba(26,35,126,0.15)',
          padding: '2.8rem 2.5rem 2.2rem 2.5rem',
          textAlign: 'left',
          margin: '0.5rem 0',
          border: '2px solid #dbeafe',
          transition: 'transform 0.15s',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#1976d2 60%,#90caf9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, color: '#fff', fontWeight: 700, boxShadow: '0 2px 8px #1976d233' }}>
            {(account.Name || account.name || 'U')[0]}
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a237e', letterSpacing: 0.5 }}>{account.Name || account.name || 'User'}</div>
            <div style={{ fontSize: '1rem', color: '#1976d2', fontWeight: 500 }}>{account.accountType} Account</div>
          </div>
        </div>

        <div style={{ fontSize: '2.6rem', fontWeight: 700, color: '#1a237e', marginBottom: 18, letterSpacing: 1, textShadow: '0 2px 8px #1976d211' }}>
          ₹ {account.balance?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>

        <div style={{ fontSize: '1.1rem', color: '#555', marginBottom: 10 }}>
          <span style={{ background: '#e3e9f7', color: '#1976d2', borderRadius: 8, padding: '4px 12px', fontWeight: 600 }}>
            A/C: {account.accountNumber}
          </span>
        </div>

        <div style={{ fontSize: '1.08rem', color: '#333', marginBottom: 6 }}>
          <b>Bank:</b> {account.bankName || account.BankName}
        </div>
        <div style={{ fontSize: '1.08rem', color: '#333', marginBottom: 6 }}>
          <b>Branch:</b> {account.branch || account.Branch}
        </div>
        <div style={{ fontSize: '1.08rem', color: '#333', marginBottom: 6 }}>
          <b>State:</b> {account.state || account.State}
        </div>
        <div style={{ fontSize: '1.08rem', color: '#333', marginBottom: 6 }}>
          <b>User ID:</b> {account.userId}
        </div>

        <button onClick={handleDeactivate} style={{ marginTop: 18, background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 7, padding: '0.7rem 1.2rem', fontWeight: 600, fontSize: '1rem', boxShadow: '0 2px 8px #d32f2f22', cursor: 'pointer', transition: 'background 0.2s' }}>
          Deactivate My Account
        </button>
        {deactivateMsg && <div style={{ color: '#388e3c', background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 6, padding: '0.7rem 1rem', marginTop: 10 }}>{deactivateMsg}</div>}
        {deactivateError && <div style={{ color: '#d32f2f', background: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: 6, padding: '0.7rem 1rem', marginTop: 10 }}>{deactivateError}</div>}
      </div>

      <form onSubmit={handleTransaction} style={{ minWidth: 340, maxWidth: 400, background: '#f7f9fc', borderRadius: 20, boxShadow: '0 2px 16px #0001', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch', border: '1.5px solid #e3e9f7' }}>
        <h3 style={{ margin: 0, color: '#1976d2', fontWeight: 700, fontSize: '1.15rem' }}>Deposit / Withdraw</h3>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min="1"
          required
          style={{ padding: '0.7rem 1rem', border: '1.5px solid #bfc7d1', borderRadius: 7, fontSize: '1rem', background: '#fff' }}
        />

        <select value={txnType} onChange={e => setTxnType(e.target.value)} style={{ padding: '0.7rem 1rem', border: '1.5px solid #bfc7d1', borderRadius: 7, fontSize: '1rem', background: '#fff' }}>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>

        <button type="submit" disabled={txnLoading} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 7, padding: '0.8rem 0', fontWeight: 600, fontSize: '1.1rem', marginTop: 8, boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)' }}>
          {txnLoading ? 'Processing...' : 'Submit'}
        </button>

        {txnError && <div style={{ color: '#d32f2f', background: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: 6, padding: '0.7rem 1rem', marginTop: 4 }}>{txnError}</div>}
        {txnSuccess && <div style={{ color: '#388e3c', background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 6, padding: '0.7rem 1rem', marginTop: 4 }}>{txnSuccess}</div>}
      </form>
    </div>
  );
};

export default DashboardPage;
