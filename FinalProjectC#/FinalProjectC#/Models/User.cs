using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Security.Principal;

namespace FinalProjectC_.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required, EmailAddress, MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        // Navigation Properties
        public ICollection<Account>? Accounts { get; set; }
        public ICollection<Role>? Roles { get; set; }
    }
}
