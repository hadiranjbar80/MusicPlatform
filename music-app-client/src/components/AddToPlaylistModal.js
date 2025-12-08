import React from 'react';
import { X, Plus, Music, Check } from 'lucide-react';

export default function AddToPlaylistModal({ 
  song, 
  playlists, 
  onClose, 
  onAdd,
  onCreateNew
}) {
  if (!song) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[70] p-4" 
      onClick={onClose}
    >
      <div 
        className="glass rounded-2xl w-full max-w-md scale-in overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-bold">افزودن به پلی‌لیست</h3>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Song Info */}
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <img 
            src={song.cover} 
            alt={song.title}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        </div>

        {/* Create New Playlist Button */}
        <div className="p-3 border-b border-white/5">
          <button
            onClick={onCreateNew}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-medium">ساخت پلی‌لیست جدید</span>
          </button>
        </div>

        {/* Playlists List */}
        <div className="max-h-64 overflow-y-auto scrollbar-thin">
          {playlists.length > 0 ? (
            playlists.map(playlist => {
              const isInPlaylist = playlist.songs.includes(song.id);
              return (
                <button
                  key={playlist.id}
                  onClick={() => !isInPlaylist && onAdd(playlist.id, song.id)}
                  disabled={isInPlaylist}
                  className={`w-full flex items-center gap-3 p-3 transition-colors ${
                    isInPlaylist 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <img 
                    src={playlist.cover} 
                    alt={playlist.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-right min-w-0">
                    <p className="font-medium truncate">{playlist.name}</p>
                    <p className="text-xs text-zinc-500">{playlist.songs.length} آهنگ</p>
                  </div>
                  {isInPlaylist && (
                    <div className="flex items-center gap-1 text-green-400 text-xs">
                      <Check className="w-4 h-4" />
                      <span>اضافه شده</span>
                    </div>
                  )}
                </button>
              );
            })
          ) : (
            <div className="text-center py-8 text-zinc-500">
              <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">هنوز پلی‌لیستی ندارید</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
