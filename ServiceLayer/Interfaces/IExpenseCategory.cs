using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interfaces
{
    public interface IExpenseCategory
    {
        Task<List<ExpenseCategory>> GetExpenseCategories(int userId);

        Task<ExpenseCategory> GetExpenseCategory(int id);

        Task AddExpenseCategory(string name, int userId);

        Task EditExpenseCategory(string name, int userId, int categoryId);

        Task DeleteExpenseCategory(int id);
    }
}
