using System.ComponentModel.DataAnnotations;

namespace BankManagementSystem.Models
{
    public class AccountLoginRequest
    {
        [Required]
        [System.Text.Json.Serialization.JsonPropertyName("accountNumber")]
        public string AccountNumber { get; set; }

        [Required]
        [System.Text.Json.Serialization.JsonPropertyName("accountPassword")]
        public string AccountPassword { get; set; }
    }
}