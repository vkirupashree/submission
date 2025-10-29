using System;

using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;

namespace FinalProjectC_.Models

{

    public class User : AuditableEntity

    {

        public int Id { get; set; }

        [Required, MaxLength(100)]

        public string Username { get; set; } = string.Empty;

        [Required]

        public string PasswordHash { get; set; } = string.Empty;

        [Required, EmailAddress, MaxLength(150)]

        public string Email { get; set; } = string.Empty;

        public ICollection<Account>? Accounts { get; set; }

        public ICollection<Role>? Roles { get; set; }

    }

}

