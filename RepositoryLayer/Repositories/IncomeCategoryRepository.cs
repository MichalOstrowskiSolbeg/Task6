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
            _context.IncomeCategories.Remove(await _context.IncomeCategories.FirstAsync(x => x.Id == id));
            await _context.SaveChangesAsync();
        }

        public Task EditIncomeCategory(int id, IncomeCategory incomeCategory)
        {
            throw new NotImplementedException();
        }

        public async Task<List<IncomeCategory>> GetIncomeCategories()
        {
            return await _context.IncomeCategories.ToListAsync();
        }

        public async Task<IncomeCategory> GetIncomeCategory(int id)
        {
            return await _context.IncomeCategories.FirstAsync(x => x.Id == id);
        }
    }
}
