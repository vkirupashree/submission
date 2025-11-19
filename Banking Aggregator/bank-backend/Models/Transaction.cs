using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankManagementSystem.Models
{
    [Table("Transactions", Schema = "training")]
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }

        [Required]
        public int AccountId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Type { get; set; } // Deposit or Withdraw

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

        [ForeignKey("AccountId")]
        public Account Account { get; set; }
    }
}
