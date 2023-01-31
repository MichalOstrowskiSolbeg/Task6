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
    public class IncomeRepository : IIncomeRepository
    {
        private readonly MyDbContext _context;
        public IncomeRepository(MyDbContext context) 
        {
            _context = context;
        }

        public async Task<List<Income>> GetIncomes(int userID)
        {
            return await _context.Incomes.Include(x => x.IncomeCategory).Where(x => x.UserId == userID).ToListAsync();
        }

        public async Task<Income> GetIncome(int id)
        {
            return await _context.Incomes.Include(x => x.IncomeCategory).FirstAsync(x => x.Id == id);
        }

        public async Task AddIncome(Income income)
        {
            await _context.Incomes.AddAsync(income);
            await _context.SaveChangesAsync();
        }

        public async Task EditIncome(Income income)
        {
            _context.Incomes.Update(income);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteIncome(int id)
        {
            _context.Incomes.Remove(await _context.Incomes.FirstAsync(x => x.Id == id));
            await _context.SaveChangesAsync();
        }
    }
}
