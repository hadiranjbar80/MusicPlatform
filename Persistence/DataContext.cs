using Domain.EntityMapper;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new AlbumMap());
            modelBuilder.ApplyConfiguration(new TrackMap());
            modelBuilder.ApplyConfiguration(new PlaylistMap());
            modelBuilder.ApplyConfiguration(new TrackPlaylistMap());

            // Seeding Data
            modelBuilder.Entity<IdentityRole>().HasData(
                    new IdentityRole { Id = Guid.NewGuid().ToString(), Name = "User", NormalizedName = "USER" },
                    new IdentityRole { Id = Guid.NewGuid().ToString(), Name = "Artist", NormalizedName = "ARTIST" }
            );


            modelBuilder.Entity<Album>().HasData(
                new Album
                {
                    Id = 1,
                    UserId = "406f9444-5f91-4c74-86c7-366f53f310fb",
                    Title = "Midnight Dreams",
                    Cover = "3bc09.jpeg",
                    Type = AlbumType.Album,
                    ReleaseDate = DateOnly.Parse("2023-11-15")
                },
                new Album
                {
                    Id = 2,
                    UserId = "406f9444-5f91-4c74-86c7-366f53f310fb",
                    Title = "Echoes of Silence",
                    Cover = "3bc09.jpeg",
                    Type = AlbumType.Single,
                    ReleaseDate = DateOnly.Parse("2024-02-10")
                },
                new Album
                {
                    Id = 3,
                    UserId = "406f9444-5f91-4c74-86c7-366f53f310fb",
                    Title = "Golden Horizon",
                    Cover = "3bc09.jpeg",
                    Type = AlbumType.EP,
                    ReleaseDate = DateOnly.Parse("2022-08-25")
                }
            );

            modelBuilder.Entity<Playlist>().HasData(
                new Playlist
                {
                    Id = 1,
                    UserId = "406f9444-5f91-4c74-86c7-366f53f310fb",
                    Title = "Chill Vibes",
                    Cover = "3bc09.jpeg",
                    CreationDate = DateOnly.Parse("2024-04-15")
                },
                new Playlist
                {
                    Id = 2,
                    UserId = "406f9444-5f91-4c74-86c7-366f53f310fb",
                    Title = "Workout Pump",
                    Cover = "3bc09.jpeg",
                    CreationDate = DateOnly.Parse("2023-12-01")
                },
                new Playlist
                {
                    Id = 3,
                    UserId = "406f9444-5f91-4c74-86c7-366f53f310fb",
                    Title = "Acoustic Nights",
                    Cover = "3bc09.jpeg",
                    CreationDate = DateOnly.Parse("2022-09-20")
                }
            );
            
            modelBuilder.Entity<Track>().HasData(
                new Track
                {
                    Id = 1,
                    AlbumId = 1, 
                    UserId = "406f9444-5f91-4c74-86c7-366f53f310fb",
                    Title = "Into the Night",
                    Cover = "3bc09.jpeg",
                    Attachment = "0f067.mpeg",
                    ReleaseDate = DateOnly.Parse("2023-11-15"),
                    Duration = new TimeOnly(0, 3, 45), 
                    Plays = 1200
                },
                new Track
                {
                    Id = 2,
                    AlbumId = 1,
                    UserId = "406f9444-5f91-4c74-86c7-366f53f310fb",
                    Title = "Moonlight Drive",
                    Cover = "3bc09.jpeg",
                    Attachment = "0f067.mpeg",
                    ReleaseDate = DateOnly.Parse("2023-11-15"),
                    Duration = new TimeOnly(0, 4, 12),
                    Plays = 850
                },
                new Track
                {
                    Id = 3,
                    AlbumId = 2, 
                    UserId = "406f9444-5f91-4c74-86c7-366f53f310fb", 
                    Title = "Silent Echo",
                    Cover = "3bc09.jpeg",
                    Attachment = "0f067.mpeg",
                    ReleaseDate = DateOnly.Parse("2024-02-10"),
                    Duration = new TimeOnly(0, 5, 5),
                    Plays = 430
                },
                new Track
                {
                    Id = 4,
                    AlbumId = 3, 
                    UserId = "406f9444-5f91-4c74-86c7-366f53f310fb",
                    Title = "Golden Hour",
                    Cover = "3bc09.jpeg",
                    Attachment = "0f067.mpeg",
                    ReleaseDate = DateOnly.Parse("2022-08-25"),
                    Duration = new TimeOnly(0, 2, 58),
                    Plays = 2300
                }
            );

            
        }


        public DbSet<Album> Albums { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<TrackPlaylist> TrackPlaylists { get; set; }
    }
}