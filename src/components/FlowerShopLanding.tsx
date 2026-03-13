// FlowerShopLanding.tsx
// MediaPipe Hands + 꽃 피어나는 플라워샵 랜딩페이지
import React, { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    Hands: any;
    Camera: any;
  }
}

// ─── Flower configs ────────────────────────────────────────────
interface FlowerConfig {
  id: number;
  x: number;   // vw
  y: number;   // vh
  size: number;
  delay: number;    // 0-1, opens after this global openness threshold
  petals: number;
  color: string;
  inner: string;
  rotate: number;   // initial rotation offset (deg)
}

const FLOWERS: FlowerConfig[] = [
  { id: 0, x: 6,  y: 12, size: 140, delay: 0,    petals: 8, color: '#FFB7C5', inner: '#FF8FAB', rotate: 22  },
  { id: 1, x: 91, y: 10, size: 115, delay: 0.04, petals: 6, color: '#D8B4FE', inner: '#A855F7', rotate: 0   },
  { id: 2, x: 3,  y: 72, size: 105, delay: 0.08, petals: 7, color: '#FDE68A', inner: '#F59E0B', rotate: 15  },
  { id: 3, x: 94, y: 68, size: 125, delay: 0.12, petals: 8, color: '#6EE7B7', inner: '#10B981', rotate: 45  },
  { id: 4, x: 47, y: 2,  size: 95,  delay: 0.16, petals: 5, color: '#FCA5A5', inner: '#EF4444', rotate: 36  },
  { id: 5, x: 15, y: 47, size: 78,  delay: 0.06, petals: 6, color: '#93C5FD', inner: '#3B82F6', rotate: 60  },
  { id: 6, x: 81, y: 44, size: 82,  delay: 0.10, petals: 7, color: '#FDBA74', inner: '#F97316', rotate: 26  },
  { id: 7, x: 32, y: 91, size: 98,  delay: 0.18, petals: 8, color: '#C4B5FD', inner: '#8B5CF6', rotate: 10  },
  { id: 8, x: 66, y: 88, size: 108, delay: 0.22, petals: 6, color: '#FDA4AF', inner: '#F43F5E', rotate: 54  },
  { id: 9, x: 51, y: 56, size: 62,  delay: 0.26, petals: 5, color: '#FEF08A', inner: '#EAB308', rotate: 18  },
  { id: 10, x: 24, y: 25, size: 68, delay: 0.14, petals: 6, color: '#A5F3FC', inner: '#06B6D4', rotate: 40  },
  { id: 11, x: 74, y: 22, size: 72, delay: 0.20, petals: 7, color: '#BBF7D0', inner: '#22C55E', rotate: 70  },
];

