import React, { useState } from 'react';
import { Users, Music, Image, Tv, Newspaper, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'members' | 'songs' | 'pictures' | 'videos' | 'news' | 'favorites'>('members');

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

  const pictures = [
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop'
  ];

  const videoIds = ['gdZLi9oWNZg', 'WMweEpGlu_U'];

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
    <div className="min-h-screen bg-purple-950 text-white font-sans p-4 md:p-8">
      {/* Header */}
      <header className="text-center py-6">
        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-2 text-pink-400">
          <Heart className="fill-pink-400" /> BTS Fan Hub
        </h1>
      </header>

      {/* Navigation Bar */}
      <nav className="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto bg-purple-900/60 p-2 rounded-2xl shadow-lg border border-purple-800">
        <button 
          onClick={() => setActiveTab('members')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === 'members' ? 'bg-pink-500 text-white shadow' : 'text-purple-200 hover:bg-purple-800'}`}
        >
          <Users size={16} /> Members
        </button>

        <button 
          onClick={() => setActiveTab('songs')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === 'songs' ? 'bg-pink-500 text-white shadow' : 'text-purple-200 hover:bg-purple-800'}`}
        >
          <Music size={16} /> Songs
        </button>

        <button 
          onClick={() => setActiveTab('pictures')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === 'pictures' ? 'bg-pink-500 text-white shadow' : 'text-purple-200 hover:bg-purple-800'}`}
        >
          <Image size={16} /> Pictures
        </button>

        <button 
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === 'videos' ? 'bg-pink-500 text-white shadow' : 'text-purple-200 hover:bg-purple-800'}`}
        >
          <Tv size={16} /> YouTube Videos
        </button>

        <button 
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === 'news' ? 'bg-pink-500 text-white shadow' : 'text-purple-200 hover:bg-purple-800'}`}
        >
          <Newspaper size={16} /> Latest News
        </button>

        <button 
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === 'favorites' ? 'bg-pink-500 text-white shadow' : 'text-purple-200 hover:bg-purple-800'}`}
        >
          <Sparkles size={16} /> Favorites
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto">
        {/* 1. Members */}
        {activeTab === 'members' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {members.map((member, idx) => (
              <div key={idx} className="bg-purple-900/80 border border-purple-700/50 p-5 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-pink-300">{member.name}</h3>
                <span className="text-xs uppercase tracking-wide text-purple-300 font-semibold">{member.role}</span>
                <p className="text-sm text-purple-100 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        )}

        {/* 2. Songs */}
        {activeTab === 'songs' && (
          <div className="bg-purple-900/80 border border-purple-700/50 rounded-2xl p-4 shadow-lg">
            <div className="divide-y divide-purple-800">
              {songs.map((song, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-pink-200">{song.title}</h4>
                    <span className="text-xs text-purple-300">{song.genre}</span>
                  </div>
                  <span className="text-xs font-mono bg-purple-800 px-2.5 py-1 rounded-full text-purple-200">{song.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Pictures */}
        {activeTab === 'pictures' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pictures.map((url, idx) => (
              <img key={idx} src={url} alt={`BTS Photo ${idx + 1}`} className="w-full h-52 object-cover rounded-2xl shadow-lg border border-purple-700/50" />
            ))}
          </div>
        )}

        {/* 4. YouTube Videos */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            {videoIds.map((id, idx) => (
              <div key={idx} className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-purple-700/50">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title="BTS YouTube Video"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        )}

        {/* 5. Latest News */}
        {activeTab === 'news' && (
          <div className="space-y-4">
            {news.map((item, idx) => (
              <div key={idx} className="bg-purple-900/80 border border-purple-700/50 p-5 rounded-2xl shadow-lg">
                <span className="text-xs font-semibold text-pink-400">{item.date}</span>
                <h3 className="text-xl font-bold mt-1 text-purple-100">{item.title}</h3>
                <p className="text-sm text-purple-200 mt-2">{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        {/* 6. Favorites */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            {favorites.map((fav, idx) => (
              <div key={idx} className="bg-purple-900/80 border border-purple-700/50 p-5 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-pink-300">{fav.title}</h3>
                <p className="text-sm text-purple-100 mt-1">{fav.items}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

