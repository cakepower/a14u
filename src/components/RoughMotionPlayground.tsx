import React, { useEffect, useMemo, useRef } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import { motion } from "framer-motion";

type RoughMotionPlaygroundProps = {
  isMobile: boolean;
  phrase?: string;
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
  B: [
    [[0.08, 0], [0.08, 1]],
    [[0.08, 0], [0.72, 0.08], [0.82, 0.28], [0.7, 0.5], [0.08, 0.5]],
    [[0.08, 0.5], [0.72, 0.56], [0.84, 0.78], [0.72, 1], [0.08, 1]],
  ],
  C: [
    [[0.9, 0.1], [0.28, 0.06], [0.08, 0.28], [0.08, 0.72], [0.28, 0.94], [0.9, 0.9]],
  ],
  F: [
    [[0.08, 0], [0.08, 1]],
    [[0.08, 0], [0.88, 0]],
    [[0.08, 0.5], [0.68, 0.5]],
  ],
  G: [
    [[0.9, 0.15], [0.28, 0.06], [0.08, 0.28], [0.08, 0.72], [0.28, 0.94], [0.9, 0.9]],
    [[0.9, 0.56], [0.58, 0.56]],
    [[0.9, 0.56], [0.9, 0.9]],
  ],
  H: [
    [[0.08, 0], [0.08, 1]],
    [[0.92, 0], [0.92, 1]],
    [[0.08, 0.5], [0.92, 0.5]],
  ],
  I: [
    [[0.1, 0], [0.9, 0]],
    [[0.5, 0], [0.5, 1]],
    [[0.1, 1], [0.9, 1]],
  ],
  J: [
    [[0.1, 0], [0.9, 0]],
    [[0.55, 0], [0.55, 0.8], [0.42, 1], [0.16, 0.9]],
  ],
  K: [
    [[0.08, 0], [0.08, 1]],
    [[0.88, 0], [0.08, 0.5], [0.88, 1]],
  ],
  L: [
    [[0.08, 0], [0.08, 1], [0.88, 1]],
  ],
  M: [
    [[0.06, 1], [0.06, 0], [0.5, 0.55], [0.94, 0], [0.94, 1]],
  ],
  N: [
    [[0.05, 1], [0.05, 0], [0.95, 1], [0.95, 0]],
  ],
  O: [
    [[0.5, 0], [0.9, 0.25], [0.9, 0.75], [0.5, 1], [0.1, 0.75], [0.1, 0.25], [0.5, 0]],
  ],
  P: [
    [[0.08, 1], [0.08, 0], [0.72, 0.08], [0.86, 0.28], [0.72, 0.5], [0.08, 0.5]],
  ],
  Q: [
    [[0.5, 0], [0.9, 0.25], [0.9, 0.75], [0.5, 1], [0.1, 0.75], [0.1, 0.25], [0.5, 0]],
    [[0.62, 0.62], [0.95, 1]],
  ],
  R: [
    [[0.08, 1], [0.08, 0], [0.72, 0.08], [0.86, 0.28], [0.72, 0.5], [0.08, 0.5]],
    [[0.5, 0.5], [0.9, 1]],
  ],
  S: [
    [[0.9, 0.08], [0.2, 0.08], [0.08, 0.4], [0.8, 0.58], [0.88, 0.92], [0.12, 0.92]],
  ],
  T: [
    [[0.05, 0], [0.95, 0]],
    [[0.5, 0], [0.5, 1]],
  ],
  U: [
    [[0.08, 0], [0.08, 0.78], [0.28, 1], [0.72, 1], [0.92, 0.78], [0.92, 0]],
  ],
  V: [
    [[0.08, 0], [0.5, 1], [0.92, 0]],
  ],
  W: [
    [[0.06, 0], [0.24, 1], [0.5, 0.4], [0.76, 1], [0.94, 0]],
  ],
  X: [
    [[0.08, 0], [0.92, 1]],
    [[0.92, 0], [0.08, 1]],
  ],
  Y: [
    [[0.08, 0], [0.5, 0.5], [0.92, 0]],
    [[0.5, 0.5], [0.5, 1]],
  ],
  Z: [
    [[0.08, 0], [0.92, 0], [0.08, 1], [0.92, 1]],
  ],
  "0": [
    [[0.5, 0], [0.9, 0.25], [0.9, 0.75], [0.5, 1], [0.1, 0.75], [0.1, 0.25], [0.5, 0]],
  ],
  "1": [
    [[0.28, 0.2], [0.5, 0], [0.5, 1], [0.28, 1], [0.72, 1]],
  ],
  "2": [
    [[0.1, 0.22], [0.28, 0], [0.82, 0.08], [0.9, 0.38], [0.12, 1], [0.9, 1]],
  ],
  "3": [
    [[0.12, 0.08], [0.82, 0.08], [0.56, 0.5], [0.86, 0.92], [0.12, 0.92]],
  ],
  "4": [
    [[0.8, 1], [0.8, 0], [0.1, 0.62], [0.92, 0.62]],
  ],
  "5": [
    [[0.9, 0.08], [0.2, 0.08], [0.12, 0.48], [0.82, 0.52], [0.9, 0.92], [0.12, 0.92]],
  ],
  "6": [
    [[0.88, 0.16], [0.32, 0.08], [0.1, 0.46], [0.2, 0.9], [0.72, 0.94], [0.9, 0.72], [0.72, 0.52], [0.2, 0.52]],
  ],
  "7": [
    [[0.08, 0.08], [0.92, 0.08], [0.42, 1]],
  ],
  "8": [
    [[0.5, 0], [0.82, 0.18], [0.5, 0.46], [0.18, 0.18], [0.5, 0]],
    [[0.5, 0.46], [0.86, 0.72], [0.5, 1], [0.14, 0.72], [0.5, 0.46]],
  ],
  "9": [
    [[0.82, 0.52], [0.28, 0.48], [0.1, 0.22], [0.28, 0.02], [0.8, 0.08], [0.9, 0.54], [0.72, 0.92], [0.12, 0.9]],
  ],
  "!": [
    [[0.5, 0], [0.5, 0.74]],
    [[0.5, 0.9], [0.5, 1]],
  ],
  "?": [
    [[0.16, 0.18], [0.32, 0.02], [0.76, 0.08], [0.86, 0.32], [0.5, 0.54], [0.5, 0.72]],
    [[0.5, 0.9], [0.5, 1]],
  ],
  ",": [
    [[0.5, 0.84], [0.42, 1]],
  ],
  "-": [
    [[0.16, 0.56], [0.84, 0.56]],
  ],
  "'": [
    [[0.58, 0], [0.46, 0.18]],
  ],
  ":": [
    [[0.5, 0.26], [0.5, 0.34]],
    [[0.5, 0.78], [0.5, 0.86]],
  ],
};

