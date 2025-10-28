namespace FinalProjectC_.Models
{
    public class TermDeposit : SavingsAccount
    {
        public DateTime MaturityDate { get; set; }
        public decimal DepositAmount { get; set; }
    }
}
