using System.Data;
using System.IO.Compression;
using Application.Core;
using AutoMapper;
using Domain.Models;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Albums
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CreateAlbumDto Album { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Album).SetValidator(new AlbumValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Album.Cover.Length > 0)
                {
                    // Saving the album cover
                    var coverName = Untilities.UploadFile(request.Album.Cover,
                        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Cover"));

                    var album = new Album
                    {

                        Title = request.Album.Title,
                        Cover = coverName,
                        //ArtistId = request.Album.ArtistId
                    };
                    _context.Albums.Add(album);

                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("Failed to create album");

                    return Result<Unit>.Success(Unit.Value);
                }
                
                return Result<Unit>.Failure("Please choose a cover for album");
            }
        }
    }
}