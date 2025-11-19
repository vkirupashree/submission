using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BankingAPI.Models
{
    public class BankingContextFactory : IDesignTimeDbContextFactory<BankingContext>
    {
        public BankingContext CreateDbContext(string[] args)
        {
            // Build config
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<BankingContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            optionsBuilder.UseSqlServer(connectionString);

            return new BankingContext(optionsBuilder.Options);
        }
    }
}
