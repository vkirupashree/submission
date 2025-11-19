
import React, { useEffect, useState, useMemo } from 'react';
import { fetchUsers } from '../services/userService';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers(token);
        setUsers(data);
      } catch {
        setError('Failed to load users');
      }
      setLoading(false);
    };
    load();
  }, [token]);

  // Typeahead search
  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return users.filter(u =>
      (u.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const columns = [
    { field: 'userId', headerName: 'ID', flex: 1, sortable: true },
    { field: 'fullName', headerName: 'Full Name', flex: 2, sortable: true },
    { field: 'email', headerName: 'Email', flex: 2, sortable: true },
    { field: 'role', headerName: 'Role', flex: 1, sortable: true },
    { field: 'status', headerName: 'Active', flex: 1, sortable: true, valueGetter: (params) => params.row.status ? 'Yes' : 'No' }
    // CRUD action columns can be added here (not sortable)
  ];

  const rows = filteredUsers.map(u => ({
    id: u.userId,
    ...u
  }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ height: 500, width: '100%' }}>
      <h1>Manage Users</h1>
      <TextField
        label="Search users"
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

export default ManageUsersPage;
