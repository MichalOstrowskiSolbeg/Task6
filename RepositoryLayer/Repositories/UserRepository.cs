using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDbContext _context;
        public UserRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<Guid> GetRefreshToken(User user)
        {
            var refreshToken = Guid.NewGuid();
            user.RefreshToken = refreshToken.ToString();
            user.RefreshTokenExp = DateTime.Now.AddHours(10);
            await _context.SaveChangesAsync();

            return refreshToken;
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.Username.Equals(username));
        }

        public async Task<User> GetUserByRefreshToken(string refreshToken)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.RefreshToken.Equals(refreshToken));
        }
    }
}
