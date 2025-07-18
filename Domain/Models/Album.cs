using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class Album
    {
        public int Id { get; set; } 
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Cover { get; set; }
        public DateOnly ReleaseDate { get; set; }
            = DateOnly.Parse(DateTime.Now.Date.ToString("yyyy-MM-dd"));

        // Navigation props
        [ForeignKey("UserId")]
        public AppUser AppUser { get; set; }
        public ICollection<Track> Tracks { get; set; }
    }
}