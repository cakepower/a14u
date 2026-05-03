import React from 'react';
import { Camera, Eye, Globe, Aperture } from 'lucide-react';

type PhotoItem = {
  image: string;
  title: string;
  caption: string;
  photographer: string;
};

const magnumImages: PhotoItem[] = [
  {
    image: 'https://content.magnumphotos.com/wp-content/uploads/2021/03/cortex/nyc42419-scaled-1280x997.jpg',
    title: 'James Dean, New York City',
    caption: 'New York, 1955',
    photographer: 'Dennis Stock',
  },
  {
    image: 'https://content.magnumphotos.com/wp-content/uploads/2021/03/cortex/nyc42421-1280x1637.jpg',
    title: 'James Dean, Times Square',
    caption: 'New York, 1955',
    photographer: 'Dennis Stock',
  },
  {
    image: 'https://content.magnumphotos.com/wp-content/uploads/2021/03/NYC41744-scaled-1280x1808.jpg',
    title: 'James Dean, Manhattan Rain',
    caption: 'New York, 1955',
    photographer: 'Dennis Stock',
  },
  {
    image: 'https://content.magnumphotos.com/wp-content/uploads/2021/03/cortex/nyc43702-scaled-1280x1869.jpg',
    title: 'James Dean, Portrait Study',
    caption: 'New York, 1955',
    photographer: 'Dennis Stock',
  },
  {
    image: 'https://content.magnumphotos.com/wp-content/uploads/2017/09/cortex/par30351-teaser-story-big.jpg',
    title: 'Mexico City, 1934',
    caption: 'Mexico City, 1934',
    photographer: 'Henri Cartier-Bresson',
  },
  {
    image: 'https://content.magnumphotos.com/wp-content/uploads/2017/09/cortex/par74491-teaser-story-big.jpg',
    title: 'Oaxaca Market, Mexico',
    caption: 'Oaxaca, 1963',
    photographer: 'Henri Cartier-Bresson',
  },
  {
    image: 'https://content.magnumphotos.com/wp-content/uploads/2017/09/cortex/par74847-teaser-xxl.jpg',
    title: 'Mexico — Decisive Moment',
    caption: 'Mexico, 1963',
    photographer: 'Henri Cartier-Bresson',
  },
  {
    image: 'https://content.magnumphotos.com/wp-content/uploads/2017/09/cortex/par30358-teaser-story-big.jpg',
    title: 'Mexico City Street Life',
    caption: 'Mexico City, 1934',
    photographer: 'Henri Cartier-Bresson',
  },
];

const yanidelImages: PhotoItem[] = [
  {
    image: 'https://yanidel.net/wp-content/uploads/2024/01/L1170095-2.jpg',
    title: 'Argentina — World Cup',
    caption: '2022 World Cup Celebrations',
    photographer: 'Yannick Lebreton',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2023/08/a-first-date-at-the-pizzeria.jpg',
    title: 'First Date at the Pizzeria',
    caption: 'Paris Street, 2023',
    photographer: 'Yannick Lebreton',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2023/07/M1233849b.jpg',
    title: 'Tales of Superheroes',
    caption: 'Buenos Aires, 2023',
    photographer: 'Yannick Lebreton',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2023/06/M1232982.jpg',
    title: 'The Desired Loneliness of Fishermen',
    caption: 'Argentina, 2023',
    photographer: 'Yannick Lebreton',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2023/05/M1232417.jpg',
    title: 'Phenix Girl',
    caption: 'Buenos Aires, 2023',
    photographer: 'Yannick Lebreton',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2022/06/Auburn-and-red-girl.jpg',
    title: 'Auburn Street Portrait',
    caption: 'Paris, 2022',
    photographer: 'Yannick Lebreton',
  },
];

