using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FinalProjectC_.Models
{
    public class Permission : AuditableEntity
    {
        public int Id { get; set; }
        public string PermissionName { get; set; } = string.Empty;
        public ICollection<Role>? Roles { get; set; }
    }
}