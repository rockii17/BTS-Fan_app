import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'members' | 'songs' | 'pictures' | 'videos' | 'news' | 'favorites'>('members');

  // Live News State
  const [newsList, setNewsList] = useState<Array<{ title: string; link: string; date: string; source: string }>>([]);
  const [loadingNews, setLoadingNews] = useState(false);

  // Input states for user-added pictures and videos
  const [newPicTitle, setNewPicTitle] = useState('');
  const [newPicUrl, setNewPicUrl] = useState('');
  const [newVidTitle, setNewVidTitle] = useState('');
  const [newVidInput, setNewVidInput] = useState('');

  // Auto-Fetch Live BTS News
  useEffect(() => {
    const fetchLiveNews = async () => {
      setLoadingNews(true);
      try {
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3DBTS%2Bkpop%26hl%3Den-US%26gl%3DUS%26ceid%3DUS%3Aen'
        );
        const data = await response.json();
        if (data.items) {
          const formattedNews = data.items.slice(0, 6).map((item: any) => ({
            title: item.title,
            link: item.link,
            date: new Date(item.pubDate).toLocaleDateString(),
            source: item.author || 'Google News'
          }));
          setNewsList(formattedNews);
        }
      } catch (err) {
        console.error('Failed to auto-fetch news', err);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchLiveNews();
  }, []);

  // Members Data with Reliable Unsplash Stage/Artistic Placeholders
  const members = [
    { name: 'RM', realName: 'Kim Nam-joon', role: 'Leader & Main Rapper', date: 'September 12, 1994', bio: 'Known for his brilliant songwriting, deep philosophical lyrics, and fluent English.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop' },
    { name: 'Jin', realName: 'Kim Seok-jin', role: 'Sub Vocalist & Visual', date: 'December 4, 1992', bio: 'The oldest member, famous for his "Worldwide Handsome" humor and soulful vocals.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop' },
    { name: 'Suga / Agust D', realName: 'Min Yoon-gi', role: 'Lead Rapper & Producer', date: 'March 9, 1993', bio: 'Prolific producer and rapper known for powerful storytelling and distinct beats.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop' },
    { name: 'J-Hope', realName: 'Jung Ho-seok', role: 'Main Dancer & Rapper', date: 'February 18, 1994', bio: 'The sunshine of the group, incredible performer, dancer, and energetic rapper.', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop' },
    { name: 'Jimin', realName: 'Park Ji-min', role: 'Main Dancer & Lead Vocalist', date: 'October 13, 1995', bio: 'Renowned for his elegant dance style, expressive high notes, and captivating stage presence.', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop' },
    { name: 'V', realName: 'Kim Tae-hyung', role: 'Sub Vocalist & Visual', date: 'December 30, 1995', bio: 'Recognized for his deep baritone vocals, soulful solo tracks, and artistic eye.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop' },
    { name: 'Jungkook', realName: 'Jeon Jung-kook', role: 'Main Vocalist & Center', date: 'September 1, 1997', bio: 'The "Golden Maknae" who excels at singing, dancing, and stage performance.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop' }
  ];

  // Albums & Songs Data
  const albums = [
    {
      title: 'BE (2020)',
      tracks: [
        { title: 'Dynamite', spotifyUrl: 'https://open.spotify.com/search/Dynamite%20BTS', ytId: 'gdZLi9oWNZg' },
        { title: 'Life Goes On', spotifyUrl: 'https://open.spotify.com/search/Life%20Goes%20On%20BTS', ytId: '-5q5mZbe3V8' },
        { title: 'Blue & Grey', spotifyUrl: 'https://open.spotify.com/search/Blue%20%26%20Grey%20BTS', ytId: 'gA2I1y5o_4E' }
      ]
    },
    {
      title: 'Butter (2021)',
      tracks: [
        { title: 'Butter', spotifyUrl: 'https://open.spotify.com/search/Butter%20BTS', ytId: 'WMweEpGlu_U' },
        { title: 'Permission to Dance', spotifyUrl: 'https://open.spotify.com/search/Permission%20to%20Dance%20BTS', ytId: 'CuklIb9d3fI' }
      ]
    },
    {
      title: 'MAP OF THE SOUL : 7 (2020)',
      tracks: [
        { title: 'ON', spotifyUrl: 'https://open.spotify.com/search/ON%20BTS', ytId: 'mPVDGOVjR0U' },
        { title: 'Black Swan', spotifyUrl: 'https://open.spotify.com/search/Black%20Swan%20BTS', ytId: '0lapF4DQPKQ' },
        { title: 'Boy With Luv (feat. Halsey)', spotifyUrl: 'https://open.spotify.com/search/Boy%20With%20Luv%20BTS', ytId: 'XsX3ATc3Cg8' }
      ]
    }
  ];

  // Dynamic User-Editable Pictures & Videos
  const [pictures, setPictures] = useState(() => {
    const saved = localStorage.getItem('bts_hub_pictures');
    return saved ? JSON.parse(saved) : [
      { title: 'BTS Concert Stage', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop' },
      { title: 'ARMY Bomb Ocean', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop' }
    ];
  });

  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('bts_hub_videos');
    return saved ? JSON.parse(saved) : [
      { title: 'Dynamite Official MV', id: 'gdZLi9oWNZg' },
      { title: 'Butter Official MV', id: 'WMweEpGlu_U' },
      { title: 'Boy With Luv Official MV', id: 'XsX3ATc3Cg8' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('bts_hub_pictures', JSON.stringify(pictures));
  }, [pictures]);

  useEffect(() => {
    localStorage.setItem('bts_hub_videos', JSON.stringify(videos));
  }, [videos]);

  // Handle Direct File Upload from Phone/Computer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPictures([
          { title: newPicTitle.trim() || file.name, url: reader.result as string },
          ...pictures
        ]);
        setNewPicTitle('');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Adding New Picture via Link
  const handleAddPicture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPicUrl.trim()) return;
    setPictures([{ title: newPicTitle.trim() || 'BTS Photo', url: newPicUrl.trim() }, ...pictures]);
    setNewPicTitle('');
    setNewPicUrl('');
  };

  // Helper to parse YouTube ID from full links or raw IDs
  const extractYoutubeId = (urlOrId: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlOrId.match(regExp);
    return (match && match[2].length === 11) ? match[2] : urlOrId.trim();
  };

  // Handle Adding New Video
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVidInput.trim()) return;
    const videoId = extractYoutubeId(newVidInput);
    setVideos([{ title: newVidTitle.trim() || 'BTS Video', id: videoId }, ...videos]);
    setNewVidTitle('');
    setNewVidInput('');
  };

  // Saved Favorites State
  const [userFavs, setUserFavs] = useState<string[]>(() => {
    const saved = localStorage.getItem('bts_user_favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bts_user_favs', JSON.stringify(userFavs));
  }, [userFavs]);

  const toggleFavorite = (itemTitle: string) => {
    if (userFavs.includes(itemTitle)) {
      setUserFavs(userFavs.filter(t => t !== itemTitle));
    } else {
      setUserFavs([...userFavs, itemTitle]);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {/* Header Box */}
        <header style={styles.headerCard}>
          <h1 style={styles.mainTitle}>💜 BTS Fan Hub 💜</h1>
          <p style={styles.subTitle}>Bangtan Sonyeondan | ARMY Portal</p>

          {/* Navigation Bar */}
          <nav style={styles.navGrid}>
            {(['members', 'songs', 'pictures', 'videos', 'news', 'favorites'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.navButton,
                  ...(activeTab === tab ? styles.activeNavButton : {})
                }}
              >
                {tab === 'favorites' ? `Favorites (${userFavs.length})` : tab.toUpperCase()}
              </button>
            ))}
          </nav>
        </header>

        {/* Content Box */}
        <main style={styles.contentCard}>
          {/* MEMBERS */}
          {activeTab === 'members' && (
            <div style={styles.gridTwoCols}>
              {members.map((m, idx) => (
                <div key={idx} style={styles.innerCard}>
                  <img 
                    src={m.img} 
                    alt={m.name} 
                    style={styles.memberPhoto} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop';
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={styles.flexBetween}>
                      <h3 style={styles.cardTitle}>{m.name}</h3>
                      <span style={styles.roleBadge}>{m.role}</span>
                    </div>
                    <p style={styles.realName}>{m.realName}</p>
                    <p style={styles.dateText}>🎫 {m.date}</p>
                    <p style={styles.bioBox}>{m.bio}</p>
                    <button
                      onClick={() => toggleFavorite(m.name)}
                      style={{
                        ...styles.actionButton,
                        ...(userFavs.includes(m.name) ? styles.favActiveBtn : styles.favInactiveBtn)
                      }}
                    >
                      {userFavs.includes(m.name) ? '♥ Favorited' : '+ Favorite Member'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SONGS BY ALBUM */}
          {activeTab === 'songs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={styles.sectionHeading}>Discography & Tracklists</h2>
              {albums.map((album, aIdx) => (
                <div key={aIdx} style={styles.innerCard}>
                  <h3 style={styles.albumTitle}>💿 {album.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {album.tracks.map((track, tIdx) => (
                      <div key={tIdx} style={styles.trackRow}>
                        <span style={styles.trackTitle}>🎵 {track.title}</span>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <a href={`https://www.youtube.com/watch?v=${track.ytId}`} target="_blank" rel="noreferrer" style={styles.playMvBtn}>
                            ▶ Watch MV
                          </a>
                          <a href={track.spotifyUrl} target="_blank" rel="noreferrer" style={styles.spotifyBtn}>
                            🎧 Spotify
                          </a>
                          <button
                            onClick={() => toggleFavorite(track.title)}
                            style={{
                              ...styles.smallFavBtn,
                              ...(userFavs.includes(track.title) ? styles.favActiveBtn : styles.favInactiveBtn)
                            }}
                          >
                            {userFavs.includes(track.title) ? '♥ Saved' : '+ Fav'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PICTURES GALLERY + DIRECT FILE UPLOAD */}
          {activeTab === 'pictures' && (
            <div>
              <h2 style={styles.sectionHeading}>Photo Gallery</h2>
              
              <div style={styles.addForm}>
                <h4 style={styles.formTitle}>📷 Add a Photo</h4>
                
                {/* Option A: Direct File Upload from Phone/Computer */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={styles.fileUploadLabel}>
                    📁 Choose Photo from Phone/Device
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                </div>

                <div style={{ textAlign: 'center', color: '#825db0', fontSize: '11px', margin: '8px 0', fontWeight: 'bold' }}>
                  — OR PASTE A DIRECT IMAGE LINK —
                </div>

                {/* Option B: Image URL Link */}
                <form onSubmit={handleAddPicture} style={styles.formGrid}>
                  <input
                    type="text"
                    placeholder="Photo Caption / Title"
                    value={newPicTitle}
                    onChange={(e) => setNewPicTitle(e.target.value)}
                    style={styles.inputField}
                  />
                  <input
                    type="url"
                    placeholder="Direct Image URL (.jpg, .png)"
                    value={newPicUrl}
                    onChange={(e) => setNewPicUrl(e.target.value)}
                    style={styles.inputField}
                  />
                  <button type="submit" style={styles.submitBtn}>
                    + Add Link Photo
                  </button>
                </form>
              </div>

              <div style={styles.gridTwoCols}>
                {pictures.map((pic, idx) => (
                  <div key={idx} style={styles.innerCard}>
                    <img 
                      src={pic.url} 
                      alt={pic.title} 
                      style={styles.galleryImage} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop';
                      }}
                    />
                    <p style={styles.imageCaption}>{pic.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YOUTUBE VIDEOS */}
          {activeTab === 'videos' && (
            <div>
              <h2 style={styles.sectionHeading}>Featured Videos & Music Videos</h2>

              <form onSubmit={handleAddVideo} style={styles.addForm}>
                <h4 style={styles.formTitle}>🎬 Add a YouTube Video</h4>
                <div style={styles.formGrid}>
                  <input
                    type="text"
                    placeholder="Video Title"
                    value={newVidTitle}
                    onChange={(e) => setNewVidTitle(e.target.value)}
                    style={styles.inputField}
                  />
                  <input
                    type="text"
                    placeholder="YouTube Link or Video ID"
                    value={newVidInput}
                    onChange={(e) => setNewVidInput(e.target.value)}
                    required
                    style={styles.inputField}
                  />
                  <button type="submit" style={styles.submitBtn}>
                    + Add Video
                  </button>
                </div>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {videos.map((vid, idx) => (
                  <div key={idx} style={styles.innerCard}>
                    <h3 style={styles.cardTitle}>{vid.title}</h3>
                    <div style={styles.videoContainer}>
                      <iframe
                        src={`https://www.youtube.com/embed/${vid.id}`}
                        title={vid.title}
                        style={styles.iframe}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AUTO-UPDATING LIVE NEWS */}
          {activeTab === 'news' && (
            <div>
              <div style={styles.flexBetween}>
                <h2 style={styles.sectionHeading}>Latest Live Headlines</h2>
                <span style={styles.liveBadge}>Auto-Updated</span>
              </div>
              {loadingNews ? (
                <p style={styles.emptyText}>Loading latest news stories...</p>
              ) : newsList.length === 0 ? (
                <p style={styles.emptyText}>No news available right now.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {newsList.map((item, idx) => (
                    <div key={idx} style={styles.innerCard}>
                      <div style={styles.flexBetween}>
                        <span style={styles.newsSource}>{item.source}</span>
                        <span style={styles.newsDate}>{item.date}</span>
                      </div>
                      <h3 style={styles.newsTitle}>{item.title}</h3>
                      <a href={item.link} target="_blank" rel="noreferrer" style={styles.newsLink}>
                        Read full article →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FAVORITES */}
          {activeTab === 'favorites' && (
            <div>
              <h2 style={styles.sectionHeading}>Your Saved Favorites ({userFavs.length})</h2>
              {userFavs.length === 0 ? (
                <p style={styles.emptyText}>No favorites added yet!</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {userFavs.map((item, idx) => (
                    <div key={idx} style={styles.favRow}>
                      <span style={{ fontWeight: 'bold', color: '#3c2263' }}>💜 {item}</span>
                      <button onClick={() => toggleFavorite(item)} style={styles.removeBtn}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Inline Pure CSS Styles
const styles: { [key: string]: React.CSSProperties } = {
  pageBackground: {
    backgroundColor: '#f3edf7',
    minHeight: '100vh',
    padding: '24px 16px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#2b233d'
  },
  container: {
    maxWidth: '750px',
    margin: '0 auto'
  },
  headerCard: {
    backgroundColor: '#eaddf7',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid #d8c5f2',
    textAlign: 'center',
    marginBottom: '20px'
  },
  mainTitle: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '800',
    color: '#6b3ba7'
  },
  subTitle: {
    margin: '6px 0 0 0',
    fontSize: '13px',
    fontWeight: '600',
    color: '#825db0'
  },
  navGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '20px'
  },
  navButton: {
    backgroundColor: 'rgba(216, 197, 242, 0.6)',
    color: '#5a328f',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '16px',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer'
  },
  activeNavButton: {
    backgroundColor: '#7c43c7',
    color: '#ffffff'
  },
  contentCard: {
    backgroundColor: '#eaddf7',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid #d8c5f2'
  },
  gridTwoCols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px'
  },
  innerCard: {
    backgroundColor: '#f8f4fc',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid #e2d5f3'
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#3c2263'
  },
  roleBadge: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#825db0',
    backgroundColor: '#eedffc',
    padding: '2px 8px',
    borderRadius: '10px'
  },
  realName: {
    margin: '4px 0 0 0',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#4a3a63'
  },
  dateText: {
    margin: '4px 0 0 0',
    fontSize: '11px',
    color: '#715c8c'
  },
  bioBox: {
    backgroundColor: '#eedffc',
    padding: '10px',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#52416c',
    marginTop: '10px',
    lineHeight: '1.4'
  },
  memberPhoto: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '12px'
  },
  actionButton: {
    width: '100%',
    padding: '8px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
    marginTop: '12px'
  },
  favActiveBtn: {
    backgroundColor: '#7c43c7',
    color: '#ffffff'
  },
  favInactiveBtn: {
    backgroundColor: '#e2d5f3',
    color: '#5a328f'
  },
  sectionHeading: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#5a328f'
  },
  addForm: {
    backgroundColor: '#f8f4fc',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid #e2d5f3',
    marginBottom: '20px'
  },
  fileUploadLabel: {
    display: 'block',
    textAlign: 'center',
    backgroundColor: '#7c43c7',
    color: '#ffffff',
    padding: '12px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '13px',
    cursor: 'pointer'
  },
  formTitle: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#3c2263'
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  inputField: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #d8c5f2',
    fontSize: '12px',
    outline: 'none'
  },
  submitBtn: {
    backgroundColor: '#7c43c7',
    color: '#ffffff',
    border: 'none',
    padding: '10px',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer'
  },
  albumTitle: {
    margin: '0 0 12px 0',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#3c2263',
    borderBottom: '1px solid #e2d5f3',
    paddingBottom: '8px'
  },
  trackRow: {
    backgroundColor: '#ffffff',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #ece3f7',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px'
  },
  trackTitle: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#4a3a63'
  },
  playMvBtn: {
    backgroundColor: '#e62b4a',
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  spotifyBtn: {
    backgroundColor: '#1db954',
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  smallFavBtn: {
    padding: '6px 12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  galleryImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '12px'
  },
  imageCaption: {
    margin: '8px 0 0 0',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#3c2263',
    textAlign: 'center'
  },
  videoContainer: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    borderRadius: '12px',
    marginTop: '10px'
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none'
  },
  liveBadge: {
    fontSize: '10px',
    backgroundColor: '#d8c5f2',
    color: '#5a328f',
    padding: '2px 8px',
    borderRadius: '10px',
    fontWeight: 'bold'
  },
  newsTitle: {
    margin: '8px 0 0 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#3c2263'
  },
  newsSource: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#825db0'
  },
  newsDate: {
    fontSize: '10px',
    color: '#825db0'
  },
  newsLink: {
    display: 'inline-block',
    marginTop: '8px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#7c43c7',
    textDecoration: 'none'
  },
  favRow: {
    backgroundColor: '#f8f4fc',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #e2d5f3',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#e62b4a',
    fontWeight: 'bold',
    fontSize: '11px',
    cursor: 'pointer'
  },
  emptyText: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#825db0',
    padding: '24px 0'
  }
};
