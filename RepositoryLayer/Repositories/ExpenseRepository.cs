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
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly MyDbContext _context;
        public ExpenseRepository(MyDbContext context) 
        {
            _context = context;
        }

        public async Task AddExpense(Expense expense)
        {
            await _context.Expenses.AddAsync(expense);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteExpense(int id)
        {
            _context.Expenses.Remove(await _context.Expenses.FirstAsync(x => x.Id == id));
            await _context.SaveChangesAsync();
        }

        public async Task EditExpense(Expense expense)
        {
            _context.Expenses.Update(expense);
            await _context.SaveChangesAsync();
        }

        public async Task<Expense> GetExpense(int id)
        {
            return await _context.Expenses.Include(x => x.ExpenseCategory).AsNoTracking().FirstAsync(x => x.Id == id);
        }

        public async Task<List<Expense>> GetExpenses(int userID)
        {
            return await _context.Expenses.Include(x => x.ExpenseCategory).Where(x => x.UserId == userID).OrderBy(x => x.Date).ToListAsync();
        }
    }
}
