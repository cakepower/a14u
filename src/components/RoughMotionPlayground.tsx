import React, { useEffect, useMemo, useRef } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import { motion } from "framer-motion";

type RoughMotionPlaygroundProps = {
  isMobile: boolean;
};

type Point = [number, number];

const glyphs: Record<string, Point[][]> = {
  A: [
    [[0, 1], [0.5, 0], [1, 1]],
    [[0.22, 0.58], [0.78, 0.58]],
  ],
  D: [
    [[0.05, 0], [0.05, 1]],
    [[0.05, 0], [0.72, 0.14], [0.9, 0.5], [0.72, 0.86], [0.05, 1]],
  ],
  E: [
    [[0.95, 0], [0.05, 0], [0.05, 1], [0.95, 1]],
    [[0.05, 0.5], [0.7, 0.5]],
  ],
  I: [
    [[0.1, 0], [0.9, 0]],
    [[0.5, 0], [0.5, 1]],
    [[0.1, 1], [0.9, 1]],
  ],
  N: [
    [[0.05, 1], [0.05, 0], [0.95, 1], [0.95, 0]],
  ],
  O: [
    [[0.5, 0], [0.9, 0.25], [0.9, 0.75], [0.5, 1], [0.1, 0.75], [0.1, 0.25], [0.5, 0]],
  ],
  S: [
    [[0.9, 0.08], [0.2, 0.08], [0.08, 0.4], [0.8, 0.58], [0.88, 0.92], [0.12, 0.92]],
  ],
  T: [
    [[0.05, 0], [0.95, 0]],
    [[0.5, 0], [0.5, 1]],
  ],
};

const PHRASE = "sadi is no dead.";

function getDrawCommands(phrase: string, x: number, y: number, size: number) {
  const spacing = size * 0.34;
  const letterWidth = size * 0.72;
  const words = phrase.toUpperCase();
  const commands: Point[][] = [];
  let cursor = x;

  for (const ch of words) {
    if (ch === " ") {
      cursor += spacing * 1.45;
      continue;
    }
    if (ch === ".") {
      const dotX = cursor + letterWidth * 0.5;
      const dotY = y + size * 0.95;
      const dot = size * 0.08;
      commands.push([
        [dotX - dot, dotY - dot],
        [dotX + dot, dotY - dot],
        [dotX + dot, dotY + dot],
        [dotX - dot, dotY + dot],
        [dotX - dot, dotY - dot],
      ]);
      cursor += spacing * 1.15;
      continue;
    }
    const strokes = glyphs[ch];
    if (!strokes) {
      cursor += letterWidth + spacing;
      continue;
    }
    for (const stroke of strokes) {
      commands.push(stroke.map(([px, py]) => [cursor + px * letterWidth, y + py * size]));
    }
    cursor += letterWidth + spacing;
  }

  return commands;
}

function strokeLength(stroke: Point[]) {
  let length = 0;
  for (let i = 1; i < stroke.length; i += 1) {
    const dx = stroke[i][0] - stroke[i - 1][0];
    const dy = stroke[i][1] - stroke[i - 1][1];
    length += Math.hypot(dx, dy);
  }
  return Math.max(0.0001, length);
}

function trimStroke(stroke: Point[], targetLength: number) {
  if (stroke.length <= 1) return stroke;
  if (targetLength <= 0) return [stroke[0]];

  let consumed = 0;
  const result: Point[] = [stroke[0]];

  for (let i = 1; i < stroke.length; i += 1) {
    const from = stroke[i - 1];
    const to = stroke[i];
    const segLen = Math.hypot(to[0] - from[0], to[1] - from[1]);
    if (consumed + segLen <= targetLength) {
      result.push(to);
      consumed += segLen;
      continue;
    }
    const remain = targetLength - consumed;
    const t = segLen === 0 ? 0 : remain / segLen;
    result.push([from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t]);
    break;
  }

  return result;
}

function drawScene(canvas: HTMLCanvasElement, progress: number) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const rc = new RoughCanvas(canvas);
  const phraseSize = Math.max(22, Math.min(rect.width / 26, 38));
  const totalLetters = PHRASE.replace(/[\s.]/g, "").length;
  const spaceCount = (PHRASE.match(/\s/g) || []).length;
  const dotCount = (PHRASE.match(/\./g) || []).length;
  const letterWidth = phraseSize * 0.72;
  const spacing = phraseSize * 0.34;
  const phraseWidth =
    totalLetters * letterWidth +
    (totalLetters - 1) * spacing +
    spaceCount * spacing * 1.45 +
    dotCount * spacing * 1.15;
  const startX = Math.max(18, (rect.width - phraseWidth) / 2);
  const startY = rect.height / 2 - phraseSize / 2;
  const lineWidth = Math.max(1.8, phraseSize * 0.085);

  const strokes = getDrawCommands(PHRASE, startX, startY, phraseSize);
  const lengths = strokes.map((stroke) => strokeLength(stroke));
  const totalLength = lengths.reduce((acc, len) => acc + len, 0);
  const targetLength = totalLength * progress;
  let drawn = 0;

  for (let i = 0; i < strokes.length; i += 1) {
    const stroke = strokes[i];
    const len = lengths[i];

    if (drawn >= targetLength) break;
    const remaining = targetLength - drawn;
    const drawPath = remaining >= len ? stroke : trimStroke(stroke, remaining);
    if (drawPath.length >= 2) {
      rc.linearPath(drawPath, {
        stroke: "#f8fafc",
        strokeWidth: lineWidth,
        roughness: 1.5,
        bowing: 1.1,
      });
    }
    drawn += len;
  }
}

export default function RoughMotionPlayground({ isMobile }: RoughMotionPlaygroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const durationMs = useMemo(() => 5200, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId = 0;
    let startAt = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startAt) % durationMs;
      const progress = elapsed / durationMs;
      drawScene(canvas, progress);
      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);

    const onResize = () => {
      startAt = performance.now();
      drawScene(canvas, 0);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(rafId);
    };
  }, [durationMs]);

  return (
    <div
      style={{
        width: "min(1100px, 92vw)",
        margin: isMobile ? "24px auto 40px" : "34px auto 56px",
      }}
    >
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

      <section
        style={{
          minHeight: isMobile ? 180 : 250,
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
            opacity: [0.85, 1, 0.88, 1],
          }}
          transition={{
            duration: 4.2,
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

        <div style={{ position: "relative", zIndex: 1 }} />
      </section>
    </div>
  );
}
