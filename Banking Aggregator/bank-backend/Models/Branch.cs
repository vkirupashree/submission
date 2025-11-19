using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankManagementSystem.Models
{
    public class Branch
    {
        [Key]
        public int BranchId { get; set; }

        [Required]
        public string BranchCode { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string City { get; set; }

        [ForeignKey("Bank")]
        public int BankId { get; set; }
        public Bank? Bank { get; set; }

        public ICollection<Account>? Accounts { get; set; }
    }
}
