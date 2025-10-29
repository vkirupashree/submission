using Microsoft.Extensions.Configuration;

using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;

using System.Text;

namespace FinalProjectC_.Services

{

    public class JwtService : IJwtService

    {

        private readonly IConfiguration _config;

        public JwtService(IConfiguration config)

        {

            _config = config;

        }

        public string GenerateToken(Models.User user)

        {

            if (user == null) throw new ArgumentNullException(nameof(user));

            var jwtSection = _config.GetSection("Jwt");

            var keyString = jwtSection["Key"];

            var issuer = jwtSection["Issuer"];

            var audience = jwtSection["Audience"];

            var expiresInMinutes = 60;

            int.TryParse(jwtSection["ExpiresInMinutes"], out expiresInMinutes);

            var claims = new List<Claim>

            {

                new Claim(JwtRegisteredClaimNames.Sub, user.Username ?? string.Empty),

                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),

                new Claim("UserId", user.Id.ToString())

            };

            // Add role claims if user has roles (make sure Roles were included when you queried the user)

            if (user.Roles != null)

            {

                foreach (var r in user.Roles)

                {

                    if (!string.IsNullOrWhiteSpace(r.RoleName))

                        claims.Add(new Claim(ClaimTypes.Role, r.RoleName));

                }

            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(

                issuer: issuer,

                audience: audience,

                claims: claims,

                expires: DateTime.UtcNow.AddMinutes(expiresInMinutes),

                signingCredentials: creds

            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

    }

}
