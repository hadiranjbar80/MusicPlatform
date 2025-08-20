using Application.Core;
using MediatR;
using Persistence;

namespace Application.Tracks
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public DeleteTrackDto TrackDto { get; set; }
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
                if (_context.Tracks.Any(x => x.Id == request.TrackDto.TrackId &&
                    x.UserId == request.TrackDto.UserId))
                {
                    var track = await _context.Tracks.FindAsync(request.TrackDto.TrackId);

                    File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Attachment", track.Attachment));
                    File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Cover", track.Cover));

                    _context.Remove(track);
                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result)
                        return Result<Unit>.Failure("Failed to delete the track");

                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("No Track found");
            }
        }
    }
}