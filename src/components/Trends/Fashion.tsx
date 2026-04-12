import React from 'react';

type LightboxState = { src: string; title: string; publication: string } | null;

const vogueItems = [
  {
    title: "Shanghai Fashion Week: Sophisticated Silhouettes and Girlish Fun",
    summary: "Shanghai Fashion Week presents a striking duality this season — elegant, architectural silhouettes sit alongside playful, girlish details. Collections reflect a generation that refuses to choose between grown-up polish and childlike joy.",
    image: "https://assets.vogue.com/photos/69cec3de5bb6827f1fe17b49/4:3/w_1600,c_limit/trend%20report%20copy.jpg",
    keywords: ["Shanghai", "silhouettes", "girlish fun"],
  },
  {
    title: "The Most Intriguing Menswear Trends From the Fall 2026 Women's Shows",
    summary: "Menswear DNA runs through fall 2026's most compelling women's looks — sharp suiting, boxy outerwear, and classic tailoring reworked with a distinctly feminine point of view. It's power dressing, reimagined.",
    image: "https://assets.vogue.com/photos/69bbf86b5a80ab68fa84324a/4:3/w_1600,c_limit/IMG_1068.jpeg",
    keywords: ["menswear", "tailoring", "power dressing"],
  },
  {
    title: "Kooky Pearls to Fuzzy Purses: Fall 2026 Accessory Trends",
    summary: "Accessories this season are anything but understated — oversized pearls, fuzzy handbags, and whimsical hardware make bold personal statements. Designers are treating the accessory as the main character, not the afterthought.",
    image: "https://assets.vogue.com/photos/69bbf3f1da1109fe43cf2e04/4:3/w_1600,c_limit/Collage_alex.jpg",
    keywords: ["accessories", "pearls", "fuzzy purse"],
  },
  {
    title: "The 11 Trends That Define Fall 2026",
    summary: "From unexpected textures to heritage-inspired prints, fall 2026's defining trends blend functional design with high fashion. Versatility and intentional layering headline a season focused on expressive, wearable dressing.",
    image: "https://assets.vogue.com/photos/69bab76174816d46060b337f/4:3/w_1600,c_limit/FallTrendReport26_Laird.jpg",
    keywords: ["fall 2026", "layering", "heritage prints"],
  },
  {
    title: "Weatherproofed & Accessorized: Copenhagen Fall 2026",
    summary: "Copenhagen's designers prove that practicality and style are not mutually exclusive. Weather-resistant fabrics meet carefully curated accessories in a season where transitional dressing reaches its most refined expression.",
    image: "https://assets.vogue.com/photos/69851d87e133930032e386db/4:3/w_1600,c_limit/CPHFW%20F26_Laird.jpg",
    keywords: ["Copenhagen", "weatherproof", "transitional"],
  },
];

const elleItems = [
  {
    title: "We All Went Crazy for Labubus",
    summary: "Labubus swept the fashion world in 2025, evolving from bag charms into faux-fur companions that celebrities like Lisa and Dua Lipa carried everywhere. The craze marked a full-throated embrace of whimsy and nostalgia at the highest levels of fashion.",
    image: "https://hips.hearstapps.com/hmg-prod/images/guest-wears-a-loose-fitting-deep-burgundy-button-up-shirt-news-photo-1767024613.pjpeg?crop=0.536xw:1.00xh;0.201xw,0&resize=980:*",
    keywords: ["Labubu", "whimsy", "nostalgia"],
  },
  {
    title: "Accessories Got Bigger, Better, and Bolder",
    summary: "2025 was the year minimalism finally lost the accessory war. Chunky jewelry, oversized bags, and architectural hardware became the medium through which fashion communicated personality, attitude, and point of view.",
    image: "https://hips.hearstapps.com/hmg-prod/images/model-walks-the-runway-during-the-vaquera-womenswear-fall-news-photo-1767027095.pjpeg?resize=980:*",
    keywords: ["bold accessories", "chunky jewelry", "self-expression"],
  },
  {
    title: "Silk Scarves Got Their Big Moment",
    summary: "The silk scarf found new life when styled around the waist rather than the neck, transforming a classic accessory into a statement belt. Alexa Chung and Lola Tung were among those leading this effortlessly elevated revival.",
    image: "https://hips.hearstapps.com/hmg-prod/images/alexa-chung-in-london-on-may-01-2025-in-london-england-news-photo-1767025774.pjpeg?resize=980:*",
    keywords: ["silk scarves", "waist styling", "revival"],
  },
  {
    title: "Feet Were Front and Center",
    summary: "Footwear emerged as 2025's most competitive fashion battleground — funky sneakers, embellished flip-flops, and architectural heels competed for attention. The message was clear: your shoes should never be an afterthought.",
    image: "https://hips.hearstapps.com/hmg-prod/images/model-walks-the-runway-during-the-balenciaga-ready-to-wear-news-photo-1767031190.pjpeg?crop=1.00xw:0.834xh;0,0.166xh&resize=980:*",
    keywords: ["footwear", "statement shoes", "sneakerina"],
  },
  {
    title: "The Return of the Yuppie",
    summary: "Preppy aesthetics got a luxury makeover in 2025, with designers channeling classic yuppie silhouettes through the lens of contemporary excess. Blazers, loafers, and heritage fabrics were reborn as aspirational statement pieces.",
    image: "https://hips.hearstapps.com/hmg-prod/images/lina-zhang-walks-the-runway-during-the-celine-womenswear-news-photo-1767030568.pjpeg?resize=980:*",
    keywords: ["yuppie", "preppy", "luxury"],
  },
  {
    title: "Colorblocking Was All the Rage",
    summary: "Bold, saturated colorblocking made a triumphant return, pulling inspiration from '80s maximalism. Designers at Saint Laurent and beyond embraced clashing hues with confidence, signaling a definitive departure from the quiet luxury era.",
    image: "https://hips.hearstapps.com/hmg-prod/images/model-walks-the-runway-during-the-saint-laurent-womenswear-news-photo-1767030636.pjpeg?resize=980:*",
    keywords: ["colorblocking", "vibrant", "80s maximalism"],
  },
  {
    title: "Slogan T-Shirts Had Something to Say",
    summary: "Graphic tees transformed into vehicles for social commentary and cultural identity in 2025. From runway shows to street style, slogan shirts became the season's most politically charged — and commercially irresistible — trend.",
    image: "https://hips.hearstapps.com/hmg-prod/images/pedro-pascal-attends-the-thunderbolts-uk-special-screening-news-photo-1767030664.pjpeg?resize=980:*",
    keywords: ["slogan tees", "graphic", "cultural identity"],
  },
];

