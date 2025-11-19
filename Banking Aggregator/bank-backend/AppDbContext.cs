using Microsoft.EntityFrameworkCore;
using BankManagementSystem.Models;

namespace BankManagementSystem.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Bank> Banks { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Branch> Branches { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("training");

            // Seed initial banks
            modelBuilder.Entity<Bank>().HasData(
                new Bank { BankId = 1, BankName = "CUB", IFSCCode = "CUB0001" },
                new Bank { BankId = 2, BankName = "State Bank of India", IFSCCode = "SBIN0000001" },
                new Bank { BankId = 3, BankName = "HDFC Bank", IFSCCode = "HDFC0001" },
                new Bank { BankId = 4, BankName = "ICICI Bank", IFSCCode = "ICIC0001" }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
