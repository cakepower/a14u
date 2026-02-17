// NewsBackground.tsx (Lamina & Leva Background)
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Bounds, Edges } from '@react-three/drei'
import { LayerMaterial, Depth, Fresnel } from 'lamina'
import { useControls } from 'leva'
import * as THREE from 'three'

function Cursor(props: any) {
  const ref = useRef<any>()

  // Use GLTF if available, otherwise fallback to Box
  let nodes: any = null
  try {
    // This will likely fail if the file is missing, so we wrap it or handle it.
    // However, useGLTF is a hook and can't be conditionally called easily without breaking hook order.
    // So we'll provide a local placeholder if possible, or just use a Box if we know it's missing.
    // For now, I'll use a Box directly to avoid crash.
  } catch (e) { }

  const { gradient } = useControls({ gradient: { value: 0.7, min: 0, max: 1 } })

  // Animate gradient
  useFrame((state) => {
    if (!ref.current || !ref.current.layers) return
    const sin = Math.sin(state.clock.elapsedTime / 2)
    const cos = Math.cos(state.clock.elapsedTime / 2)

    // Safety check for layers existence
    if (ref.current.layers[0]) ref.current.layers[0].origin.set(cos / 2, 0, 0)
    if (ref.current.layers[1]) ref.current.layers[1].origin.set(cos, sin, cos)
    if (ref.current.layers[2]) ref.current.layers[2].origin.set(sin, cos, sin)
    if (ref.current.layers[3]) ref.current.layers[3].origin.set(cos, sin, cos)
  })

  return (
    <mesh {...props}>
      {/* Fallback to Box Geometry since /cursor.glb is missing */}
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial ref={ref} toneMapped={false}>
        <Depth colorA="#ff0080" colorB="black" alpha={1} mode="normal" near={0.5 * gradient} far={0.5} origin={[0, 0, 0]} />
        <Depth colorA="blue" colorB="#f7b955" alpha={1} mode="add" near={2 * gradient} far={2} origin={[0, 1, 1]} />
        <Depth colorA="green" colorB="#f7b955" alpha={1} mode="add" near={3 * gradient} far={3} origin={[0, 1, -1]} />
        <Depth colorA="white" colorB="red" alpha={1} mode="overlay" near={1.5 * gradient} far={1.5} origin={[1, -1, -1]} />
        <Fresnel mode="add" color="white" intensity={0.5} power={1.5} bias={0.05} />
      </LayerMaterial>
      <Edges color="white" />
    </mesh>
  )
}

export function NewsBackground() {
  const groupRef = useRef<THREE.Group>(null)
  const scaleRef = useRef(1)

  useFrame((state) => {
    if (!groupRef.current) return

    // Calculate scroll progress (simple example: first 1000px of scroll)
    // In a real app, you might want to calculate this based on the section's bounds.
    const scrollY = window.scrollY
    const progress = Math.min(scrollY / 1000, 1) // 0 to 1 over 1000px

    // Interpolate scale from 1 to 2
    const targetScale = 1 + progress * 1.5
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, 0.1)

    groupRef.current.scale.setScalar(scaleRef.current)
  })

  return (
    <group ref={groupRef} rotation={[Math.PI / 5, -Math.PI / 5, Math.PI / 2]}>
      <Bounds fit clip observe margin={1.25}>
        <Cursor scale={[0.5, 1, 0.5]} />
      </Bounds>
      <gridHelper args={[10, 40, '#101010', '#050505']} position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
    </group>
  )
}
