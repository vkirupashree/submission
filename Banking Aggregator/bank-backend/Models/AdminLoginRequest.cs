namespace BankManagementSystem.Models
{
    public class AdminLoginRequest
    {
        [System.Text.Json.Serialization.JsonPropertyName("email")]
        public string Email { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("password")]
        public string Password { get; set; }
    }
}