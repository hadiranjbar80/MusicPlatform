using Microsoft.AspNetCore.Http;

namespace Application.Playlists
{
    public class CreatePlaylistDto
    {
        public string Title { get; set; }
        public IFormFile Cover { get; set; }
        public string UserId { get; set; }
    }
}