// ─── Single Flower SVG ────────────────────────────────────────
const Flower: React.FC<{ cfg: FlowerConfig; globalO: number }> = ({ cfg, globalO }) => {
  const { x, y, size, delay, petals, color, inner, rotate } = cfg;

  // Delayed openness: this flower starts opening when globalO reaches delay
  const raw = delay >= 1 ? globalO : Math.max(0, (globalO - delay) / (1 - delay));
  const o = Math.min(1, raw);

  const petalLen = 40 * o;
  const petalW   = 15 * o;

  const glowColor = color + '99';

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}vw`,
        top:  `${y}vh`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.12 + o * 0.88,
        transition: 'opacity 0.4s ease-out',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="-55 -55 110 110"
        style={{
          filter: o > 0.05
            ? `drop-shadow(0 0 ${Math.round(o * 16)}px ${glowColor})`
            : 'none',
          overflow: 'visible',
        }}
      >
        {/* Outer petals */}
        {Array.from({ length: petals }, (_, i) => {
          const angle = rotate + (i / petals) * 360;
          return (
            <g key={`op-${i}`} transform={`rotate(${angle})`}>
              <ellipse
                cx="0"
                cy={-(petalLen * 0.6)}
                rx={petalW}
                ry={petalLen}
                fill={color}
                opacity={0.92}
              />
            </g>
          );
        })}
        {/* Inner petals (offset by half-step) */}
        {Array.from({ length: petals }, (_, i) => {
          const angle = rotate + (i / petals) * 360 + 180 / petals;
          const iLen = petalLen * 0.6;
          const iW   = petalW  * 0.65;
          return (
            <g key={`ip-${i}`} transform={`rotate(${angle})`}>
              <ellipse
                cx="0"
                cy={-(iLen * 0.6)}
                rx={iW}
                ry={iLen}
                fill={inner}
                opacity={0.85}
              />
            </g>
          );
        })}
        {/* Bud (always visible, scales with o) */}
        <circle r={9 * Math.max(0.25, o)}  fill="#FBBF24" />
        <circle r={5 * Math.max(0.15, o)}  fill="#F59E0B" />
        {/* Pollen dots */}
        {o > 0.55 &&
          Array.from({ length: 6 }, (_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <circle
                key={`pol-${i}`}
                cx={Math.cos(a) * 5.5}
                cy={Math.sin(a) * 5.5}
                r={1.8}
                fill="#92400E"
                opacity={o * 0.9}
              />
            );
          })}
      </svg>
    </div>
  );
};

// ─── Falling petals (appear when blooming) ───────────────────
const PETAL_POOL = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 5.3 + 3) % 95,
  top:  (i * 7.7 + 8) % 85,
  rot:  i * 37,
  scale: 0.6 + (i % 5) * 0.18,
  color: ['#FFB7C5', '#D8B4FE', '#FDE68A', '#6EE7B7', '#FCA5A5'][i % 5],
}));

const FallingPetals: React.FC<{ openness: number }> = ({ openness }) => {
  if (openness < 0.2) return null;
  const count = Math.round(openness * 20);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
      {PETAL_POOL.slice(0, count).map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}vw`,
            top:  `${p.top}vh`,
            width: '7px',
            height: '11px',
            background: p.color,
            borderRadius: '50% 50% 50% 0',
            opacity: openness * 0.55,
            transform: `rotate(${p.rot}deg) scale(${p.scale})`,
            transition: 'opacity 0.5s',
          }}
        />
      ))}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────
