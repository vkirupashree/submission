namespace FinalProjectC_.Models
{
    public class RolePermission : AuditableEntity
    {
        public long RoleId { get; set; }
        public Role Role { get; set; } = null!;

        public long PermissionId { get; set; }
        public Permission Permission { get; set; } = null!;
    }
}