using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace BankingAPI.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [ForeignKey("Bank")]
        public int BankId { get; set; }
        public Bank Bank { get; set; }

        [Required]
        [ForeignKey("Branch")]
        public int BranchId { get; set; }
        public Branch Branch { get; set; }

        public decimal Balance { get; set; } = 0;
        public DbSet<BankTransaction> BankTransactions { get; set; }
    }
}
