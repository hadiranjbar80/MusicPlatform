import React, { useState } from 'react';
import { X, MessageCircle, User, Send } from 'lucide-react';

export default function Comments({
  currentSong,
  comments,
  user,
  onClose,
  onAddComment,
  hasPlayer
}) {
  const [newComment, setNewComment] = useState('');

  const currentComments = comments.filter(c => c.songId === currentSong?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    onAddComment({
      songId: currentSong.id,
      user: user.name,
      text: newComment,
      avatar: user.avatar
    });
    setNewComment('');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        hidden md:flex
        w-80 glass border-r border-white/5 flex-col h-full
        ${hasPlayer ? 'pb-28' : ''}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between flex-shrink-0">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-violet-400" />
            نظرات
          </h3>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Song Info */}
        {currentSong && (
          <div className="p-4 border-b border-white/5 flex items-center gap-3 flex-shrink-0">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-sm">{currentSong.title}</p>
              <p className="text-xs text-zinc-400 truncate">{currentSong.artist}</p>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
          {currentComments.length > 0 ? (
            currentComments.map(comment => (
              <div key={comment.id} className="bg-white/5 rounded-xl p-3 fade-in">
                <div className="flex items-center gap-2 mb-2">
                  {comment.avatar ? (
                    <img 
                      src={comment.avatar} 
                      alt={comment.user}
                      className="w-8 h-8 rounded-full bg-violet-500/20"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-violet-500/30 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-violet-400" />
                    </div>
                  )}
                  <span className="font-medium text-sm">{comment.user}</span>
                  <span className="text-xs text-zinc-500 mr-auto">{comment.time}</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{comment.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-zinc-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">اولین نظر را بنویسید!</p>
            </div>
          )}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="نظر خود را بنویسید..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="p-2.5 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </aside>

      {/* Mobile Full Screen Modal */}
      <div className={`
        md:hidden fixed inset-0 z-[60] flex flex-col
        bg-zinc-900/95 backdrop-blur-xl
        ${hasPlayer ? 'pb-28' : ''}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between flex-shrink-0">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-violet-400" />
            نظرات
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Song Info */}
        {currentSong && (
          <div className="p-4 border-b border-white/5 flex items-center gap-3 flex-shrink-0">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-sm">{currentSong.title}</p>
              <p className="text-xs text-zinc-400 truncate">{currentSong.artist}</p>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentComments.length > 0 ? (
            currentComments.map(comment => (
              <div key={comment.id} className="bg-white/5 rounded-xl p-3 fade-in">
                <div className="flex items-center gap-2 mb-2">
                  {comment.avatar ? (
                    <img 
                      src={comment.avatar} 
                      alt={comment.user}
                      className="w-8 h-8 rounded-full bg-violet-500/20"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-violet-500/30 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-violet-400" />
                    </div>
                  )}
                  <span className="font-medium text-sm">{comment.user}</span>
                  <span className="text-xs text-zinc-500 mr-auto">{comment.time}</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{comment.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-zinc-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">اولین نظر را بنویسید!</p>
            </div>
          )}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="نظر خود را بنویسید..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="p-2.5 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
