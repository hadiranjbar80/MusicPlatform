using Application.Playlists;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PlaylistController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreatePlaylist(CreatePlaylistDto playlist)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Playlist = playlist }));
        }

        [HttpPost("/api/playlist/AddToPlaylist")]
        public async Task<IActionResult> AddToPlaylist(AddToPlaylistDto playlistItem)
        {
            return HandleResult(await Mediator.Send(new AddToPlaylist.Command { PlaylistItem = playlistItem }));
        }
        
        [HttpDelete("/api/playlist/RemoveFromPlaylist")]
        public async Task<IActionResult> RemoveFromPlaylist(AddToPlaylistDto playlistItem)
        {
            return HandleResult(await Mediator.Send(new RemoveFromPlaylist.Command { PlaylistItem = playlistItem }));
        }
    }
}