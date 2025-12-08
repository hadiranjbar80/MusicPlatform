// Format time from seconds to MM:SS
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Format date to Persian
export const formatDate = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'همین الان';
  if (minutes < 60) return `${minutes} دقیقه پیش`;
  if (hours < 24) return `${hours} ساعت پیش`;
  if (days < 7) return `${days} روز پیش`;
  if (days < 30) return `${Math.floor(days / 7)} هفته پیش`;
  return `${Math.floor(days / 30)} ماه پیش`;
};

// Generate random avatar URL
export const generateAvatar = (seed) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};

// Shuffle array
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Validate email
export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

// Validate password (min 6 characters)
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Format number with Persian numerals
export const toPersianNumber = (num) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (d) => persianDigits[d]);
};

// Format play count
export const formatPlayCount = (count) => {
  if (count < 1000) return toPersianNumber(count);
  if (count < 1000000) return toPersianNumber(Math.floor(count / 1000)) + 'K';
  return toPersianNumber(Math.floor(count / 1000000)) + 'M';
};

// Get file extension
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Check if file is audio
export const isAudioFile = (filename) => {
  const audioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'];
  return audioExtensions.includes(getFileExtension(filename).toLowerCase());
};

// Check if file is image
export const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  return imageExtensions.includes(getFileExtension(filename).toLowerCase());
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage error:', e);
    }
  }
};
