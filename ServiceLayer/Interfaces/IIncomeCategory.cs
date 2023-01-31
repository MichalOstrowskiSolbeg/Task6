using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interfaces
{
    public interface IIncomeCategory
    {
        Task<List<IncomeCategory>> GetIncomeCategories(int userId);

        Task<IncomeCategory> GetIncomeCategory(int id);

        Task AddIncomeCategory(string name, int userId);

        Task EditIncomeCategory(string name, int userId, int categoryId);

        Task DeleteIncomeCategory(int id);
    }
}