const cosmoItems = [
  {
    title: "Exaggerated Polka Dots",
    summary: "Classic polka dots were transformed into surreal, cartoonish oversized patterns in technicolor this fall. The maximalist take on a timeless print injected pure joy into transitional dressing.",
    image: "https://hips.hearstapps.com/hmg-prod/images/cosmo-wt-look-009-010-02-bw-4x6-68a7226310898.jpg?resize=2048:*",
    keywords: ["polka dots", "surreal", "technicolor"],
  },
  {
    title: "Shrunken Leather Jackets",
    summary: "The leather jacket got a cropped, fitted rethink this season — shrunken silhouettes that add edge to any outfit without overwhelming it. A timeless piece reimagined for a more precise, intentional wardrobe.",
    image: "https://hips.hearstapps.com/hmg-prod/images/cosmo-wt-look-013-68a633dc7a0bf.jpg?resize=980:*",
    keywords: ["leather jackets", "shrunken", "cropped"],
  },
  {
    title: "Faux Fur Everywhere",
    summary: "Faux fur escaped the coat rack and colonized the entire wardrobe — stoles, bra tops, bags, and trim details all got the plush treatment. Texture-forward dressing reached its most decadent expression.",
    image: "https://hips.hearstapps.com/hmg-prod/images/cosmo-wt-look-003-02-68a631984bcc9.jpg?resize=980:*",
    keywords: ["faux fur", "texture", "plush"],
  },
  {
    title: "Delightfully Chaotic Pattern Mixing",
    summary: "Plaids, stripes, and florals collide in one glorious look, proving that fashion's rules are made to be broken. Editors embraced the chaos, celebrating the art of creative, fearless clashing.",
    image: "https://hips.hearstapps.com/hmg-prod/images/cosmo-wt-look-011-012-01-4x6-68a721cf7a3a9.jpg?resize=2048:*",
    keywords: ["pattern mixing", "plaids", "florals"],
  },
  {
    title: "Maximalist Statement Jewelry",
    summary: "Delicate jewelry gave way to bold architectural cuffs, oversized hoops, and stacked charm necklaces. This fall, jewelry is not an accent — it is the outfit's entire personality.",
    image: "https://hips.hearstapps.com/hmg-prod/images/dsc-6550-68a63c14a6a2b.jpg?resize=980:*",
    keywords: ["statement jewelry", "architectural", "maximalist"],
  },
  {
    title: "Pre-Scuffed & Personalized Bags",
    summary: "The most coveted bags of the season look like they've lived a full life — pre-scuffed leather, faux fur patches, and bold patterns make each piece feel singular and storied. Perfection is out; personality is in.",
    image: "https://hips.hearstapps.com/hmg-prod/images/cosmo-wt-look-002-68a630aac48af.jpg?resize=980:*",
    keywords: ["pre-scuffed", "bags", "personality"],
  },
];

const trendKeywords = [
  { label: "Bold Accessories", desc: "Oversized pearls, chunky jewelry, fuzzy purses — accessories are the story this season." },
  { label: "Pattern Mixing", desc: "Plaids, stripes, polka dots and florals collide in chaotic, joyful harmony." },
  { label: "Maximalism", desc: "More is more — from fringe earrings to oversized silhouettes and architectural jewelry." },
  { label: "Colorblocking", desc: "'80s-inspired vibrant color combinations signal a definitive farewell to quiet luxury." },
  { label: "Statement Footwear", desc: "Feet are the focal point — quirky, architectural, and unapologetically bold." },
  { label: "Silk Scarves", desc: "The classic accessory reinvented — worn around the waist, not the neck." },
  { label: "Faux Fur", desc: "Texture reigns in coats, stoles, bra tops, and bag details." },
  { label: "Shrunken Silhouettes", desc: "Cropped and fitted — the new proportion that anchors fall's most precise looks." },
];

