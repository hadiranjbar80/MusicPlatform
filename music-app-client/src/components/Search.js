import React from 'react';
import { Search as SearchIcon, Play, Pause, Heart, Plus } from 'lucide-react';
import { formatTime } from '../utils/helpers';

export default function Search({
  songs,
  searchQuery,
  onSearchChange,
  currentSong,
  isPlaying,
  onPlaySong,
  onLike,
  onAddToPlaylist
}) {
  const filteredSongs = songs.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fade-in">
      {/* Search Header */}
      <div className="sticky top-0 z-10 glass p-4 md:p-6">
        <div className="relative max-w-xl">
          <SearchIcon className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="جستجوی آهنگ، هنرمند یا آلبوم..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 md:py-3 pr-10 md:pr-12 pl-4 text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="p-4 md:p-8">
        {searchQuery ? (
          <>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              نتایج جستجو برای "{searchQuery}"
            </h3>
            {filteredSongs.length > 0 ? (
              <div className="glass rounded-xl md:rounded-2xl overflow-hidden">
                {filteredSongs.map((song, index) => (
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
                    <span className="text-xs md:text-sm text-zinc-500">{formatTime(song.duration)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 md:py-20 text-zinc-500">
                <SearchIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-50" />
                <p className="text-base md:text-lg">نتیجه‌ای یافت نشد</p>
                <p className="text-xs md:text-sm mt-2">عبارت دیگری را امتحان کنید</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 md:py-20 text-zinc-500">
            <SearchIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-50" />
            <p className="text-base md:text-lg">نام آهنگ، هنرمند یا آلبوم را جستجو کنید</p>
          </div>
        )}
      </div>
    </div>
  );
}
