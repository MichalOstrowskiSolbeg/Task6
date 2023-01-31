using Microsoft.Extensions.DependencyInjection;
using ServiceLayer.Interfaces;
using ServiceLayer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public static class Extensions
    {
        public static IServiceCollection AddServiceLayer(this IServiceCollection services)
        {
            services.AddScoped<IUser, UserService>();
            services.AddScoped<IIncomeCategory, IncomeCategoryService>();
            services.AddScoped<IExpenseCategory, ExpenseCategoryService>();
            services.AddScoped<IIncome, IncomeService>();
            services.AddScoped<IExpense, ExpenseService>();
            services.AddScoped<IStatistics, StatisticsService>();

            return services;
        }
    }
}
