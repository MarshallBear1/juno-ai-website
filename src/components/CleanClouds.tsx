'use client';

import { Canvas } from '@react-three/fiber';
import { Cloud, Clouds, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

function CloudScene() {
  return (
    <>
      {/* Soft ambient lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 5, 5]} intensity={0.3} />
      
      {/* Volumetric clouds using drei */}
      <Clouds material={undefined}>
        {/* Back layer - darker, larger */}
        <Cloud 
          position={[-4, -2, -5]} 
          speed={0.2} 
          opacity={0.5}
          color="#3d3d7a"
          segments={20}
          bounds={[6, 2, 2]}
          volume={6}
        />
        <Cloud 
          position={[4, -2.5, -6]} 
          speed={0.15} 
          opacity={0.4}
          color="#2a2a5e"
          segments={20}
          bounds={[8, 2, 2]}
          volume={8}
        />
        
        {/* Middle layer */}
        <Cloud 
          position={[0, -1.5, -3]} 
          speed={0.25} 
          opacity={0.6}
          color="#5252a3"
          segments={25}
          bounds={[10, 2, 2]}
          volume={5}
        />
        <Cloud 
          position={[-6, -1.8, -4]} 
          speed={0.2} 
          opacity={0.5}
          color="#4a4a8f"
          segments={20}
          bounds={[5, 2, 2]}
          volume={4}
        />
        <Cloud 
          position={[6, -1.6, -3]} 
          speed={0.22} 
          opacity={0.55}
          color="#4a4a8f"
          segments={20}
          bounds={[5, 2, 2]}
          volume={4}
        />
        
        {/* Front layer - lighter, smaller */}
        <Cloud 
          position={[-2, -1, -1]} 
          speed={0.3} 
          opacity={0.7}
          color="#6b6bb8"
          segments={15}
          bounds={[4, 1.5, 1]}
          volume={3}
        />
        <Cloud 
          position={[3, -1.2, -1]} 
          speed={0.28} 
          opacity={0.65}
          color="#6b6bb8"
          segments={15}
          bounds={[4, 1.5, 1]}
          volume={3}
        />
      </Clouds>
    </>
  );
}

export default function CleanClouds() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[50vh] z-20 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CloudScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
