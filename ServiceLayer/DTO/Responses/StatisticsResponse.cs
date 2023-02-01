using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.DTO.Responses
{
    public class StatisticsResponse
    {
        public decimal IncomeSum { get; set; }
        public decimal ExpenseSum { get; set; }
        public List<SumGroupedResponse> IncomeGroupedPrice { get; set; }
        public List<SumGroupedResponse> ExpenseGroupedPrice { get; set; }
        public List<CountGroupedResponse> IncomeGroupedCount { get; set; }
        public List<CountGroupedResponse> ExpenseGroupedCount { get; set; }
    }
}
