import React from 'react';
import { Heart, Play, Pause, Plus } from 'lucide-react';
import { formatTime } from '../utils/helpers';

export default function Library({
  songs,
  playlists,
  currentSong,
  isPlaying,
  onPlaySong,
  onLike,
  onNewPlaylist,
  onSelectPlaylist,
  onAddToPlaylist
}) {
  const likedSongs = songs.filter(s => s.liked);

  return (
    <div className="p-4 md:p-8 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold">کتابخانه من</h2>
        <button
          onClick={onNewPlaylist}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-full transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">پلی‌لیست جدید</span>
        </button>
      </div>
      
      {/* Liked Songs Section */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2">
          <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />
          آهنگ‌های مورد علاقه
        </h3>
        <div className="glass rounded-xl md:rounded-2xl overflow-hidden">
          {likedSongs.length > 0 ? (
            likedSongs.slice(0, 5).map((song, index) => (
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
                  <Heart className="w-4 h-4 md:w-5 md:h-5 fill-pink-500 text-pink-500" />
                </button>
                <span className="text-xs md:text-sm text-zinc-500">{formatTime(song.duration)}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 md:py-10 text-zinc-500">
              <Heart className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm md:text-base">هنوز آهنگی لایک نکردید</p>
            </div>
          )}
        </div>
      </div>

      {/* Playlists Grid */}
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">پلی‌لیست‌های من</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {playlists.map(playlist => (
          <div
            key={playlist.id}
            onClick={() => onSelectPlaylist(playlist)}
            className="group glass rounded-xl md:rounded-2xl p-3 md:p-4 cursor-pointer hover:bg-white/5 transition-all"
          >
            <div className="relative mb-3 md:mb-4">
              <img 
                src={playlist.cover} 
                alt={playlist.name}
                className="w-full aspect-square object-cover rounded-lg md:rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg md:rounded-xl flex items-center justify-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-violet-500 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-white mr-[-2px]" />
                </div>
              </div>
            </div>
            <h4 className="font-semibold text-sm md:text-base truncate">{playlist.name}</h4>
            <p className="text-xs md:text-sm text-zinc-400">{playlist.songs.length} آهنگ</p>
          </div>
        ))}
      </div>
    </div>
  );
}
