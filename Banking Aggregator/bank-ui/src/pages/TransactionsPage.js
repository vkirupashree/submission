import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../services/apiConfig';

const TransactionsPage = () => {
  /**
   * @typedef {Object} Transaction
   * @property {number} transactionId
   * @property {number} accountId
   * @property {string} type
   * @property {number} amount
   * @property {string} transactionDate
   * @property {string} [description]
   */

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const accountId = localStorage.getItem('accountId');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError('');
      try {
        if (!accountId) throw new Error('No account ID found');
        let url = `${API_BASE_URL}/accounts/${accountId}/transaction`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        let data = await response.json();
        // Only show Deposit and Withdraw
        data = data.filter(
          /** @param {any} tx */
          function (tx) {
            return tx.type && (tx.type.toLowerCase() === 'deposit' || tx.type.toLowerCase() === 'withdraw');
          }
        );
        setTransactions(data);
      } catch (err) {
        setError('Failed to load transactions');
      }
      setLoading(false);
    };
    fetchTransactions();
  }, [accountId]);

  const handleFilter = () => {
    // Triggers useEffect or can be used to filter by date if implemented
  };

  /** @type {Array<any>} */
  let filteredTransactions = [];
  if (Array.isArray(transactions)) {
    filteredTransactions = transactions.filter(
      /** @param {any} tx */
      function (tx) {
        if (search) {
          return (
            (tx.accountId + '').includes(search) ||
            (tx.type || '').toLowerCase().includes(search.toLowerCase()) ||
            (tx.description || '').toLowerCase().includes(search.toLowerCase())
          );
        }
        return true;
      }
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>Transactions</h1>
      <form onSubmit={handleFilter} style={{ marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
        <label>
          From:
          <input
            type="date"
            value={from}
            onChange={e => setFrom(e.target.value)}
            style={{ marginLeft: 4, marginRight: 12 }}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={to}
            onChange={e => setTo(e.target.value)}
            style={{ marginLeft: 4, marginRight: 12 }}
          />
        </label>
        <button type="submit" style={{ padding: '6px 16px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 600 }}>Filter</button>
      </form>
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 16, padding: 6, borderRadius: 4, border: '1px solid #bfc7d1', width: 240 }}
      />
      {loading ? (
        <div style={{ textAlign: 'center', padding: 24 }}>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', padding: 24 }}>{error}</div>
      ) : (
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', marginTop: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f5f7fa' }}>
              <tr>
                <th style={{ padding: 10, borderBottom: '2px solid #e0e0e0' }}>ID</th>
                <th style={{ padding: 10, borderBottom: '2px solid #e0e0e0' }}>Account</th>
                <th style={{ padding: 10, borderBottom: '2px solid #e0e0e0' }}>Type</th>
                <th style={{ padding: 10, borderBottom: '2px solid #e0e0e0' }}>Amount</th>
                <th style={{ padding: 10, borderBottom: '2px solid #e0e0e0' }}>Date</th>
                <th style={{ padding: 10, borderBottom: '2px solid #e0e0e0' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24, color: '#888' }}>No transactions found.</td></tr>
              ) : (
                filteredTransactions.map(tx => (
                  <tr key={tx.transactionId} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: 8 }}>{tx.transactionId}</td>
                    <td style={{ padding: 8 }}>{tx.accountId}</td>
                    <td style={{ padding: 8 }}>{tx.type}</td>
                    <td style={{ padding: 8 }}>{tx.amount}</td>
                    <td style={{ padding: 8 }}>{new Date(tx.transactionDate).toLocaleString()}</td>
                    <td style={{ padding: 8 }}>{tx.description || ''}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
