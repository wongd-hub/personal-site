// https://www.youtube.com/watch?v=wRmeFtRkF-8

import React, { Suspense, useState, useEffect, useMemo, useRef, useCallback } from "react";
import * as THREE from "three";
import { useThree, Canvas, useFrame, extend } from "@react-three/fiber";
import { Loader, useTexture } from "@react-three/drei";
import noise, { perlin3 } from "../assets/noise";
// Temporarily disabled postprocessing due to Three.js version compatibility
// import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

/* 
// To enable true depth of field, upgrade Three.js to ≥0.138.0:
// npm install three@latest @react-three/drei@latest @react-three/fiber@latest

// Then wrap Scene in EffectComposer:
// <EffectComposer>
//   <Scene grid={grid} />
//   <DepthOfField 
//     focusDistance={0.02}
//     focalLength={0.005}
//     bokehScale={6}
//     height={700}
//   />
// </EffectComposer>
*/

function ProceduralPoints({
  position,
  rotation,
  grid: { width, height, sep },
  anim: { init, update },
  onDataUpdate = null, // Callback for particle data
}) {
  const posRef = useRef(undefined);
  const colorRef = useRef(undefined);
  const tRef = useRef(init);
  const lastDataEmission = useRef(0);
  
  // Load circular texture for points
  const circleTexture = useTexture("/assets/images/circle.png");
  
  // Cache noise seed to avoid re-seeding
  const seed = useMemo(() => Math.floor(Math.random() * 2 ** 16), []);
  
  // Memoize noise function setup (only runs once)
  const noiseSetup = useMemo(() => {
    noise.seed(seed);
    
    const sampleNoise = (x, y, z) => {
      let scale = 1 / 8;
      let octaves = 12; // Reduced from 20 for better performance
      let persistence = 0.3;
      let lacunarity = 2;

      let amp = 5;
      let freq = 1;
      let v = 0;
      
      for (let i = 0; i < octaves; i++) {
        v += amp * perlin3(x * freq * scale, y * freq * scale, z);
        amp *= persistence;
        freq *= lacunarity;
      }
      return v;
    };

    const colorOfXYZT = (x, y, z, t) => {
      // Pre-calculate expensive operations
      const cosT = Math.cos(t * 2);
      const sinT = Math.sin(t);
      const distFromCenter = Math.sqrt(x ** 2 + y ** 2) / 100;
      
      return {
        r: z + cosT,
        g: z / 10,
        b: distFromCenter + (sinT - 0.3) / 2
      };
    };

    return { sampleNoise, colorOfXYZT };
  }, [seed]);

  // Initial geometry setup - only depends on grid dimensions
  const initialGeometry = useMemo(() => {
    const { sampleNoise, colorOfXYZT } = noiseSetup;
    let positions = [],
        colors = [],
        normals = [];

    for (let yi = 0; yi < height; yi++) {
      for (let xi = 0; xi < width; xi++) {
        // Generate initial positions
        let x = sep * (xi - (width - 1) / 2.0);
        let y = sep * (yi - (height - 1) / 2.0);
        let z = sampleNoise(x, y, init);
        positions.push(x, y, z);

        // Generate colour values
        let color = colorOfXYZT(x, y, z, init);
        colors.push(color.r, color.g, color.b);

        // Generate normals
        normals.push(0, 0, 1);
      }
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      normals: new Float32Array(normals),
    };
  }, [width, height, sep, init, noiseSetup]);

  // Index buffer - only depends on grid dimensions
  const indices = useMemo(() => {
    let indices = [];
    let i = 0;
    for (let yi = 0; yi < height - 1; yi++) {
      for (let xi = 0; xi < width - 1; xi++) {
        indices.push(i, i + 1, i + width + 1);
        indices.push(i + width + 1, i + width, i);
        i++;
      }
    }
    return new Uint16Array(indices);
  }, [width, height]);

  // Optimized animation loop with reduced frequency updates
  const frameCount = useRef(0);
  useFrame(() => {
    frameCount.current++;
    
    // Update only every 2nd frame for better performance
    if (frameCount.current % 2 !== 0) return;
    
    tRef.current = update(tRef.current);
    const t = tRef.current;
    
    if (!posRef.current || !colorRef.current) return;
    
    const positions = posRef.current.array;
    const colors = colorRef.current.array;
    const { sampleNoise, colorOfXYZT } = noiseSetup;

    let i = 0;
    for (let yi = 0; yi < height; yi++) {
      for (let xi = 0; xi < width; xi++) {
        // Update Z position with noise
        positions[i + 2] = sampleNoise(positions[i], positions[i + 1], t);
        
        // Update colors
        const c = colorOfXYZT(positions[i], positions[i + 1], positions[i + 2], t);
        colors[i] = c.r;
        colors[i + 1] = c.g;
        colors[i + 2] = c.b;
        i += 3;
      }
    }

    posRef.current.needsUpdate = true;
    colorRef.current.needsUpdate = true;

    // Emit particle data for analytics (super smooth - every 50ms)
    const now = Date.now();
    if (onDataUpdate && now - lastDataEmission.current > 50) {
      lastDataEmission.current = now;
      onDataUpdate({
        positions: positions,
        colors: colors,
        totalParticles: positions.length / 3,
        timestamp: now
      });
    }
  });

  return (
    <points position={position} rotation={rotation}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={posRef}
          attach="attributes-position"
          array={initialGeometry.positions}
          count={initialGeometry.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          ref={colorRef}
          attach="attributes-color"
          array={initialGeometry.colors}
          count={initialGeometry.colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-normal"
          array={initialGeometry.normals}
          count={initialGeometry.normals.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
        />
      </bufferGeometry>

      <pointsMaterial
        attach="material"
        map={circleTexture}
        vertexColors
        size={0.6}
        sizeAttenuation
        transparent={true}
        alphaTest={0.1}
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene({ grid, onParticleDataUpdate }) {
  const { camera } = useThree();
  const scrollY = useRef(window.scrollY);
  const target = useMemo(() => new THREE.Object3D(), []); // Memoize target object

  const damping = 0.1;
  const cameraPanPivotPoint = 0.55;

  const onScroll = useCallback(() => {
    scrollY.current = window.scrollY;
  }, []);

  useFrame(() => {
    const scrollOffset = scrollY.current / window.innerHeight;
    let targetY, targetZ;

    // Camera positioning logic
    if (scrollOffset < 0.25) {
      targetY = 7 - scrollOffset * 7;
    } else if (scrollOffset > cameraPanPivotPoint * 1.1){
      targetY = 7 - scrollOffset * 3;
    } else {
      targetY = 7 - 0.25 * 7
    }
    
    targetZ = 50 - scrollOffset * 100;

    // Smooth camera movement
    camera.position.y += (targetY - camera.position.y) * damping;
    camera.position.z += (targetZ - camera.position.z) * damping;

    // Update target position
    if (scrollOffset < cameraPanPivotPoint) {
      target.position.set(0, 0, -scrollOffset * 100);
    } else {
      target.position.set(
        0, 
        (scrollOffset - cameraPanPivotPoint) ** 2 * 290,
        -scrollOffset * 100
      );
    }

    camera.lookAt(target.position);
    camera.updateProjectionMatrix();
  });

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <>
      <ProceduralPoints
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        grid={grid}
        anim={{
          init: 0,
          update: (t) => t + 0.02 * 0.2,
        }}
        onDataUpdate={onParticleDataUpdate}
      />
      <hemisphereLight args={["#AF67E9", "#6565E7", 2]} />
      {/* Temporarily disabled postprocessing due to Three.js version compatibility */}
      {/* <EffectComposer>
        <DepthOfField focusDistance={0.6} focalLength={0.15} bokehScale={3} height={480} />
      </EffectComposer> */}
    </>
  )
}

export default function RippleScene(props) {
  const { onParticleDataUpdate, ...rest } = props;
  const [grid, setGrid] = useState({
    width: 120,
    height: 120,
    sep: 1.5,
  });

  // Particle data state for analytics
  const [particleData, setParticleData] = useState(null);
  // ParticleStats overlay removed – no longer tracking visibility

  // Callback to receive particle data updates
  const handleParticleDataUpdate = useCallback((data) => {
    setParticleData(data);
    if (onParticleDataUpdate) {
      onParticleDataUpdate(data);
    }
  }, [onParticleDataUpdate]);

  // Debounced resize handler
  const resizeTimeout = useRef(null);
  
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      
      resizeTimeout.current = setTimeout(() => {
        const width = window.innerWidth;
        let newGrid;
        
        if (width < 500) {
          newGrid = { width: 40, height: 35, sep: 1.5 }; // Reduced for mobile
        } else if (width < 800) {
          newGrid = { width: 50, height: 45, sep: 1.5 };
        } else if (width < 1000) {
          newGrid = { width: 60, height: 60, sep: 1.5 };
        } else if (width < 1200) {
          newGrid = { width: 70, height: 80, sep: 1.5 };
        } else {
          newGrid = { width: 80, height: 100, sep: 1.5 }; // Reduced from 120
        }
        
        setGrid(newGrid);
      }, 150); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <Canvas
        flat
        linear
        colorManagement={false}
        camera={{ 
          fov: 75, near: 1, far: 100
        }}
        className="gallery-canvas"
        style={rest.style}
        // Add performance settings
        performance={{ min: 0.5 }}
        dpr={[1, 2]} // Limit device pixel ratio
        gl={{ antialias: true, alpha: true }} // Better antialiasing for smoother circles
      >
        <color attach="background" args={["black"]} />
        <Suspense fallback={null}>
          <Scene grid={grid} onParticleDataUpdate={handleParticleDataUpdate} />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
