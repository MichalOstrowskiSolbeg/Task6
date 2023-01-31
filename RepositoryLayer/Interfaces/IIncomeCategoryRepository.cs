using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interfaces
{
    public interface IIncomeCategoryRepository
    {
        Task<List<IncomeCategory>> GetIncomeCategories(int userId);

        Task<IncomeCategory> GetIncomeCategory(int id);

        Task AddIncomeCategory(IncomeCategory incomeCategory);

        Task EditIncomeCategory(IncomeCategory incomeCategory);

        Task DeleteIncomeCategory(int id);
    }
}