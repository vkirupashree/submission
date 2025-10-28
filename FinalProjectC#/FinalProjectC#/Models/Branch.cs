using System.Security.Principal;

namespace FinalProjectC_.Models
{
    public class Branch
    {
        public int Id { get; set; }
        public string BranchName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;

        public int BankId { get; set; }
        public Bank? Bank { get; set; }

        public ICollection<Account>? Accounts { get; set; }
    }
}