const remindersImages: PhotoItem[] = [
  {
    image: 'https://reminders-project.org/wp-content/uploads/D3A1638-2-940x1175.jpg',
    title: 'Kherson: On Nights of Falling Missiles',
    caption: 'Ko Sasaki · Exhibition 2025',
    photographer: 'Ko Sasaki',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/Threshold-Images-in-Flux-940x1253.jpg',
    title: 'Threshold — Images in Flux',
    caption: 'Tamaki Yoshida & Kazuhiko Matsumura · RPS Kyoto',
    photographer: 'Tamaki Yoshida',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/17-11-940x1410.jpg',
    title: 'The Weeping Fig',
    caption: 'Katelyn-Jane Dunn · Open Studio',
    photographer: 'Katelyn-Jane Dunn',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/3-25-940x668.jpg',
    title: "The End's Approach",
    caption: 'Manami Uetake · RPS 2025',
    photographer: 'Manami Uetake',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/671826958_18097062278023777_627636589639553798_n-940x1253.jpg',
    title: 'Conditions of the Image',
    caption: 'Seeing and Understanding · Talk Series 2026',
    photographer: 'Reminders Project',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/01a-1-940x627.jpg',
    title: 'The Weeping Fig',
    caption: 'Artist Book Launch · Katelyn-Jane Dunn',
    photographer: 'Katelyn-Jane Dunn',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/A4_omote_RPS2026_OL2-940x1330.jpg',
    title: 'Photobook as Object 2026',
    caption: 'Showcase · Jan Rosseel & Yumi Goto',
    photographer: 'Various',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/%E8%A1%A8%E7%B4%99jpg-940x627.jpg',
    title: 'JONOKUCHI',
    caption: 'Tamaki Yoshida Artist Book',
    photographer: 'Tamaki Yoshida',
  },
];

const philpenmanImages: PhotoItem[] = [
  {
    image: 'https://static-assets.artlogic.net/w_4000,h_2500,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/65/65b0ec28aa1f4a3491e6dada50947395/220611_for_ig__046.jpg',
    title: 'September 11 — The Scene',
    caption: 'World Trade Center, 2001',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_4000,h_2500,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/cf/cf041e6dfe9f44159d77210e6227e78d/220611_for_ig__034.jpg',
    title: 'Running Firemen',
    caption: 'September 11, 2001 · New York',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_4000,h_2500,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/0c/0cad501927434e7dbd3f91dd46b3993a/220611_for_ig__054.jpg',
    title: 'After the Towers',
    caption: 'September 11, 2001 · Lower Manhattan',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/cd/cd09a3f5a465425da48c98c4533c1048/201117_nyc_street_scenes_71.jpg',
    title: 'NYC Street Scene',
    caption: 'New York City, November 2020',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/13/13e88f543ce14f4198fd3aa90677c4e2/200324_nyc_midtown_corona_virus_19.jpg',
    title: 'Empty Midtown',
    caption: 'New York Pandemic, March 24, 2020',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/b3/b37a3235432d4fe596f7b6d33d0acf01/210418_nyc_street_series_073.jpg',
    title: 'Spring Street Series',
    caption: 'New York City, April 2021',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/11/117bad30e26b4ccbb1960e3c706a8dc5/170114_team_sky_camp_019.jpg',
    title: 'Team Sky Training Camp',
    caption: 'Mallorca, January 2017',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/e2/e211869fde464b16868be71546472ab1/210207_coney_island_snowstorm_069.jpg',
    title: 'Coney Island Snowstorm',
    caption: 'Brooklyn, February 2021',
    photographer: 'Phil Penman',
  },
];

