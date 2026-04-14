import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type PhotoItem = {
  image: string;
  title: string;
  caption: string;
  photographer: string;
};

const magnumImages: PhotoItem[] = [
  {
    image: 'https://www.magnumphotos.com/wp-content/uploads/2026/01/NYC109511_-340x277.jpg',
    title: 'Arnold Schwarzenegger',
    caption: 'Behind the image — iconic portrait by Thomas Hoepker',
    photographer: 'Thomas Hoepker',
  },
  {
    image: 'https://www.magnumphotos.com/wp-content/uploads/2025/11/Scan008-2-340x227.jpg',
    title: 'AIDS at the Ambassador Hotel',
    caption: "Paul Fusco's poignant portrayal of the AIDS crisis in Los Angeles",
    photographer: 'Paul Fusco',
  },
  {
    image: 'https://www.magnumphotos.com/wp-content/uploads/2025/01/NYC7042_-340x228.jpg',
    title: 'Muhammad Ali, Chicago',
    caption: 'Behind the image — the boxing legend in Chicago',
    photographer: 'Thomas Hoepker',
  },
  {
    image: 'https://www.magnumphotos.com/wp-content/uploads/2026/01/MG1359280_-340x187.jpg',
    title: 'A Certain Nature, After Giverny',
    caption: "Jean Gaumy's visual study of nature's transformations",
    photographer: 'Jean Gaumy',
  },
  {
    image: 'https://www.magnumphotos.com/wp-content/uploads/2025/10/POM2025193G0121-copy-340x453.jpg',
    title: 'Summertime: Margate',
    caption: 'Olivia Arthur — life in Margate during the summer season',
    photographer: 'Olivia Arthur',
  },
  {
    image: 'https://www.magnumphotos.com/wp-content/uploads/2026/01/PAR120141_-340x228.jpg',
    title: 'Gathered Leaves',
    caption: 'Compelling conceptual narratives — Alec Soth at Magnum Gallery',
    photographer: 'Alec Soth',
  },
  {
    image: 'https://www.magnumphotos.com/wp-content/uploads/2024/09/PAR21396_-340x224.jpg',
    title: 'Democracy on the Brink',
    caption: 'Critical reflections on the state of democracy',
    photographer: 'Emin Özmen',
  },
  {
    image: 'https://www.magnumphotos.com/wp-content/uploads/2026/03/LON8632_-340x227.jpg',
    title: 'Martin Parr: In Plain View',
    caption: 'Candid street photography of everyday life at Magnum Gallery',
    photographer: 'Martin Parr',
  },
];

const yanidelImages: PhotoItem[] = [
  {
    image: 'https://yanidel.net/wp-content/uploads/2022/06/Auburn-and-red-girl.jpg',
    title: 'Auburn and Red Girl',
    caption: 'A Paris street encounter in the golden hour',
    photographer: 'Yanidel',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2022/06/untitled-1084731.jpg',
    title: 'Untitled',
    caption: 'Anonymous moment in the city of light',
    photographer: 'Yanidel',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2022/06/2012-22.jpg',
    title: '2012',
    caption: 'A year distilled in silver and shadow',
    photographer: 'Yanidel',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2022/06/Fangio-mom-1024x1024.jpg',
    title: 'Fangio Mom',
    caption: 'Fleeting human geometry on Parisian streets',
    photographer: 'Yanidel',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2022/06/L1163086-1024x1024.jpg',
    title: 'L1163086',
    caption: 'Light and shadow on the boulevards',
    photographer: 'Yanidel',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2022/06/DM9-1136299-1024x1024.jpg',
    title: 'DM9-1136299',
    caption: 'Street geometry of central Paris',
    photographer: 'Yanidel',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2022/06/L1159737-1024x1024.jpg',
    title: 'L1159737',
    caption: 'Captured movement in the 6th arrondissement',
    photographer: 'Yanidel',
  },
  {
    image: 'https://yanidel.net/wp-content/uploads/2022/06/ASL1113564-1024x1024.jpg',
    title: 'ASL1113564',
    caption: 'The decisive moment along the Seine',
    photographer: 'Yanidel',
  },
];

