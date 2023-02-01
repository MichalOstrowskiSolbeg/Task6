using ServiceLayer.DTO.Requests;
using ServiceLayer.DTO.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interfaces
{
    public interface IExpense
    {
        Task<PaginatedResponse<ExpenseResponse>> GetUserExpenses(int userId, int page);

        Task<ExpenseResponse> GetExpense(int id);

        Task AddExpense(ExpenseRequest request, int userId);

        Task UpdateExpense(ExpenseRequest request, int id, int userId);

        Task DeleteExpense(int id);
    }
}
