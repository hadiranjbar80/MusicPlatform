using Microsoft.AspNetCore.Identity;

namespace Domain.Models
{
    public class AppUser : IdentityUser
    {
        public ICollection<Album> Albums { get; set; }
        public ICollection<Track> Tracks { get; set; }
        public ICollection<Playlist> Playlists { get; set; }
    }
}