const BWEditorialCards: React.FC = () => {
  const [lightbox, setLightbox] = React.useState<{ src: string; title: string; photographer: string } | null>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      className="bg-black min-h-screen font-serif text-white w-full max-w-full"
      style={{ overflowX: 'clip' }}
    >

      {/* Hero */}
      <header className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://content.magnumphotos.com/wp-content/uploads/2017/09/cortex/par30351-teaser-story-big.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
          alt="Editorial Hero — Henri Cartier-Bresson, Mexico City 1934"
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-zinc-400 tracking-[0.5em] uppercase text-sm mb-6">Editorial · 2026-05-01</p>
          <h1 className="text-white text-4xl sm:text-7xl md:text-[10rem] font-serif italic leading-none mb-4">
            The Street &amp; The Sublime
          </h1>
          <p className="text-zinc-300 text-lg tracking-[0.2em] uppercase">Photography Review</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-24">

        {/* Editorial Note */}
        <section className="mb-32 max-w-2xl mx-auto text-center border-t border-b border-zinc-700 py-16">
          <p className="text-xl sm:text-2xl font-light leading-relaxed text-zinc-300 italic">
            "From Cartier-Bresson's decisive moment in Mexico to Dennis Stock's James Dean in rain-soaked New York — these photographs share an instinct for the threshold between public and private, between seeing and being seen."
          </p>
        </section>

        <div className="space-y-40">

          {/* Magnum Photos — Staggered 4-col grid */}
          <section>
            <h3 className="text-2xl sm:text-4xl font-serif mb-2 text-white flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                <Camera className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
              </span>
              Magnum Photos
            </h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">
              Dennis Stock · Henri Cartier-Bresson — Classic Street
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {magnumImages.map((item, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden group cursor-zoom-in ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}
                  onClick={() => setLightbox({ src: item.image, title: item.title, photographer: item.photographer })}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="grayscale w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-serif leading-snug">{item.title}</p>
                    <p className="text-zinc-400 text-[10px] mt-0.5">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Yanidel — Large 2-col feature */}
          <section>
            <h3 className="text-2xl sm:text-4xl font-serif mb-2 text-white flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                <Eye className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
              </span>
              Yanidel
            </h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">
              Paris Street Photography · Yannick Lebreton
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {yanidelImages.map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden cursor-zoom-in group"
                  onClick={() => setLightbox({ src: item.image, title: item.title, photographer: item.photographer })}
                >
                  <div className={`overflow-hidden ${i === 0 ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="grayscale w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-white font-serif text-base leading-snug">{item.title}</p>
                    <p className="text-zinc-500 text-xs mt-1 tracking-wide">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reminders Photography Stronghold — Masonry */}
          <section>
            <h3 className="text-2xl sm:text-4xl font-serif mb-2 text-white flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                <Globe className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
              </span>
              Reminders Photography Stronghold
            </h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">
              Asian Documentary · Kyoto &amp; Beyond
            </p>
            <div className="columns-1 md:columns-3 gap-4 space-y-4">
              {remindersImages.map((item, i) => (
                <div
                  key={i}
                  className="break-inside-avoid mb-4 cursor-zoom-in group"
                  onClick={() => setLightbox({ src: item.image, title: item.title, photographer: item.photographer })}
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="grayscale w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-zinc-400 text-xs mt-2 tracking-wider uppercase leading-snug">{item.title}</p>
                  <p className="text-zinc-600 text-[10px] mt-0.5">{item.caption}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Phil Penman — Staggered 4-col grid */}
          <section>
            <h3 className="text-2xl sm:text-4xl font-serif mb-2 text-white flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                <Aperture className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
              </span>
              Phil Penman
            </h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">
              NYC Street Scenes · Features Edition
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {philpenmanImages.map((item, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden group cursor-zoom-in ${i % 5 === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[3/4]'}`}
                  onClick={() => setLightbox({ src: item.image, title: item.title, photographer: item.photographer })}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="grayscale w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-serif leading-snug">{item.title}</p>
                    <p className="text-zinc-400 text-[10px] mt-0.5">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Visual Keywords & Photographer Credits */}
        <section className="mt-40 grid md:grid-cols-2 gap-16 border-t border-zinc-800 pt-20">
          <div>
            <h4 className="text-xl font-serif mb-8 text-zinc-400 tracking-widest uppercase">Visual Language</h4>
            <div className="flex flex-wrap gap-3">
              {['chiaroscuro', 'grain texture', 'decisive moment', 'negative space', 'urban solitude', 'stark contrast', 'documentary realism', 'geometric shadow', 'flash photography', 'night street'].map((kw) => (
                <span
                  key={kw}
                  className="text-zinc-300 text-xs tracking-widest uppercase border border-zinc-700 px-3 py-1.5"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-serif mb-8 text-zinc-400 tracking-widest uppercase">Photographers</h4>
            <ul className="space-y-3 text-zinc-300 font-light">
              {[
                { name: 'Dennis Stock', note: 'Magnum Photos — James Dean, New York 1955' },
                { name: 'Henri Cartier-Bresson', note: 'Magnum Photos — Mexico City, 1934–1963' },
                { name: 'Yannick Lebreton', note: 'Yanidel — Paris & Buenos Aires' },
                { name: 'Ko Sasaki', note: 'Reminders — Kherson Documentary, 2025' },
                { name: 'Tamaki Yoshida', note: 'Reminders — JONOKUCHI, 2026' },
                { name: 'Phil Penman', note: 'Features — NYC Street & September 11' },
              ].map((p) => (
                <li key={p.name} className="flex flex-col">
                  <span className="text-white font-serif">{p.name}</span>
                  <span className="text-zinc-600 text-xs tracking-wide mt-0.5">{p.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </main>

      <footer className="text-center py-12 text-zinc-600 text-xs tracking-widest uppercase border-t border-zinc-900">
        Generated 2026-05-01 · B&amp;W Editorial Intelligence
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-zinc-400 hover:text-white text-3xl leading-none"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.title}
            className="grayscale max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="mt-6 text-center">
            <p className="text-white font-serif text-lg">{lightbox.title}</p>
            <p className="text-zinc-500 text-xs mt-1 tracking-widest uppercase">{lightbox.photographer}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default BWEditorialCards;
