using Application.Core;
using Domain.Models;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Playlists
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CreatePlaylistDto Playlist { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Playlist).SetValidator(new PlaylistValidator());
            }
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

                if (request.Playlist.Cover.Length > 0)
                {
                    if (!request.Playlist.Cover.ContentType.StartsWith("image/"))
                        return Result<Unit>.Failure("Only image files are allowed");

                    var coverName = Untilities.UploadFile(request.Playlist.Cover,
                        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Cover"));

                    var playlist = new Playlist
                    {
                        Cover = coverName,
                        Title = request.Playlist.Title,
                        UserId = request.Playlist.UserId
                    };
                    _context.Playlists.Add(playlist);
                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("Failed to add playlist");

                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Please choose a cover for the playlist");
            }
        }
    }
}