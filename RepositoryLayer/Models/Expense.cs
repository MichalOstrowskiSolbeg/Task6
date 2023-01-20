using System;
using System.Collections.Generic;

namespace RepositoryLayer.Models
{
    public partial class Expense
    {
        public int MoneyEntityId { get; set; }
        public int ExpenseCategoryId { get; set; }

        public virtual ExpenseCategory ExpenseCategory { get; set; } = null!;
        public virtual MoneyEntity MoneyEntity { get; set; } = null!;
    }
}
