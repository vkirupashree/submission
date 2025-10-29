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
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;

        public LoginController(AppDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Find user by username or email
            var user = await _context.Users
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Username == request.UsernameOrEmail || u.Email == request.UsernameOrEmail);

            if (user == null) return Unauthorized("Invalid credentials");

            // Verify password
            using (var sha1 = SHA1.Create())
            {
                var hash = Convert.ToBase64String(sha1.ComputeHash(Encoding.UTF8.GetBytes(request.Password)));
            }


            // Generate token
            var token = _jwtService.GenerateToken(user);
            return Ok(new { Token = token });
        }
    }

    public class LoginRequest
    {
        public string UsernameOrEmail { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}