using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BankingAPI.Models
{
    public class BankingContext : DbContext
    {
        public BankingContext(DbContextOptions<BankingContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Bank> Banks { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<BankTransaction> Transactions { get; set; }
    }
}
