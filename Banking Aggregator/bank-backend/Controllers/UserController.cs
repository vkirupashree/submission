using BankManagementSystem.Data;
using BankManagementSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            var existing = await _context.Users.FindAsync(id);
            if (existing == null) return NotFound();
            existing.FullName = user.FullName;
            existing.Email = user.Email;
            existing.Role = user.Role;
            existing.Status = user.Status;
            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
