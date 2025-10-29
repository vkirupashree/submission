using FinalProjectC_.Data;
using FinalProjectC_.Models;
using FinalProjectC_.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace FinalProjectC_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;

        public SeedController(AppDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("GenerateEmployees")]
        public async Task<IActionResult> GenerateEmployees()
        {
            var random = new Random();

            // 1. Create 10 roles if not exists
            var roles = await _context.Roles.ToListAsync();
            if (!roles.Any())
            {
                roles = Enumerable.Range(1, 10)
                    .Select(i => new Role
                    {
                        RoleName = $"Role{i}",
                        CreatedBy = "System"
                    }).ToList();
                _context.Roles.AddRange(roles);
                await _context.SaveChangesAsync();
            }

            // 2. Get all banks
            var banks = await _context.Banks.Include(b => b.Branches).ToListAsync();
            if (!banks.Any())
                return BadRequest("No banks found. Add some banks first.");

            // 3. Create 100 users
            var users = new List<User>();
            for (int i = 1; i <= 100; i++)
            {
                var password = "12345";
                var passwordHash = Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(password)));
                var user = new User
                {
                    Username = $"user{i}",
                    Email = $"user{i}@test.com",
                    PasswordHash = passwordHash,
                    CreatedBy = "System",
                    Roles = new List<Role>(),   // initialize as List
                    Accounts = new List<Account>()
                };

                // Assign random role
                int roleIndex = random.Next(roles.Count);
                user.Roles.Add(roles[roleIndex]);

                // Assign random bank & branch
                var bank = banks[random.Next(banks.Count)];
                var branch = bank.Branches?.OrderBy(b => Guid.NewGuid()).FirstOrDefault();
                if (branch != null)
                {
                    user.Accounts.Add(new Account
                    {
                        AccountNumber = $"ACC{i:0000}",
                        AccountType = "Savings",
                        Balance = 1000,
                        Currency = "INR",
                        BranchId = branch.Id,
                        CreatedBy = "System"
                    });
                }

                users.Add(user);
            }

            // 4. Specific users: 3,5,97,100 → assign role1, role5, role7
            var specialUserIndices = new[] { 3, 5, 97, 100 };
            foreach (var idx in specialUserIndices)
            {
                var user = users[idx - 1]; // list is 0-based
                user.Roles.Clear();
                foreach (var role in roles.Where(r => r.RoleName == "Role1" || r.RoleName == "Role5" || r.RoleName == "Role7"))
                {
                    user.Roles.Add(role);
                }
            }

            // 5. Save users to database
            _context.Users.AddRange(users);
            await _context.SaveChangesAsync();

            // 6. Generate JWT tokens
            var result = users.Select(u => new
            {
                u.Username,
                Roles = u.Roles.Select(r => r.RoleName).ToList(),
                Token = _jwtService.GenerateToken(u)
            }).ToList();

            return Ok(result);
        }
    }
}
