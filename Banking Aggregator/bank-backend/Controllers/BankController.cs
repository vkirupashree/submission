using BankManagementSystem.Data;
using BankManagementSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class BankController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BankController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBanks()
        {
            var banks = await _context.Banks.Include(b => b.Branches).ToListAsync();
            return Ok(banks);
        }

        [HttpPost]
        public async Task<IActionResult> AddBank([FromBody] Bank bank)
        {
            _context.Banks.Add(bank);
            await _context.SaveChangesAsync();
            return Ok(bank);
        }

        [HttpGet("{id}/branches")]
        public async Task<IActionResult> GetBranches(int id)
        {
            var branches = await _context.Branches.Where(b => b.BankId == id).ToListAsync();
            return Ok(branches);
        }

        [HttpPost("{id}/branches")]
        public async Task<IActionResult> AddBranch(int id, [FromBody] Branch branch)
        {
            branch.BankId = id;
            _context.Branches.Add(branch);
            await _context.SaveChangesAsync();
            return Ok(branch);
        }
    }
}
