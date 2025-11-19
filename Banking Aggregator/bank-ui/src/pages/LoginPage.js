import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../services/apiConfig';

const LoginPage = () => {

  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState('user'); // 'user' or 'sysadmin'
  const [accountNumber, setAccountNumber] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  // Registration fields
  const [userId, setUserId] = useState('');
  const [bankId, setBankId] = useState('');
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');
  const [state, setState] = useState('');
  const [accountType, setAccountType] = useState('Savings');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [createdAccountNumber, setCreatedAccountNumber] = useState('');
  const [name, setName] = useState('');
  const [accountPassword, setAccountPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (loginMode === 'user') {
      if (!accountNumber || !accountPassword) {
        setError('Account number and password are required');
        return;
      }

      // ⭐ NEW: Store accountNumber early + notify navbar
      localStorage.setItem('accountNumber', accountNumber);
      window.dispatchEvent(new Event("storage"));

      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accountNumber, accountPassword })
        });

        if (!response.ok) throw new Error('Invalid account number or password');

        const data = await response.json();

        localStorage.setItem('token', data.Token);
        localStorage.setItem('user', JSON.stringify({
          fullName: data.FullName || '',
          role: data.Role || data.role || ''
        }));
        localStorage.setItem('accountId', data.accountId);
        localStorage.setItem('accountNumber', data.accountNumber);

        // ⭐ NEW: Inform navbar again
        window.dispatchEvent(new Event("storage"));

        navigate('/dashboard');

      } catch (err) {
        let msg = 'Login failed';
        if (err && typeof err === 'object') {
          if ('message' in err && typeof err.message === 'string') msg = err.message;
          else if (err.toString && typeof err.toString === 'function') msg = String(err.toString());
        }
        setError(String(msg));
      }

    } else {
      // Sysadmin login
      if (!adminEmail || !adminPassword) {
        setError('Email and password are required');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: adminEmail, password: adminPassword })
        });

        if (!response.ok) throw new Error('Invalid email or password');

        const data = await response.json();

        if (data.Role && data.Role !== 'Sysadmin' && data.role !== 'Sysadmin') {
          setError('Not a sysadmin account');
          return;
        }

        localStorage.setItem('token', data.Token);
        localStorage.setItem('user', JSON.stringify({
          fullName: data.FullName || '',
          role: data.Role || data.role || ''
        }));

        // ⭐ NEW: Notify navbar
        window.dispatchEvent(new Event("storage"));

        navigate('/dashboard');

      } catch (err) {
        let msg = 'Login failed';
        if (err && typeof err === 'object') {
          if ('message' in err && typeof err.message === 'string') msg = err.message;
          else if (err.toString && typeof err.toString === 'function') msg = String(err.toString());
        }
        setError(String(msg));
      }
    }
  };

  const handleRegister = async () => {
    setError('');
    setRegisterSuccess('');
    setCreatedAccountNumber('');

    if (!userId || !bankId || !bankName || !branch || !state || !accountType || !name || !accountPassword) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: parseInt(userId),
          bankId: parseInt(bankId),
          bankName,
          branch,
          state,
          accountType,
          name,
          accountPassword
        })
      });

      if (!response.ok) throw new Error('Failed to create account');

      const data = await response.json();

      const accNum = data.AccountNumber || data.accountNumber || '';
      setCreatedAccountNumber(accNum);

      setRegisterSuccess(
        accNum
          ? `Account created successfully!\nYour Account Number: ${accNum}`
          : 'Account created successfully!'
      );

    } catch (err) {
      let msg = 'Failed to create account';
      if (err && typeof err === 'object') {
        if ('message' in err && typeof err.message === 'string') msg = err.message;
        else if (err.toString && typeof err.toString === 'function') msg = String(err.toString());
      }
      setError(String(msg));
    }
  };

  return (
    <div className="auth-container">
      {!showRegister ? (
        <>
          <h1>Login</h1>

          <div style={{ display: 'flex', gap: 16, marginBottom: 18, justifyContent: 'center' }}>
            <button type="button"
              style={{
                padding: '6px 18px',
                borderRadius: 6,
                border: loginMode === 'user' ? '2px solid #1976d2' : '1.5px solid #bfc7d1',
                background: loginMode === 'user' ? '#e3e9f7' : '#fff',
                fontWeight: 600,
                color: loginMode === 'user' ? '#1976d2' : '#333',
                cursor: 'pointer'
              }}
              onClick={() => setLoginMode('user')}>
              User Login
            </button>

            <button type="button"
              style={{
                padding: '6px 18px',
                borderRadius: 6,
                border: loginMode === 'sysadmin' ? '2px solid #1976d2' : '1.5px solid #bfc7d1',
                background: loginMode === 'sysadmin' ? '#e3e9f7' : '#fff',
                fontWeight: 600,
                color: loginMode === 'sysadmin' ? '#1976d2' : '#333',
                cursor: 'pointer'
              }}
              onClick={() => setLoginMode('sysadmin')}>
              Sysadmin Login
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {loginMode === 'user' ? (
              <>
                <input
                  type="text"
                  placeholder="Account Number"
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Account Password"
                  value={accountPassword}
                  onChange={e => setAccountPassword(e.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Sysadmin Email"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  required
                />
              </>
            )}

            <button type="submit">Login</button>
          </form>

          <button className="toggle-btn" onClick={() => setShowRegister(true)}>
            New user? Register here
          </button>

          {error && <div className="error-message">{error}</div>}
        </>
      ) : (
        <>
          <h1>Register Account</h1>

          <div style={{
            marginBottom: 12,
            color: '#1976d2',
            fontWeight: 500,
            fontSize: '1rem',
            textAlign: 'center'
          }}>
            <span>
              Ask your sysadmin for your <b>User ID</b> after registration.<br />
              Enter it below to create your account.
            </span>
          </div>

          <form onSubmit={handleRegister}>
            <input type="text" placeholder="User ID (provided by sysadmin)" value={userId} onChange={e => setUserId(e.target.value)} required />
            <input type="text" placeholder="Bank ID" value={bankId} onChange={e => setBankId(e.target.value)} required />
            <input type="text" placeholder="Bank Name" value={bankName} onChange={e => setBankName(e.target.value)} required />
            <input type="text" placeholder="Branch" value={branch} onChange={e => setBranch(e.target.value)} required />
            <input type="text" placeholder="State" value={state} onChange={e => setState(e.target.value)} required />
            <input type="text" placeholder="Name (Account Holder)" value={name} onChange={e => setName(e.target.value)} required />
            <input type="password" placeholder="Account Password" value={accountPassword} onChange={e => setAccountPassword(e.target.value)} required />

            <select value={accountType} onChange={e => setAccountType(e.target.value)} required>
              <option value="Savings">Savings</option>
              <option value="Checking">Checking</option>
            </select>

            <button type="submit">Create Account</button>
          </form>

          <button className="toggle-btn" onClick={() => setShowRegister(false)}>
            Back to Login
          </button>

          {error && <div className="error-message">{error}</div>}

          {registerSuccess && (
            <div className="success-message" style={{ whiteSpace: 'pre-line' }}>
              {registerSuccess}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LoginPage;
