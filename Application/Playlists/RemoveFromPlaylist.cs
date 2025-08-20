using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Playlists
{
    public class RemoveFromPlaylist
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AddToPlaylistDto PlaylistItem { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var playlistItem = await _context.TrackPlaylists.FirstOrDefaultAsync
                    (x => x.TrackId == request.PlaylistItem.TrackId && x.PlaylistId == request.PlaylistItem.PlaylistId);

                if (playlistItem != null)
                {
                    _context.Remove(playlistItem);
                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result)
                        return Result<Unit>.Failure("Faild to remove the track");

                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Trackk not found");
            }
        }
    }
}