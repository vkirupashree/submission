using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankManagementSystem.Models
{
    [Table("Users", Schema = "training")]
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }


        public string Role { get; set; } = "User";

        public bool Status { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
