using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using RepositoryLayer.Models;

namespace RepositoryLayer
{
    public partial class MyDbContext : DbContext
    {
        public MyDbContext()
        {
        }

        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Expense> Expenses { get; set; } = null!;
        public virtual DbSet<ExpenseCategory> ExpenseCategories { get; set; } = null!;
        public virtual DbSet<Income> Incomes { get; set; } = null!;
        public virtual DbSet<IncomeCategory> IncomeCategories { get; set; } = null!;
        public virtual DbSet<MoneyEntity> MoneyEntities { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expense>(entity =>
            {
                entity.HasKey(e => e.MoneyEntityId)
                    .HasName("Expense_pk");

                entity.ToTable("Expense");

                entity.Property(e => e.MoneyEntityId)
                    .ValueGeneratedNever()
                    .HasColumnName("Money_Entity_Id");

                entity.Property(e => e.ExpenseCategoryId).HasColumnName("Expense_Category_Id");

                entity.HasOne(d => d.ExpenseCategory)
                    .WithMany(p => p.Expenses)
                    .HasForeignKey(d => d.ExpenseCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Expense_Expense_Category");

                entity.HasOne(d => d.MoneyEntity)
                    .WithOne(p => p.Expense)
                    .HasForeignKey<Expense>(d => d.MoneyEntityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Expense_Money_Entity");
            });

            modelBuilder.Entity<ExpenseCategory>(entity =>
            {
                entity.ToTable("Expense_Category");

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ExpenseCategories)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Expense_Category_User");
            });

            modelBuilder.Entity<Income>(entity =>
            {
                entity.HasKey(e => e.MoneyEntityId)
                    .HasName("Income_pk");

                entity.ToTable("Income");

                entity.Property(e => e.MoneyEntityId)
                    .ValueGeneratedNever()
                    .HasColumnName("Money_Entity_Id");

                entity.Property(e => e.IncomeCategoryId).HasColumnName("Income_Category_Id");

                entity.HasOne(d => d.IncomeCategory)
                    .WithMany(p => p.Incomes)
                    .HasForeignKey(d => d.IncomeCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Income_Income_Category");

                entity.HasOne(d => d.MoneyEntity)
                    .WithOne(p => p.Income)
                    .HasForeignKey<Income>(d => d.MoneyEntityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Income_Money_Entity");
            });

            modelBuilder.Entity<IncomeCategory>(entity =>
            {
                entity.ToTable("Income_Category");

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.IncomeCategories)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Income_Category_User");
            });

            modelBuilder.Entity<MoneyEntity>(entity =>
            {
                entity.ToTable("Money_Entity");

                entity.Property(e => e.Comment)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.MoneyEntities)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Money_Entity_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasIndex(e => e.Username, "User_ak_1")
                    .IsUnique();

                entity.HasIndex(e => e.Username, "User_idx_1");

                entity.HasIndex(e => e.Email, "User_idx_2");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RefreshToken)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Refresh_Token");

                entity.Property(e => e.RefreshTokenExp)
                    .HasColumnType("datetime")
                    .HasColumnName("Refresh_Token_Exp");

                entity.Property(e => e.Salt)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
