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
    public class ExpenseService : IExpense
    {
        private readonly IExpenseRepository _repository;
        private readonly IMapper _mapper;
        public ExpenseService(IExpenseRepository expenseRepository, IMapper mapper) 
        {
            _repository = expenseRepository;
            _mapper = mapper;
        }

        public async Task<ExpenseResponse> GetExpense(int id)
        {
            return _mapper.Map<ExpenseResponse>(await _repository.GetExpense(id));
        }

        public async Task<PaginatedResponse<ExpenseResponse>> GetUserExpenses(int userId, int page)
        {
            var results = await _repository.GetExpenses(userId);

            return new PaginatedResponse<ExpenseResponse>
            {
                Items = _mapper.Map<List<ExpenseResponse>>(results
                    .Skip((page - 1) * PaginationValues.PAGE_SIZE)
                    .Take(PaginationValues.PAGE_SIZE)),
                PageCount = (int)Math.Ceiling(results.Count() / (double)PaginationValues.PAGE_SIZE),
                PageIndex = page
            };
        }

        public async Task AddExpense(ExpenseRequest request, int userId)
        {
            await _repository.AddExpense(new Expense
            {
                UserId = userId,
                Comment = request.Comment,
                ExpenseCategoryId = request.CategoryId,
                Price = request.Price,
                Date = request.Date
            });
        }

        public async Task DeleteExpense(int id)
        {
            await _repository.DeleteExpense(id);
        }

        public async Task UpdateExpense(ExpenseRequest request, int id, int userId)
        {
            await _repository.EditExpense(new Expense
            {
                Id = id,
                UserId = userId,
                Comment = request.Comment,
                ExpenseCategoryId = request.CategoryId,
                Price = request.Price,
                Date = request.Date
            });
        }
    }
}