using System;
using System.Threading.Tasks;
using DatingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data.Imp
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext context;
        public AuthRepository(DataContext context) // konstruktor z parametrem połączenia z bazą danych 
        {
            this.context = context;

        }
        public async Task<User> Login(string userName, string password)
        {
            var user = await context.Users.FirstOrDefaultAsync(x=>x.UserName == userName);
            if (user==null)
                return null;
            if (!VeryfingPasswordHash(password, user.PasswordHash ,user.PasswordSalt ))
                return null;

            return user;
        }

        private bool VeryfingPasswordHash(string password, byte [] passwordHash, byte [] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHash =hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computeHash.Length; i++)
                {
                    if (computeHash[i]!= passwordHash[i])
                        return false;
                }                
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte [] passwordHash, passwordSalt; // tworzenie tablicy byte do ukrywania hasła , passwordSalt losowy ciąg znaków doklejany do hasła w celu zamaskowania 
            CreatePassword(password, out passwordHash, out passwordSalt); // out używamy w celu przekazania referencji do hasła

            user.PasswordHash=passwordHash;
            user.PasswordSalt=passwordSalt;

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            return user;
        }

        private void CreatePassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()) // wykorzystane biblioteki systemowej w celu zamaskownaia hasła
            {
                passwordSalt=hmac.Key;
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));                
            }
        
        }

        public async Task<bool> UserExist(string usserName)
        {
            if (await context.Users.AnyAsync(u=>u.UserName==usserName))
                return true;
            return false;
        }
    }
}