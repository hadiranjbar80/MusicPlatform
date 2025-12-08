// Mock Songs Data
export const mockSongs = [
  { id: 1, title: "Midnight Dreams", artist: "Aurora Skies", album: "Neon Nights", duration: 234, cover: "https://picsum.photos/seed/song1/300/300", liked: false, uploadedBy: null },
  { id: 2, title: "Electric Soul", artist: "The Voltage", album: "Circuit Break", duration: 198, cover: "https://picsum.photos/seed/song2/300/300", liked: true, uploadedBy: null },
  { id: 3, title: "Ocean Waves", artist: "Deep Blue", album: "Aquatic", duration: 267, cover: "https://picsum.photos/seed/song3/300/300", liked: false, uploadedBy: null },
  { id: 4, title: "Starlight Serenade", artist: "Cosmic Drift", album: "Galaxy", duration: 312, cover: "https://picsum.photos/seed/song4/300/300", liked: true, uploadedBy: null },
  { id: 5, title: "Urban Jungle", artist: "City Lights", album: "Metropolitan", duration: 245, cover: "https://picsum.photos/seed/song5/300/300", liked: false, uploadedBy: null },
  { id: 6, title: "Digital Love", artist: "Synthwave", album: "Retro Future", duration: 289, cover: "https://picsum.photos/seed/song6/300/300", liked: false, uploadedBy: null },
  { id: 7, title: "Mountain High", artist: "Echo Valley", album: "Peaks", duration: 276, cover: "https://picsum.photos/seed/song7/300/300", liked: true, uploadedBy: null },
  { id: 8, title: "Rainy Days", artist: "Mood Indigo", album: "Melancholy", duration: 223, cover: "https://picsum.photos/seed/song8/300/300", liked: false, uploadedBy: null },
];

// Mock Playlists Data
export const mockPlaylists = [
  { id: 1, name: "پلی‌لیست مورد علاقه", songs: [1, 2, 4, 7], cover: "https://picsum.photos/seed/pl1/300/300" },
  { id: 2, name: "آهنگ‌های شاد", songs: [3, 5, 6], cover: "https://picsum.photos/seed/pl2/300/300" },
  { id: 3, name: "برای مطالعه", songs: [1, 3, 8], cover: "https://picsum.photos/seed/pl3/300/300" },
];

// Mock Comments Data
export const mockComments = [
  { id: 1, songId: 1, user: "علی", text: "عالیه این آهنگ! 🔥", time: "۲ ساعت پیش", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ali" },
  { id: 2, songId: 1, user: "مریم", text: "صداش خیلی قشنگه", time: "۵ ساعت پیش", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maryam" },
  { id: 3, songId: 2, user: "رضا", text: "این آهنگ رو هر روز گوش میدم", time: "۱ روز پیش", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=reza" },
];

// Mock History Data
export const mockHistory = [
  { id: 1, songId: 1, playedAt: "۱۰ دقیقه پیش" },
  { id: 2, songId: 3, playedAt: "۳۰ دقیقه پیش" },
  { id: 3, songId: 2, playedAt: "۱ ساعت پیش" },
  { id: 4, songId: 5, playedAt: "۲ ساعت پیش" },
  { id: 5, songId: 7, playedAt: "دیروز" },
  { id: 6, songId: 4, playedAt: "دیروز" },
  { id: 7, songId: 8, playedAt: "۲ روز پیش" },
];

// Mock User Uploaded Songs
export const mockUserUploads = [
  { id: 101, title: "آهنگ من ۱", artist: "خودم", album: "آلبوم شخصی", duration: 180, cover: "https://picsum.photos/seed/upload1/300/300", liked: false, uploadedBy: 1, uploadDate: "۱ هفته پیش", plays: 45 },
  { id: 102, title: "ملودی شب", artist: "خودم", album: "آلبوم شخصی", duration: 220, cover: "https://picsum.photos/seed/upload2/300/300", liked: true, uploadedBy: 1, uploadDate: "۲ هفته پیش", plays: 120 },
];
