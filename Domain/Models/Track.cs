using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class Track
    {
        public int Id { get; set; }
        public int AlbumId { get; set; }
        public string Title { get; set; }
        public string Cover { get; set; }
        public DateOnly ReleaseDate { get; set; }
        public TimeOnly Duration { get; set; }

        // Navigation props
        [ForeignKey("AlbumId")]
        public Album Album { get; set; }
        public ICollection<TrackPlaylist> Playlists { get; set; }
    }
}