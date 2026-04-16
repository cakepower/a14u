import React from 'react';

type LightboxState = { src: string; title: string; publication: string } | null;

// ── Vogue: Fall 2026 ──────────────────────────────────────────────────────────
const vogueItems = [
  {
    title: "Shanghai Fashion Week: Sophisticated Silhouettes & Girlish Fun",
    summary: "Elegant architectural silhouettes sit alongside playful girlish details — a generation that refuses to choose between grown-up polish and childlike joy.",
    image: "https://assets.vogue.com/photos/69cec3de5bb6827f1fe17b49/4:3/w_1600,c_limit/trend%20report%20copy.jpg",
    keywords: ["Shanghai", "silhouettes", "girlish fun"],
  },
  {
    title: "Menswear Influences on the Fall 2026 Women's Shows",
    summary: "Menswear DNA runs through fall 2026's most compelling women's looks — sharp suiting, boxy outerwear, and classic tailoring reworked with a distinctly feminine point of view.",
    image: "https://assets.vogue.com/photos/69bbf86b5a80ab68fa84324a/4:3/w_1600,c_limit/IMG_1068.jpeg",
    keywords: ["menswear", "tailoring", "power dressing"],
  },
  {
    title: "Kooky Pearls to Fuzzy Purses: Fall 2026 Accessory Trends",
    summary: "Accessories go maximalist: quirky pearl reinterpretations share the spotlight with tactile fuzzy purses, both adding unexpected texture and personality to any look.",
    image: "https://assets.vogue.com/photos/69bbf3f1da1109fe43cf2e04/4:3/w_1600,c_limit/Collage_alex.jpg",
    keywords: ["accessories", "pearls", "fuzzy purses"],
  },
  {
    title: "The 11 Trends That Define Fall 2026",
    summary: "From deconstructed tailoring to opulent evening wear, these eleven standout looks set the definitive tone for what falls on the runway — and into your wardrobe.",
    image: "https://assets.vogue.com/photos/69bab76174816d46060b337f/4:3/w_1600,c_limit/FallTrendReport26_Laird.jpg",
    keywords: ["fall 2026", "runway", "style report"],
  },
  {
    title: "Weatherproofed & Accessorized: Copenhagen Fall 2026",
    summary: "Copenhagen's designers prove style and practicality are not mutually exclusive — layered textures, technical fabrics, and clever accessories weather any storm beautifully.",
    image: "https://assets.vogue.com/photos/69851d87e133930032e386db/4:3/w_1600,c_limit/CPHFW%20F26_Laird.jpg",
    keywords: ["Copenhagen", "weatherproof", "layering"],
  },
  {
    title: "Pre-Fall 2026: All the Trends That Matter",
    summary: "Pre-fall charts the bridge between seasons — here, relaxed tailoring, rich earth tones, and versatile day-to-evening pieces deliver wardrobe building blocks for the months ahead.",
    image: "https://assets.vogue.com/photos/6967e0ff399e8c77ea0de930/4:3/w_1600,c_limit/PreFall2026%20Trend%20Report.jpg",
    keywords: ["pre-fall", "transitional", "earth tones"],
  },
];

// ── Elle: Spring 2026 ─────────────────────────────────────────────────────────
const elleItems = [
  {
    title: "Boudoir — The Art of Slinky Sensuality",
    summary: "Lingerie-inspired looks featuring slinky satin, lace, and slip dresses take center stage. Wiederhoeft, The Attico, and Tom Ford lead this sensual yet fashion-forward category.",
    image: "https://hips.hearstapps.com/hmg-prod/images/wiederhoeft-po-s26-037-1-68fbb0b9adb94.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["boudoir", "satin", "lace", "slip dress"],
  },
  {
    title: "Primary Colors: Red, Blue & Yellow Rule",
    summary: "Fire engine red, cobalt blue, and sunshine yellow reign supreme on the runways. Loewe and Jil Sander showcase the power of pure, unapologetic hues.",
    image: "https://hips.hearstapps.com/hmg-prod/images/loewe-s26-019-690a6327275f6.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["primary colors", "cobalt", "bold hues"],
  },
  {
    title: "Trench Coats Reimagined for 2026",
    summary: "The perennial trench coat evolves with fresh silhouettes and unexpected materials — designers infuse classic styles with vibrant colors and modern details for standout outerwear.",
    image: "https://hips.hearstapps.com/hmg-prod/images/bottega-veneta-s26-035-68fbb1e5606c7.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["trench coat", "outerwear", "silhouette"],
  },
  {
    title: "American Sportswear — Preppy Retro Returns",
    summary: "Collegiate stripes, vibrant colors, and an iconic preppy aesthetic reminiscent of '80s sportswear are back. Miu Miu and Lacoste spearhead this retro-meets-modern movement.",
    image: "https://hips.hearstapps.com/hmg-prod/images/rabanne-s26-016-68fbb2659fe9c.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["sportswear", "preppy", "collegiate", "retro"],
  },
  {
    title: "Structured Suiting Goes Sculptural",
    summary: "Suits take on an artful dimension — unexpected construction and sculptural silhouettes transform traditional tailoring into wearable architecture that demands a second look.",
    image: "https://hips.hearstapps.com/hmg-prod/images/mcqueen-po-s26-004-68fbb2a3b5e59.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["suiting", "sculptural", "tailored"],
  },
  {
    title: "Flowy Fabrics — Movement & Elegance",
    summary: "Soft draped fabrics provide movement and comfort, promoting versatility and effortless elegance across both casual and formal wear this season.",
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1771437838-akrisskirt-6995fef5918c6.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["draped", "flowy", "movement", "elegance"],
  },
];

