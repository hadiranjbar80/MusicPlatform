using Application.Core;
using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Tracks
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CreateTrackDto Track { get; set; }
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
                if (request.Track.Cover.Length > 0)
                {
                    var coverName = Untilities.UploadFile(request.Track.Cover,
                        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Cover"));

                    var track = new Track
                    {
                        AlbumId = request.Track.AlbumId,
                        Cover = coverName,
                        Title = request.Track.Title,
                        Duration = request.Track.Duration
                    };
                    _context.Tracks.Add(track);
                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("Failed to add track");

                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Please choose a cover for album");
            }
        }
    }
}