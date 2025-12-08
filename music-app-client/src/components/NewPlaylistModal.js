import React, { useState } from 'react';
import { X, Music } from 'lucide-react';

export default function NewPlaylistModal({ onClose, onCreate }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name);
    setName('');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <div 
        className="glass rounded-2xl p-6 w-96 scale-in" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Music className="w-5 h-5 text-violet-400" />
            پلی‌لیست جدید
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="نام پلی‌لیست..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 mb-4 focus:outline-none focus:border-violet-500/50 transition-colors"
            autoFocus
          />
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-3 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
            >
              ایجاد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
