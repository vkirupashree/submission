namespace FinalProjectC_.Services
{
    public interface IJwtService
    {
        /// <summary>
        /// Generate a JWT token for the given user.
        /// </summary>
        /// <param name="user">User entity (must include Roles if role claims are desired).</param>
        /// <returns>JWT token string</returns>
        string GenerateToken(Models.User user);
    }
}