using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModelPrecision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Branches_BranchId",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Accounts");

            migrationBuilder.RenameColumn(
                name: "IsMinor",
                table: "Accounts",
                newName: "IsActive");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "BranchId",
                table: "Accounts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "AccountType",
                table: "Accounts",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "AccountNumber",
                table: "Accounts",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Accounts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Branches_BranchId",
                table: "Accounts",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "BranchId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Branches_BranchId",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AccountNumber",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Accounts");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Accounts",
                newName: "IsMinor");

            migrationBuilder.AlterColumn<int>(
                name: "BranchId",
                table: "Accounts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AccountType",
                table: "Accounts",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Branches_BranchId",
                table: "Accounts",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "BranchId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
