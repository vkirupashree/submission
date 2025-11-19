
# Banking Aggregator Frontend

This is the React frontend for the Banking Aggregator app. It provides:
- User and sysadmin login
- Registration and account creation
- Dashboard for users (shows account info, deposit/withdraw)
- Sysadmin dashboard (shows all banks as cards)
- Bank and branch management (for sysadmin)

## Key Features
- **Role-based routing**: Users and sysadmins see different dashboards
- **Account lookup**: Dashboard fetches all accounts and matches by account number
- **No transaction history**: Transaction APIs and UI have been removed as per latest requirements
- **Modern UI**: Responsive, styled with gradients and cards

## API Endpoints Used
- `POST /api/auth/register` — Register user/sysadmin
- `POST /api/auth/login` — Login, receive JWT
- `GET /api/accounts` — Get all accounts (dashboard/account lookup)
- `POST /api/accounts/create` — Create account
- `POST /api/accounts/{accountId}/transaction` — Deposit/withdraw
- `POST /api/accounts/transfer` — Transfer funds
- `POST /api/accounts/{accountId}/close` — Close account
- `GET /api/bank` — Get all banks (admin dashboard)
- `POST /api/bank` — Add bank
- `GET /api/bank/{id}/branches` — Get branches for a bank
- `POST /api/bank/{id}/branches` — Add branch

## How to Run
1. Install dependencies: `npm install`
2. Start the app: `npm start`
3. Open [http://localhost:3000](http://localhost:3000)

## Notes
- The dashboard now uses `/api/accounts` and filters by account number on the frontend.
- The endpoint `/api/accounts/by-account-number/{accountNumber}` is removed.
- All protected endpoints require a JWT token in the `Authorization` header.

---
For backend API details, see the backend README.
