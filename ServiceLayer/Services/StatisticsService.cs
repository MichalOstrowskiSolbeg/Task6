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

        public async Task<StatisticsResponse> GetUserStatistics(int userId, TimeRange timeRange)
        {
            var income = await _incomeRepository.GetIncomes(userId);

            income = income.Where(x => 
            timeRange == TimeRange.ThisMonth && x.Date.Month == DateTime.Now.Month ||
            timeRange == TimeRange.LastMonth && x.Date.Month == DateTime.Now.AddMonths(-1).Month ||
            timeRange == TimeRange.ThisYear && x.Date.Year == DateTime.Now.Year ||
            timeRange == TimeRange.LastYear && x.Date.Year == DateTime.Now.AddYears(-1).Year ||
            timeRange == TimeRange.AllTime
            ).ToList();


            var expense = await _expenseRepository.GetExpenses(userId);

            expense = expense.Where(x =>
            timeRange == TimeRange.ThisMonth && x.Date.Month == DateTime.Now.Month ||
            timeRange == TimeRange.LastMonth && x.Date.Month == DateTime.Now.AddMonths(-1).Month ||
            timeRange == TimeRange.ThisYear && x.Date.Year == DateTime.Now.Year ||
            timeRange == TimeRange.LastYear && x.Date.Year == DateTime.Now.AddYears(-1).Year ||
            timeRange == TimeRange.AllTime
            ).ToList();



            return new StatisticsResponse
            {
                IncomeSum = income.Sum(x => x.Price),
                ExpenseSum = expense.Sum(x => x.Price),
                IncomeGroupedPrice = income.GroupBy(l => l.IncomeCategory)
                .Select(cl => new SumGroupedResponse
                {
                    Name = cl.First().IncomeCategory.Name,
                    Sum = cl.Sum(c => c.Price)
                }).ToList(),
                ExpenseGroupedPrice = expense.GroupBy(l => l.ExpenseCategory)
                .Select(cl => new SumGroupedResponse
                {
                    Name = cl.First().ExpenseCategory.Name,
                    Sum = cl.Sum(c => c.Price)
                }).ToList(),
                IncomeGroupedCount = income.GroupBy(l => l.IncomeCategory)
                .Select(cl => new CountGroupedResponse
                {
                    Name = cl.First().IncomeCategory.Name,
                    Count = cl.Count()
                }).ToList(),
                ExpenseGroupedCount = expense.GroupBy(l => l.ExpenseCategory)
                .Select(cl => new CountGroupedResponse
                {
                    Name = cl.First().ExpenseCategory.Name,
                    Count = cl.Count()
                }).ToList(),
            };
        }
    }
}