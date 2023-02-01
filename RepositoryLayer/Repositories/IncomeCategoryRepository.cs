using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repositories
{
    public class IncomeCategoryRepository : IIncomeCategoryRepository
    {
        private readonly MyDbContext _context;
        public IncomeCategoryRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task AddIncomeCategory(IncomeCategory incomeCategory)
        {
            await _context.IncomeCategories.AddAsync(incomeCategory);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteIncomeCategory(int id)
        {
            _context.Incomes.UpdateRange(await _context.Incomes.Where(x => x.IncomeCategoryId == id).ToListAsync());
            _context.IncomeCategories.Remove(await _context.IncomeCategories.FirstAsync(x => x.Id == id));
            await _context.SaveChangesAsync();
        }

        public async Task EditIncomeCategory(IncomeCategory incomeCategory)
        {
            _context.IncomeCategories.Update(incomeCategory);
            await _context.SaveChangesAsync();
        }

        public async Task<List<IncomeCategory>> GetIncomeCategories(int userId)
        {
            return await _context.IncomeCategories.Where(x => x.UserId == userId).AsNoTracking().ToListAsync();
        }

        public async Task<IncomeCategory> GetIncomeCategory(int id)
        {
            return await _context.IncomeCategories.AsNoTracking().FirstAsync(x => x.Id == id);
        }
    }
}