const stylingTips = [
  "Let one maximalist piece — oversized pearls or a fuzzy purse — anchor an otherwise clean outfit.",
  "Start pattern mixing with two prints that share a color; build from there with confidence.",
  "Invest in statement footwear this fall: one bold shoe elevates even the simplest look.",
  "Layer luxurious textures intentionally — faux fur stole over a slip dress for evening.",
  "Try a silk scarf tied at the waist instead of the neck for an effortless 2025 update.",
  "Balance colorblocking by keeping one color dominant and using the second as a vibrant accent.",
];

const FashionTrendCards: React.FC = () => {
  const [lightbox, setLightbox] = React.useState<LightboxState>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div id="fashion" className="bg-white min-h-screen font-sans text-slate-900">
      {/* Hero Section */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/cos110125-collections-15-68b714c1be582.jpg?crop=1.00xw:0.747xh;0,0&resize=1200:*"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Fashion Hero"
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-white text-xs tracking-[0.5em] uppercase opacity-60 mb-4">2025 — 2026</p>
          <h1 className="text-white text-6xl md:text-9xl font-serif italic mb-4">Trend Report</h1>
          <p className="text-white text-xl tracking-[0.3em] uppercase opacity-80">Fashion Intelligence</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* Executive Summary */}
        <section className="mb-32 text-center max-w-3xl mx-auto">
          <p className="text-3xl font-light leading-relaxed italic text-slate-700">
            "From Shanghai's girlish sophistication to street-level slogan tees, the season is defined by bold accessories, maximalist pattern play, and a fashion world that has fully embraced exuberant self-expression over quiet restraint."
          </p>
        </section>

        <div className="space-y-40">
          {/* Vogue Section */}
          <section>
            <h3 className="text-5xl font-serif mb-2 border-b pb-4">💎 Vogue Insights</h3>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">Fall 2026 · Runway Intelligence</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vogueItems.map((item, i) => (
                <div
                  key={i}
                  className="group cursor-zoom-in overflow-hidden rounded-xl bg-slate-50 hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setLightbox({ src: item.image, title: item.title, publication: 'Vogue' })}
                >
                  <div className="overflow-hidden h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-lg mb-2 leading-snug">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.map((kw, j) => (
                        <span key={j} className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Elle Section */}
          <section>
            <h3 className="text-5xl font-serif mb-2 border-b pb-4">👗 Elle Edit</h3>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">2025's Biggest Trends · Year in Review</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {elleItems.map((item, i) => (
                <div
                  key={i}
                  className="group cursor-zoom-in flex gap-5 items-start hover:bg-slate-50 p-4 rounded-xl transition-colors duration-200"
                  onClick={() => setLightbox({ src: item.image, title: item.title, publication: 'Elle' })}
                >
                  <div className="overflow-hidden rounded-lg flex-shrink-0 w-36 h-36">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2 leading-snug">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.map((kw, j) => (
                        <span key={j} className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cosmopolitan Section */}
          <section>
            <h3 className="text-5xl font-serif mb-2 border-b pb-4">🌟 Cosmopolitan Style</h3>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">Fall 2025 Trend Report · Editor Picks</p>
            <div className="columns-1 md:columns-3 gap-6 space-y-6">
              {cosmoItems.map((item, i) => (
                <div
                  key={i}
                  className="group cursor-zoom-in break-inside-avoid overflow-hidden rounded-xl bg-slate-50 hover:shadow-xl transition-shadow duration-300 mb-6"
                  onClick={() => setLightbox({ src: item.image, title: item.title, publication: 'Cosmopolitan' })}
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-lg mb-2 leading-snug">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.map((kw, j) => (
                        <span key={j} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Intelligence & Styling */}
        <section className="mt-40 grid md:grid-cols-2 gap-20 bg-slate-50 p-12 rounded-3xl">
          <div>
            <h4 className="text-2xl font-serif mb-8 underline underline-offset-4">Trend Keywords</h4>
            <div className="space-y-4">
              {trendKeywords.map((kw, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-slate-900 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">{kw.label}</span>
                    <span className="text-slate-500 text-sm"> — {kw.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 text-white p-10 rounded-2xl">
            <h4 className="text-2xl font-serif mb-8 text-blue-400">Styling Advice</h4>
            <ul className="space-y-6 font-light">
              {stylingTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-blue-400 font-serif text-lg leading-none mt-0.5">0{i + 1}</span>
                  <span className="text-slate-300 text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-400 text-xs tracking-widest uppercase">
          <p>Fashion Intelligence Report · Generated 2026-04-09</p>
          <p className="mt-1">Sources: Vogue · Elle · Cosmopolitan</p>
        </footer>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-slate-400 hover:text-white text-4xl leading-none transition-colors"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.title}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="mt-6 text-center">
            <p className="text-white font-serif text-lg">{lightbox.title}</p>
            <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase">{lightbox.publication}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionTrendCards;
