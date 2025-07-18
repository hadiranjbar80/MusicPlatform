namespace Domain.Models
{
    public class Playlist
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Cover { get; set; }
        public DateOnly CreationDate { get; set; } =
            DateOnly.Parse(DateTime.Now.Date.ToString("yyyy-MM-dd"));

        // Navigation props
        public ICollection<TrackPlaylist> Tracks { get; set; }
    }
}