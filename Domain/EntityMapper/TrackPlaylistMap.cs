using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Domain.EntityMapper
{
    public class TrackPlaylistMap : IEntityTypeConfiguration<TrackPlaylist>
    {
        public void Configure(EntityTypeBuilder<TrackPlaylist> builder)
        {
            builder.HasKey(x => new { x.TrackId, x.PlaylistId });
        }
    }
}