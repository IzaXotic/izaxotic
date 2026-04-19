"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Orb({ color = "#7c3aed", pulseSpeed = 1, size = 1 }: { color?: string; pulseSpeed?: number; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = size + Math.sin(t * pulseSpeed) * 0.15;
    meshRef.current.scale.setScalar(scale);
    glowRef.current.scale.setScalar(scale * 2.5);
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.03} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function GlowOrb({
  className = "",
  color = "#7c3aed",
  pulseSpeed = 1,
  size = 1,
}: {
  className?: string;
  color?: string;
  pulseSpeed?: number;
  size?: number;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Orb color={color} pulseSpeed={pulseSpeed} size={size} />
      </Canvas>
    </div>
  );
}
