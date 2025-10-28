using System.Security;

namespace FinalProjectC_.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string RoleName { get; set; } = string.Empty;

        public ICollection<Permission>? Permissions { get; set; }
    }
}
