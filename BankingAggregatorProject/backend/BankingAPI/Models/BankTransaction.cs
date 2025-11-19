// BankingAPI/Models/BankTransaction.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingAPI.Models
{
    public class BankTransaction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Account")]
        public int AccountId { get; set; }
        public Account Account { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Type { get; set; } // Deposit, Withdraw, Transfer

        [Required]
        public DateTime Date { get; set; } = DateTime.Now;

        public string Description { get; set; }
    }
}
