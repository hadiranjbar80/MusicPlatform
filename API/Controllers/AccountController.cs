using API.DTOs;
using API.Services;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("/Register")]
        public async Task<IActionResult> Register(RegisterDto register)
        {


            if (_signInManager.IsSignedIn(User))
                return Ok();

            var user = new AppUser
            {
                UserName = register.UserName,
                Email = register.Email,
                EmailConfirmed = true,
            };

            var result = await _userManager.CreateAsync(user, register.Password);

            if (result.Succeeded)
            {
                // Todo: Add user to role
            }

            return BadRequest(result.Errors);
        }

        [AllowAnonymous]
        [HttpPost("/Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.Email == login.Email);

            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, login.Password);

            if (result)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Image = "",
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}