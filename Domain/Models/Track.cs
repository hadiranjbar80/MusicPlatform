using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class Track
    {
        public int Id { get; set; }
        public int AlbumId { get; set; }
        public int Plays { get; set; } = 0;
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Cover { get; set; }
        public string Attachment { get; set; }
        public DateOnly ReleaseDate { get; set; }
            = DateOnly.Parse(DateTime.Now.Date.ToString("yyyy-MM-dd"));
        public TimeOnly Duration { get; set; }

        // Navigation props
        [ForeignKey("AlbumId")]
        public Album Album { get; set; }
        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        public ICollection<TrackPlaylist> Playlists { get; set; }
    }
}