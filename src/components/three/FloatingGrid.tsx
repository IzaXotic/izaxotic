"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Grid({ lineColor = "#7c3aed", fadeDistance = 15 }: { lineColor?: string; fadeDistance?: number }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2.5;
      meshRef.current.position.y = -2;
      meshRef.current.position.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.5;
    }
  });

  const gridSize = 30;
  const divisions = 30;
  const step = gridSize / divisions;
  const half = gridSize / 2;

  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= divisions; i++) {
    const pos = -half + i * step;
    points.push(new THREE.Vector3(pos, 0, -half));
    points.push(new THREE.Vector3(pos, 0, half));
    points.push(new THREE.Vector3(-half, 0, pos));
    points.push(new THREE.Vector3(half, 0, pos));
  }

  return (
    <group ref={meshRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </lineSegments>
      <mesh position={[0, -0.01, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

export default function FloatingGrid({
  className = "",
  lineColor = "#7c3aed",
}: {
  className?: string;
  lineColor?: string;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 4, 8], fov: 55 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <Grid lineColor={lineColor} />
      </Canvas>
    </div>
  );
}