// ── Cosmopolitan: Spring/Summer 2026 ─────────────────────────────────────────
const cosmoItems = [
  {
    title: "Electric Klein Blue — The Color of the Season",
    summary: "A vibrant, almost confrontational blue that makes a strong statement across every runway. When paired with sheer fabrics, it creates an eye-catching transparency with a powerful twist.",
    image: "https://hips.hearstapps.com/hmg-prod/images/e1186bc3-f35d-45ef-81a5-d84557b17a4c.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["Klein blue", "statement color", "sheer"],
  },
  {
    title: "Playful Silhouettes — Theatrical Fashion",
    summary: "Silhouettes embrace theatricality with domestic fantasy elements: ruffled sleeves and tea-length skirts styled for humor rather than convention.",
    image: "https://hips.hearstapps.com/hmg-prod/images/8a5ca25b-d142-46f0-931b-9e59fa0d3fd0.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["theatrical", "ruffles", "playful"],
  },
  {
    title: "Cropped Trench Coats — The CBK Effect",
    summary: "The traditional trench gets cropped, nodding to the iconic Carolyn Bessette-Kennedy with a quirky, modern twist that works for spring layering.",
    image: "https://hips.hearstapps.com/hmg-prod/images/cad30e83-27e4-40f6-b4bb-335966768c0a.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["cropped trench", "spring", "iconic"],
  },
  {
    title: "Marching Band Jackets — Embellished & Bold",
    summary: "Highly embellished jackets featuring gold frogging and structured shoulders make a surprisingly chic statement for the warmer months ahead.",
    image: "https://hips.hearstapps.com/hmg-prod/images/465ef0c1-2a42-4b83-813b-c6c3dab390f5.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["embellished", "gold frogging", "statement jacket"],
  },
  {
    title: "Loud Jewelry — Oversized & Sentimental",
    summary: "Spring's jewelry moment belongs to oversized, bold pieces with a personal touch — from layered lockets to playful designs that carry emotional weight.",
    image: "https://hips.hearstapps.com/hmg-prod/images/4db29eef-af58-44de-9511-c80ca58d55a5.jpg?crop=1xw:0.965xh;0xw,0.035xh&resize=980:*",
    keywords: ["bold jewelry", "layered", "sentimental"],
  },
  {
    title: "Exaggerated Bags — Fringe, Beading & Drama",
    summary: "Bags take center stage with fringe, beading, and unusual shapes that prioritize pure artistry over function — designed to be admired from across the room.",
    image: "https://hips.hearstapps.com/hmg-prod/images/749c0a12-a321-4c55-9a61-820b5eb52d95.jpg?crop=1xw:1xh;center,top&resize=980:*",
    keywords: ["exaggerated bags", "fringe", "beading"],
  },
];

const trendKeywords = [
  { label: "Klein Blue & Primary Colors", desc: "Cobalt, fire-engine red, and sunshine yellow dominate across all three publications." },
  { label: "Trench Coat Evolution", desc: "From cropped to reimagined — the trench coat is this season's most versatile canvas." },
  { label: "Boudoir & Slinky Sensuality", desc: "Satin, lace, and slip silhouettes blur the line between lingerie and ready-to-wear." },
  { label: "Theatrical Silhouettes", desc: "Sculptural suiting, ruffles, and marching band embellishments push fashion into art." },
  { label: "Statement Accessories", desc: "Bold jewelry, exaggerated bags, and quirky pearls complete every look with personality." },
  { label: "Sportswear Nostalgia", desc: "Collegiate prep and '80s American sportswear reimagined for a new generation." },
];

const stylingTips = [
  "Ground an electric Klein blue piece with neutral separates — let one item own the room.",
  "Layer a boudoir slip dress under a structured blazer for day-to-evening versatility.",
  "A cropped trench over tailored trousers references the Carolyn Bessette-Kennedy formula without the effort.",
  "Mix sportswear stripes with sculptural bags — clashing codes is this season's quiet flex.",
  "One piece of loud jewelry is enough. Stack lockets, skip everything else.",
  "Embrace theatricality: if a silhouette makes you smile, it's probably on trend.",
];

