

import React, { useEffect, useState, useMemo } from 'react';
import { fetchAccounts, deposit, withdraw, transfer, closeAccount } from '../services/accountService';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button } from '@mui/material';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState({});
  const [search, setSearch] = useState('');
  const [transferData, setTransferData] = useState({ from: '', to: '', amount: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchAccounts(token);
        setAccounts(data);
      } catch (err) {
        setError('Failed to load accounts');
      }
      setLoading(false);
    };
    load();
  }, [token]);

  const handleDeposit = async (id) => {
    try {
  await deposit(id, amount[id] || 0, token);
  setAmount(prev => ({ ...prev, [id]: '' }));
      const data = await fetchAccounts(token);
      setAccounts(data);
    } catch {
      setError('Deposit failed');
    }
  };

  const handleWithdraw = async (id) => {
    try {
  await withdraw(id, amount[id] || 0, token);
  setAmount(prev => ({ ...prev, [id]: '' }));
      const data = await fetchAccounts(token);
      setAccounts(data);
    } catch {
      setError('Withdraw failed');
    }
  };

  // Typeahead search
  const filteredAccounts = useMemo(() => {
    if (!search) return accounts;
    return accounts.filter(acc =>
      (acc.accountNumber && acc.accountNumber.toLowerCase().includes(search.toLowerCase())) ||
      (acc.bank && acc.bank.bankName && acc.bank.bankName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [accounts, search]);

  // Transfer funds handler
  const handleTransfer = async () => {
    try {
      await transfer(
        transferData.from,
        transferData.to,
        transferData.amount,
        token
      );
      setTransferData({ from: '', to: '', amount: '' });
      const data = await fetchAccounts(token);
      setAccounts(data);
      setError('');
    } catch {
      setError('Transfer failed');
    }
  };

  // Close account handler
  const handleCloseAccount = async (id) => {
    try {
      await closeAccount(id, token);
      const data = await fetchAccounts(token);
      setAccounts(data);
      setError('');
    } catch (e) {
      setError(e.message || 'Close account failed');
    }
  };

  const columns = [
    { field: 'accountNumber', headerName: 'Account #', flex: 1, sortable: true },
    { field: 'bankName', headerName: 'Bank', flex: 1, sortable: true },
    { field: 'balance', headerName: 'Balance', flex: 1, sortable: true },
    {
      field: 'deposit',
      headerName: 'Deposit',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <TextField
            size="small"
            type="number"
            value={amount[params.row.accountId] || ''}
            onChange={e => setAmount(a => ({ ...a, [params.row.accountId]: e.target.value }))}
            placeholder="Amount"
            style={{ width: 80, marginRight: 8 }}
          />
          <Button variant="contained" size="small" onClick={() => handleDeposit(params.row.accountId)}>Deposit</Button>
        </>
      )
    },
    {
      field: 'withdraw',
      headerName: 'Withdraw',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <TextField
            size="small"
            type="number"
            value={amount[params.row.accountId] || ''}
            onChange={e => setAmount(a => ({ ...a, [params.row.accountId]: e.target.value }))}
            placeholder="Amount"
            style={{ width: 80, marginRight: 8 }}
          />
          <Button variant="contained" size="small" onClick={() => handleWithdraw(params.row.accountId)}>Withdraw</Button>
        </>
      )
    },
    {
      field: 'close',
      headerName: 'Close',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button variant="outlined" color="error" size="small" onClick={() => handleCloseAccount(params.row.accountId)}>
          Close
        </Button>
      )
    }
  ];

  // Prepare rows for DataGrid
  const rows = filteredAccounts.map(acc => ({
    id: acc.accountId,
    accountId: acc.accountId,
    accountNumber: acc.accountNumber,
    bankName: acc.bank?.bankName || acc.bankId,
    balance: acc.balance
  }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ height: 500, width: '100%' }}>
      <h1>Accounts</h1>
      {/* Transfer funds UI */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <TextField
          label="From Account ID"
          size="small"
          value={transferData.from}
          onChange={e => setTransferData(d => ({ ...d, from: e.target.value }))}
          style={{ width: 140 }}
        />
        <TextField
          label="To Account ID"
          size="small"
          value={transferData.to}
          onChange={e => setTransferData(d => ({ ...d, to: e.target.value }))}
          style={{ width: 140 }}
        />
        <TextField
          label="Amount"
          size="small"
          type="number"
          value={transferData.amount}
          onChange={e => setTransferData(d => ({ ...d, amount: e.target.value }))}
          style={{ width: 100 }}
        />
        <Button variant="contained" onClick={handleTransfer} disabled={!transferData.from || !transferData.to || !transferData.amount}>
          Transfer
        </Button>
      </div>
      <TextField
        label="Search accounts or banks"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AccountsPage;
