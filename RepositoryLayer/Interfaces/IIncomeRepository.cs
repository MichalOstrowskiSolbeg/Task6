using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interfaces
{
    public interface IIncomeRepository
    {
        Task<List<Income>> GetIncomes(int userID);

        Task<Income> GetIncome(int id);

        Task AddIncome(Income income);

        Task EditIncome(Income income);

        Task DeleteIncome(int id);
    }
}
