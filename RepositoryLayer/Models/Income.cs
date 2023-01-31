using System;
using System.Collections.Generic;

namespace RepositoryLayer.Models
{
    public partial class Income
    {
        public int Id { get; set; }
        public int IncomeCategoryId { get; set; }
        public int UserId { get; set; }
        public decimal Price { get; set; }
        public string? Comment { get; set; }
        public DateTime Date { get; set; }

        public virtual IncomeCategory IncomeCategory { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
