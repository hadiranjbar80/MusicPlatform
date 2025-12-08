import React, { useState } from 'react';
import { Heart, Clock, Upload, Music, Play, Pause, Settings, Camera, PlayCircle, Plus } from 'lucide-react';
import { formatTime, toPersianNumber } from '../utils/helpers';

export default function Profile({
  user,
  songs,
  history,
  userUploads,
  currentSong,
  isPlaying,
  onPlaySong,
  onLike,
  onUpload,
  onAddToPlaylist
}) {
  const [activeTab, setActiveTab] = useState('likes');
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user.bio || '');

  const likedSongs = songs.filter(s => s.liked);
  
  // Get history songs with play info
  const historySongs = history.map(h => ({
    ...songs.find(s => s.id === h.songId),
    playedAt: h.playedAt
  })).filter(s => s.id);

  const tabs = [
    { id: 'likes', label: 'لایک‌ها', icon: Heart, count: likedSongs.length },
    { id: 'history', label: 'تاریخچه', icon: Clock, count: historySongs.length },
    { id: 'uploads', label: 'آپلودها', icon: Upload, count: userUploads.length },
  ];

  const stats = [
    { label: 'لایک شده', value: likedSongs.length },
    { label: 'آپلود شده', value: userUploads.length },
    { label: 'پخش شده', value: historySongs.length },
  ];

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.multiple = true;
    input.onchange = (e) => {
      if (e.target.files) {
        onUpload(Array.from(e.target.files));
      }
    };
    input.click();
  };

  const renderSongRow = (song, index, showPlayedAt = false, showPlays = false) => (
    <div
      key={`${song.id}-${index}`}
      className={`song-row flex items-center gap-3 md:gap-4 p-3 md:p-4 cursor-pointer transition-all ${
        currentSong?.id === song.id ? 'bg-violet-500/10' : ''
      }`}
    >
      <span className="w-6 md:w-8 text-center text-zinc-500 text-sm">{toPersianNumber(index + 1)}</span>
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
      {showPlayedAt && (
        <div className="hidden sm:flex items-center gap-2 text-zinc-500">
          <Clock className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-xs md:text-sm">{song.playedAt}</span>
        </div>
      )}
      {showPlays && (
        <div className="hidden sm:flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-1 text-zinc-500">
            <PlayCircle className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">{toPersianNumber(song.plays || 0)}</span>
          </div>
          <span className="text-xs md:text-sm text-zinc-500">{song.uploadDate}</span>
        </div>
      )}
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
  );

  return (
    <div className="p-4 md:p-8 fade-in">
      {/* Profile Header */}
      <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          {/* Avatar */}
          <div className="relative group flex-shrink-0">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-violet-500/30"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-zinc-400 text-sm md:text-base mb-3 md:mb-4">{user.email}</p>
            
            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  placeholder="درباره من..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white text-sm focus:outline-none focus:border-violet-500/50"
                />
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-xl transition-colors text-sm"
                >
                  ذخیره
                </button>
              </div>
            ) : (
              <p className="text-zinc-300 text-sm md:text-base">{user.bio || 'بیوگرافی خود را اضافه کنید...'}</p>
            )}
            
            <p className="text-xs md:text-sm text-zinc-500 mt-3 md:mt-4">
              عضویت از {user.joinDate}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-6 md:mt-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card py-3 md:py-5">
              <p className="stat-number text-xl md:text-2xl">{toPersianNumber(stat.value)}</p>
              <p className="text-zinc-400 text-xs md:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 md:gap-2 mb-4 md:mb-6 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all whitespace-nowrap text-sm ${
              activeTab === tab.id
                ? 'bg-violet-500/20 text-violet-300'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className={`px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs ${
              activeTab === tab.id ? 'bg-violet-500/30' : 'bg-white/10'
            }`}>
              {toPersianNumber(tab.count)}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="glass rounded-xl md:rounded-2xl overflow-hidden">
        {/* Liked Songs Tab */}
        {activeTab === 'likes' && (
          <>
            {likedSongs.length > 0 ? (
              likedSongs.map((song, index) => renderSongRow(song, index))
            ) : (
              <div className="empty-state py-12 md:py-16">
                <Heart className="empty-state-icon mx-auto w-12 h-12 md:w-16 md:h-16" />
                <p className="text-base md:text-lg font-medium mb-2">هنوز آهنگی لایک نکردید</p>
                <p className="text-xs md:text-sm">آهنگ‌هایی که لایک کنید اینجا نمایش داده می‌شوند</p>
              </div>
            )}
          </>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <>
            {historySongs.length > 0 ? (
              historySongs.map((song, index) => renderSongRow(song, index, true))
            ) : (
              <div className="empty-state py-12 md:py-16">
                <Clock className="empty-state-icon mx-auto w-12 h-12 md:w-16 md:h-16" />
                <p className="text-base md:text-lg font-medium mb-2">تاریخچه خالی است</p>
                <p className="text-xs md:text-sm">آهنگ‌هایی که گوش می‌دهید اینجا ذخیره می‌شوند</p>
              </div>
            )}
          </>
        )}

        {/* Uploads Tab */}
        {activeTab === 'uploads' && (
          <>
            {/* Upload Button */}
            <div className="p-3 md:p-4 border-b border-white/5">
              <button
                onClick={handleUploadClick}
                className="upload-zone w-full py-6 md:py-10"
              >
                <Upload className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-violet-400" />
                <p className="text-sm md:text-lg font-medium mb-1 md:mb-2">آپلود آهنگ جدید</p>
                <p className="text-xs md:text-sm text-zinc-500">MP3, WAV, FLAC</p>
              </button>
            </div>

            {userUploads.length > 0 ? (
              userUploads.map((song, index) => renderSongRow(song, index, false, true))
            ) : (
              <div className="empty-state py-8 md:py-12">
                <Music className="empty-state-icon mx-auto w-12 h-12 md:w-16 md:h-16" />
                <p className="text-base md:text-lg font-medium mb-2">هنوز آهنگی آپلود نکردید</p>
                <p className="text-xs md:text-sm">آهنگ‌های خود را با دیگران به اشتراک بگذارید</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
