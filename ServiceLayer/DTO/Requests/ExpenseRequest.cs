using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.DTO.Requests
{
    public class ExpenseRequest
    {
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public string? Comment { get; set; }
        public DateTime Date { get; set; }
    }
}
