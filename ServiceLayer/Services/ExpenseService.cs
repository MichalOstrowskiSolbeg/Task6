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

        public async Task<List<ExpenseResponse>> GetUserExpenses(int userId)
        {
            return _mapper.Map<List<ExpenseResponse>>(await _repository.GetExpenses(userId));
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