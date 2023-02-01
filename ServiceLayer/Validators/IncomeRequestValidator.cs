using FluentValidation;
using ServiceLayer.DTO.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Validators
{
    public class IncomeRequestValidator : AbstractValidator<IncomeRequest>
    {
        public IncomeRequestValidator()
        {
            RuleFor(x => x.Price).GreaterThan(0);

            RuleFor(x => x.Comment).MaximumLength(150);
        }
    }
}