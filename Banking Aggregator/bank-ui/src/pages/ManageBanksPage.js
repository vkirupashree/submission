
import React, { useEffect, useState, useMemo } from 'react';
import { fetchBanks, addBank } from '../services/bankService';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';

const ManageBanksPage = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [newBankName, setNewBankName] = useState('');
  const [newIfsc, setNewIfsc] = useState('');
  const [addSuccess, setAddSuccess] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchBanks(token);
        setBanks(data);
      } catch {
        setError('Failed to load banks');
      }
      setLoading(false);
    };
    load();
  }, [token]);

  // Typeahead search
  const filteredBanks = useMemo(() => {
    if (!search) return banks;
    return banks.filter(b =>
      (b.bankName || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.ifscCode || '').toLowerCase().includes(search.toLowerCase())
    );
  }, [banks, search]);

  const columns = [
    { field: 'bankId', headerName: 'ID', flex: 1, sortable: true },
    { field: 'bankName', headerName: 'Bank Name', flex: 2, sortable: true },
    { field: 'ifscCode', headerName: 'IFSC Code', flex: 2, sortable: true }
    // CRUD action columns and branch drill-down can be added here (not sortable)
  ];

  const rows = filteredBanks.map(b => ({
    id: b.bankId,
    ...b
  }));


  const handleAddBank = async (e) => {
    e.preventDefault();
    setAddSuccess('');
    setError('');
    if (!newBankName || !newIfsc) {
      setError('Bank name and IFSC code are required.');
      return;
    }
    try {
      await addBank({ bankName: newBankName, ifscCode: newIfsc }, token);
      setAddSuccess('Bank added successfully!');
      setNewBankName('');
      setNewIfsc('');
      const data = await fetchBanks(token);
      setBanks(data);
    } catch (err) {
      setError('Failed to add bank.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <h1>Manage Banks</h1>
      <form onSubmit={handleAddBank} style={{ marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Bank Name"
          value={newBankName}
          onChange={e => setNewBankName(e.target.value)}
          style={{ padding: '8px', borderRadius: 6, border: '1px solid #bfc7d1', minWidth: 180 }}
        />
        <input
          type="text"
          placeholder="IFSC Code"
          value={newIfsc}
          onChange={e => setNewIfsc(e.target.value)}
          style={{ padding: '8px', borderRadius: 6, border: '1px solid #bfc7d1', minWidth: 140 }}
        />
        <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 600 }}>Add Bank</button>
        {addSuccess && <span style={{ color: '#388e3c', marginLeft: 12 }}>{addSuccess}</span>}
      </form>
      <TextField
        label="Search banks"
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

export default ManageBanksPage;
