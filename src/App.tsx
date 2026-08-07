import React, { useState, useEffect } from 'react';

interface Song {
  title: string;
  album: string;
  year: string;
}

interface Member {
  name: string;
  stageName: string;
  role: string;
  birthDate: string;
  bio: string;
}

const MEMBERS: Member[] = [
  {
    name: 'Kim Nam-joon',
    stageName: 'RM',
    role: 'Leader, Main Rapper',
    birthDate: 'September 12, 1994',
    bio: 'Known for his brilliant songwriting, deep philosophical lyrics, and fluent English.',
  },
  {
    name: 'Kim Seok-jin',
    stageName: 'Jin',
    role: 'Sub Vocalist, Visual',
    birthDate: 'December 4, 1992',
    bio: 'The oldest member, famous for his "World Wide Handsome" humor and soulful vocals.',
  },
  {
    name: 'Min Yoon-gi',
    stageName: 'Suga / Agust D',
    role: 'Lead Rapper',
    birthDate: 'March 9, 1993',
    bio: 'Prolific producer and rapper known for powerful storytelling and distinct beats.',
  },
  {
    name: 'Jung Ho-seok',
    stageName: 'J-Hope',
    role: 'Main Dancer, Sub Rapper',
    birthDate: 'February 18, 1994',
    bio: 'The sunshine of the group, incredible performer, dancer, and energetic rapper.',
  },
  {
    name: 'Park Ji-min',
    stageName: 'Jimin',
    role: 'Main Dancer, Lead Vocalist',
    birthDate: 'October 13, 1995',
    bio: 'Renowned for his elegant dance style, expressive high notes, and captivating stage presence.',
  },
  {
    name: 'Kim Tae-hyung',
    stageName: 'V',
    role: 'Lead Dancer, Sub Vocalist, Visual',
    birthDate: 'December 30, 1995',
    bio: 'Recognized for his deep baritone vocals, soulful solo tracks, and artistic eye.',
  },
  {
    name: 'Jeon Jung-kook',
    stageName: 'Jungkook',
    role: 'Main Vocalist, Lead Dancer, Center',
    birthDate: 'September 1, 1997',
    bio: 'The "Golden Maknae" who excels at singing, dancing, producing, and visuals.',
  },
];

