using RepositoryLayer.Models;
using ServiceLayer.DTO.Requests;
using ServiceLayer.DTO.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interfaces
{
    public interface IIncome
    {
        Task<PaginatedResponse<IncomeResponse>> GetUserIncomes(int userId, int page);

        Task<IncomeResponse> GetIncome(int id);

        Task AddIncome(IncomeRequest request, int userId);

        Task UpdateIncome(IncomeRequest request, int id, int userId);

        Task DeleteIncome(int id);
    }
}
