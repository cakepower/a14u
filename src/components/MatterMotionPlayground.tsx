import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Matter from "matter-js";
import p5 from "p5";
import { RoughCanvas } from "roughjs/bin/canvas";
import { motion } from "framer-motion";
import { getRoughTextCommands } from "./RoughMotionPlayground";

type MatterMotionPlaygroundProps = {
  isMobile: boolean;
  phrase?: string;
};

type LineNode = {
  head: Matter.Body;
  textAnchor: { x: number; y: number };
  edgeAnchor: { x: number; y: number };
  color: [number, number, number, number];
};

type FallingType = {
  char: string;
  body: Matter.Body;
  size: number;
  color: [number, number, number];
};

const DEFAULT_PHRASE = "Impossible is nothing";

function clampPhrase(input: string) {
  const cleaned = input.trim();
  return (cleaned || DEFAULT_PHRASE).slice(0, 56);
}

export default function MatterMotionPlayground({ isMobile, phrase = DEFAULT_PHRASE }: MatterMotionPlaygroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [resetSeed, setResetSeed] = useState(0);
  const sectionHeight = useMemo(() => (isMobile ? 320 : 420), [isMobile]);
  const phraseForDraw = useMemo(() => clampPhrase(phrase), [phrase]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    const sketch = (p: p5) => {
      let engine: Matter.Engine;
      let walls: Matter.Body[] = [];
      let obstacles: Matter.Body[] = [];
      let lines: LineNode[] = [];
      let fallingTypes: FallingType[] = [];
      let rough: RoughCanvas | null = null;
      let textStrokes: Array<Array<[number, number]>> = [];
      let sequenceStartMs = 0;

      const rebuildWalls = () => {
        for (const wall of walls) Matter.World.remove(engine.world, wall);
        for (const obstacle of obstacles) Matter.World.remove(engine.world, obstacle);
        const w = p.width;
        const h = p.height;
        const t = 40;
        walls = [
          Matter.Bodies.rectangle(w / 2, -t / 2, w + t * 2, t, { isStatic: true }),
          Matter.Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, { isStatic: true }),
          Matter.Bodies.rectangle(-t / 2, h / 2, t, h + t * 2, { isStatic: true }),
          Matter.Bodies.rectangle(w + t / 2, h / 2, t, h + t * 2, { isStatic: true }),
        ];
        obstacles = [
          Matter.Bodies.rectangle(w * 0.22, h * 0.66, isMobile ? 72 : 92, 14, { isStatic: true, angle: -0.28 }),
          Matter.Bodies.rectangle(w * 0.54, h * 0.72, isMobile ? 86 : 108, 14, { isStatic: true, angle: 0.16 }),
          Matter.Bodies.circle(w * 0.78, h * 0.64, isMobile ? 18 : 24, { isStatic: true }),
        ];
        Matter.World.add(engine.world, walls);
        Matter.World.add(engine.world, obstacles);
      };

      const buildFallingTypes = () => {
        for (const item of fallingTypes) Matter.World.remove(engine.world, item.body);
        fallingTypes = [];

        const chars = phraseForDraw.toUpperCase().split("").filter((c) => c.trim().length > 0).slice(0, isMobile ? 18 : 28);
        for (let i = 0; i < chars.length; i += 1) {
          const char = chars[i];
          const size = isMobile ? p.random(18, 28) : p.random(22, 34);
          const w = size * 0.68 + 12;
          const h = size * 0.92 + 10;
          const body = Matter.Bodies.rectangle(p.random(24, p.width - 24), p.random(-220, -24), w, h, {
            restitution: 0.82,
            friction: 0.03,
            frictionAir: 0.006,
            density: 0.0012,
            chamfer: { radius: 4 },
          });
          Matter.Body.setVelocity(body, { x: p.random(-0.65, 0.65), y: p.random(0.2, 1.4) });
          Matter.Body.setAngularVelocity(body, p.random(-0.09, 0.09));
          Matter.World.add(engine.world, body);
          fallingTypes.push({
            char,
            body,
            size,
            color: [p.random(132, 198), p.random(214, 247), p.random(236, 255)],
          });
        }
      };

      const buildTextGeometry = () => {
        textStrokes = getRoughTextCommands(phraseForDraw, p.width * (isMobile ? 0.92 : 0.88), p.height * (isMobile ? 0.58 : 0.52)).map(
          (stroke) => stroke.map(([x, y]) => [x + p.width * 0.04, y + p.height * 0.08] as [number, number]),
        );
      };

      const buildLineNodes = () => {
        for (const line of lines) Matter.World.remove(engine.world, line.head);
        lines = [];

        const endpoints = textStrokes.map((stroke) => (stroke.length ? stroke[stroke.length - 1] : null)).filter((pnt): pnt is [number, number] => pnt !== null);
        const capped = endpoints.slice(0, isMobile ? 48 : 88);
        const count = capped.length;
        if (count === 0) return;

        for (let i = 0; i < count; i += 1) {
          const [textAnchorX, textAnchorY] = capped[i];
          const perimeter = 2 * (p.width + p.height);
          const d = (i / count) * perimeter;
          let edgeAnchorX = 0;
          let edgeAnchorY = 0;
          if (d < p.width) {
            edgeAnchorX = d;
            edgeAnchorY = 0;
          } else if (d < p.width + p.height) {
            edgeAnchorX = p.width;
            edgeAnchorY = d - p.width;
          } else if (d < p.width * 2 + p.height) {
            edgeAnchorX = p.width - (d - (p.width + p.height));
            edgeAnchorY = p.height;
          } else {
            edgeAnchorX = 0;
            edgeAnchorY = p.height - (d - (p.width * 2 + p.height));
          }

          const head = Matter.Bodies.circle(textAnchorX + p.random(-18, 18), textAnchorY + p.random(-18, 18), isMobile ? 2.4 : 2.9, {
            frictionAir: 0.04,
            restitution: 0.84,
            friction: 0.01,
            density: 0.0011,
          });
          Matter.World.add(engine.world, head);
          lines.push({
            head,
            textAnchor: { x: textAnchorX, y: textAnchorY },
            edgeAnchor: { x: edgeAnchorX, y: edgeAnchorY },
            color: [160 + p.random(-25, 35), 185 + p.random(-35, 25), 255, 130 + p.random(-15, 20)],
          });
        }
      };

      p.setup = () => {
        const canvas = p.createCanvas(host.clientWidth, sectionHeight);
        canvas.parent(host);
        p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
        engine = Matter.Engine.create({ gravity: { x: 0, y: 0.84 } });
        rough = new RoughCanvas(canvas.elt as HTMLCanvasElement);

        buildTextGeometry();
        rebuildWalls();
        buildLineNodes();
        buildFallingTypes();
        sequenceStartMs = p.millis();
      };

      p.windowResized = () => {
        if (disposed) return;
        p.resizeCanvas(host.clientWidth, sectionHeight);
        buildTextGeometry();
        rebuildWalls();
        buildLineNodes();
        buildFallingTypes();
        sequenceStartMs = p.millis();
      };

      p.draw = () => {
        const t = p.millis();
        const elapsed = t - sequenceStartMs;
        const linesStartMs = 900;
        const linesRevealMs = 1600;
        Matter.Engine.update(engine, 1000 / 60);

        p.background(2, 6, 23, 238);
        p.noStroke();
        p.fill(14, 116, 144, 18);
        p.circle(p.width * 0.2, p.height * 0.28, p.width * 0.55);
        p.fill(244, 63, 94, 14);
        p.circle(p.width * 0.82, p.height * 0.68, p.width * 0.48);

        for (const obstacle of obstacles) {
          if (obstacle.circleRadius) {
            p.noStroke();
            p.fill(148, 163, 184, 44);
            p.circle(obstacle.position.x, obstacle.position.y, obstacle.circleRadius * 2);
            continue;
          }
          p.push();
          p.translate(obstacle.position.x, obstacle.position.y);
          p.rotate(obstacle.angle);
          p.noStroke();
          p.fill(148, 163, 184, 44);
          p.rectMode(p.CENTER);
          p.rect(0, 0, (obstacle.bounds.max.x - obstacle.bounds.min.x), (obstacle.bounds.max.y - obstacle.bounds.min.y), 4);
          p.pop();
        }

        if (rough) {
          for (const stroke of textStrokes) {
            if (stroke.length < 2) continue;
            rough.linearPath(stroke, {
              stroke: "rgba(186, 230, 253, 0.9)",
              strokeWidth: isMobile ? 1.8 : 2.2,
              roughness: 2,
              bowing: 1.4,
            });
          }
          rough.rectangle(10, 10, Math.max(1, p.width - 20), Math.max(1, p.height - 20), {
            stroke: "rgba(148,163,184,0.25)",
            strokeWidth: 1.1,
            roughness: 1.7,
            bowing: 1.2,
          });
        }

        p.textAlign(p.CENTER, p.CENTER);
        for (const item of fallingTypes) {
          const body = item.body;
          p.push();
          p.translate(body.position.x, body.position.y);
          p.rotate(body.angle);
          p.fill(item.color[0], item.color[1], item.color[2], 220);
          p.textSize(item.size);
          p.textStyle(p.BOLD);
          p.text(item.char, 0, 0);
          p.pop();
        }

        const revealProgress = Math.max(0, Math.min(1, (elapsed - linesStartMs) / linesRevealMs));
        const visibleCount = Math.floor(lines.length * revealProgress);

        for (let i = 0; i < visibleCount; i += 1) {
          const line = lines[i];
          const head = line.head;
          const dx = line.textAnchor.x - head.position.x;
          const dy = line.textAnchor.y - head.position.y;
          const dist = Math.max(1, Math.hypot(dx, dy));

          Matter.Body.applyForce(head, head.position, {
            x: dx * 0.0009 - head.velocity.x * 0.022,
            y: dy * 0.0009 - head.velocity.y * 0.022,
          });

          const n = p.noise(head.position.x * 0.0055, head.position.y * 0.0055, t * 0.00023);
          const theta = n * Math.PI * 2.2;
          Matter.Body.applyForce(head, head.position, {
            x: Math.cos(theta) * 0.00075,
            y: Math.sin(theta) * 0.00075,
          });

          const burst = 0.00018 * Math.sin(t * 0.004 + dist * 0.06);
          Matter.Body.applyForce(head, head.position, {
            x: (dx / dist) * burst,
            y: (dy / dist) * burst,
          });

          p.noFill();
          p.stroke(line.color[0], line.color[1], line.color[2], line.color[3]);
          p.strokeWeight(isMobile ? 1.25 : 1.55);
          p.line(line.edgeAnchor.x, line.edgeAnchor.y, head.position.x, head.position.y);
          p.stroke(line.color[0], line.color[1], line.color[2], 80);
          p.line(head.position.x, head.position.y, line.textAnchor.x, line.textAnchor.y);

          p.noStroke();
          p.fill(125, 211, 252, 110);
          p.circle(line.textAnchor.x, line.textAnchor.y, isMobile ? 2.1 : 2.6);
          p.fill(148, 163, 184, 95);
          p.circle(line.edgeAnchor.x, line.edgeAnchor.y, isMobile ? 1.9 : 2.3);
        }
      };
    };

    const instance = new p5(sketch);
    return () => {
      disposed = true;
      instance.remove();
    };
  }, [isMobile, phraseForDraw, resetSeed, sectionHeight]);

  return (
    <div
      style={{
        width: "min(1100px, 92vw)",
        margin: isMobile ? "4px auto 40px" : "6px auto 56px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          gap: 12,
          flexWrap: "wrap",
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
            margin: 0,
            fontFamily: "var(--font-display)",
          }}
        >
          Matter Motion Playground
        </motion.h2>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <p style={{ margin: 0, opacity: 0.85, fontSize: isMobile ? 13 : 14 }}>Falling type collisions + outline links (p5 + Matter)</p>
          <button
            type="button"
            onClick={() => setResetSeed((v) => v + 1)}
            style={{
              border: "1px solid rgba(255,255,255,0.24)",
              background: "rgba(15,23,42,0.78)",
              color: "#e2e8f0",
              padding: isMobile ? "8px 10px" : "9px 12px",
              borderRadius: 10,
              fontSize: isMobile ? 13 : 14,
              cursor: "pointer",
            }}
          >
            Reset Field
          </button>
        </div>
      </div>

      <section
        style={{
          minHeight: sectionHeight,
          height: sectionHeight,
          border: "1px solid rgba(255,255,255,0.16)",
          borderRadius: 20,
          background: "linear-gradient(140deg, rgba(15,23,42,.88), rgba(2,6,23,.96))",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div ref={hostRef} style={{ width: "100%", height: "100%" }} />
      </section>
    </div>
  );
}
