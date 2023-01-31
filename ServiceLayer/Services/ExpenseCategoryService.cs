using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ExpenseCategoryService : IExpenseCategory
    {
        private readonly IExpenseCategoryRepository _repository;
        public ExpenseCategoryService(IExpenseCategoryRepository incomeCategoryRepository) 
        {
            _repository = incomeCategoryRepository;
        }

        public async Task<List<ExpenseCategory>> GetExpenseCategories(int userId)
        {
            return await _repository.GetExpenseCategories(userId);
        }

        public async Task<ExpenseCategory> GetExpenseCategory(int id)
        {
            return await _repository.GetExpenseCategory(id);
        }

        public async Task AddExpenseCategory(string name, int userId)
        {
            await _repository.AddExpenseCategory(new ExpenseCategory 
            { 
                Name = name, 
                UserId = userId 
            });
        }

        public async Task EditExpenseCategory(string name, int userId, int categoryId)
        {
            await _repository.EditExpenseCategory(new ExpenseCategory
            {
                Id = categoryId,
                Name = name,
                UserId = userId
            });
        }

        public async Task DeleteExpenseCategory(int id)
        {
            await _repository.DeleteExpenseCategory(id);
        }
    }
}