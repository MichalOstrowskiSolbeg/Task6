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
    public class IncomeCategoryService : IIncomeCategory
    {
        private readonly IIncomeCategoryRepository _repository;
        public IncomeCategoryService(IIncomeCategoryRepository incomeCategoryRepository) 
        {
            _repository = incomeCategoryRepository;
        }

        public async Task AddIncomeCategory(string name, int id)
        {
            await _repository.AddIncomeCategory(new IncomeCategory
            {
                Name = name,
                UserId = id
            });
        }

        public async Task EditIncomeCategory(string name, int userId, int categoryId)
        {
            await _repository.EditIncomeCategory(new IncomeCategory
            {
                Id = categoryId,
                Name = name,
                UserId = userId
            });
        }

        public async Task DeleteIncomeCategory(int id)
        {
            await _repository.DeleteIncomeCategory(id);
        }

        public async Task<List<IncomeCategory>> GetIncomeCategories(int userId)
        {
            return await _repository.GetIncomeCategories(userId);
        }

        public async Task<IncomeCategory> GetIncomeCategory(int id)
        {
            return await _repository.GetIncomeCategory(id);
        }
    }
}
