/* DDL.sql — Updated as per trainer sample table */

SET NOCOUNT ON;
GO

-- Create database if not exists
IF DB_ID(N'training') IS NULL
BEGIN
    CREATE DATABASE [training];
END
GO

USE [training];
GO

-- Create schema 'training' if not exists
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = N'training')
BEGIN
    EXEC('CREATE SCHEMA [training]');
END
GO

-- ===============================
-- Roles table
-- ===============================
IF OBJECT_ID(N'training.Roles', N'U') IS NULL
BEGIN
CREATE TABLE training.Roles
(
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(100) NOT NULL UNIQUE,
    CreatedBy NVARCHAR(100) NULL,
    CreatedOn DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedBy NVARCHAR(100) NULL,
    ModifiedOn DATETIMEOFFSET NULL
);
END
GO

-- ===============================
-- Permissions table
-- ===============================
IF OBJECT_ID(N'training.Permissions', N'U') IS NULL
BEGIN
CREATE TABLE training.Permissions
(
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    PermissionName NVARCHAR(100) NOT NULL UNIQUE,
    CreatedBy NVARCHAR(100) NULL,
    CreatedOn DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedBy NVARCHAR(100) NULL,
    ModifiedOn DATETIMEOFFSET NULL
);
END
GO

-- ===============================
-- RolePermissions (junction)
-- ===============================
IF OBJECT_ID(N'training.RolePermissions', N'U') IS NULL
BEGIN
CREATE TABLE training.RolePermissions
(
    RoleId BIGINT NOT NULL,
    PermissionId BIGINT NOT NULL,
    PRIMARY KEY (RoleId, PermissionId),
    CONSTRAINT FK_RolePermissions_Role FOREIGN KEY (RoleId) REFERENCES training.Roles(Id) ON DELETE CASCADE,
    CONSTRAINT FK_RolePermissions_Permission FOREIGN KEY (PermissionId) REFERENCES training.Permissions(Id) ON DELETE CASCADE
);
END
GO

-- ===============================
-- Users table
-- ===============================
IF OBJECT_ID(N'training.Users', N'U') IS NULL
BEGIN
CREATE TABLE training.Users
(
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(512) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    FirstName NVARCHAR(100) NULL,
    LastName NVARCHAR(100) NULL,
    IsEmployee BIT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedBy NVARCHAR(100) NULL,
    CreatedOn DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedBy NVARCHAR(100) NULL,
    ModifiedOn DATETIMEOFFSET NULL
);
END
GO

-- ===============================
-- UserRoles junction
-- ===============================
IF OBJECT_ID(N'training.UserRoles', N'U') IS NULL
BEGIN
CREATE TABLE training.UserRoles
(
    UserId BIGINT NOT NULL,
    RoleId BIGINT NOT NULL,
    PRIMARY KEY (UserId, RoleId),
    CONSTRAINT FK_UserRoles_User FOREIGN KEY (UserId) REFERENCES training.Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_UserRoles_Role FOREIGN KEY (RoleId) REFERENCES training.Roles(Id) ON DELETE CASCADE
);
END
GO

-- ===============================
-- Banks table
-- ===============================
IF OBJECT_ID(N'training.Banks', N'U') IS NULL
BEGIN
CREATE TABLE training.Banks
(
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    BankName NVARCHAR(200) NOT NULL UNIQUE,
    CreatedBy NVARCHAR(100) NULL,
    CreatedOn DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedBy NVARCHAR(100) NULL,
    ModifiedOn DATETIMEOFFSET NULL
);
END
GO

-- ===============================
-- Branches table
-- ===============================
IF OBJECT_ID(N'training.Branches', N'U') IS NULL
BEGIN
CREATE TABLE training.Branches
(
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    BranchName NVARCHAR(200) NOT NULL,
    Address NVARCHAR(500) NULL,
    BankId BIGINT NOT NULL,
    CreatedBy NVARCHAR(100) NULL,
    CreatedOn DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedBy NVARCHAR(100) NULL,
    ModifiedOn DATETIMEOFFSET NULL,
    CONSTRAINT FK_Branches_Bank FOREIGN KEY (BankId) REFERENCES training.Banks(Id) ON DELETE CASCADE
);
END
GO

-- ===============================
-- Accounts table (TPH)
-- ===============================
IF OBJECT_ID(N'training.Accounts', N'U') IS NULL
BEGIN
CREATE TABLE training.Accounts
(
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    AccountNumber NVARCHAR(50) NOT NULL UNIQUE,
    AccountType NVARCHAR(50) NOT NULL, -- Savings / Current / TermDeposit
    Balance DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    Currency NVARCHAR(10) NOT NULL DEFAULT N'INR',
    IsClosed BIT NOT NULL DEFAULT 0,
    UserId BIGINT NOT NULL,
    BranchId BIGINT NOT NULL,
    -- Savings
    InterestRate DECIMAL(5,2) NULL,
    IsMinor BIT NULL,
    HasPowerOfAttorney BIT NULL,
    -- Current
    OverdraftLimit DECIMAL(18,2) NULL,
    -- Term Deposit
    DepositAmount DECIMAL(18,2) NULL,
    MaturityDate DATETIMEOFFSET NULL,
    CreatedBy NVARCHAR(100) NULL,
    CreatedOn DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    ModifiedBy NVARCHAR(100) NULL,
    ModifiedOn DATETIMEOFFSET NULL,
    CONSTRAINT FK_Accounts_User FOREIGN KEY (UserId) REFERENCES training.Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Accounts_Branch FOREIGN KEY (BranchId) REFERENCES training.Branches(Id) ON DELETE CASCADE
);
END
GO