const DISCOGRAPHY: Song[] = [
  { title: 'Dynamite', album: 'BE / Deluxe', year: '2020' },
  { title: 'Butter', album: 'Butter (Single)', year: '2021' },
  { title: 'Spring Day', album: 'YOU NEVER WALK ALONE', year: '2017' },
  {
    title: 'Boy With Luv (feat. Halsey)',
    album: 'MAP OF THE SOUL : PERSONA',
    year: '2019',
  },
  { title: 'Blood Sweat & Tears', album: 'WINGS', year: '2016' },
  { title: 'Life Goes On', album: 'BE', year: '2020' },
  { title: 'Fake Love', album: 'LOVE YOURSELF 轉 Tear', year: '2018' },
  { title: 'DNA', album: 'LOVE YOURSELF 承 Her', year: '2017' },
  {
    title: 'Mic Drop (Steve Aoki Remix)',
    album: 'LOVE YOURSELF 結 Answer',
    year: '2017',
  },
  { title: 'Run BTS', album: 'Proof', year: '2022' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'members' | 'songs' | 'favorites'>(
    'members'
  );

  // Favorites saved in LocalStorage
  const [favoriteSongs, setFavoriteSongs] = useState<string[]>(() => {
    const saved = localStorage.getItem('bts_fav_songs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bts_fav_songs', JSON.stringify(favoriteSongs));
  }, [favoriteSongs]);

  const toggleFavorite = (songTitle: string) => {
    if (favoriteSongs.includes(songTitle)) {
      setFavoriteSongs(favoriteSongs.filter((t) => t !== songTitle));
    } else {
      setFavoriteSongs([...favoriteSongs, songTitle]);
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '16px',
        fontFamily: 'sans-serif',
        color: '#2e1065',
        backgroundColor: '#faf5ff',
        minHeight: '100vh',
      }}
    >
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#6b21a8', fontSize: '32px', margin: '0 0 8px 0' }}>
          💜 BTS Fan Hub 💜
        </h1>
        <p style={{ margin: 0, color: '#7e22ce', fontSize: '14px' }}>
          Bangtan Sonyeondan | ARMY Portal
        </p>
      </header>

      {/* Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {(['members', 'songs', 'favorites'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 8px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              textTransform: 'capitalize',
              backgroundColor: activeTab === tab ? '#7e22ce' : '#e9d5ff',
              color: activeTab === tab ? '#fff' : '#581c87',
              boxShadow:
                activeTab === tab ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {tab === 'favorites' ? `Favorites (${favoriteSongs.length})` : tab}
          </button>
        ))}
      </div>

      {/* Tab 1: Members */}
      {activeTab === 'members' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          {MEMBERS.map((m) => (
            <div
              key={m.stageName}
              style={{
                border: '1px solid #d8b4fe',
                borderRadius: '12px',
                padding: '16px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(126,34,206,0.05)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '8px',
                }}
              >
                <h3 style={{ margin: 0, color: '#6b21a8', fontSize: '20px' }}>
                  {m.stageName}
                </h3>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#9333ea',
                    fontWeight: 'bold',
                  }}
                >
                  {m.role.split(',')[0]}
                </span>
              </div>
              <p
                style={{
                  margin: '0 0 4px 0',
                  fontSize: '13px',
                  color: '#4c1d95',
                  fontWeight: 'bold',
                }}
              >
                {m.name}
              </p>
              <p
                style={{
                  margin: '0 0 12px 0',
                  fontSize: '12px',
                  color: '#6b21a8',
                }}
              >
                🎂 {m.birthDate}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  lineHeight: '1.4',
                  color: '#3b0764',
                  backgroundColor: '#f3e8ff',
                  padding: '8px',
                  borderRadius: '6px',
                }}
              >
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Essential Discography */}
      {activeTab === 'songs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2
            style={{ fontSize: '20px', color: '#6b21a8', margin: '0 0 8px 0' }}
          >
            Hit Songs & Eras
          </h2>
          {DISCOGRAPHY.map((song) => {
            const isFav = favoriteSongs.includes(song.title);
            const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
              'BTS ' + song.title + ' Official MV'
            )}`;
            return (
              <div
                key={song.title}
                style={{
                  border: '1px solid #e9d5ff',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: '0 0 4px 0',
                      fontSize: '16px',
                      color: '#581c87',
                    }}
                  >
                    {song.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#7e22ce' }}>
                    {song.album} ({song.year})
                  </p>
                </div>
                <div
                  style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  <a
                    href={ytSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: 'none',
                      fontSize: '12px',
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                    }}
                  >
                    Watch MV 🎬
                  </a>
                  <button
                    onClick={() => toggleFavorite(song.title)}
                    style={{
                      border: 'none',
                      backgroundColor: isFav ? '#9333ea' : '#f3e8ff',
                      color: isFav ? '#fff' : '#7e22ce',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    {isFav ? '💜 Saved' : '+ Fav'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Favorites */}
      {activeTab === 'favorites' && (
        <div>
          <h2
            style={{ fontSize: '20px', color: '#6b21a8', marginBottom: '12px' }}
          >
            Your Favorite Playlist
          </h2>
          {favoriteSongs.length === 0 ? (
            <p style={{ color: '#7e22ce' }}>
              No saved favorites yet! Switch to Songs and tap "+ Fav" to build
              your list.
            </p>
          ) : (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {favoriteSongs.map((title) => (
                <div
                  key={title}
                  style={{
                    border: '1px solid #d8b4fe',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#6b21a8' }}>
                    💜 {title}
                  </span>
                  <button
                    onClick={() => toggleFavorite(title)}
                    style={{
                      border: 'none',
                      backgroundColor: '#f3e8ff',
                      color: '#ef4444',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
