using System;
using System.Collections.Generic;

namespace RepositoryLayer.Models
{
    public partial class MoneyEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Price { get; set; }
        public string? Comment { get; set; }
        public DateTime Date { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual Expense? Expense { get; set; }
        public virtual Income? Income { get; set; }
    }
}
