
using BankManagementSystem.Data;
using BankManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BankManagementSystem.Controllers
{
    // public class LoginRequest removed, replaced by AccountLoginRequest in Models

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }


        public class RegisterRequest
        {
            [System.ComponentModel.DataAnnotations.Required]
            [System.Text.Json.Serialization.JsonPropertyName("firstName")]
            public string FirstName { get; set; }

            [System.ComponentModel.DataAnnotations.Required]
            [System.Text.Json.Serialization.JsonPropertyName("lastName")]
            public string LastName { get; set; }

            [System.ComponentModel.DataAnnotations.Required]
            [System.Text.Json.Serialization.JsonPropertyName("email")]
            public string Email { get; set; }

            [System.ComponentModel.DataAnnotations.Required]
            [System.Text.Json.Serialization.JsonPropertyName("password")]
            public string Password { get; set; }

            [System.Text.Json.Serialization.JsonPropertyName("role")]
            public string Role { get; set; } = "User"; // "User" or "Sysadmin"
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FirstName) || string.IsNullOrWhiteSpace(request.LastName) || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "All fields are required." });
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Email already registered." });
            }


            var user = new User
            {
                FullName = $"{request.FirstName} {request.LastName}",
                Email = request.Email,
                PasswordHash = request.Password, // In production, hash the password!
                Role = string.IsNullOrWhiteSpace(request.Role) ? "User" : request.Role,
                CreatedAt = DateTime.UtcNow,
                Status = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully!", userId = user.UserId });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] object request)
        {
            // Try to bind to AdminLoginRequest first
            try
            {
                var adminReq = System.Text.Json.JsonSerializer.Deserialize<BankManagementSystem.Models.AdminLoginRequest>(request.ToString());
                if (!string.IsNullOrWhiteSpace(adminReq?.Email) && !string.IsNullOrWhiteSpace(adminReq?.Password))
                {
                    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == adminReq.Email && u.PasswordHash == adminReq.Password);
                    if (user == null)
                        return Unauthorized(new { message = "Invalid email or password." });
                    if (user.Role != null && user.Role.ToLower() == "sysadmin")
                    {
                        var token = GenerateJwtToken(user);
                        return Ok(new { Token = token, user.FullName, user.Role });
                    }
                    return Unauthorized(new { message = "Not a sysadmin account." });
                }
            }
            catch { }
            // Try to bind to AccountLoginRequest for user login
            try
            {
                var accReq = System.Text.Json.JsonSerializer.Deserialize<BankManagementSystem.Models.AccountLoginRequest>(request.ToString());
                if (!string.IsNullOrWhiteSpace(accReq?.AccountNumber) && !string.IsNullOrWhiteSpace(accReq?.AccountPassword))
                {
                    var account = await _context.Accounts
                        .Include(a => a.User)
                        .FirstOrDefaultAsync(a => a.AccountNumber == accReq.AccountNumber && a.AccountPassword == accReq.AccountPassword);
                    if (account == null)
                        return Unauthorized(new { message = "Invalid account number or password." });
                    var user = account.User;
                    var token = GenerateJwtToken(user);
                    return Ok(new { Token = token, user.FullName, user.Role, accountId = account.AccountId, accountNumber = account.AccountNumber });
                }
            }
            catch { }
            return BadRequest(new { message = "Invalid login request." });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _config.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("role", user.Role ?? "User"),
                new Claim("name", user.FullName ?? ""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["DurationInMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
