import React from 'react';
import { Play, Pause, Heart, Plus, MoreVertical } from 'lucide-react';
import { formatTime } from '../utils/helpers';

export default function Home({
  user,
  songs,
  currentSong,
  isPlaying,
  onPlaySong,
  onLike,
  onAddToPlaylist
}) {
  return (
    <div className="p-4 md:p-8 fade-in">
      {/* Welcome Header */}
      <h2 className="text-2xl md:text-3xl font-bold mb-2">سلام {user.name}! 👋</h2>
      <p className="text-zinc-400 mb-6 md:mb-8">آهنگ‌های پیشنهادی برای شما</p>
      
      {/* Featured Songs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
        {songs.slice(0, 4).map(song => (
          <div
            key={song.id}
            className="group relative glass rounded-xl md:rounded-2xl p-3 md:p-4 cursor-pointer hover:bg-white/5 transition-all duration-300"
          >
            <div className="relative mb-3 md:mb-4" onClick={() => onPlaySong(song)}>
              <img 
                src={song.cover} 
                alt={song.title}
                className={`w-full aspect-square object-cover rounded-lg md:rounded-xl ${
                  currentSong?.id === song.id && isPlaying ? 'playing-glow' : ''
                }`}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg md:rounded-xl flex items-center justify-center">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-violet-500 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  ) : (
                    <Play className="w-5 h-5 md:w-6 md:h-6 text-white mr-[-2px]" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm md:text-base truncate">{song.title}</h3>
                <p className="text-xs md:text-sm text-zinc-400 truncate">{song.artist}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onAddToPlaylist(song); }}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                title="افزودن به پلی‌لیست"
              >
                <Plus className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* All Songs List */}
      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">همه آهنگ‌ها</h3>
      <div className="glass rounded-xl md:rounded-2xl overflow-hidden">
        {songs.map((song, index) => (
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
            <span className="text-xs md:text-sm text-zinc-500 hidden sm:block">{song.album}</span>
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
            <span className="text-xs md:text-sm text-zinc-500 w-10 md:w-12 text-left">{formatTime(song.duration)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
