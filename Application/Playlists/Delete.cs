using Application.Core;
using MediatR;
using Persistence;

namespace Application.Playlists
{
    public class Delete
    {
         public class Command : IRequest<Result<Unit>>
        {
            public string UserId { get; set; }
            public int PlaylistId { get; set; }
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
                if (_context.Tracks.Any(x => x.Id == request.PlaylistId &&
                    x.UserId == request.UserId))
                {
                    var playList = _context.Albums.FindAsync(request.PlaylistId);

                    _context.Remove(playList);
                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result)
                        return Result<Unit>.Failure("Failed to delete the playlist");

                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("You dont have permission to do this action");
            }
        }
    }
}