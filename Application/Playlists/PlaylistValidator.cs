using FluentValidation;

namespace Application.Playlists
{
    public class PlaylistValidator : AbstractValidator<CreatePlaylistDto>
    {
        public PlaylistValidator()
        {
            RuleFor(x => x.Cover).NotEmpty();
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.UserId).NotEmpty();
        }
    }
}