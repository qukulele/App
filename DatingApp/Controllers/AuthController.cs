using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.Data;
using DatingApp.Dtos;
using DatingApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repo;
        private readonly IConfiguration configuration;
        public AuthController(IAuthRepository repo, IConfiguration configuration)
        {
            this.configuration = configuration;
            this.repo = repo;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserToRegisterDto userToRegisterDto)
        {

            // jeżeli nie było by [ApiController] w celu validacji należy dodać do parametru atrybut [FromBody]
            // a w obsłudze validacji 
            // if (!ModelState.IsValid)
            //     return BadRequest(ModelState);

            userToRegisterDto.UserName = userToRegisterDto.UserName.ToLower();
            if (await repo.UserExist(userToRegisterDto.UserName))
                return BadRequest("Uzytkownik o takim loginie już istnieje");

            var userToCreate = new User
            {
                UserName = userToRegisterDto.UserName
            };
            var createUser = await repo.Register(userToCreate, userToRegisterDto.Password);
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto UserToRegisterDto)
        {
            // sprawdzam czy dany użytkownik jest w bazie 
            var userFromRepo = await repo.Login(UserToRegisterDto.UserName.ToLower(), UserToRegisterDto.Password);
            if (userFromRepo == null)
                return Unauthorized();
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
                // do tablicy claim dodaję informację o użytkowniku który znajduje się w bazie
                // id oraz nazwa użtkownika 
            };
            // te dwie funkcjie są potrzebnę aby sprawdzić czy powracający token jest prawidłowy
            // tworzenie klucza 
            // pokazuje gdzie jest ukryty sekretny klucz do szyfrowania tokena
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value));
            
            // hashowanie naszego klucza z góry
            var credits = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescription = new SecurityTokenDescriptor
            {
              Subject=new ClaimsIdentity(claims),
              Expires= DateTime.Now.AddDays(1),
              SigningCredentials=credits  
            };

            var tokenHendler = new JwtSecurityTokenHandler();

            var token = tokenHendler.CreateToken(tokenDescription);
            return Ok (new {
                token = tokenHendler.WriteToken(token)
            });
        }
    }
}