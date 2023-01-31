using FluentValidation;
using ServiceLayer.DTO.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Validators
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator() 
        {
            RuleFor(x => x.FirstName).Length(2, 30);

            RuleFor(x => x.LastName).Length(2, 30);

            RuleFor(x => x.Username).Length(2, 30);

            RuleFor(x => x.Email).Length(2, 50).Matches(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)").WithMessage("Incorrect format");

            RuleFor(x => x.Password).Length(2, 20);

            RuleFor(x => x.Password2).Length(2, 20).Equal(x => x.Password);
        }
    }
}
