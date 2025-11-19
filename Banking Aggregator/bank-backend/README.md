# Banking Aggregator Backend

## Overview
This is the backend for the Banking Aggregator app, built with ASP.NET Core and Entity Framework Core. It provides RESTful APIs for user authentication, account management, and bank management.

## Key Endpoints

### Authentication
- `POST /api/auth/register` — Register a new user (user or sysadmin)
- `POST /api/auth/login` — Login and receive JWT token

### Accounts
- `GET /api/accounts` — Get all accounts (now used for dashboard and account lookup)
- `POST /api/accounts/create` — Create a new account
- `POST /api/accounts/{accountId}/transaction` — Deposit or withdraw funds (type=deposit/withdraw)
- `POST /api/accounts/transfer` — Transfer funds between accounts
- `POST /api/accounts/{accountId}/close` — Close an account

### Banks
- `GET /api/bank` — Get all banks (with branches)
- `POST /api/bank` — Add a new bank
- `GET /api/bank/{id}/branches` — Get all branches for a bank
- `POST /api/bank/{id}/branches` — Add a branch to a bank

## Notes
- All endpoints except registration and login require a JWT token in the `Authorization` header.
- The endpoint `/api/accounts/by-account-number/{accountNumber}` has been removed. Use `/api/accounts` and filter by account number on the frontend.
- Transaction history endpoints are deprecated/removed as per latest requirements.

## Running the Backend
1. Ensure SQL Server is running and connection string is set in `appsettings.json`.
2. Run migrations: `dotnet ef database update`
3. Start the server: `dotnet run`

## Project Structure
- `Controllers/` — API controllers
- `Models/` — Entity models
- `Data/` — EF Core DbContext

---
For more details, see the code or contact the project maintainer.
