using ServiceLayer.DTO.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interfaces
{
    public interface IUser
    {
        Task<string> Login(LoginRequest request);

        Task Register(RegisterRequest request);
    }
}
