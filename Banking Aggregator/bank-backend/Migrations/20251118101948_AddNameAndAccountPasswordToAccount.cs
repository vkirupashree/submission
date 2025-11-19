using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddNameAndAccountPasswordToAccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccountPassword",
                schema: "training",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                schema: "training",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountPassword",
                schema: "training",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "Name",
                schema: "training",
                table: "Accounts");
        }
    }
}
