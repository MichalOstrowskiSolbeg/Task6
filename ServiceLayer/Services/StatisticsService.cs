using AutoMapper;
using RepositoryLayer.Interfaces;
using ServiceLayer.Common;
using ServiceLayer.DTO.Responses;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class StatisticsService : IStatistics
    {
        private readonly IIncomeRepository _incomeRepository;
        private readonly IExpenseRepository _expenseRepository;
        private readonly IMapper _mapper;
        public StatisticsService(IIncomeRepository incomeRepository, IExpenseRepository expenseRepository, IMapper mapper)
        {
            _incomeRepository = incomeRepository;
            _expenseRepository = expenseRepository;
            _mapper = mapper;
        }

        public async Task<StatisticsResponse> GetUserStatistics(int userId, TimeRange enums)
        {
            var income = await _incomeRepository.GetIncomes(userId);

            income = income.Where(x => 
            enums == TimeRange.ThisMonth && x.Date.Month == DateTime.Now.Month ||
            enums == TimeRange.LastMonth && x.Date.Month == DateTime.Now.AddMonths(-1).Month ||
            enums == TimeRange.ThisYear && x.Date.Year == DateTime.Now.Year ||
            enums == TimeRange.LastYear && x.Date.Year == DateTime.Now.AddYears(-1).Year ||
            enums == TimeRange.AllTime
            ).ToList();


            var expense = await _expenseRepository.GetExpenses(userId);

            expense = expense.Where(x =>
            enums == TimeRange.ThisMonth && x.Date.Month == DateTime.Now.Month ||
            enums == TimeRange.LastMonth && x.Date.Month == DateTime.Now.AddMonths(-1).Month ||
            enums == TimeRange.ThisYear && x.Date.Year == DateTime.Now.Year ||
            enums == TimeRange.LastYear && x.Date.Year == DateTime.Now.AddYears(-1).Year ||
            enums == TimeRange.AllTime
            ).ToList();



            return new StatisticsResponse
            {
                IncomeSum = income.Sum(x => x.Price),
                ExpenseSum = expense.Sum(x => x.Price),
                IncomeGrouped = income.GroupBy(l => l.IncomeCategory)
                .Select(cl => new GroupResponse
                {
                    Name = cl.First().IncomeCategory.Name,
                    Sum = cl.Sum(c => c.Price),
                }).ToList(),
                ExpenseGrouped = expense.GroupBy(l => l.ExpenseCategory)
                .Select(cl => new GroupResponse
                {
                    Name = cl.First().ExpenseCategory.Name,
                    Sum = cl.Sum(c => c.Price),
                }).ToList()
            };
        }
    }
}