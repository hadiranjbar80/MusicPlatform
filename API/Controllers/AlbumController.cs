using Application.Albums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AlbumController : BaseApiController
    {

        [HttpPost]
        public async Task<IActionResult> CreateAlbum(CreateAlbumDto album)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Album = album }));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAlbum(DeleteAlbumDto album)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { AlbumDto = album }));
        }
    }
}