const remindersImages: PhotoItem[] = [
  {
    image: 'https://reminders-project.org/wp-content/uploads/Threshold-Images-in-Flux-940x1253.jpg',
    title: 'Threshold — Images in Flux',
    caption: 'RPS KYOTO PAPEROLES. Apr 18–May 10, 2026.',
    photographer: 'Tamaki Yoshida & Kazuhiko Matsumura',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/01_Tamaki-Yohidsa-@Tamaki-Yoshida-scaled.jpg',
    title: 'Threshold I',
    caption: 'Wildlife as mirror of human presence',
    photographer: 'Tamaki Yoshida',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/02_Tamaki-Yohidsa-@Tamaki-Yoshida-scaled.jpg',
    title: 'Threshold II',
    caption: 'Borderlands between nature and civilization',
    photographer: 'Tamaki Yoshida',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/03_Tamaki-Yohidsa-@Tamaki-Yoshida-scaled.jpg',
    title: 'Threshold III',
    caption: 'Traces that linger between life and death',
    photographer: 'Tamaki Yoshida',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/04_Tamaki-Yohidsa-@Tamaki-Yoshida-scaled.jpg',
    title: 'Threshold IV',
    caption: 'In the in-between of perception and reality',
    photographer: 'Tamaki Yoshida',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/01_Kazuhiko-Matsumura_@Kyoto-Simbun-NewspaperHeartstrings.jpg',
    title: 'Heartstrings I',
    caption: 'Long-term inquiry into dementia and family',
    photographer: 'Kazuhiko Matsumura',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/02_Kazuhiko-Matsumura_@Kyoto-Simbun-NewspaperHeartstrings.jpg',
    title: 'Heartstrings II',
    caption: 'Relationships shaped over time',
    photographer: 'Kazuhiko Matsumura',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/03_Kazuhiko-Matsumura_@Kyoto-Simbun-NewspaperHeartstrings.jpg',
    title: 'Heartstrings III',
    caption: 'Social security, care, and lived memory',
    photographer: 'Kazuhiko Matsumura',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/04_Kazuhiko-Matsumura_@Kyoto-Simbun-NewspaperHeartstrings.jpg',
    title: 'Heartstrings IV',
    caption: 'The history of families and communities',
    photographer: 'Kazuhiko Matsumura',
  },
  {
    image: 'https://reminders-project.org/wp-content/uploads/01a-1-940x627.jpg',
    title: 'The Weeping Fig',
    caption: "Artist book by Katelyn-Jane Dunn. Now available for order.",
    photographer: 'Katelyn-Jane Dunn',
  },
];

const philpenmanImages: PhotoItem[] = [
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/1c/1cb2a97ecc464caa9a741a4b65dfcc93/240813_atlantic_city_034.jpg',
    title: 'Atlantic City 034',
    caption: 'August 2024. Atlantic City.',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/exhibitions/images/feature_panels/1775/200711_atlantic_city_126.jpg',
    title: 'Atlantic City 126',
    caption: 'July 2020. Atlantic City.',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/exhibitions/images/feature_panels/1775/240813_atlantic_city_106.jpg',
    title: 'Atlantic City 106',
    caption: 'August 2024. Atlantic City.',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/exhibitions/images/feature_panels/1775/200730__atlantic_city_nj_184.jpg',
    title: 'Atlantic City NJ 184',
    caption: 'July 2020. Atlantic City, New Jersey.',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/1c/1cf08287e9b14ca4b87d93bb9f10129c/200711_atlantic_city_129.jpg',
    title: 'Atlantic City 129',
    caption: 'July 2020. Atlantic City.',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/96/968dd982c4f0470598e3a823d132af6d/240813_atlantic_city_121.jpg',
    title: 'Atlantic City 121',
    caption: 'August 2024. Atlantic City.',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/e6/e61c2187c3144b96940ee3f63ade3317/250712_atlantic_city_012.jpg',
    title: 'Atlantic City 012',
    caption: 'July 2025. Atlantic City.',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/0d/0dba2a477065477bbbb0bbeb0b08f68c/250712_atlantic_city_133.jpg',
    title: 'Atlantic City 133',
    caption: 'July 2025. Atlantic City.',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/1a/1a78bdb45c574c0cb2bc379d7005f592/200711_atlantic_city_032.jpg',
    title: 'Atlantic City 032',
    caption: 'July 2020. Atlantic City.',
    photographer: 'Phil Penman',
  },
  {
    image: 'https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/c6/c62de1f627e748b0bec33d64cbf4b2a7/230805_atlantic_city_049.jpg',
    title: 'Atlantic City 049',
    caption: 'August 2023. Atlantic City.',
    photographer: 'Phil Penman',
  },
];

const visualKeywords = [
  'chiaroscuro', 'grain', 'geometric shadow', 'decisive moment', 'available light',
  'tonal contrast', 'negative space', 'threshold', 'human presence',
  'documentary', 'reportage', 'street narrative', 'silver gelatin', 'urban solitude',
];

const photographerCredits = [
  { name: 'Thomas Hoepker', note: 'Magnum Photos' },
  { name: 'Paul Fusco', note: 'Magnum Photos' },
  { name: 'Jean Gaumy', note: 'Magnum Photos' },
  { name: 'Olivia Arthur', note: 'Magnum Photos' },
  { name: 'Alec Soth', note: 'Magnum Photos' },
  { name: 'Emin Özmen', note: 'Magnum Photos' },
  { name: 'Martin Parr', note: 'Magnum Photos' },
  { name: 'Yannick Lebreton', note: 'Yanidel — Paris Street Photography' },
  { name: 'Tamaki Yoshida', note: 'Reminders Photography Stronghold · RPS Kyoto Paperoles' },
  { name: 'Kazuhiko Matsumura', note: 'Kyoto Shimbun · World Press Photo' },
  { name: 'Phil Penman', note: 'Atlantic City Street Scenes' },
];

