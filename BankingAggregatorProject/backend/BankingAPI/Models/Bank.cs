using System.ComponentModel.DataAnnotations;

namespace BankingAPI.Models
{
    public class Bank
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public ICollection<Branch> Branches { get; set; }
    }
}
