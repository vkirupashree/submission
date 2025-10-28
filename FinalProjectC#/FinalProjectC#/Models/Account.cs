namespace FinalProjectC_.Models
{
    public abstract class Account
    {
        public int Id { get; set; }

        public string AccountNumber { get; set; } = string.Empty;

        public decimal Balance { get; set; }

        public string Currency { get; set; } = "INR";

        public bool IsClosed { get; set; } = false;

        // Foreign Keys
        public int UserId { get; set; }
        public User? User { get; set; }

        public int BranchId { get; set; }
        public Branch? Branch { get; set; }
    }
}
