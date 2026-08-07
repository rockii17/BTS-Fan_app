import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'members' | 'songs' | 'pictures' | 'videos' | 'news' | 'favorites'>('members');

  // Live News State
  const [newsList, setNewsList] = useState<Array<{ title: string; link: string; date: string; source: string }>>([]);
  const [loadingNews, setLoadingNews] = useState(false);

  // Fetch Live BTS News Automatically
  useEffect(() => {
    const fetchLiveNews = async () => {
      setLoadingNews(true);
      try {
        // Fetching live BTS news via Google News RSS converted to JSON
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

  // Member Data
  const members = [
    { name: 'RM', realName: 'Kim Nam-joon', role: 'Leader', date: 'September 12, 1994', bio: 'Known for his brilliant songwriting, deep philosophical lyrics, and fluent English.' },
    { name: 'Jin', realName: 'Kim Seok-jin', role: 'Sub Vocalist', date: 'December 4, 1992', bio: 'The oldest member, famous for his "Worldwide Handsome" humor and soulful vocals.' },
    { name: 'Suga / Agust D', realName: 'Min Yoon-gi', role: 'Lead Rapper', date: 'March 9, 1993', bio: 'Prolific producer and rapper known for powerful storytelling and distinct beats.' },
    { name: 'J-Hope', realName: 'Jung Ho-seok', role: 'Main Dancer', date: 'February 18, 1994', bio: 'The sunshine of the group, incredible performer, dancer, and energetic rapper.' },
    { name: 'Jimin', realName: 'Park Ji-min', role: 'Main Dancer', date: 'October 13, 1995', bio: 'Renowned for his elegant dance style, expressive high notes, and captivating stage presence.' },
    { name: 'V', realName: 'Kim Tae-hyung', role: 'Lead Dancer', date: 'December 30, 1995', bio: 'Recognized for his deep baritone vocals, soulful solo tracks, and artistic eye.' },
    { name: 'Jungkook', realName: 'Jeon Jung-kook', role: 'Main Vocalist', date: 'September 1, 1997', bio: 'The "Golden Maknae" who excels at singing, dancing, and stage performance.' }
  ];

  // Songs Categorized by Album
  const albums = [
    {
      title: 'BE (2020)',
      cover: 'https://upload.wikimedia.org/wikipedia/en/4/4b/BTS_-_Be_cover.png',
      tracks: [
        { title: 'Dynamite', spotifyUrl: 'https://open.spotify.com/track/4Jy13In41R2I2oR2e', ytId: 'gdZLi9oWNZg' },
        { title: 'Life Goes On', spotifyUrl: 'https://open.spotify.com/track/22L12I34I2oR2e', ytId: '-5q5mZbe3V8' },
        { title: 'Blue & Grey', spotifyUrl: 'https://open.spotify.com/search/Blue%20%26%20Grey%20BTS', ytId: 'gA2I1y5o_4E' }
      ]
    },
    {
      title: 'Butter (2021)',
      cover: 'https://upload.wikimedia.org/wikipedia/en/d/db/BTS_-_Butter.png',
      tracks: [
        { title: 'Butter', spotifyUrl: 'https://open.spotify.com/search/Butter%20BTS', ytId: 'WMweEpGlu_U' },
        { title: 'Permission to Dance', spotifyUrl: 'https://open.spotify.com/search/Permission%20to%20Dance%20BTS', ytId: 'CuklIb9d3fI' }
      ]
    },
    {
      title: 'MAP OF THE SOUL : 7 (2020)',
      cover: 'https://upload.wikimedia.org/wikipedia/en/2/21/BTS_-_Map_of_the_Soul_7.png',
      tracks: [
        { title: 'ON', spotifyUrl: 'https://open.spotify.com/search/ON%20BTS', ytId: 'mPVDGOVjR0U' },
        { title: 'Black Swan', spotifyUrl: 'https://open.spotify.com/search/Black%20Swan%20BTS', ytId: '0lapF4DQPKQ' },
        { title: 'Boy With Luv (feat. Halsey)', spotifyUrl: 'https://open.spotify.com/search/Boy%20With%20Luv%20BTS', ytId: 'XsX3ATc3Cg8' }
      ]
    },
    {
      title: 'LOVE YOURSELF 轉 Tear (2018)',
      cover: 'https://upload.wikimedia.org/wikipedia/en/e/eb/BTS_-_Love_Yourself_Tear.jpg',
      tracks: [
        { title: 'Fake Love', spotifyUrl: 'https://open.spotify.com/search/Fake%20Love%20BTS', ytId: '7C2z4GqqS5E' },
        { title: 'Anpanman', spotifyUrl: 'https://open.spotify.com/search/Anpanman%20BTS', ytId: '4uP1y-G3aV8' }
      ]
    }
  ];

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
    <div className="min-h-screen bg-[#f3edf7] text-[#2b233d] font-sans p-4 md:p-8">
      {/* Header Container */}
      <div className="max-w-3xl mx-auto bg-[#eaddf7] rounded-3xl p-6 shadow-sm mb-6 text-center border border-[#d8c5f2]">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#6b3ba7] flex items-center justify-center gap-2">
          💜 BTS Fan Hub 💜
        </h1>
        <p className="text-xs md:text-sm font-semibold text-[#825db0] mt-1">Bangtan Sonyeondan | ARMY Portal</p>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center gap-2 mt-6">
          {(['members', 'songs', 'pictures', 'videos', 'news', 'favorites'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[#7c43c7] text-white shadow-md'
                  : 'bg-[#d8c5f2]/60 text-[#5a328f] hover:bg-[#d8c5f2]'
              }`}
            >
              {tab === 'favorites' ? `Favorites (${userFavs.length})` : tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto bg-[#eaddf7] rounded-3xl p-6 shadow-sm border border-[#d8c5f2]">
        {/* MEMBERS */}
        {activeTab === 'members' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {members.map((m, idx) => (
              <div key={idx} className="bg-[#f8f4fc] rounded-2xl p-5 border border-[#e2d5f3] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-[#3c2263]">{m.name}</h3>
                    <span className="text-[11px] font-bold text-[#825db0]">{m.role}</span>
                  </div>
                  <p className="text-xs font-bold text-[#4a3a63] mt-1">{m.realName}</p>
                  <p className="text-[11px] text-[#715c8c] mt-0.5">🎫 {m.date}</p>
                  <p className="text-xs text-[#52416c] mt-3 bg-[#eedffc] p-3 rounded-xl leading-relaxed">{m.bio}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(m.name)}
                  className={`mt-3 w-full py-1.5 rounded-xl text-xs font-bold transition ${
                    userFavs.includes(m.name) ? 'bg-[#7c43c7] text-white' : 'bg-[#e2d5f3] text-[#5a328f]'
                  }`}
                >
                  {userFavs.includes(m.name) ? '♥ Favorited' : '+ Favorite Member'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SONGS ORGANIZED BY ALBUM */}
        {activeTab === 'songs' && (
          <div className="space-y-6">
            <h2 className="text-center font-bold text-[#5a328f] text-sm">Discography & Tracklists</h2>
            {albums.map((album, aIdx) => (
              <div key={aIdx} className="bg-[#f8f4fc] rounded-2xl p-4 border border-[#e2d5f3]">
                <h3 className="text-base font-extrabold text-[#3c2263] border-b border-[#e2d5f3] pb-2 mb-3">
                  💿 {album.title}
                </h3>
                <div className="space-y-2">
                  {album.tracks.map((track, tIdx) => (
                    <div key={tIdx} className="bg-white p-3 rounded-xl border border-[#ece3f7] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="text-xs font-bold text-[#4a3a63]">🎵 {track.title}</span>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href={`https://www.youtube.com/watch?v=${track.ytId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-[#e62b4a] hover:bg-[#cc213e] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition"
                        >
                          ▶ Play Video
                        </a>
                        <a
                          href={track.spotifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-[#1db954] hover:bg-[#1aa34a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition"
                        >
                          🎧 Spotify
                        </a>
                        <button
                          onClick={() => toggleFavorite(track.title)}
                          className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition ${
                            userFavs.includes(track.title) ? 'bg-[#7c43c7] text-white' : 'bg-[#e2d5f3] text-[#5a328f]'
                          }`}
                        >
                          {userFavs.includes(track.title) ? '♥' : '+ Fav'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AUTOMATIC LIVE NEWS */}
        {activeTab === 'news' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-[#5a328f] text-sm">Latest Live Feed</h2>
              <span className="text-[10px] bg-[#d8c5f2] text-[#5a328f] px-2 py-0.5 rounded-full font-bold">Auto-Updated</span>
            </div>

            {loadingNews ? (
              <p className="text-center text-xs text-[#825db0] py-8 animate-pulse">Fetching latest BTS news...</p>
            ) : newsList.length === 0 ? (
              <p className="text-center text-xs text-[#825db0] py-8">No live news found right now. Check back shortly!</p>
            ) : (
              newsList.map((item, idx) => (
                <div key={idx} className="bg-[#f8f4fc] p-4 rounded-2xl border border-[#e2d5f3] hover:border-[#cbb3ed] transition">
                  <div className="flex justify-between items-center text-[10px] text-[#825db0] font-bold">
                    <span>{item.source}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#3c2263] mt-1">{item.title}</h3>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-xs font-bold text-[#7c43c7] hover:underline"
                  >
                    Read full story →
                  </a>
                </div>
              ))
            )}
          </div>
        )}

        {/* FAVORITES */}
        {activeTab === 'favorites' && (
          <div>
            <h3 className="text-center font-bold text-[#5a328f] mb-4 text-sm">Saved Items ({userFavs.length})</h3>
            {userFavs.length === 0 ? (
              <p className="text-center text-xs text-[#825db0] py-8">No favorites added yet!</p>
            ) : (
              <div className="space-y-2">
                {userFavs.map((item, idx) => (
                  <div key={idx} className="bg-[#f8f4fc] p-3 rounded-2xl border border-[#e2d5f3] flex justify-between items-center">
                    <span className="text-xs font-bold text-[#3c2263]">💜 {item}</span>
                    <button
                      onClick={() => toggleFavorite(item)}
                      className="text-[11px] font-bold text-[#e62b4a] hover:underline"
                    >
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
  );
}
