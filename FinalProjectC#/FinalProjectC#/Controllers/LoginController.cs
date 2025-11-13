using FinalProjectC_.Data;
using FinalProjectC_.Models;
using FinalProjectC_.Models.DTOs;
using FinalProjectC_.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace FinalProjectC_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;

        public AuthController(AppDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            if (string.IsNullOrWhiteSpace(request.UsernameOrEmail) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Username/Email and password are required.");

            var user = await _context.Users
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u =>
                    u.Username == request.UsernameOrEmail ||
                    u.Email == request.UsernameOrEmail);

            if (user == null)
                return Unauthorized("Invalid username/email or password.");

            var hashedPassword = HashPasswordSHA256(request.Password);

            if (hashedPassword != user.PasswordHash)
                return Unauthorized("Invalid credentials.");

            var token = _jwtService.GenerateToken(user);

            // ✅ Return login name and roles
            return Ok(new
            {
                Token = token,
                Username = user.Username,
                Email = user.Email,
                Roles = user.Roles.Select(r => r.RoleName).ToList()
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password) ||
                string.IsNullOrWhiteSpace(request.Role))
                return BadRequest("Username, email, password, and role are required.");

            // Check for duplicate users
            if (await _context.Users.AnyAsync(u => u.Username == request.Username || u.Email == request.Email))
                return BadRequest("Username or email already exists.");

            // Hash password using SHA256
            var passwordHash = HashPasswordSHA256(request.Password);

            // Ensure role exists or create new
            var userRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == request.Role);
            if (userRole == null)
            {
                userRole = new Role { RoleName = request.Role };
                _context.Roles.Add(userRole);
                await _context.SaveChangesAsync();
            }

            // Create user
            var newUser = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = passwordHash,
                Roles = new List<Role> { userRole },
                CreatedBy = "System",
                CreatedOn = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User registered successfully!",
                newUser.Username,
                newUser.Email,
                Role = request.Role
            });
        }

        private static string HashPasswordSHA256(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}