const BWEditorialCards: React.FC = () => {
  const [lightbox, setLightbox] = React.useState<{ src: string; title: string; photographer: string } | null>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div id="bw-photo" className="bg-black min-h-screen font-serif text-white" style={{ fontFamily: 'Pretendard, system-ui, -apple-system, sans-serif' }}>

      {/* Hero */}
      <header className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://static-assets.artlogic.net/w_2400,c_limit,f_auto,fl_lossy,q_auto/ws-philpenman/usr/images/feature_panels/image/items/1c/1cb2a97ecc464caa9a741a4b65dfcc93/240813_atlantic_city_034.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
          alt="Editorial Hero"
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-zinc-400 tracking-[0.5em] uppercase text-sm mb-6">Editorial</p>
          <h1 className="text-white text-7xl md:text-[10rem] font-serif italic leading-none mb-4">
            Threshold
          </h1>
          <p className="text-zinc-300 text-lg tracking-[0.2em] uppercase">Photography Review</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24">

        {/* Editorial Note */}
        <section className="mb-32 max-w-2xl mx-auto text-center border-t border-b border-zinc-700 py-16">
          <p className="text-2xl font-light leading-relaxed text-zinc-300 italic">
            "Between chiaroscuro and grain, four photographic visions converge — Magnum's documentary
            legacy, Yanidel's Parisian geometry, the intimate inquiry of Reminders Photography
            Stronghold, and Phil Penman's Atlantic City chronicles. Each image refuses to resolve.
            Monochrome is not an absence of color; it is an abundance of shadow."
          </p>
        </section>

        <div className="space-y-40">

          {/* Magnum Photos — Full-bleed staggered grid */}
          <section>
            <h3 className="text-4xl font-serif mb-2 text-white">Magnum Photos</h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">Classic Street &amp; Documentary</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {magnumImages.map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden group aspect-[3/4] cursor-zoom-in"
                  onClick={() => setLightbox({ src: item.image, title: item.title, photographer: item.photographer })}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="grayscale w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-serif">{item.title}</p>
                    <p className="text-zinc-400 text-xs mt-1">{item.caption}</p>
                    <p className="text-zinc-500 text-xs mt-1 tracking-widest uppercase">{item.photographer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Yanidel — Large feature */}
          <section>
            <h3 className="text-4xl font-serif mb-2 text-white">Yanidel</h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">Paris Street Photography · Yannick Lebreton</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {yanidelImages.map((item, i) => (
                <div
                  key={i}
                  className="cursor-zoom-in group"
                  onClick={() => setLightbox({ src: item.image, title: item.title, photographer: item.photographer })}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="grayscale w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-white font-serif text-xl">{item.title}</p>
                    <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reminders Photography Stronghold — Masonry */}
          <section>
            <h3 className="text-4xl font-serif mb-2 text-white">Reminders Photography Stronghold</h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">Asian Documentary · Photobook Culture · RPS Kyoto Paperoles</p>
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
                  <p className="text-zinc-400 text-xs mt-2 tracking-wider uppercase">{item.title}</p>
                  <p className="text-zinc-600 text-xs mt-1">{item.photographer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Phil Penman — Full-bleed staggered grid */}
          <section>
            <h3 className="text-4xl font-serif mb-2 text-white">Phil Penman</h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">Atlantic City Street Scenes</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {philpenmanImages.map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden group aspect-[3/4] cursor-zoom-in"
                  onClick={() => setLightbox({ src: item.image, title: item.title, photographer: item.photographer })}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="grayscale w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-serif">{item.title}</p>
                    <p className="text-zinc-400 text-xs mt-1">{item.caption}</p>
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
              {visualKeywords.map((kw, i) => (
                <Badge key={i} variant="outline" className="text-zinc-400 border-zinc-700 bg-transparent px-3 py-1 text-xs tracking-widest uppercase h-auto rounded-none">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-serif mb-8 text-zinc-400 tracking-widest uppercase">Photographers</h4>
            <ul className="space-y-3 text-zinc-300 font-light">
              {photographerCredits.map((p, i) => (
                <li key={i}>
                  <span className="text-white font-serif">{p.name}</span>
                  <span className="text-zinc-600 text-sm ml-2">— {p.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </main>

      <footer className="text-center py-12 text-zinc-600 text-xs tracking-widest uppercase border-t border-zinc-900">
        Generated 2026-04-10 · B&amp;W Editorial Intelligence
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-8 text-zinc-400 hover:text-white hover:bg-white/10 w-10 h-10 text-2xl"
            onClick={() => setLightbox(null)}
          >×</Button>
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
