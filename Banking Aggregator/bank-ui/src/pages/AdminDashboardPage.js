import React, { useEffect, useState } from 'react';
import { fetchBanks } from '../services/bankService';
import { fetchAccounts } from '../services/accountService';
import { fetchUsers, deleteUser } from '../services/userService';
import { register } from '../services/authService';

/**
 * @typedef {Object} Bank
 * @property {number} bankId
 * @property {string} bankName
 * @property {string} ifscCode
 * @property {Array<{ branchId: number, branchName: string, state: string }>} [branches]
 */

const AdminDashboardPage = () => {
    const [banks, setBanks] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedBankId, setExpandedBankId] = useState(null);

    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'User'
    });

    const [creatingUser, setCreatingUser] = useState(false);
    const [createUserError, setCreateUserError] = useState('');
    const [createUserSuccess, setCreateUserSuccess] = useState('');
    const [deletingUserId, setDeletingUserId] = useState(null);

    const token = '';

    // LOAD DATA
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError('');
            try {
                const [banksData, accountsData, usersData] = await Promise.all([
                    fetchBanks(),
                    fetchAccounts(),
                    fetchUsers()
                ]);
                
                setBanks(banksData);
                setAccounts(accountsData);
                setUsers(usersData);
            } catch (err) {
                setError('Failed to load data');
            }
            setLoading(false);
        };
        load();
    }, [token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    const getAccountCount = (bankId) =>
        accounts.filter(acc => acc.bankId === bankId).length;

    // Handle input change
    const handleNewUserChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    // Create user
    const handleCreateUser = async (e) => {
        e.preventDefault();
        setCreatingUser(true);
        setCreateUserError('');
        setCreateUserSuccess('');
        try {
            const { firstName, lastName, email, password, role } = newUser;
            const result = await register(firstName, lastName, email, password, role);
            setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'User' });
            setCreateUserSuccess(`User created successfully! User ID: ${result.userId || ''}`);
            // Refresh user list
            const usersData = await fetchUsers(token || '');
            setUsers(usersData);
        } catch (err) {
            setCreateUserError('Failed to create user.');
        }
        setCreatingUser(false);
    };

    // Delete user
    const handleDeleteUser = async (userId) => {
        setDeletingUserId(userId);
        try {
            await deleteUser(userId);
            setUsers(users.filter(u => u.userId !== userId));
        } catch (err) {
            console.error(err);
        }
        setDeletingUserId(null);
    };

    // Render tables
    const renderAccountsAndUsers = () => (
        <>
            {/* CREATE USER */}
            <div style={{ maxWidth: 500, margin: '0 auto 32px auto', background: '#f9fafe', borderRadius: 14, boxShadow: '0 4px 16px #0002', padding: 28, border: '1px solid #e3e8f0' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: 16, color: '#1976d2', fontWeight: 600, textAlign: 'center' }}>Create New User</h2>
                <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <input name="firstName" value={newUser.firstName} onChange={handleNewUserChange} placeholder="First Name" required style={{ padding: 8, borderRadius: 6, border: '1px solid #bcd' }} />
                    <input name="lastName" value={newUser.lastName} onChange={handleNewUserChange} placeholder="Last Name" required style={{ padding: 8, borderRadius: 6, border: '1px solid #bcd' }} />
                    <input name="email" value={newUser.email} onChange={handleNewUserChange} placeholder="Email" type="email" required style={{ padding: 8, borderRadius: 6, border: '1px solid #bcd' }} />
                    <input name="password" value={newUser.password} onChange={handleNewUserChange} placeholder="Password" type="password" required style={{ padding: 8, borderRadius: 6, border: '1px solid #bcd' }} />
                    <select name="role" value={newUser.role} onChange={handleNewUserChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #bcd' }}>
                        <option value="User">User</option>
                        <option value="Sysadmin">Sysadmin</option>
                    </select>
                    <button type="submit" disabled={creatingUser} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 0', fontWeight: 600 }}>
                        {creatingUser ? 'Creating...' : 'Create User'}
                    </button>
                    {createUserError && <div style={{ color: 'red', marginTop: 4 }}>{createUserError}</div>}
                    {createUserSuccess && <div style={{ color: 'green', marginTop: 4 }}>{createUserSuccess}</div>}
                </form>
            </div>

            {/* ACCOUNTS & USERS */}
            <div style={{ display: 'flex', gap: 32, marginTop: 40, flexWrap: 'wrap', justifyContent: 'center' }}>

                {/* ACCOUNTS TABLE */}
                <div style={{ flex: 1, minWidth: 340, maxWidth: 500, background: '#f9fafe', borderRadius: 14, boxShadow: '0 4px 16px #0002', padding: 28, border: '1px solid #e3e8f0' }}>
                    <h2 style={{ fontSize: '1.15rem', color: '#1976d2', textAlign: 'center' }}>All Accounts</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                            <thead>
                                <tr style={{ background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)', color: '#fff' }}>
                                    <th style={{ padding: 10 }}>Account #</th>
                                    <th style={{ padding: 10 }}>User ID</th>
                                    <th style={{ padding: 10 }}>Bank</th>
                                    <th style={{ padding: 10 }}>Branch</th>
                                    <th style={{ padding: 10 }}>State</th>
                                    <th style={{ padding: 10 }}>Type</th>
                                    <th style={{ padding: 10 }}>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map(acc => (
                                    <tr key={acc.accountId}>
                                        <td>{acc.accountNumber}</td>
                                        <td>{acc.userId}</td>
                                        <td>{acc.bankName}</td>
                                        <td>{acc.branch}</td>
                                        <td>{acc.state}</td>
                                        <td>{acc.accountType}</td>
                                        <td style={{ color: '#388e3c', fontWeight: 600 }}>{acc.balance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* USERS TABLE */}
                <div style={{ flex: 1, minWidth: 340, maxWidth: 500, background: '#f9fafe', borderRadius: 14, boxShadow: '0 4px 16px #0002', padding: 28, border: '1px solid #e3e8f0' }}>
                    <h2 style={{ fontSize: '1.15rem', color: '#1976d2', textAlign: 'center' }}>All Users</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                            <thead>
                                <tr style={{ background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)', color: '#fff' }}>
                                    <th style={{ padding: 10 }}>User ID</th>
                                    <th style={{ padding: 10 }}>Full Name</th>
                                    <th style={{ padding: 10 }}>Email</th>
                                    <th style={{ padding: 10 }}>Role</th>
                                    <th style={{ padding: 10 }}>Status</th>
                                    <th style={{ padding: 10 }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.userId}>
                                        <td>{user.userId}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td style={{ color: user.status ? '#388e3c' : '#d32f2f' }}>
                                            {user.status ? 'Active' : 'Inactive'}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteUser(user.userId)}
                                                disabled={deletingUserId === user.userId}
                                                style={{
                                                    background: deletingUserId === user.userId ? '#aaa' : '#d32f2f',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '4px 10px',
                                                    borderRadius: 4
                                                }}
                                            >
                                                {deletingUserId === user.userId ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );

    return (
        <div className="page-container" style={{ maxWidth: 800, margin: '0 auto', padding: '1.2rem 0.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: 18 }}>Sysadmin Dashboard</h1>

            <div style={{ background: '#f8f8f8', padding: 6, borderRadius: 6, marginBottom: 12 }}>
                Banks loaded: {banks.length}
                <pre style={{ maxHeight: 80, overflow: 'auto' }}>{JSON.stringify(banks, null, 2)}</pre>
            </div>

            <div style={{ background: '#f8f8f8', padding: 6, borderRadius: 6, marginBottom: 12 }}>
                Accounts loaded: {accounts.length}
                <pre style={{ maxHeight: 80, overflow: 'auto' }}>{JSON.stringify(accounts, null, 2)}</pre>
            </div>

            {/* BANK CARDS */}
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', marginBottom: 18 }}>
                {banks.length === 0 ? (
                    <div>No banks found.</div>
                ) : (
                    banks.map(bank => (
                        <div
                            key={bank.bankId}
                            style={{ minWidth: 160, background: '#fff', borderRadius: 10, padding: 12, boxShadow: '0 2px 8px #0001', cursor: 'pointer' }}
                            onClick={() => setExpandedBankId(expandedBankId === bank.bankId ? null : bank.bankId)}
                        >
                            <h2 style={{ color: '#1976d2', fontSize: '1rem', fontWeight: 700 }}>{bank.bankName}</h2>
                            <div><b>IFSC:</b> {bank.ifscCode}</div>
                            {bank.branches?.length > 0 && (
                                <div><b>Branches:</b> {bank.branches.length}</div>
                            )}

                            {expandedBankId === bank.bankId && (
                                <div style={{ color: '#1976d2', marginTop: 6 }}>
                                    Accounts: {getAccountCount(bank.bankId)}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {renderAccountsAndUsers()}
        </div>
    );
};

export default AdminDashboardPage;
