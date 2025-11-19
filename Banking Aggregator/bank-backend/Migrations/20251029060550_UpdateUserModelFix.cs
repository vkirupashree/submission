using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserModelFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Branches_BranchId",
                schema: "training",
                table: "Accounts");

            migrationBuilder.DropTable(
                name: "Branches",
                schema: "training");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_BranchId",
                schema: "training",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                schema: "training",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                schema: "training",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Type",
                schema: "training",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "HeadOffice",
                schema: "training",
                table: "Banks");

            migrationBuilder.DropColumn(
                name: "BranchId",
                schema: "training",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "training",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "IsActive",
                schema: "training",
                table: "Accounts");

            migrationBuilder.RenameColumn(
                name: "Description",
                schema: "training",
                table: "Transactions",
                newName: "TransactionType");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                schema: "training",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                schema: "training",
                table: "Users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                schema: "training",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                schema: "training",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "training",
                table: "Users",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "BankName",
                schema: "training",
                table: "Banks",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                schema: "training",
                table: "Banks",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BranchCode",
                schema: "training",
                table: "Banks",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "AccountType",
                schema: "training",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "AccountNumber",
                schema: "training",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<int>(
                name: "BankId",
                schema: "training",
                table: "Accounts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                schema: "training",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_BankId",
                schema: "training",
                table: "Accounts",
                column: "BankId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Banks_BankId",
                schema: "training",
                table: "Accounts",
                column: "BankId",
                principalSchema: "training",
                principalTable: "Banks",
                principalColumn: "BankId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Banks_BankId",
                schema: "training",
                table: "Accounts");

            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                schema: "training",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_BankId",
                schema: "training",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "Address",
                schema: "training",
                table: "Banks");

            migrationBuilder.DropColumn(
                name: "BranchCode",
                schema: "training",
                table: "Banks");

            migrationBuilder.DropColumn(
                name: "BankId",
                schema: "training",
                table: "Accounts");

            migrationBuilder.RenameColumn(
                name: "TransactionType",
                schema: "training",
                table: "Transactions",
                newName: "Description");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                schema: "training",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<int>(
                name: "Role",
                schema: "training",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                schema: "training",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                schema: "training",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "training",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                schema: "training",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                schema: "training",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                schema: "training",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "BankName",
                schema: "training",
                table: "Banks",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.AddColumn<string>(
                name: "HeadOffice",
                schema: "training",
                table: "Banks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "AccountType",
                schema: "training",
                table: "Accounts",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "AccountNumber",
                schema: "training",
                table: "Accounts",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                schema: "training",
                table: "Accounts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "training",
                table: "Accounts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                schema: "training",
                table: "Accounts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Branches",
                schema: "training",
                columns: table => new
                {
                    BranchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BankId = table.Column<int>(type: "int", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BranchCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.BranchId);
                    table.ForeignKey(
                        name: "FK_Branches_Banks_BankId",
                        column: x => x.BankId,
                        principalSchema: "training",
                        principalTable: "Banks",
                        principalColumn: "BankId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_BranchId",
                schema: "training",
                table: "Accounts",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_BankId",
                schema: "training",
                table: "Branches",
                column: "BankId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Branches_BranchId",
                schema: "training",
                table: "Accounts",
                column: "BranchId",
                principalSchema: "training",
                principalTable: "Branches",
                principalColumn: "BranchId");
        }
    }
}
