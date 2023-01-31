using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.DTO.Responses
{
    public class IncomeResponse
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string? Comment { get; set; }
        public DateTime Date { get; set; }
    }
}
