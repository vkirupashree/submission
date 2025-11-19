import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../services/apiConfig';
import './TransactionsPage.css';

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
    <div className="transactions-root">
      <div className="transactions-container">
        <h1 className="transactions-title">Transactions</h1>
        <form onSubmit={handleFilter} className="transactions-form">
          <label>
            From:
            <input
              type="date"
              value={from}
              onChange={e => setFrom(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={to}
              onChange={e => setTo(e.target.value)}
            />
          </label>
          <button type="submit">Filter</button>
        </form>
        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="transactions-search"
        />
        {loading ? (
          <div className="transactions-loading">Loading...</div>
        ) : error ? (
          <div className="transactions-error">{error}</div>
        ) : (
          <div className="transactions-table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Account</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr><td colSpan={6} className="transactions-table-empty">No transactions found.</td></tr>
                ) : (
                  filteredTransactions.map(tx => (
                    <tr key={tx.transactionId}>
                      <td>{tx.transactionId}</td>
                      <td>{tx.accountId}</td>
                      <td>{tx.type}</td>
                      <td>{tx.amount}</td>
                      <td>{new Date(tx.transactionDate).toLocaleString()}</td>
                      <td>{tx.description || ''}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
