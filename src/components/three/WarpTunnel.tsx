"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Tunnel({ color = "#7c3aed", speed = 0.5 }: { color?: string; speed?: number }) {
  const meshRef = useRef<THREE.Points>(null!);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 3;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const posArr = meshRef.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime() * speed;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 2] += 0.03;
      if (posArr[i * 3 + 2] > 15) posArr[i * 3 + 2] = -15;
    }
    (meshRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    meshRef.current.rotation.z = t * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.02}
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function WarpTunnel({
  className = "",
  color = "#7c3aed",
  speed = 0.5,
}: {
  className?: string;
  color?: string;
  speed?: number;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <Tunnel color={color} speed={speed} />
      </Canvas>
    </div>
  );
}
