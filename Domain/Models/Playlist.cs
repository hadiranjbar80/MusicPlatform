namespace Domain.Models
{
    public class Playlist
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Cover { get; set; }
        public DateOnly CreationDate { get; set; }

        // Navigation props
        public ICollection<TrackPlaylist> Tracks { get; set; }
    }
}