const FlowerShopLanding: React.FC = () => {
  const isMobile = window.innerWidth <= 768;
  const bgVideoSrc = isMobile
    ? 'http://a14u.nrt1.vultrobjects.com/videos/flower_2.mp4'
    : 'http://a14u.nrt1.vultrobjects.com/videos/Flower.mp4';

  const videoRef   = useRef<HTMLVideoElement>(null);  // webcam
  const canvasRef  = useRef<HTMLCanvasElement>(null); // hand skeleton
  const bgVideoRef = useRef<HTMLVideoElement>(null);  // Flower.mp4 background
  const sectionRef      = useRef<HTMLDivElement>(null);
  const targetRef       = useRef(0);
  const rafRef          = useRef<number | undefined>(undefined);
  const handDetectedRef = useRef(false);

  const [openness,     setOpenness]     = useState(0);
  const [handDetected, setHandDetected] = useState(false);
  const [camStatus,    setCamStatus]    = useState<'loading' | 'ready' | 'error'>('loading');

  // ── Smooth lerp loop + playbackRate control ──
  useEffect(() => {
    let cur = 0;
    const tick = () => {
      cur += (targetRef.current - cur) * 0.08;
      setOpenness(Math.round(cur * 1000) / 1000);

      const vid = bgVideoRef.current;
      if (vid) {
        if (handDetectedRef.current && cur > 0.08) {
          // 손 펼침 정도 → 재생 속도 (0.1x ~ 2x)
          vid.playbackRate = Math.max(0.1, cur * 2);
          if (vid.paused) vid.play().catch(() => {});
        } else {
          if (!vid.paused) vid.pause();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Finger openness calculation ──
  const calcOpenness = useCallback((lms: any[]): number => {
    const fingers = [
      { tip: 8,  mcp: 5  },  // Index
      { tip: 12, mcp: 9  },  // Middle
      { tip: 16, mcp: 13 },  // Ring
      { tip: 20, mcp: 17 },  // Pinky
    ];
    let sum = 0;
    for (const f of fingers) {
      const diff = lms[f.mcp].y - lms[f.tip].y; // positive = extended
      sum += Math.max(0, Math.min(1, diff * 3.5));
    }
    return sum / 4;
  }, []);

  // ── Draw hand skeleton on canvas ──
  const drawSkeleton = useCallback((results: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!results.multiHandLandmarks?.length) return;

    const lms = results.multiHandLandmarks[0];
    const W = canvas.width, H = canvas.height;

    const CONNECTIONS = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [5,9],[9,10],[10,11],[11,12],
      [9,13],[13,14],[14,15],[15,16],
      [13,17],[17,18],[18,19],[19,20],
      [0,17],
    ];

    ctx.strokeStyle = 'rgba(255, 180, 210, 0.85)';
    ctx.lineWidth = 1.5;
    for (const [a, b] of CONNECTIONS) {
      ctx.beginPath();
      ctx.moveTo(lms[a].x * W, lms[a].y * H);
      ctx.lineTo(lms[b].x * W, lms[b].y * H);
      ctx.stroke();
    }
    for (const lm of lms) {
      ctx.fillStyle = 'rgba(255, 230, 240, 0.95)';
      ctx.beginPath();
      ctx.arc(lm.x * W, lm.y * H, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  // ── MediaPipe init ──
  useEffect(() => {
    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src;
        s.crossOrigin = 'anonymous';
        s.onload  = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });

    let alive = true;

    const init = async () => {
      try {
        const CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe';
        await loadScript(`${CDN}/hands/hands.js`);
        await loadScript(`${CDN}/camera_utils/camera_utils.js`);

        if (!alive) return;

        const hands = new window.Hands({
          locateFile: (f: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`,
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((res: any) => {
          if (!alive) return;
          drawSkeleton(res);
          if (res.multiHandLandmarks?.length) {
            handDetectedRef.current = true;
            setHandDetected(true);
            targetRef.current = calcOpenness(res.multiHandLandmarks[0]);
          } else {
            handDetectedRef.current = false;
            setHandDetected(false);
            targetRef.current = 0;
          }
        });

        if (videoRef.current) {
          const camera = new window.Camera(videoRef.current, {
            onFrame: async () => {
              if (videoRef.current && alive) {
                await hands.send({ image: videoRef.current });
              }
            },
            width: 160,
            height: 120,
          });
          await camera.start();
          if (alive) setCamStatus('ready');
        }
      } catch (err) {
        console.error('[FlowerShop] MediaPipe init error:', err);
        if (alive) setCamStatus('error');
      }
    };

    init();
    return () => { alive = false; };
  }, [calcOpenness, drawSkeleton]);

  // ── Derived values ──
  const titleR = Math.round(210 + openness * 45);
  const titleG = Math.round(190 + openness * 40);
  const titleB = Math.round(180 + openness * 60);
  const divW   = 60 + openness * 220;
  const glowA  = openness * 0.6;

  const statusText = (() => {
    if (camStatus === 'loading') return '카메라 초기화 중...';
    if (camStatus === 'error')   return '카메라 없이도 즐길 수 있어요 🌸';
    if (!handDetected)           return '손을 카메라에 보여주세요 ✋';
    if (openness < 0.25)         return '손가락을 펼쳐보세요...';
    if (openness < 0.6)          return '조금만 더 펼쳐요 🌱';
    if (openness < 0.85)         return '거의 다 피었어요 🌷';
    return '꽃이 활짝 피었어요 🌸';
  })();

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      {/* ── Background video (Flower.mp4) — scrubbed by hand openness ── */}
      <video
        ref={bgVideoRef}
        src={bgVideoSrc}
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Thin dark overlay for text readability ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'rgba(0,0,0,0.12)' }} />

      {/* ── Flowers ── */}
      {FLOWERS.map(cfg => (
        <Flower key={cfg.id} cfg={cfg} globalO={openness} />
      ))}

      {/* ── Falling petals ── */}
      <FallingPetals openness={openness} />

      {/* ── Hero text ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '0 24px',
          userSelect: 'none',
        }}
      >
        {/* Brand name */}
        <div
          style={{
            fontSize: 'clamp(52px, 11vw, 130px)',
            fontWeight: '300',
            letterSpacing: '0.35em',
            color: `rgb(${titleR}, ${titleG}, ${titleB})`,
            textShadow: glowA > 0.05
              ? `0 0 ${Math.round(glowA * 50)}px rgba(255, 182, 193, ${glowA})`
              : 'none',
            transition: 'color 0.5s ease-out, text-shadow 0.5s ease-out',
            lineHeight: 1,
            marginBottom: '6px',
          }}
        >
          FLORA
        </div>

        {/* Tagline KO */}
        <div
          style={{
            fontSize: 'clamp(13px, 2.2vw, 20px)',
            letterSpacing: '0.25em',
            color: `rgba(175, 200, 175, ${0.45 + openness * 0.55})`,
            fontWeight: '300',
            marginBottom: '6px',
            transition: 'color 0.5s',
          }}
        >
          꽃의 언어로 전하는 마음
        </div>

        {/* Tagline EN */}
        <div
          style={{
            fontSize: 'clamp(10px, 1.5vw, 14px)',
            letterSpacing: '0.3em',
            color: `rgba(150, 170, 150, ${0.3 + openness * 0.5})`,
            fontStyle: 'italic',
            fontWeight: '300',
            marginBottom: '0px',
            transition: 'color 0.5s',
          }}
        >
          where every bloom tells a story
        </div>

        {/* Divider */}
        <div
          style={{
            width: `${divW}px`,
            maxWidth: '80vw',
            height: '1px',
            background: `rgba(${titleR}, ${Math.round(160 + openness * 40)}, ${Math.round(170 + openness * 50)}, ${0.25 + openness * 0.75})`,
            margin: '28px auto',
            transition: 'all 0.5s ease-out',
          }}
        />

        {/* Hint */}
        <div
          style={{
            fontSize: 'clamp(11px, 1.8vw, 16px)',
            letterSpacing: '0.15em',
            color: `rgba(160, 190, 160, ${0.5 + openness * 0.4})`,
            fontStyle: 'italic',
            marginBottom: '44px',
            transition: 'color 0.5s',
          }}
        >
          손을 펼쳐 꽃을 피워보세요
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['SHOP', 'GALLERY', 'ABOUT', 'CONTACT'].map(label => (
            <button
              key={label}
              style={{
                background: 'none',
                border: `1px solid rgba(200, 180, 185, ${0.2 + openness * 0.5})`,
                color:  `rgba(220, 205, 210, ${0.6 + openness * 0.4})`,
                padding: '10px 26px',
                fontSize: '11px',
                letterSpacing: '0.22em',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                transition: 'all 0.35s ease-out',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,183,197,0.12)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,183,197,0.7)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'none';
                (e.currentTarget as HTMLElement).style.borderColor =
                  `rgba(200, 180, 185, ${0.2 + openness * 0.5})`;
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Video placeholder note */}
        <div
          style={{
            marginTop: '48px',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: `rgba(140, 160, 140, ${0.25 + openness * 0.35})`,
            fontStyle: 'italic',
            transition: 'color 0.5s',
          }}
        >
          {/* 동영상 자리: 제공되면 여기에 표시됩니다 */}
          ✦ &nbsp; seasonal collection 2026 &nbsp; ✦
        </div>
      </div>

      {/* ── Camera Panel (bottom-right) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
        }}
      >
        {/* Status pill */}
        <div
          style={{
            fontSize: '12px',
            letterSpacing: '0.07em',
            color: 'rgba(210, 230, 210, 0.9)',
            padding: '5px 14px',
            background: 'rgba(0,0,0,0.45)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            whiteSpace: 'nowrap',
          }}
        >
          {statusText}
        </div>

        {/* Video frame */}
        <div
          style={{
            position: 'relative',
            width: '160px',
            height: '120px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: `1px solid rgba(255, 183, 197, ${0.15 + openness * 0.65})`,
            boxShadow: `0 0 ${Math.round(8 + openness * 24)}px rgba(255, 150, 180, ${openness * 0.35})`,
            transition: 'border-color 0.3s, box-shadow 0.3s',
            background: '#0d1a0f',
          }}
        >
          <video
            ref={videoRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)',
              display: 'block',
            }}
            autoPlay
            muted
            playsInline
          />
          <canvas
            ref={canvasRef}
            width={160}
            height={120}
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'scaleX(-1)',
            }}
          />
        </div>

        {/* Openness progress bar */}
        <div
          style={{
            width: '160px',
            height: '3px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${openness * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FFB7C5, #FDE68A)',
              borderRadius: '2px',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '24px',
          zIndex: 20,
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'rgba(130, 160, 130, 0.45)',
        }}
      >
        FLORA © 2026 &nbsp;·&nbsp; Powered by MediaPipe Hands
      </div>
    </div>
  );
};

export default FlowerShopLanding;
