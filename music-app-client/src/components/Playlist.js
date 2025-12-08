import React from 'react';
import { Play, Pause, Heart, Music, ArrowRight, Plus } from 'lucide-react';
import { formatTime } from '../utils/helpers';

export default function Playlist({
  playlist,
  songs,
  currentSong,
  isPlaying,
  onPlaySong,
  onLike,
  onBack,
  onAddToPlaylist
}) {
  // Get songs in this playlist
  const playlistSongs = playlist.songs
    .map(songId => songs.find(s => s.id === songId))
    .filter(Boolean);

  const totalDuration = playlistSongs.reduce((acc, song) => acc + song.duration, 0);

  return (
    <div className="p-4 md:p-8 fade-in">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-4 md:mb-6 transition-colors text-sm"
      >
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        بازگشت
      </button>

      {/* Playlist Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 md:gap-6 mb-6 md:mb-8">
        <img 
          src={playlist.cover} 
          alt={playlist.name}
          className="w-36 h-36 md:w-48 md:h-48 rounded-xl md:rounded-2xl object-cover shadow-2xl"
        />
        <div className="text-center sm:text-right">
          <p className="text-xs md:text-sm text-zinc-400 mb-1 md:mb-2">پلی‌لیست</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{playlist.name}</h2>
          <p className="text-zinc-400 text-sm md:text-base">
            {playlistSongs.length} آهنگ • {formatTime(totalDuration)}
          </p>
        </div>
      </div>

      {/* Play All Button */}
      {playlistSongs.length > 0 && (
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => onPlaySong(playlistSongs[0])}
            className="flex items-center gap-2 md:gap-3 px-5 md:px-6 py-2.5 md:py-3 bg-violet-500 hover:bg-violet-600 rounded-full transition-colors text-sm md:text-base"
          >
            <Play className="w-4 h-4 md:w-5 md:h-5" />
            پخش همه
          </button>
        </div>
      )}
      
      {/* Songs List */}
      <div className="glass rounded-xl md:rounded-2xl overflow-hidden">
        {playlistSongs.length > 0 ? (
          playlistSongs.map((song, index) => (
            <div
              key={song.id}
              className={`song-row flex items-center gap-3 md:gap-4 p-3 md:p-4 cursor-pointer transition-all ${
                currentSong?.id === song.id ? 'bg-violet-500/10' : ''
              }`}
            >
              <span className="w-6 md:w-8 text-center text-zinc-500 text-sm">{index + 1}</span>
              <div className="relative group flex-shrink-0" onClick={() => onPlaySong(song)}>
                <img src={song.cover} alt="" className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover" />
                <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  ) : (
                    <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0" onClick={() => onPlaySong(song)}>
                <p className={`font-medium text-sm md:text-base truncate ${currentSong?.id === song.id ? 'text-violet-400' : ''}`}>
                  {song.title}
                </p>
                <p className="text-xs md:text-sm text-zinc-400 truncate">{song.artist}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onAddToPlaylist(song); }}
                className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors"
                title="افزودن به پلی‌لیست"
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onLike(song.id); }}
                className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Heart className={`w-4 h-4 md:w-5 md:h-5 ${song.liked ? 'fill-pink-500 text-pink-500' : 'text-zinc-400'}`} />
              </button>
              <span className="text-xs md:text-sm text-zinc-500">{formatTime(song.duration)}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 md:py-10 text-zinc-500">
            <Music className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm md:text-base">این پلی‌لیست خالی است</p>
          </div>
        )}
      </div>
    </div>
  );
}
