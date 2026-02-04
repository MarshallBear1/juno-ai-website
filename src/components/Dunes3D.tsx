'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CartoonDune({
  position,
  scale,
  color,
  mousePos,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  mousePos: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Subtle rotation based on mouse position
      meshRef.current.rotation.x = -0.1 + mousePos.y * 0.15;
      meshRef.current.rotation.y = mousePos.x * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshToonMaterial color={color} />
    </mesh>
  );
}

function DarkPool({
  position,
  scale,
  mousePos,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  mousePos: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2 + mousePos.y * 0.1;
      meshRef.current.rotation.z = mousePos.x * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale[0], scale[1] * 0.5, scale[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1, 32]} />
      <meshToonMaterial color="#0a0a18" />
    </mesh>
  );
}

function Scene({ mousePos }: { mousePos: { x: number; y: number } }) {
  return (
    <>
      {/* Soft lighting for cartoon look */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />

      {/* Cream/beige dunes - cartoon style half spheres */}
      {/* Left large dune */}
      <CartoonDune
        position={[-4, -2.5, -2]}
        scale={[5, 3, 4]}
        color="#f5f0e1"
        mousePos={mousePos}
      />

      {/* Right large dune */}
      <CartoonDune
        position={[4, -2.8, -3]}
        scale={[6, 3.5, 5]}
        color="#faf5e8"
        mousePos={mousePos}
      />

      {/* Center back dune */}
      <CartoonDune
        position={[0, -3, -5]}
        scale={[8, 4, 6]}
        color="#ebe6d7"
        mousePos={mousePos}
      />

      {/* Small accent dune left */}
      <CartoonDune
        position={[-7, -2.2, -1]}
        scale={[3, 2, 2.5]}
        color="#fdfaf2"
        mousePos={mousePos}
      />

      {/* Small accent dune right */}
      <CartoonDune
        position={[7.5, -2.3, -1.5]}
        scale={[3.5, 2.2, 3]}
        color="#f8f3e4"
        mousePos={mousePos}
      />

      {/* Dark pools/shadows */}
      <DarkPool
        position={[-2.5, -1.3, 0.5]}
        scale={[1.5, 1, 1]}
        mousePos={mousePos}
      />
      <DarkPool
        position={[2, -1.4, 0]}
        scale={[1.2, 0.8, 1]}
        mousePos={mousePos}
      />
      <DarkPool
        position={[5.5, -1.2, 0.3]}
        scale={[1, 0.6, 1]}
        mousePos={mousePos}
      />
      <DarkPool
        position={[-5.5, -1.35, 0.2]}
        scale={[0.9, 0.5, 1]}
        mousePos={mousePos}
      />
    </>
  );
}

export default function Dunes3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp for mouse movement
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08,
        y: prev.y + (mousePos.y - prev.y) * 0.08,
      }));
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[45vh] z-20">
      <Canvas
        camera={{ position: [0, 1, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene mousePos={smoothMouse} />
      </Canvas>
    </div>
  );
}
