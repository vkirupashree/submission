using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordColumnToUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "training");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "Users",
                newSchema: "training");

            migrationBuilder.RenameTable(
                name: "Transactions",
                newName: "Transactions",
                newSchema: "training");

            migrationBuilder.RenameTable(
                name: "Branches",
                newName: "Branches",
                newSchema: "training");

            migrationBuilder.RenameTable(
                name: "Banks",
                newName: "Banks",
                newSchema: "training");

            migrationBuilder.RenameTable(
                name: "Accounts",
                newName: "Accounts",
                newSchema: "training");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Users",
                schema: "training",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "Transactions",
                schema: "training",
                newName: "Transactions");

            migrationBuilder.RenameTable(
                name: "Branches",
                schema: "training",
                newName: "Branches");

            migrationBuilder.RenameTable(
                name: "Banks",
                schema: "training",
                newName: "Banks");

            migrationBuilder.RenameTable(
                name: "Accounts",
                schema: "training",
                newName: "Accounts");
        }
    }
}
