using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Albums
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public DeleteAlbumDto AlbumDto { get; set; }
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
                if (_context.Albums.Any(x => x.Id == request.AlbumDto.AlbumId &&
                    x.UserId == request.AlbumDto.UserId))
                {
                    var album = await _context.Albums.Include(x => x.Tracks)
                        .FirstOrDefaultAsync(x => x.Id == request.AlbumDto.AlbumId);

                    _context.Remove(album);
                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result)
                        return Result<Unit>.Failure("Failed to delete the album");
                    
                    // Deleting the files attached to the rows
                    File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Cover", album.Cover));

                    foreach (var track in album.Tracks)
                    {
                        var coverPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Cover", track.Cover);
                        if (File.Exists(coverPath))
                        {
                            File.Delete(coverPath);
                        }

                        var attachmentPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Attachment", track.Attachment);
                        if (File.Exists(attachmentPath))
                        {
                            File.Delete(attachmentPath);
                        }
                    }

                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("No Album found");
            }
        }
    }
}