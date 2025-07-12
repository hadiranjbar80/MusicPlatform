using Application.Artists;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ArtistController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CeateArtist(Artist artist)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Artist = artist }));
        }
    }
}