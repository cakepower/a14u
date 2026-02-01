// NewsBackground.tsx (Simpler Shader on Plane)
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function NewsBackground() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  // Uniforms를 메모이제이션하여 참조 무결성 유지
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uC1: { value: new THREE.Color("#020617") },
    uC2: { value: new THREE.Color("#0ea5e9") },
    uC3: { value: new THREE.Color("#f0f9ff") },
  }), []);


  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[8, 5, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        transparent={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uC1;
          uniform vec3 uC2;
          uniform vec3 uC3;
          varying vec2 vUv;

          float n(vec2 p){
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          void main(){
            vec2 uv = vUv;
            float w = sin((uv.x*3.0 + uTime*0.35)) * 0.08
                    + cos((uv.y*5.0 - uTime*0.45)) * 0.07;
            float g = n(uv*120.0 + uTime) * 0.03;

            vec3 col = mix(uC1, uC2, clamp(uv.y + w, 0.0, 1.0));
            col = mix(col, uC3, smoothstep(0.65, 1.0, uv.x + w) * 0.35);
            col += g;

            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}
