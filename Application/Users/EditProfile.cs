using Application.Core;
using Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users
{
    public class EditProfile
    {
        public class Command : IRequest<Result<Unit>>
        {
            public EditUserProfileDto UserDto { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly UserManager<AppUser> _userManager;
            public Handler(UserManager<AppUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.UserDto.UserId);
                if (user == null)
                    return Result<Unit>.Failure("User not found");

                user.Email = request.UserDto.Email;
                user.UserName = request.UserDto.Username;

                if (request.UserDto.UserImage != null &&
                    request.UserDto.UserImage.Length > 0)
                {
                    if (!request.UserDto.UserImage.ContentType.StartsWith("image/"))
                        return Result<Unit>.Failure("Only image files are allowed");

                    if (user.UserImage != null)
                        File.Delete(Path.Combine(Directory.GetCurrentDirectory(),
                            "wwwroot", "Uploads", "UserImage", user.UserImage));
                    var userImageName = Untilities.UploadFile(request.UserDto.UserImage,
                        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "UserImage"));

                    user.UserImage = userImageName;
                }

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Fialed to update profile");
            }
        }
    }
}