namespace FinalProjectC_.Models
{
    public class SavingsAccount : Account
    {
        public decimal InterestRate { get; set; }
        public bool IsMinor { get; set; } = false;
        public bool HasPowerOfAttorney { get; set; } = false;
    }
}
