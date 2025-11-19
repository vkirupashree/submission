---

## CSS Libraries and Theme

- **CSS Libraries:**
  - No external CSS frameworks (like Bootstrap or Material-UI) are used.
  - All styling is done with custom CSS files:
    - `src/AppTheme.css`: Main theme, gradients, modern UI, and responsive design.
    - `src/index.css`: Base styles and font settings.
    - `src/App.css`: App-specific and default Create React App styles.

- **Theme:**
  - The UI uses a custom, modern theme with gradients, rounded corners, and soft shadows.
  - Colors: Blue gradients for navigation, white cards, and accent colors for buttons and highlights.
  - Font: 'Segoe UI', Arial, and system fonts for a clean, readable look.
  - Responsive design for desktop and mobile.

---

## Extensions and Additional Libraries

- **React Router DOM**: For routing between pages.
- **Testing Libraries**: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@testing-library/dom` for testing support.

# Banking Aggregator UI Documentation

## Project Language and Environment

- **Language:** JavaScript (React)
- **Node.js Version:** v23.10.0

---

This document explains all the user-facing text and messages used in the `bank-ui` React frontend, in simple and clear language. It is meant to help anyone understand what users will see and interact with on the site.

---

## Home Page (`Home.jsx`)
- **Welcome to Banking Aggregator**: Main greeting headline.
- **Banking Aggregator is your one-stop solution...**: Short description of the app's purpose.
- **Feature Cards:**
  - Multi-Bank Accounts: "View and manage accounts from multiple banks in one place."
  - Real-Time Transactions: "Track all your deposits, withdrawals, and balances instantly."
  - Fund Transfer: "Easily transfer funds between accounts and close accounts securely."
  - Advanced Data Grids: "Sort, search, and filter your data with powerful grid features."
  - Admin Controls: "Manage users, banks, and branches with advanced admin tools."
  - Modern UI: "Enjoy a beautiful, responsive interface on all your devices."
  - Mobile Friendly: "Access your banking dashboard anytime, anywhere."
  - Contact & Support: "Reach out to us anytime via the About page contact form."
- **Get started by registering or logging in. Enjoy seamless banking with Banking Aggregator!**

---

## Login Page (`LoginPage.js`)
- **Login**: Title for the login form.
- **Account Number**: Input placeholder for logging in.
- **Login**: Button to submit login.
- **New user? Register here**: Button to switch to registration form.
- **Register Account**: Title for the registration form.
- **User ID, Bank ID, Bank Name, Branch, State**: Input placeholders for registration.
- **Account Type**: Dropdown with "Savings" and "Checking".
- **Create Account**: Button to submit registration.
- **Back to Login**: Button to return to login form.
- **Account created successfully!**: Success message after registration.
- **Your Account Number:**: Shows the new account number after registration.
- **Error messages**: "Account number is required", "All fields are required", "Failed to create account", etc.

---

## Dashboard Page (`DashboardPage.js`)
- **[Account Type] Account**: Shows the type of account (e.g., Savings Account).
- **₹ [Balance]**: Shows the account balance.
- **A/C: [Account Number]**: Shows the account number.
- **Bank, Branch, State, User ID**: Shows details of the account.
- **Deposit / Withdraw**: Title for the transaction form.
- **Amount**: Input placeholder for transaction amount.
- **Deposit/Withdraw**: Dropdown to select transaction type.
- **Submit**: Button to perform transaction.
- **Processing...**: Shows while transaction is in progress.
- **Transaction successful / Deposit successful / Withdrawal successful**: Success messages.
- **Error messages**: "No account loaded", "Transaction failed", etc.

---

## Transactions Page (`TransactionsPage.js`)
- **Transactions**: Page title.
- **From/To**: Date filters for transactions.
- **Search transactions**: Input to search/filter transactions.
- **Table headers**: ID, Account, Type, Amount, Date, Description.
- **No transactions found.**: Message when there are no transactions.
- **Loading...**: Message while loading data.
- **Failed to load transactions**: Error message.

---

## Bank Details Page (`BankDetailsPage.js`)
- **Enter Bank Details**: Page title.
- **Bank, User**: Dropdowns to select bank and user.
- **Account Number, Initial Balance**: Input placeholders.
- **Account Type**: Dropdown with "Savings" and "Checking".
- **Create Account**: Button to submit.
- **Account created successfully!**: Success message.
- **Error messages**: "Please select a bank.", "Please select a user.", "Failed to create account", etc.

---

## Not Found Page (`NotFoundPage.js`)
- **404 - Page Not Found**: Message for invalid routes.

---

## General Notes
- All error and success messages are written in plain, user-friendly English.
- All forms use clear placeholders and button labels.
- The UI is designed to be simple, modern, and easy to understand for all users.

---


---

## Packages Used

Main dependencies (from `package.json`):

- react
- react-dom
- react-router-dom
- react-scripts
- @testing-library/dom
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- web-vitals

For full details, see `package.json`.

For any further details, check the respective page components in `src/pages/`.
