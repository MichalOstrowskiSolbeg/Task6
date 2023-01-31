using AutoMapper;
using RepositoryLayer.Models;
using ServiceLayer.DTO.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Income, IncomeResponse>()
                .ForMember(x => x.CategoryId, y => y.MapFrom(s => s.IncomeCategory.Id))
                .ForMember(x => x.Category, y => y.MapFrom(s => s.IncomeCategory.Name));

            CreateMap<Expense, ExpenseResponse>()
                .ForMember(x => x.CategoryId, y => y.MapFrom(s => s.ExpenseCategory.Id))
                .ForMember(x => x.Category, y => y.MapFrom(s => s.ExpenseCategory.Name));
        }
    }
}
