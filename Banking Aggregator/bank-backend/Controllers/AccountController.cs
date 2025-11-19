using BankManagementSystem.Data;
using BankManagementSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AccountsController(AppDbContext context)
        {
            _context = context;
        }




        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllAccounts()
        {
            var accounts = await _context.Accounts.ToListAsync();
            return Ok(accounts);
        }



        [HttpPost("create")]
        [AllowAnonymous]

        public async Task<IActionResult> CreateAccount([FromBody] CreateAccountRequest req)
        {
            // Require UserId, BankId, BankName, Branch, State, AccountType, Name, AccountPassword
            var user = await _context.Users.FindAsync(req.UserId);
            if (user == null)
                return NotFound("User not found.");

            var bank = await _context.Banks.FindAsync(req.BankId);
            if (bank == null)
                return NotFound("Bank not found.");

            // Generate a simple account number (e.g., random 10-digit)
            var random = new Random();
            string accountNumber = random.Next(1000000000, int.MaxValue).ToString();

            var account = new Account
            {
                UserId = req.UserId,
                BankId = req.BankId,
                BankName = req.BankName,
                Branch = req.Branch,
                State = req.State,
                AccountType = req.AccountType,
                AccountNumber = accountNumber,
                Name = req.Name,
                AccountPassword = req.AccountPassword,
                Balance = 0
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Account created successfully!", AccountId = account.AccountId, AccountNumber = account.AccountNumber });
        }

        public class CreateAccountRequest
        {
            public int UserId { get; set; }
            public int BankId { get; set; }
            public string BankName { get; set; }
            public string Branch { get; set; }
            public string State { get; set; }
            public string AccountType { get; set; }
            public string Name { get; set; }
            public string AccountPassword { get; set; }
        }




        [HttpPost("{accountId}/transaction")]
        [AllowAnonymous]
        public async Task<IActionResult> Transaction(int accountId, [FromQuery] decimal amount, [FromQuery] string type)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound("Account not found.");

            if (amount <= 0)
                return BadRequest("Amount must be greater than zero.");

            if (string.IsNullOrWhiteSpace(type))
                return BadRequest("Transaction type is required (deposit or withdraw).");

            if (type.ToLower() == "deposit")
            {
                account.Balance += amount;
                var transaction = new Transaction
                {
                    AccountId = accountId,
                    Amount = amount,
                    Type = "Deposit",
                    TransactionDate = DateTime.UtcNow
                };
                _context.Transactions.Add(transaction);
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Deposit successful.", account.Balance });
            }
            else if (type.ToLower() == "withdraw")
            {
                if (account.Balance < amount)
                    return BadRequest("Insufficient balance.");
                account.Balance -= amount;
                var transaction = new Transaction
                {
                    AccountId = accountId,
                    Amount = amount,
                    Type = "Withdraw",
                    TransactionDate = DateTime.UtcNow
                };
                _context.Transactions.Add(transaction);
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Withdrawal successful.", account.Balance });
            }
            else
            {
                return BadRequest("Invalid transaction type. Use 'deposit' or 'withdraw'.");
            }
        }

        [HttpGet("{accountId}/transaction")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTransactionsForAccount(int accountId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.AccountId == accountId)
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();
            return Ok(transactions);
        }

        [HttpGet("{accountId}/balance")]
        public async Task<IActionResult> GetBalance(int accountId)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound("Account not found.");

            return Ok(new { account.AccountNumber, account.Balance });
        }

        // Transfer funds between accounts
        [HttpPost("transfer")]
        public async Task<IActionResult> Transfer([FromBody] TransferRequest request)
        {
            if (request.Amount <= 0)
                return BadRequest("Amount must be greater than zero.");

            var fromAccount = await _context.Accounts.FindAsync(request.FromAccountId);
            var toAccount = await _context.Accounts.FindAsync(request.ToAccountId);
            if (fromAccount == null || toAccount == null)
                return NotFound("One or both accounts not found.");
            if (fromAccount.Balance < request.Amount)
                return BadRequest("Insufficient balance in source account.");

            fromAccount.Balance -= request.Amount;
            toAccount.Balance += request.Amount;
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Transfer successful.", FromBalance = fromAccount.Balance, ToBalance = toAccount.Balance });
        }

        // Close account
        [HttpPost("{accountId}/close")]
        public async Task<IActionResult> CloseAccount(int accountId)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound("Account not found.");

            // Optionally, check for non-zero balance
            if (account.Balance != 0)
                return BadRequest("Account balance must be zero to close the account.");

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Account closed successfully." });
        }
    }
}