// ── Component ─────────────────────────────────────────────────────────────────
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
    <div className="bg-white min-h-screen font-sans text-slate-900">

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://assets.vogue.com/photos/69bab76174816d46060b337f/4:3/w_1600,c_limit/FallTrendReport26_Laird.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Fashion Hero — Fall 2026"
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-white text-xs tracking-[0.5em] uppercase opacity-60 mb-4">Vogue · Elle · Cosmopolitan</p>
          <h1 className="text-white text-6xl md:text-9xl font-serif italic mb-4">Spring · Fall</h1>
          <p className="text-white text-xl tracking-[0.3em] uppercase opacity-80">2026 Trend Intelligence Report</p>
          <p className="text-white text-sm tracking-widest opacity-50 mt-3">Updated 2026-04-16</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24">

        {/* Executive Summary */}
        <section className="mb-32 text-center max-w-3xl mx-auto">
          <p className="text-3xl font-light leading-relaxed italic text-slate-700">
            "Bold theatricality meets sensual confidence — boudoir-inspired silhouettes, electric Klein blue, and sculptural sportswear signal a season that demands to be seen."
          </p>
        </section>

        <div className="space-y-40">

          {/* ── Vogue ── */}
          <section>
            <div className="flex items-baseline gap-4 mb-12 border-b border-slate-200 pb-4">
              <h3 className="text-5xl font-serif">💎 Vogue</h3>
              <span className="text-slate-400 text-sm tracking-widest uppercase">Fall 2026</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vogueItems.map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl bg-slate-50 cursor-zoom-in shadow-sm hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setLightbox({ src: item.image, title: item.title, publication: 'Vogue' })}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-lg leading-snug mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{item.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.map((kw) => (
                        <span key={kw} className="bg-slate-900 text-white text-xs px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Elle ── */}
          <section>
            <div className="flex items-baseline gap-4 mb-12 border-b border-slate-200 pb-4">
              <h3 className="text-5xl font-serif">👗 Elle</h3>
              <span className="text-slate-400 text-sm tracking-widest uppercase">Spring 2026</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {elleItems.map((item, i) => (
                <div
                  key={item.title}
                  className={`group flex gap-5 cursor-zoom-in ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  onClick={() => setLightbox({ src: item.image, title: item.title, publication: 'Elle' })}
                >
                  <div className="w-44 h-52 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-slate-400 tracking-widest uppercase mb-1">Elle Edit</p>
                    <h4 className="font-serif text-xl leading-snug mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{item.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.map((kw) => (
                        <span key={kw} className="border border-slate-300 text-slate-600 text-xs px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Cosmopolitan ── */}
          <section>
            <div className="flex items-baseline gap-4 mb-12 border-b border-slate-200 pb-4">
              <h3 className="text-5xl font-serif">🌟 Cosmopolitan</h3>
              <span className="text-slate-400 text-sm tracking-widest uppercase">Spring / Summer 2026</span>
            </div>
            <div className="columns-1 md:columns-3 gap-6 space-y-6">
              {cosmoItems.map((item) => (
                <div
                  key={item.title}
                  className="group break-inside-avoid overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-zoom-in"
                  onClick={() => setLightbox({ src: item.image, title: item.title, publication: 'Cosmopolitan' })}
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h4 className="font-serif text-base leading-snug mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed mb-2">{item.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.map((kw) => (
                        <span key={kw} className="bg-pink-50 text-pink-700 text-xs px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Intelligence & Styling */}
        <section className="mt-40 grid md:grid-cols-2 gap-12 bg-slate-50 p-12 rounded-3xl">
          <div>
            <h4 className="text-2xl font-serif mb-8 underline underline-offset-4">Cross-Publication Trend Keywords</h4>
            <div className="space-y-4">
              {trendKeywords.map((kw) => (
                <div key={kw.label} className="flex gap-3 items-start">
                  <span className="mt-1 w-2 h-2 rounded-full bg-slate-900 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{kw.label}</p>
                    <p className="text-slate-500 text-sm">{kw.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 text-white p-10 rounded-2xl">
            <h4 className="text-2xl font-serif mb-8 text-blue-400">Styling Advice</h4>
            <ul className="space-y-5 font-light text-sm leading-relaxed">
              {stylingTips.map((tip, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-blue-400 font-mono font-bold flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-center text-slate-400 text-xs tracking-widest uppercase">
          <p>Sources: Vogue · Elle · Cosmopolitan — Scraped 2026-04-16</p>
          <p className="mt-1">Auto-updated every Tuesday 07:00 KST</p>
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
