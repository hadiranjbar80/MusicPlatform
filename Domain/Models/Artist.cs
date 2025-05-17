namespace Domain.Models
{
    public class Artist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }

        // Navigation props
        public ICollection<Album> Albums { get; set; }
    }
}