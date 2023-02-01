using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repositories
{
    public class ExpenseCategoryRepository : IExpenseCategoryRepository
    {
        private readonly MyDbContext _context;
        public ExpenseCategoryRepository(MyDbContext context) 
        {
            _context = context;
        }

        public async Task AddExpenseCategory(ExpenseCategory expenseCategory)
        {
            await _context.ExpenseCategories.AddAsync(expenseCategory);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteExpenseCategory(int id)
        {
            _context.Expenses.RemoveRange(await _context.Expenses.Where(x => x.ExpenseCategoryId == id).ToListAsync());
            _context.ExpenseCategories.Remove(await _context.ExpenseCategories.FirstAsync(x => x.Id == id));
            await _context.SaveChangesAsync();
        }

        public async Task EditExpenseCategory(ExpenseCategory expenseCategory)
        {
            _context.ExpenseCategories.Update(expenseCategory);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ExpenseCategory>> GetExpenseCategories(int userId)
        {
            return await _context.ExpenseCategories.Where(x => x.UserId == userId).AsNoTracking().ToListAsync();
        }

        public async Task<ExpenseCategory> GetExpenseCategory(int id)
        {
            return await _context.ExpenseCategories.AsNoTracking().FirstAsync(x => x.Id == id);
        }
    }
}
