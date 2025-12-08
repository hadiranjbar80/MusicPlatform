using Domain.Models;

namespace Application.Albums
{
    public class AlbumListDto
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Title { get; set; }
        public string Cover { get; set; }
        public AlbumType Type { get; set; }
        public DateOnly ReleaseDate { get; set; }        
    }
}