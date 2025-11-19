import React, { useEffect, useState } from 'react';
import { fetchBanks } from '../services/bankService';
import { fetchAccounts } from '../services/accountService';
import { fetchUsers, deleteUser } from '../services/userService';
import { register } from '../services/authService';
import './AdminDashboardPage.css';

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
            <div className="admin-create-user">
                <h2>Create New User</h2>
                <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <input name="firstName" value={newUser.firstName} onChange={handleNewUserChange} placeholder="First Name" required />
                    <input name="lastName" value={newUser.lastName} onChange={handleNewUserChange} placeholder="Last Name" required />
                    <input name="email" value={newUser.email} onChange={handleNewUserChange} placeholder="Email" type="email" required />
                    <input name="password" value={newUser.password} onChange={handleNewUserChange} placeholder="Password" type="password" required />
                    <select name="role" value={newUser.role} onChange={handleNewUserChange}>
                        <option value="User">User</option>
                        <option value="Sysadmin">Sysadmin</option>
                    </select>
                    <button type="submit" disabled={creatingUser}>
                        {creatingUser ? 'Creating...' : 'Create User'}
                    </button>
                    {createUserError && <div className="admin-create-error">{createUserError}</div>}
                    {createUserSuccess && <div className="admin-create-success">{createUserSuccess}</div>}
                </form>
            </div>
            <div className="admin-tables">
                {/* ACCOUNTS TABLE */}
                <div className="admin-table-card">
                    <h2>All Accounts</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Account #</th>
                                    <th>User ID</th>
                                    <th>Bank</th>
                                    <th>Branch</th>
                                    <th>State</th>
                                    <th>Type</th>
                                    <th>Balance</th>
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
                <div className="admin-table-card">
                    <h2>All Users</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
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
        <div className="admin-root">
          <div className="admin-container">
            <h1 className="admin-title">Sysadmin Dashboard</h1>
            <div className="admin-summary">
              <div className="admin-summary-card">Banks loaded: {banks.length}</div>
              <div className="admin-summary-card">Accounts loaded: {accounts.length}</div>
              <div className="admin-summary-card">Users loaded: {users.length}</div>
            </div>
            <div className="admin-bank-cards">
              {banks.length === 0 ? (
                <div>No banks found.</div>
              ) : (
                banks.map(bank => (
                  <div
                    key={bank.bankId}
                    className="admin-bank-card"
                    onClick={() => setExpandedBankId(expandedBankId === bank.bankId ? null : bank.bankId)}
                  >
                    <h2>{bank.bankName}</h2>
                    <div><b>IFSC:</b> {bank.ifscCode}</div>
                    {bank.branches?.length > 0 && (
                      <div><b>Branches:</b> {bank.branches.length}</div>
                    )}
                    {expandedBankId === bank.bankId && (
                      <div className="admin-bank-accounts">
                        Accounts: {getAccountCount(bank.bankId)}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            {renderAccountsAndUsers()}
          </div>
        </div>
    );
};

export default AdminDashboardPage;
