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
        public List<GroupResponse> IncomeGrouped { get; set; }
        public List<GroupResponse> ExpenseGrouped { get; set; }
    }
}
