'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Single cloud layer mesh
function CloudLayer({ 
  y, 
  z, 
  color, 
  opacity, 
  speed,
  amplitude,
  frequency 
}: { 
  y: number; 
  z: number; 
  color: string; 
  opacity: number;
  speed: number;
  amplitude: number;
  frequency: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  
  // Create wavy cloud geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(viewport.width * 2.5, 3, 128, 1);
    const positions = geo.attributes.position.array as Float32Array;
    
    // Create wavy top edge
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      // Add wave to top vertices (y > 0)
      if (positions[i + 1] > 0) {
        positions[i + 1] += Math.sin(x * frequency) * amplitude + Math.sin(x * frequency * 0.5) * amplitude * 0.5;
      }
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [viewport.width, amplitude, frequency]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle floating animation
    meshRef.current.position.y = y + Math.sin(state.clock.elapsedTime * speed) * 0.1;
    
    // Subtle parallax based on mouse
    meshRef.current.position.x = pointer.x * (z * -0.3);
  });

  return (
    <mesh ref={meshRef} position={[0, y, z]} geometry={geometry}>
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Volumetric cloud puff
function CloudPuff({ 
  position, 
  scale, 
  color,
  opacity 
}: { 
  position: [number, number, number]; 
  scale: number; 
  color: string;
  opacity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const initialY = position[1];
  const depth = position[2];

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle bobbing
    meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
    
    // Parallax response to mouse
    meshRef.current.position.x = position[0] + pointer.x * (depth * -0.5);
    meshRef.current.position.y = initialY + pointer.y * (depth * -0.2) + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={opacity}
      />
    </mesh>
  );
}

function CloudScene() {
  const { viewport } = useThree();
  
  // Generate cloud puffs for each layer
  const cloudPuffs = useMemo(() => {
    const puffs: Array<{
      position: [number, number, number];
      scale: number;
      color: string;
      opacity: number;
    }> = [];
    
    // Back layer puffs - darkest
    for (let i = 0; i < 15; i++) {
      puffs.push({
        position: [
          (Math.random() - 0.5) * viewport.width * 2,
          -1.8 + Math.random() * 0.3,
          -3 + Math.random() * 0.5
        ],
        scale: 0.8 + Math.random() * 0.6,
        color: '#1a1a3e',
        opacity: 0.9,
      });
    }
    
    // Mid-back layer
    for (let i = 0; i < 12; i++) {
      puffs.push({
        position: [
          (Math.random() - 0.5) * viewport.width * 2,
          -1.5 + Math.random() * 0.3,
          -2 + Math.random() * 0.5
        ],
        scale: 0.6 + Math.random() * 0.5,
        color: '#2a2a5e',
        opacity: 0.85,
      });
    }
    
    // Middle layer
    for (let i = 0; i < 10; i++) {
      puffs.push({
        position: [
          (Math.random() - 0.5) * viewport.width * 2,
          -1.2 + Math.random() * 0.3,
          -1 + Math.random() * 0.5
        ],
        scale: 0.5 + Math.random() * 0.4,
        color: '#3d3d7a',
        opacity: 0.8,
      });
    }
    
    // Front layer - lightest
    for (let i = 0; i < 8; i++) {
      puffs.push({
        position: [
          (Math.random() - 0.5) * viewport.width * 2,
          -0.9 + Math.random() * 0.2,
          0 + Math.random() * 0.5
        ],
        scale: 0.4 + Math.random() * 0.3,
        color: '#5252a3',
        opacity: 0.7,
      });
    }
    
    return puffs;
  }, [viewport.width]);

  return (
    <>
      {/* Layered cloud bands */}
      <CloudLayer y={-2.2} z={-4} color="#0d0d25" opacity={1} speed={0.3} amplitude={0.3} frequency={0.8} />
      <CloudLayer y={-1.9} z={-3} color="#1a1a3e" opacity={0.95} speed={0.35} amplitude={0.35} frequency={0.7} />
      <CloudLayer y={-1.6} z={-2} color="#2a2a5e" opacity={0.9} speed={0.4} amplitude={0.4} frequency={0.6} />
      <CloudLayer y={-1.3} z={-1} color="#3d3d7a" opacity={0.85} speed={0.45} amplitude={0.35} frequency={0.5} />
      <CloudLayer y={-1.0} z={0} color="#5252a3" opacity={0.8} speed={0.5} amplitude={0.3} frequency={0.4} />
      
      {/* Cloud puffs for volume */}
      {cloudPuffs.map((puff, i) => (
        <CloudPuff key={i} {...puff} />
      ))}
    </>
  );
}

export default function Clouds3D() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[40vh] z-20">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <CloudScene />
      </Canvas>
    </div>
  );
}
