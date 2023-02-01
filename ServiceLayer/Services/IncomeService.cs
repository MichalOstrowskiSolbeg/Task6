using AutoMapper;
using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using ServiceLayer.Common;
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

        public async Task<PaginatedResponse<IncomeResponse>> GetUserIncomes(int userId, int page)
        {
            var results = await _repository.GetIncomes(userId);

            return new PaginatedResponse<IncomeResponse>
            {
                Items = _mapper.Map<List<IncomeResponse>>(results
                    .Skip((page - 1) * PaginationValues.PAGE_SIZE)
                    .Take(PaginationValues.PAGE_SIZE)),
                PageCount = (int)Math.Ceiling(results.Count() / (double)PaginationValues.PAGE_SIZE),
                PageIndex = page
            };
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
