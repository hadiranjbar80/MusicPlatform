using Domain.Models;

namespace Application.Albums
{
    public class AlbumListDto
    {
        public string Cover { get; set; }
        public string Title { get; set; }
        public AlbumType Type { get; set; }
        public DateOnly ReleaseDate { get; set; }
    }
}