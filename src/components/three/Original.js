"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 3000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7C3AED"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function FloatingSphere({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#A78BFA"
        wireframe
        transparent
        opacity={0.35}
        emissive="#7C3AED"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const edgesRef = useRef<THREE.LineSegments>(null!);

  useFrame((state) => {
    if (meshRef.current && edgesRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
      meshRef.current.scale.setScalar(scale);
      edgesRef.current.rotation.copy(meshRef.current.rotation);
      edgesRef.current.scale.copy(meshRef.current.scale);
    }
  });

  return (
    <group>
      {/* Main solid sphere with metallic finish */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.8, 128, 128]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#D946EF"
          emissiveIntensity={0.6}
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1.2}
          side={THREE.FrontSide}
        />
      </mesh>
      
      {/* Edge lines for 3D depth perception */}
      <lineSegments ref={edgesRef} position={[0, 0, 0]}>
        <edgesGeometry attach="geometry">
          <sphereGeometry args={[1.8, 128, 128]} />
        </edgesGeometry>
        <lineBasicMaterial
          color="#D946EF"
          linewidth={2}
          transparent
          opacity={0.8}
          fog={false}
        />
      </lineSegments>

      {/* Inner wireframe layer for depth */}
      <mesh position={[0, 0, 0]} scale={0.85}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Outer glow shell */}
      <mesh position={[0, 0, 0]} scale={1.12}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial
          color="#D946EF"
          emissive="#A78BFA"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 6, 8]} intensity={3} color="#D946EF" />
      <pointLight position={[-8, -6, -8]} intensity={2.5} color="#7C3AED" />
      <directionalLight position={[0, 15, 5]} intensity={2} color="#A78BFA" />
      <pointLight position={[0, -10, 0]} intensity={1.5} color="#D946EF" />

      <ParticleField />
      <CentralOrb />
      <FloatingSphere position={[-3, 1, -2]} scale={0.4} speed={1.2} />
      <FloatingSphere position={[3, -1, -1]} scale={0.3} speed={0.8} />
      <FloatingSphere position={[2, 2, -3]} scale={0.5} speed={1.5} />
      <FloatingSphere position={[-2, -2, -1]} scale={0.25} speed={0.6} />
    </Canvas>
  );
}
