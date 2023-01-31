using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interfaces
{
    public interface IExpenseCategoryRepository
    {
        Task<List<ExpenseCategory>> GetExpenseCategories(int userId);

        Task<ExpenseCategory> GetExpenseCategory(int id);

        Task AddExpenseCategory(ExpenseCategory expenseCategory);

        Task EditExpenseCategory(ExpenseCategory expenseCategory);

        Task DeleteExpenseCategory(int id);
    }
}