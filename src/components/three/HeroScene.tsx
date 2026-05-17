"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Edges, Environment, Sphere } from "@react-three/drei";
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

function FloatingSphere({
  position,
  scale,
  speed,
  edgeColor = "#C4B5FD",
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  edgeColor?: string;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const originY = position[1];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        originY + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh castShadow>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#7C3AED"
          metalness={0.6}
          roughness={0.25}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          flatShading
        />
        <Edges threshold={1} color={edgeColor} />
      </mesh>
    </group>
  );
}

/**
 * Custom fresnel/rim shader — bright at glancing angles, dark facing camera.
 * This is THE technique that sells a 3D sphere look.
 */
const FresnelMaterial = () => (
  <shaderMaterial
    transparent
    depthWrite={false}
    side={THREE.BackSide}
    uniforms={{
      uColor: { value: new THREE.Color("#E879F9") },
      uPower: { value: 2.5 },
      uIntensity: { value: 1.8 },
    }}
    vertexShader={`
      varying vec3 vNormal;
      varying vec3 vPositionW;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vPositionW = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `}
    fragmentShader={`
      uniform vec3 uColor;
      uniform float uPower;
      uniform float uIntensity;
      varying vec3 vNormal;
      varying vec3 vPositionW;
      void main() {
        vec3 viewDir = normalize(cameraPosition - vPositionW);
        float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), uPower);
        gl_FragColor = vec4(uColor * fresnel * uIntensity, fresnel);
      }
    `}
  />
);

function CentralOrb() {
  const groupRef = useRef<THREE.Group>(null!);
  const orbRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = t * 0.08;
    }
    if (orbRef.current) {
      const s = 1 + Math.sin(t * 0.4) * 0.04;
      orbRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* CORE — diffuse + specular only. NO emissive so lighting creates a real shading gradient. */}
      <mesh ref={orbRef} castShadow receiveShadow>
        <sphereGeometry args={[1.8, 128, 128]} />
        <meshPhysicalMaterial
          color="#5B21B6"
          metalness={0.55}
          roughness={0.28}
          clearcoat={1}
          clearcoatRoughness={0.15}
          reflectivity={0.9}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* FRESNEL RIM — bright at sphere silhouette, transparent at center. */}
      {/* This is the single biggest contributor to a 3D look on a sphere. */}
      <mesh scale={1.04}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <FresnelMaterial />
      </mesh>

      {/* Outer atmospheric glow */}
      <mesh scale={1.18}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#A78BFA"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function BackdropGradient() {
  return (
    <mesh position={[0, 0, -6]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial color="#0a0010" transparent opacity={0.55} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Corner vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.9) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 0% 0%,    rgba(0,0,0,0.55) 0%, transparent 55%),
            radial-gradient(ellipse at 100% 0%,  rgba(0,0,0,0.55) 0%, transparent 55%),
            radial-gradient(ellipse at 0% 100%,  rgba(0,0,0,0.55) 0%, transparent 55%),
            radial-gradient(ellipse at 100% 100%,rgba(0,0,0,0.55) 0%, transparent 55%)
          `,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Bright environment so the metallic surface has something to reflect */}
        <Environment preset="sunset" background={false} />

        {/* Very low ambient — we want strong light/dark contrast for 3D shading */}
        <ambientLight intensity={0.08} />

        {/* KEY LIGHT — top-right, bright, casts shadows. This creates the main highlight. */}
        <directionalLight
          position={[5, 6, 5]}
          intensity={3.5}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        {/* FILL LIGHT — bottom-left, dimmer, colored. Lifts shadow side without flattening. */}
        <directionalLight
          position={[-5, -3, 2]}
          intensity={1}
          color="#7C3AED"
        />

        {/* RIM / BACK LIGHT — behind the orb, separates it from background */}
        <pointLight
          position={[0, 0, -6]}
          intensity={4}
          color="#E879F9"
          distance={15}
        />

        {/* Side accent for color */}
        <pointLight
          position={[6, -2, 3]}
          intensity={2}
          color="#D946EF"
          distance={12}
        />

        <BackdropGradient />
        <ParticleField />
        <CentralOrb />

        <FloatingSphere position={[-3, 1, -2]} scale={0.4} speed={1.2} edgeColor="#E879F9" />
        <FloatingSphere position={[3, -1, -1]} scale={0.3} speed={0.8} edgeColor="#A78BFA" />
        <FloatingSphere position={[2, 2, -3]} scale={0.5} speed={1.5} edgeColor="#C084FC" />
        <FloatingSphere position={[-2, -2, -1]} scale={0.25} speed={0.6} edgeColor="#D8B4FE" />
      </Canvas>
    </div>
  );
}