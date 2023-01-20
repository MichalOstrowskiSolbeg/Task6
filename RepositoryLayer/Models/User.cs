using System;
using System.Collections.Generic;

namespace RepositoryLayer.Models
{
    public partial class User
    {
        public User()
        {
            ExpenseCategories = new HashSet<ExpenseCategory>();
            IncomeCategories = new HashSet<IncomeCategory>();
            MoneyEntities = new HashSet<MoneyEntity>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Salt { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExp { get; set; }

        public virtual ICollection<ExpenseCategory> ExpenseCategories { get; set; }
        public virtual ICollection<IncomeCategory> IncomeCategories { get; set; }
        public virtual ICollection<MoneyEntity> MoneyEntities { get; set; }
    }
}
