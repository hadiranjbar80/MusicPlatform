using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class Album
    {
        public int Id { get; set; }
        public int ArtistId { get; set; }
        public string Title { get; set; }
        public string Cover { get; set; }
        public DateOnly ReleaseDate { get; set; }

        // Navigation props
        [ForeignKey("ArtistId")]
        public Artist Artist { get; set; }
        public ICollection<Track> Tracks { get; set; }
    }
}