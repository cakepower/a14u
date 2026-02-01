// src/News.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { NewsBackground } from "./components/NewsBackground";

type NewsProps = { children?: React.ReactNode; isMobile?: boolean };

export default function News({ children, isMobile }: NewsProps) {
  return (
    <section
      style={{
        position: "relative",
        isolation: "isolate",
        width: "100%",
        padding: "64px 0 120px",
        background: "transparent",
      }}
    >
      {/* Background Layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%" }}>
          <Canvas
            orthographic
            dpr={[1, 2]}
            camera={{ position: [0, 0, 10], zoom: 200 }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            <NewsBackground />
          </Canvas>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.65) 40%, rgba(2,6,23,0.92) 100%)",
            }}
          />
        </div>
      </div>

      {/* Foreground Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {children}
      </div>
    </section>
  );
}
