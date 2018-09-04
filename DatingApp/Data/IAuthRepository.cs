using System.Threading.Tasks;
using DatingApp.Models;

namespace DatingApp.Data
{
    public interface IAuthRepository
    {
         Task<User> Register (User user, string password);
         Task<User> Login (string userName, string password);
         Task<bool> UserExist(string usserName);
    }
}