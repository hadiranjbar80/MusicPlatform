import React, { useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, MessageCircle, Shuffle, Repeat, Plus } from 'lucide-react';
import { formatTime } from '../utils/helpers';

export default function Player({
  currentSong,
  isPlaying,
  currentTime,
  volume,
  isMuted,
  shuffle,
  repeat,
  showComments,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onShuffleToggle,
  onRepeatToggle,
  onLike,
  onCommentsToggle,
  onAddToPlaylist
}) {
  const progressRef = useRef(null);

  const handleProgressClick = (e) => {
    if (!progressRef.current || !currentSong) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * currentSong.duration);
  };

  if (!currentSong) return null;

  const progress = (currentTime / currentSong.duration) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 z-50">
      {/* Progress Bar */}
      <div 
        ref={progressRef}
        onClick={handleProgressClick}
        className="h-1 bg-white/10 cursor-pointer group"
      >
        <div 
          className="progress-bar h-full relative transition-all"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      
      {/* Desktop Player */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        {/* Song Info */}
        <div className="flex items-center gap-4 w-1/4 min-w-0">
          <img 
            src={currentSong.cover} 
            alt={currentSong.title}
            className="w-14 h-14 rounded-lg object-cover cover-shine flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold truncate">{currentSong.title}</p>
            <p className="text-sm text-zinc-400 truncate">{currentSong.artist}</p>
          </div>
          <button
            onClick={() => onAddToPlaylist(currentSong)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            title="افزودن به پلی‌لیست"
          >
            <Plus className="w-5 h-5 text-zinc-400" />
          </button>
          <button
            onClick={() => onLike(currentSong.id)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
          >
            <Heart className={`w-5 h-5 ${currentSong.liked ? 'fill-pink-500 text-pink-500' : 'text-zinc-400'}`} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={onShuffleToggle}
              className={`p-2 rounded-full transition-colors ${shuffle ? 'text-violet-400' : 'text-zinc-400 hover:text-white'}`}
              title="پخش تصادفی"
            >
              <Shuffle className="w-5 h-5" />
            </button>
            <button 
              onClick={onPrev}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              title="قبلی"
            >
              <SkipForward className="w-6 h-6" />
            </button>
            <button
              onClick={onPlayPause}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black" />
              ) : (
                <Play className="w-6 h-6 text-black mr-[-2px]" />
              )}
            </button>
            <button 
              onClick={onNext}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              title="بعدی"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            <button 
              onClick={onRepeatToggle}
              className={`p-2 rounded-full transition-colors ${repeat ? 'text-violet-400' : 'text-zinc-400 hover:text-white'}`}
              title="تکرار"
            >
              <Repeat className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="flex items-center justify-end gap-4 w-1/4">
          <button
            onClick={onCommentsToggle}
            className={`p-2 rounded-full transition-colors ${showComments ? 'text-violet-400' : 'text-zinc-400 hover:text-white'}`}
            title="نظرات"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onMuteToggle}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-24"
            />
          </div>
        </div>
      </div>

      {/* Mobile Player */}
      <div className="md:hidden p-3">
        {/* Song Info Row */}
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={currentSong.cover} 
            alt={currentSong.title}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm truncate">{currentSong.title}</p>
            <p className="text-xs text-zinc-400 truncate">{currentSong.artist}</p>
          </div>
          <button
            onClick={() => onAddToPlaylist(currentSong)}
            className="p-2 flex-shrink-0"
            title="افزودن به پلی‌لیست"
          >
            <Plus className="w-5 h-5 text-zinc-400" />
          </button>
          <button
            onClick={() => onLike(currentSong.id)}
            className="p-2 flex-shrink-0"
          >
            <Heart className={`w-5 h-5 ${currentSong.liked ? 'fill-pink-500 text-pink-500' : 'text-zinc-400'}`} />
          </button>
        </div>

        {/* Time Display */}
        <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2 px-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentSong.duration)}</span>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={onShuffleToggle}
            className={`p-2 ${shuffle ? 'text-violet-400' : 'text-zinc-500'}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button 
            onClick={onPrev}
            className="p-2 text-zinc-300"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          <button
            onClick={onPlayPause}
            className="w-11 h-11 bg-white rounded-full flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-black" />
            ) : (
              <Play className="w-5 h-5 text-black mr-[-2px]" />
            )}
          </button>
          <button 
            onClick={onNext}
            className="p-2 text-zinc-300"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button 
            onClick={onRepeatToggle}
            className={`p-2 ${repeat ? 'text-violet-400' : 'text-zinc-500'}`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Extra Controls */}
        <div className="flex items-center justify-between mt-3 px-2">
          <button
            onClick={onMuteToggle}
            className="p-2 text-zinc-500"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onCommentsToggle}
            className={`p-2 ${showComments ? 'text-violet-400' : 'text-zinc-500'}`}
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
