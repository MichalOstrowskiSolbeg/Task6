using System;
using System.Collections.Generic;

namespace RepositoryLayer.Models
{
    public partial class IncomeCategory
    {
        public IncomeCategory()
        {
            Incomes = new HashSet<Income>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = null!;

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Income> Incomes { get; set; }
    }
}