const DEFAULT_PHRASE = "sadi is no dead.";

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
      commands.push([
        [cursor + letterWidth * 0.12, y + size * 0.08],
        [cursor + letterWidth * 0.88, y + size * 0.08],
        [cursor + letterWidth * 0.88, y + size * 0.92],
        [cursor + letterWidth * 0.12, y + size * 0.92],
        [cursor + letterWidth * 0.12, y + size * 0.08],
      ]);
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

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function entryOffset(index: number, width: number, height: number): Point {
  const base = Math.sin((index + 1) * 12.9898) * 43758.5453;
  const unit = base - Math.floor(base);
  const angle = unit * Math.PI * 2;
  const distance = Math.max(width, height) * 0.95 + 160;
  return [Math.cos(angle) * distance, Math.sin(angle) * distance];
}

function random01(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function translateStroke(stroke: Point[], dx: number, dy: number) {
  return stroke.map(([x, y]) => [x + dx, y + dy] as Point);
}

function scaleStroke(stroke: Point[], scale: number) {
  if (stroke.length === 0) return stroke;
  let cx = 0;
  let cy = 0;
  for (const [x, y] of stroke) {
    cx += x;
    cy += y;
  }
  cx /= stroke.length;
  cy /= stroke.length;
  return stroke.map(([x, y]) => [cx + (x - cx) * scale, cy + (y - cy) * scale] as Point);
}

function drawScene(canvas: HTMLCanvasElement, progress: number, phrase: string) {
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
  const normalized = phrase.toUpperCase();
  const totalLetters = normalized.replace(/[\s.]/g, "").length;
  const spaceCount = (normalized.match(/\s/g) || []).length;
  const dotCount = (normalized.match(/\./g) || []).length;
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

  const strokes = getDrawCommands(normalized, startX, startY, phraseSize);
  const lengths = strokes.map((stroke) => strokeLength(stroke));
  const count = strokes.length;

  for (let i = 0; i < count; i += 1) {
    const stroke = strokes[i];
    const len = lengths[i];
    const delay = (i / Math.max(1, count)) * 0.72;
    const duration = 0.28;
    const local = clamp01((progress - delay) / duration);
    if (local <= 0) continue;

    const writeProgress = clamp01(local * 1.18);
    const settled = easeOutCubic(local);
    const [ox, oy] = entryOffset(i, rect.width, rect.height);
    const dx = ox * (1 - settled);
    const dy = oy * (1 - settled);
    const partial = trimStroke(stroke, len * writeProgress);

    const timeSeed = progress * 1000;
    const hue = Math.floor(160 + random01(i * 3.1 + timeSeed * 0.75) * 180);
    const sat = Math.floor(68 + random01(i * 4.7 + timeSeed * 0.58) * 28);
    const lit = Math.floor(56 + random01(i * 5.9 + timeSeed * 0.63) * 22);
    const color = `hsl(${hue} ${sat}% ${lit}%)`;
    const scale = 0.72 + random01(i * 8.3 + timeSeed * 0.82) * 0.95;
    const jittered = scaleStroke(partial, scale);
    const drawPath = translateStroke(jittered, dx, dy);
    const strokeWidth = lineWidth * (0.7 + random01(i * 9.7 + timeSeed * 0.51) * 1.15);
    const roughness = 1.1 + random01(i * 6.2 + timeSeed * 0.66) * 2.1;
    const bowing = 0.8 + random01(i * 7.4 + timeSeed * 0.43) * 1.6;

    if (drawPath.length >= 2) {
      rc.linearPath(drawPath, {
        stroke: color,
        strokeWidth,
        roughness,
        bowing,
      });
    }
  }
}

export default function RoughMotionPlayground({ isMobile, phrase = DEFAULT_PHRASE }: RoughMotionPlaygroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const durationMs = useMemo(() => 5200, []);
  const phraseForDraw = useMemo(() => {
    const cleaned = phrase.trim();
    return (cleaned || DEFAULT_PHRASE).slice(0, 56);
  }, [phrase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId = 0;
    let startAt = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startAt) % durationMs;
      const progress = elapsed / durationMs;
      drawScene(canvas, progress, phraseForDraw);
      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);

    const onResize = () => {
      startAt = performance.now();
      drawScene(canvas, 0, phraseForDraw);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(rafId);
    };
  }, [durationMs, phraseForDraw]);

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
