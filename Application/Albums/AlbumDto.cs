using Microsoft.AspNetCore.Http;

namespace Application.Albums
{
    public class CreateAlbumDto
    {
        public int ArtistId { get; set; }
        public string Title { get; set; }
        public IFormFile Cover { get; set; }
    }
}