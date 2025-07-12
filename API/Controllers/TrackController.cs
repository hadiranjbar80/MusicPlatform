using Application.Tracks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TrackController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> AddTrack(CreateTrackDto track)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Track = track }));
        }
    }
}