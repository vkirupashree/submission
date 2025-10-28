namespace FinalProjectC_.Models
{
    public class Bank
    {
        public int Id { get; set; }
        public string BankName { get; set; } = string.Empty;

        // Navigation
        public ICollection<Branch>? Branches { get; set; }
    }
}
