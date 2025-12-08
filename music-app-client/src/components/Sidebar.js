import React, { useState } from 'react';
import { Home, Search, Library, Plus, Music, LogOut, User, Menu, X } from 'lucide-react';

export default function Sidebar({ 
  user, 
  playlists, 
  activeView, 
  onNavigate, 
  onNewPlaylist, 
  onSelectPlaylist,
  onLogout,
  hasPlayer
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'خانه', icon: Home },
    { id: 'search', label: 'جستجو', icon: Search },
    { id: 'library', label: 'کتابخانه', icon: Library },
    { id: 'profile', label: 'پروفایل', icon: User },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handlePlaylistClick = (playlist) => {
    onSelectPlaylist(playlist);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold gradient-text flex items-center gap-2">
          <Music className="w-6 h-6 text-violet-400" />
          موزیکا
        </h1>
        <img 
          src={user.avatar} 
          alt={user.name}
          className="w-8 h-8 rounded-full bg-violet-500/20 cursor-pointer"
          onClick={() => onNavigate('profile')}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop always visible, Mobile slide-in */}
      <aside className={`
        fixed md:relative z-50 md:z-auto
        w-64 h-full
        glass border-l border-white/5 
        flex flex-col
        transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        right-0 md:right-auto
      `}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5">
          <h1 className="text-xl font-bold gradient-text flex items-center gap-2">
            <Music className="w-6 h-6 text-violet-400" />
            موزیکا
          </h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:block p-6 pb-2">
          <h1 className="text-2xl font-bold gradient-text flex items-center gap-2">
            <Music className="w-7 h-7 text-violet-400" />
            موزیکا
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-1 p-4 md:p-6 md:pt-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeView === item.id 
                  ? 'bg-violet-500/20 text-violet-300' 
                  : 'hover:bg-white/5 text-zinc-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Playlists Section */}
        <div className="flex-1 overflow-hidden flex flex-col px-4 md:px-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-zinc-400 text-sm">پلی‌لیست‌ها</span>
            <button 
              onClick={onNewPlaylist}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              title="پلی‌لیست جدید"
            >
              <Plus className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
          <div className="space-y-1 overflow-y-auto scrollbar-thin flex-1">
            {playlists.map(playlist => (
              <button
                key={playlist.id}
                onClick={() => handlePlaylistClick(playlist)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-right"
              >
                <img 
                  src={playlist.cover} 
                  alt="" 
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0" 
                />
                <div className="truncate flex-1 min-w-0">
                  <p className="text-sm truncate">{playlist.name}</p>
                  <p className="text-xs text-zinc-500">{playlist.songs.length} آهنگ</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className={`relative p-4 md:p-6 pt-4 border-t border-white/5 ${hasPlayer ? 'pb-28 md:pb-6' : ''}`}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-10 h-10 rounded-full bg-violet-500/20 flex-shrink-0"
            />
            <div className="flex-1 text-right min-w-0">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-zinc-500 truncate">{user.email}</p>
            </div>
          </button>
          
          {/* User Menu Dropdown - Opens UPWARD */}
          {showUserMenu && (
            <div className="absolute bottom-full right-4 left-4 mb-2 glass rounded-xl overflow-hidden shadow-xl scale-in z-[60]">
              <button
                onClick={() => { onNavigate('profile'); setShowUserMenu(false); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-zinc-300"
              >
                <User className="w-5 h-5" />
                <span>پروفایل من</span>
              </button>
              <button
                onClick={() => { onLogout(); setShowUserMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-red-400"
              >
                <LogOut className="w-5 h-5" />
                <span>خروج از حساب</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className={`
        md:hidden fixed left-0 right-0 z-40
        glass border-t border-white/5
        flex items-center justify-around
        py-2 px-4
        transition-all duration-300
        ${hasPlayer ? 'bottom-[104px]' : 'bottom-0'}
      `}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeView === item.id 
                ? 'text-violet-400' 
                : 'text-zinc-500'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
