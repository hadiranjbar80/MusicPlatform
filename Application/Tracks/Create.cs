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
                    if (request.Track.Attachment.Length > 0)
                    {
                        var coverName = Untilities.UploadFile(request.Track.Cover,
                            Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Cover"));

                        var attachment = Untilities.UploadFile(request.Track.Attachment,
                            Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Attachment"));

                        var track = new Track
                        {
                            AlbumId = request.Track.AlbumId,
                            Cover = coverName,
                            Title = request.Track.Title,
                            Duration = request.Track.Duration,
                            Attachment = attachment,
                            UserId = request.Track.UserId
                        };
                        _context.Tracks.Add(track);
                        var result = await _context.SaveChangesAsync() > 0;

                        if (!result) return Result<Unit>.Failure("Failed to add track");

                        return Result<Unit>.Success(Unit.Value);
                    }

                    return Result<Unit>.Failure("Please choose the song you want to upload");
                }

                return Result<Unit>.Failure("Please choose a cover for the song");
            }
        }
    }
}