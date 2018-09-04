using System.ComponentModel.DataAnnotations;

namespace DatingApp.Dtos
{
    public class UserToRegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(8,MinimumLength=4, ErrorMessage="Proszę podać hasło od 4 do 8 znaków")]
        public string Password { get; set; }
    }
}