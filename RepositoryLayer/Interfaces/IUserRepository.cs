using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsername(string username);

        Task<User> GetUserByRefreshToken(string refreshToken);

        Task AddUser(User user);

        Task<Guid> GetRefreshToken(User user);
    }
}