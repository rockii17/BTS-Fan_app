import React, { useState, useEffect } from 'react';
import { Users, Music, Image, Tv, Newspaper, Heart, Sparkles, PlusCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'members' | 'songs' | 'pictures' | 'videos' | 'news' | 'favorites'>('members');

  // Initial Default Pictures
  const defaultPictures = [
    { title: 'Stage Performance', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop' },
    { title: 'Concert Lights & ARMY Bomb Waves', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop' },
    { title: 'Live Show Atmosphere', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop' },
    { title: 'Purple Stadium Lights', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop' }
  ];

  // Initial Default Videos
  const defaultVideos = [
    { title: 'Dynamite', id: 'gdZLi9oWNZg' },
    { title: 'Butter', id: 'WMweEpGlu_U' },
    { title: 'Boy With Luv (feat. Halsey)', id: 'XsX3ATc3Cg8' },
    { title: 'MIC Drop (Steve Aoki Remix)', id: 'kTlv54L4XwC' }
  ];

  // State with LocalStorage memory persistence
  const [pictures, setPictures] = useState(() => {
    const saved = localStorage.getItem('bts_custom_pictures');
    return saved ? JSON.parse(saved) : defaultPictures;
  });

  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('bts_custom_videos');
    return saved ? JSON.parse(saved) : defaultVideos;
  });

  // Inputs for adding new items
  const [newPicTitle, setNewPicTitle] = useState('');
  const [newPicUrl, setNewPicUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoInput, setNewVideoInput] = useState('');

  // Save to LocalStorage whenever pictures or videos change
  useEffect(() => {
    localStorage.setItem('bts_custom_pictures', JSON.stringify(pictures));
  }, [pictures]);

  useEffect(() => {
    localStorage.setItem('bts_custom_videos', JSON.stringify(videos));
  }, [videos]);

  // Handler to add a photo
  const handleAddPicture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPicUrl) return;
    const newItem = { title: newPicTitle || 'BTS Memory', url: newPicUrl };
    setPictures([newItem, ...pictures]);
    setNewPicTitle('');
    setNewPicUrl('');
  };

  // Helper to extract YouTube Video ID from full URLs or raw IDs
  const extractYouTubeId = (urlOrId: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlOrId.match(regExp);
    return (match && match[2].length === 11) ? match[2] : urlOrId;
  };

  // Handler to add a YouTube video
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoInput) return;
    const videoId = extractYouTubeId(newVideoInput);
    const newItem = { title: newVideoTitle || 'BTS Video', id: videoId };
    setVideos([newItem, ...videos]);
    setNewVideoTitle('');
    setNewVideoInput('');
  };

  const members = [
    { name: 'RM (Kim Namjoon)', role: 'Leader, Main Rapper', bio: 'The visionary leader and lyricist behind many of BTS’s hit tracks.' },
    { name: 'Jin (Kim Seokjin)', role: 'Sub-Vocalist, Visual', bio: 'Known for his incredible vocals, charm, and "Worldwide Handsome" title.' },
    { name: 'SUGA (Min Yoongi)', role: 'Lead Rapper, Producer', bio: 'Master producer and sharp rapper who creates deep, emotive tracks.' },
    { name: 'j-hope (Jung Hoseok)', role: 'Main Dancer, Lead Rapper', bio: 'The bright energy and main choreography backbone of the group.' },
    { name: 'Jimin (Park Jimin)', role: 'Main Dancer, Lead Vocalist', bio: 'Famous for his graceful contemporary dance style and unique vocal range.' },
    { name: 'V (Kim Taehyung)', role: 'Sub-Vocalist, Visual', bio: 'Deep soulful voice with expressive stage presence and artistic flair.' },
    { name: 'Jung Kook (Jeon Jungkook)', role: 'Main Vocalist, Lead Dancer, Center', bio: 'The "Golden Maknae" who excels at singing, dancing, and performing.' }
  ];

  const songs = [
    { title: 'Dynamite', genre: 'Disco-Pop', year: '2020' },
    { title: 'Butter', genre: 'Dance-Pop', year: '2021' },
    { title: 'Boy With Luv (feat. Halsey)', genre: 'Nu-Disco', year: '2019' },
    { title: 'Spring Day', genre: 'Alternative Hip-Hop / Rock', year: '2017' },
    { title: 'FAKE LOVE', genre: 'Emo Hip-Hop', year: '2018' },
    { title: 'Blood Sweat & Tears', genre: 'Moombahton / Tropical House', year: '2016' },
    { title: 'MIC Drop (Steve Aoki Remix)', genre: 'Trap / Hip-Hop', year: '2017' },
    { title: 'Run BTS', genre: 'Upbeat Rock / Hip-Hop', year: '2022' }
  ];

  const news = [
    { title: 'ARIRANG World Tour in Full Swing', date: '2026', summary: 'BTS is headlining their massive ARIRANG World Tour following their return from military service.' },
    { title: 'Album Streams Record', date: '2026', summary: 'Their album reached over 4 billion streams on Spotify, marking another major global milestone.' }
  ];

  const favorites = [
    { title: 'Fan Anthems', items: 'Mikrokosmos, Spring Day, Magic Shop, 2! 3!' },
    { title: 'Group Catchphrase', items: 'Borahae ("I Purple You" 💜)' },
    { title: 'Solo Highlights', items: 'RM: Mono / Jin: Epiphany / SUGA: Daechwita / j-hope: Daydream / Jimin: Like Crazy / V: Slow Dancing / Jung Kook: Seven' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-950 via-purple-900 to-indigo-950 text-white font-sans p-4 md:p-8">
      {/* Header */}
      <header className="text-center py-6">
        <h1 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-2 text-fuchsia-300 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
          <Heart className="fill-fuchsia-400 text-fuchsia-400 animate-pulse" /> BTS Fan Hub
        </h1>
        <p className="text-pink-200 text-sm mt-2 font-medium">Borahae 💜 Welcome ARMY!</p>
      </header>

      {/* Navigation Bar */}
      <nav className="flex flex-wrap justify-center gap-2 mb-8 max-w-4xl mx-auto bg-purple-900/80 backdrop-blur-md p-2.5 rounded-3xl shadow-2xl border border-fuchsia-500/30">
        <button 
          onClick={() => setActiveTab('members')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'members' ? 'bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)] scale-105' : 'text-purple-200 hover:bg-purple-800/60'}`}
        >
          <Users size={16} /> Members
        </button>

        <button 
          onClick={() => setActiveTab('songs')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'songs' ? 'bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)] scale-105' : 'text-purple-200 hover:bg-purple-800/60'}`}
        >
          <Music size={16} /> Songs
        </button>

        <button 
          onClick={() => setActiveTab('pictures')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'pictures' ? 'bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)] scale-105' : 'text-purple-200 hover:bg-purple-800/60'}`}
        >
          <Image size={16} /> Pictures
        </button>

        <button 
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'videos' ? 'bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)] scale-105' : 'text-purple-200 hover:bg-purple-800/60'}`}
        >
          <Tv size={16} /> YouTube Videos
        </button>

        <button 
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'news' ? 'bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)] scale-105' : 'text-purple-200 hover:bg-purple-800/60'}`}
        >
          <Newspaper size={16} /> Latest News
        </button>

        <button 
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'favorites' ? 'bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)] scale-105' : 'text-purple-200 hover:bg-purple-800/60'}`}
        >
          <Sparkles size={16} /> Favorites
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto">
        {/* Members */}
        {activeTab === 'members' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {members.map((member, idx) => (
              <div key={idx} className="bg-purple-900/60 backdrop-blur-sm border border-fuchsia-500/30 p-5 rounded-3xl shadow-xl hover:border-fuchsia-400/60 transition">
                <h3 className="text-2xl font-extrabold text-pink-300">{member.name}</h3>
                <span className="text-xs uppercase tracking-wider text-fuchsia-400 font-bold">{member.role}</span>
                <p className="text-sm text-purple-100 mt-2 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        )}

        {/* Songs */}
        {activeTab === 'songs' && (
          <div className="bg-purple-900/60 backdrop-blur-sm border border-fuchsia-500/30 rounded-3xl p-6 shadow-xl">
            <div className="divide-y divide-fuchsia-500/20">
              {songs.map((song, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center">
                  <div>
                    <h4 className="font-extrabold text-lg text-pink-200">{song.title}</h4>
                    <span className="text-xs text-fuchsia-300">{song.genre}</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-fuchsia-900/80 border border-fuchsia-500/40 px-3 py-1 rounded-full text-pink-200">{song.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pictures */}
        {activeTab === 'pictures' && (
          <div className="space-y-6">
            {/* Add Picture Form */}
            <form onSubmit={handleAddPicture} className="bg-purple-900/80 border border-fuchsia-500/40 p-4 rounded-3xl shadow-xl flex flex-col md:flex-row gap-3 items-center">
              <input 
                type="text" 
                placeholder="Picture Title (optional)" 
                value={newPicTitle} 
                onChange={(e) => setNewPicTitle(e.target.value)}
                className="bg-purple-950/80 border border-fuchsia-500/30 rounded-2xl px-4 py-2 text-sm w-full md:w-1/3 text-white placeholder-purple-300 focus:outline-none focus:border-fuchsia-400"
              />
              <input 
                type="url" 
                placeholder="Paste Image URL..." 
                value={newPicUrl} 
                onChange={(e) => setNewPicUrl(e.target.value)}
                required
                className="bg-purple-950/80 border border-fuchsia-500/30 rounded-2xl px-4 py-2 text-sm w-full md:w-1/2 text-white placeholder-purple-300 focus:outline-none focus:border-fuchsia-400"
              />
              <button type="submit" className="bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 text-white font-bold px-5 py-2 rounded-2xl text-sm flex items-center gap-1.5 w-full md:w-auto justify-center transition shadow-md">
                <PlusCircle size={16} /> Add Photo
              </button>
            </form>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {pictures.map((pic: any, idx: number) => (
                <div key={idx} className="group relative overflow-hidden rounded-3xl border border-fuchsia-500/30 shadow-xl bg-purple-900/60">
                  <img src={pic.url} alt={pic.title} className="w-full h-56 object-cover group-hover:scale-105 transition duration-300" />
                  <div className="p-3 text-center bg-purple-950/80 backdrop-blur-xs">
                    <p className="text-xs font-bold text-pink-200">{pic.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YouTube Videos */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            {/* Add Video Form */}
            <form onSubmit={handleAddVideo} className="bg-purple-900/80 border border-fuchsia-500/40 p-4 rounded-3xl shadow-xl flex flex-col md:flex-row gap-3 items-center">
              <input 
                type="text" 
                placeholder="Video Title (optional)" 
                value={newVideoTitle} 
                onChange={(e) => setNewVideoTitle(e.target.value)}
                className="bg-purple-950/80 border border-fuchsia-500/30 rounded-2xl px-4 py-2 text-sm w-full md:w-1/3 text-white placeholder-purple-300 focus:outline-none focus:border-fuchsia-400"
              />
              <input 
                type="text" 
                placeholder="Paste YouTube Link or Video ID..." 
                value={newVideoInput} 
                onChange={(e) => setNewVideoInput(e.target.value)}
                required
                className="bg-purple-950/80 border border-fuchsia-500/30 rounded-2xl px-4 py-2 text-sm w-full md:w-1/2 text-white placeholder-purple-300 focus:outline-none focus:border-fuchsia-400"
              />
              <button type="submit" className="bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 text-white font-bold px-5 py-2 rounded-2xl text-sm flex items-center gap-1.5 w-full md:w-auto justify-center transition shadow-md">
                <PlusCircle size={16} /> Add Video
              </button>
            </form>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video: any, idx: number) => (
                <div key={idx} className="bg-purple-900/60 border border-fuchsia-500/30 rounded-3xl p-3 shadow-xl">
                  <h3 className="text-sm font-bold text-pink-300 mb-2 px-2">🎵 {video.title}</h3>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-purple-800">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Latest News */}
        {activeTab === 'news' && (
          <div className="space-y-4">
            {news.map((item, idx) => (
              <div key={idx} className="bg-purple-900/60 backdrop-blur-sm border border-fuchsia-500/30 p-6 rounded-3xl shadow-xl">
                <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest">{item.date}</span>
                <h3 className="text-2xl font-bold mt-1 text-pink-200">{item.title}</h3>
                <p className="text-sm text-purple-100 mt-2 leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        {/* Favorites */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            {favorites.map((fav, idx) => (
              <div key={idx} className="bg-purple-900/60 backdrop-blur-sm border border-fuchsia-500/30 p-6 rounded-3xl shadow-xl">
                <h3 className="text-xl font-bold text-fuchsia-300">{fav.title}</h3>
                <p className="text-sm text-purple-100 mt-2 leading-relaxed">{fav.items}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
