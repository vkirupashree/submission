using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankManagementSystem.Models
{
    [Table("Banks", Schema = "training")]
    public class Bank
    {
        [Key]
        public int BankId { get; set; }

        [Required]
        public string BankName { get; set; }


    public string IFSCCode { get; set; }

    // Navigation property for branches
    public ICollection<Branch> Branches { get; set; }


    }
}
