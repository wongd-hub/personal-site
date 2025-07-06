import React from 'react';
import { Canvas } from '@react-three/fiber';

export default function TestCanvas() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: 10,
      background: 'blue' 
    }}>
      <Canvas>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color="red" />
        </mesh>
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
} 