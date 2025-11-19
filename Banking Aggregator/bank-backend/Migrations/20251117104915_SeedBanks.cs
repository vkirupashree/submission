using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BankManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class SeedBanks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccountType",
                schema: "training",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BankName",
                schema: "training",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Branch",
                schema: "training",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "State",
                schema: "training",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                schema: "training",
                table: "Banks",
                columns: new[] { "BankId", "BankName", "IFSCCode" },
                values: new object[,]
                {
                    { 1, "CUB", "CUB0001" },
                    { 2, "State Bank of India", "SBIN0000001" },
                    { 3, "HDFC Bank", "HDFC0001" },
                    { 4, "ICICI Bank", "ICIC0001" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "training",
                table: "Banks",
                keyColumn: "BankId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                schema: "training",
                table: "Banks",
                keyColumn: "BankId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                schema: "training",
                table: "Banks",
                keyColumn: "BankId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                schema: "training",
                table: "Banks",
                keyColumn: "BankId",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "AccountType",
                schema: "training",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "BankName",
                schema: "training",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "Branch",
                schema: "training",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "State",
                schema: "training",
                table: "Accounts");
        }
    }
}
