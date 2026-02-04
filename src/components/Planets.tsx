'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function SmoothPlanet({
  position,
  size,
  color,
  speed,
}: {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(size, 128, 128);
    const positions = geo.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i);
      vertex.normalize();

      const noise1 = Math.sin(vertex.x * 8) * Math.cos(vertex.y * 6) * 0.02;
      const noise2 = Math.sin(vertex.x * 4 + 1) * Math.cos(vertex.z * 5) * 0.015;

      const displacement = size + noise1 + noise2;
      vertex.normalize().multiplyScalar(displacement);
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geo.computeVertexNormals();
    return geo;
  }, [size]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={position}>
      <meshStandardMaterial
        color={color}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  );
}

// Mouse parallax camera controller
function CameraController({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { camera } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Calculate target rotation based on mouse position (-0.15 to 0.15 range)
    targetRotation.current.y = (mousePosition.x - 0.5) * 0.3;
    targetRotation.current.x = (mousePosition.y - 0.5) * 0.15;

    // Lerp for smooth easing
    camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.05;
    camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.05;
  });

  return null;
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      {/* Soft lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 5]} intensity={0.6} />

      {/* Smaller planets at bottom corners */}
      <SmoothPlanet
        position={[-6, -12, -5]}
        size={10}
        color="#e8e4d9"
        speed={0.005}
      />

      <SmoothPlanet
        position={[7, -13, -6]}
        size={11}
        color="#f0ebe0"
        speed={0.004}
      />

      {/* Mouse parallax camera control */}
      <CameraController mousePosition={mousePosition} />
    </>
  );
}

export default function Planets() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[40vh] z-20">
      <Canvas
        camera={{ position: [0, 2, 15], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
