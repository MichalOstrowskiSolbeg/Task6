using System;
using System.Collections.Generic;

namespace RepositoryLayer.Models
{
    public partial class ExpenseCategory
    {
        public ExpenseCategory()
        {
            Expenses = new HashSet<Expense>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = null!;

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Expense> Expenses { get; set; }
    }
}
