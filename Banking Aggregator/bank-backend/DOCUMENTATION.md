# Banking Aggregator Backend Documentation

## Language and Framework
- **Language:** C#
- **Framework:** ASP.NET Core 8.0 (Web API)
- **ORM:** Entity Framework Core 9 (with SQL Server)

---

## Database
- **Type:** SQL Server
- **Database Name:** training
- **Connection:** Set in `appsettings.json` under `DefaultConnection`.
- **Schema:** All tables use the `training` schema.
- **Entities:**
  - **User**: Stores user info (FullName, Email, PasswordHash, Role, Status, CreatedAt)
  - **Bank**: Bank details (BankName, IFSCCode)
  - **Branch**: Branch details (BranchCode, Address, City, BankId)
  - **Account**: Account info (AccountNumber, UserId, BankId, BankName, Branch, State, AccountType, Balance)
  - **Transaction**: Transaction records (AccountId, Amount, Type, TransactionDate)

---

## Main Packages Used
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.AspNetCore.Authentication.JwtBearer
- Microsoft.IdentityModel.Tokens
- Swashbuckle.AspNetCore (Swagger)
- Serilog.AspNetCore, Serilog.Sinks.File (logging)

---

## Extensions/Tools
- **Swagger UI**: For API documentation and testing (auto-enabled in development)
- **JWT Authentication**: Secures API endpoints
- **Serilog**: For logging to file

---

## API Endpoints (Short Descriptions)

### Account APIs (`/api/accounts`)
- `POST /api/accounts/create` — Create a new account (requires UserId, BankId, BankName, Branch, State, AccountType)
- `GET /api/accounts/by-account-number/{accountNumber}` — Get account details by account number
- `POST /api/accounts/{accountId}/transaction?amount=xx&type=deposit|withdraw` — Deposit or withdraw funds
- `GET /api/accounts/{accountId}/transaction` — List all transactions for an account
- `GET /api/accounts/{accountId}/balance` — Get account balance
- `POST /api/accounts/transfer` — Transfer funds between accounts
- `POST /api/accounts/{accountId}/close` — Close an account (balance must be zero)

### User APIs (`/api/user`)
- `GET /api/user` — List all users (Sysadmin only)
- `PUT /api/user/{id}` — Update user info (Sysadmin only)
- `DELETE /api/user/{id}` — Delete a user (Sysadmin only)

---

## Entity Framework Usage
- **DbContext:** `AppDbContext` manages all entities and migrations.
- **Migrations:** Used for schema changes and seeding initial data (banks).

---

## Security
- **JWT Bearer Authentication**: Most endpoints require a valid JWT token.
- **CORS**: Configured to allow requests from React frontend (localhost ports).

---

For more details, see the code in `Controllers/`, `Models/`, and `AppDbContext.cs`.
