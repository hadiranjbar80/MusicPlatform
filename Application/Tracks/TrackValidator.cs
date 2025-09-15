using FluentValidation;

namespace Application.Tracks
{
    public class TrackValidator : AbstractValidator<CreateTrackDto>
    {
        public TrackValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Attachment).NotEmpty();
            RuleFor(x => x.Cover).NotEmpty();
            RuleFor(x => x.Duration).NotEmpty();
            RuleFor(x => x.AlbumId).NotEmpty();
            RuleFor(x => x.UserId).NotEmpty();
        }
    }
}