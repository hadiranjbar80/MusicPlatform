using Domain.Models;
using FluentValidation;

namespace Application.Albums
{
    public class AlbumValidator : AbstractValidator<CreateAlbumDto>
    {
        public AlbumValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Cover).NotEmpty();
        }
    }
}