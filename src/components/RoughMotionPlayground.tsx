import React, { useEffect, useRef } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import { motion } from "framer-motion";

type RoughMotionPlaygroundProps = {
  isMobile: boolean;
};

const palette = ["#38bdf8", "#22d3ee", "#f59e0b", "#f43f5e", "#a78bfa", "#34d399"];

function drawScene(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const rc = new RoughCanvas(canvas);

  for (let i = 0; i < 18; i += 1) {
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    const w = 30 + Math.random() * 130;
    const h = 30 + Math.random() * 120;
    const color = palette[i % palette.length];

    if (i % 3 === 0) {
      rc.rectangle(x, y, w, h, {
        stroke: color,
        strokeWidth: 1.4,
        roughness: 1.8,
        bowing: 1.5,
      });
    } else if (i % 3 === 1) {
      rc.ellipse(x, y, w, h, {
        stroke: color,
        strokeWidth: 1.3,
        roughness: 2,
        fill: `${color}33`,
        fillStyle: "hachure",
      });
    } else {
      rc.linearPath(
        [
          [x, y],
          [x + w * 0.6, y + h * 0.2],
          [x + w, y + h],
          [x + w * 0.25, y + h * 0.85],
        ],
        {
          stroke: color,
          strokeWidth: 1.5,
          roughness: 2.2,
        },
      );
    }
  }
}

export default function RoughMotionPlayground({ isMobile }: RoughMotionPlaygroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawScene(canvas);
    const redrawInterval = window.setInterval(() => drawScene(canvas), 2600);

    const onResize = () => drawScene(canvas);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearInterval(redrawInterval);
    };
  }, []);

  return (
    <section
      style={{
        width: "min(1100px, 92vw)",
        margin: isMobile ? "24px auto 40px" : "34px auto 56px",
        padding: isMobile ? "18px" : "28px",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 20,
        background: "linear-gradient(140deg, rgba(15,23,42,.88), rgba(2,6,23,.96))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.canvas
        ref={canvasRef}
        animate={{
          x: [0, 6, -6, 0],
          y: [0, -4, 5, 0],
          rotate: [0, 0.35, -0.35, 0],
          opacity: [0.58, 0.75, 0.62, 0.75],
        }}
        transition={{
          duration: 11,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.45 }}
          style={{
            fontSize: isMobile ? 24 : 36,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 12,
            fontFamily: "var(--font-display)",
          }}
        >
          Rough Motion Playground
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.48 }}
          viewport={{ once: true, amount: 0.45 }}
          style={{
            maxWidth: 650,
            color: "rgba(255,255,255,0.82)",
            marginBottom: 18,
            fontSize: isMobile ? 14 : 16,
          }}
        >
          roughjs로 손그림 레이어를 만들고 framer-motion으로 카드가 떠오르는 인터랙션을 연결했습니다.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {["Sketch Orbit", "Signal Bloom", "Noise Garden"].map((title, index) => (
            <motion.button
              key={title}
              animate={{ y: [0, -8, 0], rotate: [0, -0.5, 0.5, 0] }}
              transition={{
                duration: 3.6 + index * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.15,
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const canvas = canvasRef.current;
                if (canvas) drawScene(canvas);
              }}
              style={{
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.24)",
                background: "rgba(8, 47, 73, 0.34)",
                color: "white",
                padding: "16px 14px",
                textAlign: "left",
                cursor: "pointer",
                minHeight: 90,
              }}
            >
              <strong style={{ display: "block", marginBottom: 4 }}>{title}</strong>
              <span style={{ opacity: 0.8, fontSize: 13 }}>
                클릭하면 rough 드로잉 패턴이 새로 생성됩니다.
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
