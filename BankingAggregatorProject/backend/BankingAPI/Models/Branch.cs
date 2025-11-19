using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingAPI.Models
{
    public class Branch
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [ForeignKey("Bank")]
        public int BankId { get; set; }
        public Bank Bank { get; set; }
    }
}
