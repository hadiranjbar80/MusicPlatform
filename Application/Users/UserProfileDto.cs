using Microsoft.AspNetCore.Http;

namespace Application.Users
{
    public class EditUserProfileDto
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public IFormFile UserImage { get; set; }
    }
}