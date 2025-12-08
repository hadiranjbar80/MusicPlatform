import React, { useState, useEffect } from 'react';
import './styles.css';

// Components
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Profile from './components/Profile';
import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import Playlist from './components/Playlist';
import Comments from './components/Comments';
import NewPlaylistModal from './components/NewPlaylistModal';
import AddToPlaylistModal from './components/AddToPlaylistModal';
import { ToastProvider, useToast } from './components/Toast';

// Data
import { mockSongs, mockPlaylists, mockComments, mockHistory, mockUserUploads } from './data/mockData';

// Main App Content (needs to be inside ToastProvider)
function AppContent() {
  const toast = useToast();
  
  // Auth State
  const [user, setUser] = useState(null);
  
  // Data State
  const [songs, setSongs] = useState(mockSongs);
  const [playlists, setPlaylists] = useState(mockPlaylists);
  const [comments, setComments] = useState(mockComments);
  const [history, setHistory] = useState(mockHistory);
  const [userUploads, setUserUploads] = useState(mockUserUploads);
  
  // Player State
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  
  // UI State
  const [activeView, setActiveView] = useState('home');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [songToAdd, setSongToAdd] = useState(null);

  // Check if player is visible
  const hasPlayer = !!currentSong;

  // Simulate playback progress
  useEffect(() => {
    let interval;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            if (repeat) return 0;
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, repeat]);

  // Get all available songs (including uploads)
  const allSongs = [...songs, ...userUploads];

  // Handlers
  const handlePlaySong = (song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setCurrentTime(0);
      setIsPlaying(true);
      
      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        songId: song.id,
        playedAt: 'همین الان'
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    }
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * allSongs.length);
    } else {
      nextIndex = (currentIndex + 1) % allSongs.length;
    }
    setCurrentSong(allSongs[nextIndex]);
    setCurrentTime(0);
  };

  const handlePrev = () => {
    if (!currentSong) return;
    if (currentTime > 3) {
      setCurrentTime(0);
      return;
    }
    const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? allSongs.length - 1 : currentIndex - 1;
    setCurrentSong(allSongs[prevIndex]);
    setCurrentTime(0);
  };

  const handleSeek = (time) => {
    setCurrentTime(time);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleLike = (songId) => {
    const song = allSongs.find(s => s.id === songId);
    const isLiked = song?.liked;
    
    // Check in songs
    setSongs(prev => prev.map(s => 
      s.id === songId ? { ...s, liked: !s.liked } : s
    ));
    // Check in uploads
    setUserUploads(prev => prev.map(s => 
      s.id === songId ? { ...s, liked: !s.liked } : s
    ));
    // Update currentSong if needed
    if (currentSong?.id === songId) {
      setCurrentSong(prev => ({ ...prev, liked: !prev.liked }));
    }
    
    // Show toast
    if (isLiked) {
      toast.info('از لایک‌ها حذف شد');
    } else {
      toast.success('به لایک‌ها اضافه شد ❤️');
    }
  };

  const addComment = (commentData) => {
    const newComment = {
      id: Date.now(),
      ...commentData,
      time: 'همین الان'
    };
    setComments(prev => [newComment, ...prev]);
    toast.success('نظر شما ثبت شد');
  };

  const createPlaylist = (name) => {
    if (!name.trim()) {
      toast.error('نام پلی‌لیست نمی‌تواند خالی باشد');
      return;
    }
    
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
      cover: `https://picsum.photos/seed/pl${Date.now()}/300/300`
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    setShowNewPlaylist(false);
    toast.success(`پلی‌لیست "${name}" ساخته شد 🎵`);
  };

  const addToPlaylist = (playlistId, songId) => {
    const playlist = playlists.find(p => p.id === playlistId);
    
    if (playlist.songs.includes(songId)) {
      toast.warning('این آهنگ قبلاً در پلی‌لیست وجود دارد');
      return;
    }
    
    setPlaylists(prev => prev.map(p => 
      p.id === playlistId 
        ? { ...p, songs: [...p.songs, songId] }
        : p
    ));
    
    toast.success(`به "${playlist.name}" اضافه شد`);
    setShowAddToPlaylist(false);
    setSongToAdd(null);
  };

  const openAddToPlaylist = (song) => {
    setSongToAdd(song);
    setShowAddToPlaylist(true);
  };

  const handleUpload = (files) => {
    if (files.length === 0) {
      toast.error('فایلی انتخاب نشده است');
      return;
    }
    
    // Simulate upload
    const newUploads = files.map((file, index) => ({
      id: Date.now() + index,
      title: file.name.replace(/\.[^/.]+$/, ''),
      artist: user.name,
      album: 'آلبوم شخصی',
      duration: Math.floor(Math.random() * 200) + 120,
      cover: `https://picsum.photos/seed/upload${Date.now() + index}/300/300`,
      liked: false,
      uploadedBy: user.id,
      uploadDate: 'همین الان',
      plays: 0
    }));
    setUserUploads(prev => [...newUploads, ...prev]);
    toast.success(`${files.length} آهنگ آپلود شد 🎉`);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    toast.success(`خوش آمدید ${userData.name}! 👋`);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentSong(null);
    setIsPlaying(false);
    setActiveView('home');
    toast.info('از حساب خارج شدید');
  };

  const handleNavigate = (view) => {
    setActiveView(view);
    setSelectedPlaylist(null);
    setSearchQuery('');
  };

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setActiveView('playlist');
  };

  // Show Auth if not logged in
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        user={user}
        playlists={playlists}
        activeView={activeView}
        onNavigate={handleNavigate}
        onNewPlaylist={() => setShowNewPlaylist(true)}
        onSelectPlaylist={handleSelectPlaylist}
        onLogout={handleLogout}
        hasPlayer={hasPlayer}
      />

      {/* Main Content */}
      <main className={`
        flex-1 overflow-y-auto scrollbar-thin 
        transition-all duration-300
        pt-14 md:pt-0
        ${hasPlayer ? 'pb-48 md:pb-28' : 'pb-16 md:pb-0'}
      `}>
        {activeView === 'home' && (
          <Home
            user={user}
            songs={allSongs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            onLike={toggleLike}
            onAddToPlaylist={openAddToPlaylist}
          />
        )}

        {activeView === 'search' && (
          <Search
            songs={allSongs}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            onLike={toggleLike}
            onAddToPlaylist={openAddToPlaylist}
          />
        )}

        {activeView === 'library' && (
          <Library
            songs={allSongs}
            playlists={playlists}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            onLike={toggleLike}
            onNewPlaylist={() => setShowNewPlaylist(true)}
            onSelectPlaylist={handleSelectPlaylist}
            onAddToPlaylist={openAddToPlaylist}
          />
        )}

        {activeView === 'profile' && (
          <Profile
            user={user}
            songs={allSongs}
            history={history}
            userUploads={userUploads}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            onLike={toggleLike}
            onUpload={handleUpload}
            onAddToPlaylist={openAddToPlaylist}
          />
        )}

        {activeView === 'playlist' && selectedPlaylist && (
          <Playlist
            playlist={selectedPlaylist}
            songs={allSongs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            onLike={toggleLike}
            onBack={() => handleNavigate('library')}
            onAddToPlaylist={openAddToPlaylist}
          />
        )}
      </main>

      {/* Comments Sidebar */}
      {showComments && currentSong && (
        <Comments
          currentSong={currentSong}
          comments={comments}
          user={user}
          onClose={() => setShowComments(false)}
          onAddComment={addComment}
          hasPlayer={hasPlayer}
        />
      )}

      {/* Player */}
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        volume={volume}
        isMuted={isMuted}
        shuffle={shuffle}
        repeat={repeat}
        showComments={showComments}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrev={handlePrev}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onMuteToggle={() => setIsMuted(!isMuted)}
        onShuffleToggle={() => setShuffle(!shuffle)}
        onRepeatToggle={() => setRepeat(!repeat)}
        onLike={toggleLike}
        onCommentsToggle={() => setShowComments(!showComments)}
        onAddToPlaylist={openAddToPlaylist}
      />

      {/* New Playlist Modal */}
      {showNewPlaylist && (
        <NewPlaylistModal
          onClose={() => setShowNewPlaylist(false)}
          onCreate={createPlaylist}
        />
      )}

      {/* Add to Playlist Modal */}
      {showAddToPlaylist && songToAdd && (
        <AddToPlaylistModal
          song={songToAdd}
          playlists={playlists}
          onClose={() => { setShowAddToPlaylist(false); setSongToAdd(null); }}
          onAdd={addToPlaylist}
          onCreateNew={() => { setShowAddToPlaylist(false); setShowNewPlaylist(true); }}
        />
      )}
    </div>
  );
}

// App wrapper with ToastProvider
export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
