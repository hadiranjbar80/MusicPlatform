using Microsoft.AspNetCore.Identity;

namespace Domain.Models
{
    public class AppUser : IdentityUser
    {
        public string UserImage { get; set; }
        // public string ProfileUrl { get; set; }
        // public string Bio { get; set; }

        public ICollection<Album> Albums { get; set; }
        public ICollection<Track> Tracks { get; set; }
        public ICollection<Playlist> Playlists { get; set; }
    }
}