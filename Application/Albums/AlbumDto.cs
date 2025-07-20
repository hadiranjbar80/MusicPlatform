using Domain.Models;
using Microsoft.AspNetCore.Http;

namespace Application.Albums
{
    public class CreateAlbumDto
    {
        public int ArtistId { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public AlbumType Type { get; set; } = AlbumType.Single;
        public IFormFile Cover { get; set; }
    }
}