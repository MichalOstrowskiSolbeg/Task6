using ServiceLayer.DTO.Requests;
using ServiceLayer.DTO.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interfaces
{
    public interface IUser
    {
        Task<TokenResponse> Login(LoginRequest request);

        Task Register(RegisterRequest request);

        Task<string> GetNewAccessToken(string refreshToken);
    }
}
