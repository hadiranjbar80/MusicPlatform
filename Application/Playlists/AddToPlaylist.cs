using Application.Core;
using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Playlists
{
    public class AddToPlaylist
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
                _context.Add(new TrackPlaylist
                {
                    PlaylistId = request.PlaylistItem.PlaylistId,
                    TrackId = request.PlaylistItem.TrackId
                });
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to add the track");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}