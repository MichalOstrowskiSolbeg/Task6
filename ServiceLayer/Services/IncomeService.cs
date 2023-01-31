using AutoMapper;
using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using ServiceLayer.DTO.Requests;
using ServiceLayer.DTO.Responses;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class IncomeService : IIncome
    {
        private readonly IIncomeRepository _repository;
        private readonly IMapper _mapper;
        public IncomeService(IIncomeRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IncomeResponse> GetIncome(int id)
        {
            return _mapper.Map<IncomeResponse>(await _repository.GetIncome(id));
        }

        public async Task<List<IncomeResponse>> GetUserIncomes(int userId)
        {
            return _mapper.Map<List<IncomeResponse>>(await _repository.GetIncomes(userId));
        }

        public async Task AddIncome(IncomeRequest request, int userId)
        {
            await _repository.AddIncome(new Income
            {
                IncomeCategoryId = request.CategoryId,
                UserId = userId,
                Price = request.Price,
                Date = request.Date,
                Comment = request.Comment
            });
        }

        public async Task UpdateIncome(IncomeRequest request, int id, int userId)
        {
            await _repository.EditIncome(new Income
            {
                Id = id,
                IncomeCategoryId = request.CategoryId,
                UserId = userId,
                Price = request.Price,
                Date = request.Date,
                Comment = request.Comment
            });
        }

        public async Task DeleteIncome(int id)
        {
            await _repository.DeleteIncome(id);
        }
    }
}
