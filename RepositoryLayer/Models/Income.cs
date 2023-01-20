using System;
using System.Collections.Generic;

namespace RepositoryLayer.Models
{
    public partial class Income
    {
        public int MoneyEntityId { get; set; }
        public int IncomeCategoryId { get; set; }

        public virtual IncomeCategory IncomeCategory { get; set; } = null!;
        public virtual MoneyEntity MoneyEntity { get; set; } = null!;
    }
}
