"use client";
import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════
   IzaXotic Hero Scene — "The Nexus"

   A single, bold, animated centerpiece:
   • Dual wireframe shells — rotating octahedra that breathe
   • Pulsing energy core with bloom-like glow layers
   • Orbital particle ring — a Saturn-like data ring
   • Volumetric light rays emanating from center
   • Floating code nodes orbiting outward
   • Deep-field star dust background
   • Mouse-reactive parallax camera

   Performance: single Canvas, ~3k total triangles, 60fps
   ═══════════════════════════════════════════════════════════ */

/* ─── Background star dust ─── */
function StarDust({ count = 1800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color("#7C3AED");
    const c2 = new THREE.Color("#A78BFA");
    const c3 = new THREE.Color("#D946EF");
    const palette = [c1, c2, c3];

    for (let i = 0; i < count; i++) {
      // Uniform sphere distribution, pushed outward
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 6 + Math.random() * 22;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        transparent
        opacity={0.55}
        vertexColors
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Outer wireframe shell (Octahedron) ─── */
function WireframeShell({
  scale,
  color,
  rotSpeed,
  opacity = 0.25,
}: {
  scale: number;
  color: string;
  rotSpeed: [number, number, number];
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.x = t * rotSpeed[0];
      ref.current.rotation.y = t * rotSpeed[1];
      ref.current.rotation.z = t * rotSpeed[2];
      // Breathing effect
      const breathe = scale + Math.sin(t * 0.4) * 0.08;
      ref.current.scale.setScalar(breathe);
    }
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

/* ─── Energy core — solid glowing icosahedron ─── */
function EnergyCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
      const pulse = 0.65 + Math.sin(t * 0.8) * 0.05;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#7C3AED"
        emissiveIntensity={1.8}
        metalness={0.9}
        roughness={0.05}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/* ─── Glow layers — concentric transparent spheres ─── */
function GlowLayers() {
  const innerRef = useRef<THREE.Mesh>(null!);
  const midRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (innerRef.current) {
      innerRef.current.scale.setScalar(1.2 + Math.sin(t * 1.2) * 0.15);
    }
    if (midRef.current) {
      midRef.current.scale.setScalar(2 + Math.sin(t * 0.7) * 0.3);
    }
    if (outerRef.current) {
      outerRef.current.scale.setScalar(3.5 + Math.sin(t * 0.5) * 0.4);
    }
  });

  return (
    <>
      <mesh ref={innerRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#D946EF" transparent opacity={0.06} depthWrite={false} side={THREE.BackSide} />
      </mesh>
      <mesh ref={midRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.035} depthWrite={false} side={THREE.BackSide} />
      </mesh>
      <mesh ref={outerRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#4C1D95" transparent opacity={0.02} depthWrite={false} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

/* ─── Orbital particle ring — Saturn-like data ring ─── */
function OrbitalRing({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const r = 2.6 + (Math.random() - 0.5) * 0.6;
      const yOffset = (Math.random() - 0.5) * 0.15;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = yOffset;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.rotation.x = 0.5; // Tilt the ring
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#A78BFA"
        size={0.04}
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Second ring (counter-rotating) ─── */
function SecondRing({ count = 350 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const r = 3.4 + (Math.random() - 0.5) * 0.4;
      const yOffset = (Math.random() - 0.5) * 0.1;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = yOffset;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -state.clock.elapsedTime * 0.08;
      ref.current.rotation.x = -0.3;
      ref.current.rotation.z = 0.4;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#D946EF"
        size={0.03}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Volumetric light rays ─── */
function LightRays() {
  const groupRef = useRef<THREE.Group>(null!);

  const rayData = useMemo(() => {
    const rays = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      rays.push({ angle, length: 3 + Math.random() * 2, width: 0.02 + Math.random() * 0.01 });
    }
    return rays;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.02;
      const opacity = 0.08 + Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
      groupRef.current.children.forEach((child) => {
        if ((child as THREE.Mesh).material) {
          ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = opacity;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {rayData.map((ray, i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[0, 0, ray.angle]}>
          <planeGeometry args={[ray.width, ray.length]} />
          <meshBasicMaterial
            color="#7C3AED"
            transparent
            opacity={0.1}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Floating orbit nodes ─── */
function OrbitNodes({ count = 8 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  const nodeData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 4 + Math.random() * 1.5,
      yOffset: (Math.random() - 0.5) * 2,
      speed: 0.02 + Math.random() * 0.03,
      size: 0.04 + Math.random() * 0.04,
    }));
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.children.forEach((child, i) => {
        const data = nodeData[i];
        if (!data) return;
        const angle = data.angle + t * data.speed;
        child.position.x = Math.cos(angle) * data.radius;
        child.position.y = data.yOffset + Math.sin(t * 0.5 + i) * 0.3;
        child.position.z = Math.sin(angle) * data.radius;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {nodeData.map((data, i) => (
        <mesh key={i}>
          <sphereGeometry args={[data.size, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#A78BFA" : "#D946EF"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Connecting lines from center to orbit nodes ─── */
function ConnectionLines({ count = 8 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  const nodeData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 4 + Math.random() * 1.5,
      yOffset: (Math.random() - 0.5) * 2,
      speed: 0.02 + Math.random() * 0.03,
    }));
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.children.forEach((child, i) => {
        const line = child as THREE.Line;
        const data = nodeData[i];
        if (!data || !line.geometry) return;
        const angle = data.angle + t * data.speed;
        const x = Math.cos(angle) * data.radius;
        const y = data.yOffset + Math.sin(t * 0.5 + i) * 0.3;
        const z = Math.sin(angle) * data.radius;
        const positions = new Float32Array([0, 0, 0, x, y, z]);
        line.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        line.geometry.attributes.position.needsUpdate = true;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {nodeData.map((_, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(6), 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#7C3AED"
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </line>
      ))}
    </group>
  );
}

/* ─── Mouse-reactive camera rig ─── */
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  const onPointerMove = useCallback((e: PointerEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useFrame(() => {
    if (!initialized.current && typeof window !== "undefined") {
      window.addEventListener("pointermove", onPointerMove);
      initialized.current = true;
    }
    // Camera parallax around the offset center
    const targetX = mouse.current.x * 0.6;
    const targetY = -mouse.current.y * 0.3 + 0.15;
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ═══════════════════════════════════════
   Main Scene Export
   Scene center offset to x=1.8 so the
   nexus sits in the right half of the
   viewport, away from the hero text.
   ═══════════════════════════════════════ */
const SCENE_OFFSET: [number, number, number] = [0, 0, 0];

export default function HeroSceneV2() {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 5.5], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      {/* Lighting — offset to match scene center */}
      <ambientLight intensity={0.08} />
      <pointLight position={[4, 4, 4]} intensity={3} color="#7C3AED" distance={15} />
      <pointLight position={[-4, -2, -4]} intensity={2} color="#A78BFA" distance={12} />
      <pointLight position={[0, -4, 3]} intensity={1.5} color="#D946EF" distance={10} />
      <spotLight position={[0, 8, 2]} angle={0.3} penumbra={1} intensity={4} color="#7C3AED" />

      {/* Background — stays centered (fills whole viewport) */}
      <StarDust count={1800} />

      {/* Central structure — offset to the right */}
      <group position={SCENE_OFFSET}>
        <WireframeShell scale={1.8} color="#7C3AED" rotSpeed={[0.08, 0.12, 0.02]} opacity={0.2} />
        <WireframeShell scale={2.3} color="#A78BFA" rotSpeed={[-0.05, 0.06, -0.03]} opacity={0.1} />
        <EnergyCore />
        <GlowLayers />

        {/* Light rays from center */}
        <LightRays />

        {/* Orbital data rings */}
        <OrbitalRing count={500} />
        <SecondRing count={350} />

        {/* Floating orbit nodes with connections */}
        <OrbitNodes count={8} />
        <ConnectionLines count={8} />
      </group>

      {/* Mouse-reactive camera — looks at offset center */}
      <CameraRig />
    </Canvas>
  );
}
