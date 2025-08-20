using Microsoft.AspNetCore.Http;

namespace Application.Tracks
{
    public class CreateTrackDto
    {
        public int AlbumId { get; set; }
        public string Title { get; set; }
        public string UserId { get; set; }
        public IFormFile Cover { get; set; }
        public IFormFile Attachment { get; set; }
        public TimeOnly Duration  { get; set; }
    }
}