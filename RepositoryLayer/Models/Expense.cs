using System;
using System.Collections.Generic;

namespace RepositoryLayer.Models
{
    public partial class Expense
    {
        public int Id { get; set; }
        public int ExpenseCategoryId { get; set; }
        public int UserId { get; set; }
        public decimal Price { get; set; }
        public string? Comment { get; set; }
        public DateTime Date { get; set; }

        public virtual ExpenseCategory ExpenseCategory { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
