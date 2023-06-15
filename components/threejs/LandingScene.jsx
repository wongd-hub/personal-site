// https://www.youtube.com/watch?v=wRmeFtRkF-8

import React, { Suspense, useState, useEffect, useMemo, useRef } from "react";
import { Object3D } from "three";
import { HemisphereLight, DirectionalLight } from "three";
import { useThree, Canvas, useFrame, extend } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import noise, { perlin3 } from "../assets/noise";
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

extend({ HemisphereLight, DirectionalLight });

function ProceduralPoints({
  position,
  rotation,
  grid: { width, height, sep },
  anim: { init, update },
}) {
  // These are square right now, to get them to both be circles AND colored (tex can't be coloured it seems)
  //  may need to dip into shaders:
  //  Particular shader to use: https://www.desultoryquest.com/blog/drawing-anti-aliased-circular-points-using-opengl-slash-webgl/
  //  How to implement shaders in R3F: https://codesandbox.io/s/hopeful-chatelet-lt473?from-embed=&file=/src/dotmaterial.js

  // const imgTex = useTexture("/assets/images/circle.png");
  const posRef = useRef(undefined);
  let colorRef = useRef(undefined);
  let t = init;

  const seed = Math.floor(Math.random() * 2 ** 16);
  noise.seed(seed);

  const sampleNoise = (x, y, z) => {
    let scale = 1 / 8;
    let octaves = 20;
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
    // Note r/g/b here range between 0 and 1.
    // Adding t makes colours change as a function of time
    // Making most of the colours depend heavily on z means that colour 
    // will most heavily depend on height which is what we want.
    return {
      r: z + Math.cos(t * 2),
      g: z / 10,
      b: Math.sqrt(x ** 2 + y ** 2) / 100 + (Math.sin(t) - 0.3) / 2
    };
  };

  // Set initial positions
  let { positions, colors, normals } = useMemo(() => {
    let positions = [],
      colors = [],
      normals = [];

    for (let yi = 0; yi < height; yi++) {
      for (let xi = 0; xi < width; xi++) {
        // Generate initial positions
        let x = sep * (xi - (width - 1) / 2.0);
        let y = sep * (yi - (height - 1) / 2.0);
        let z = sampleNoise(x, y, t);
        positions.push(x, y, z);

        // Generate colour values
        let color = colorOfXYZT(x, y, z, t);
        colors.push(color.r, color.g, color.b);

        // Generate normals
        normals.push(0, 0, 1);
      }
    }
    // console.log(colors);
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      normals: new Float32Array(normals),
    };
  }, [width, height, sep, t]);

  // Index buffer saves redundant rendering of vertices that are shared amongst multiple triangles
  // Loop over all squares in the grid and triangulate each one
  let indices = useMemo(() => {
    let indices = [];
    let i = 0;
    for (let yi = 0; yi < height - 1; yi++) {
      for (let xi = 0; xi < width - 1; xi++) {
        indices.push(i, i + 1, i + width + 1); // Bottom right triangle
        indices.push(i + width + 1, i + width, i);
        i++;
      }
    }

    return new Uint16Array(indices);
  }, [width, height]);

  // Animate
  useFrame(() => {
    t = update(t);
    const positions = posRef.current.array;
    const colors = colorRef.current.array;

    let i = 0;
    for (let yi = 0; yi < height; yi++) {
      for (let xi = 0; xi < width; xi++) {
        positions[i + 2] = sampleNoise(positions[i], positions[i + 1], t);
        let c = colorOfXYZT(
          positions[i],
          positions[i + 1],
          positions[i + 2],
          t
        );
        colors[i] = c.r;
        colors[i + 1] = c.g;
        colors[i + 2] = c.b;
        i += 3;
      }
    }

    posRef.current.needsUpdate = true;
    colorRef.current.needsUpdate = true;
  });

  return (
    <points position={position} rotation={rotation}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={posRef}
          attachObject={["attributes", "position"]}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          ref={colorRef}
          attachObject={["attributes", "color"]}
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "normal"]}
          array={normals}
          count={normals.length / 3}
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
        vertexColors
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

function Scene({ grid }) {

  const { camera } = useThree();
  const scrollY = useRef(window.scrollY);
  const target = new Object3D();

  const damping = 0.1;
  const cameraPanPivotPoint = 0.55;

  const onScroll = () => {
    scrollY.current = window.scrollY;
  };

  useFrame(() => {

    // Fly along the waves and move upwards at the end ----

    // Calculate the current scroll offset as a ratio of the 
    // height of the viewport
    const scrollOffset = scrollY.current / window.innerHeight;
    let targetY, targetZ;

    // As you scroll down:
    //  - Move the camera downwards (Y-direction) until quarter of 
    //     the way in, then keep at that point until just after the
    //     camera panning upwards at which point move upwards slightly
    //     to make sure none of the points are still visible 
    if (scrollOffset < 0.25) {
      targetY = 7 - scrollOffset * 7;
    } else if (scrollOffset > cameraPanPivotPoint * 1.1){
      targetY = 7 - scrollOffset * 3;
    } else {
      targetY = 7 - 0.25 * 7
    }
    
    //  - Move the camera forwards as well
    targetZ = 50 - scrollOffset * 100;

    // Update camera position to the targets, use linear interpolation
    // to make the movement smoother
    camera.position.y += (targetY - camera.position.y) * damping;
    camera.position.z += (targetZ - camera.position.z) * damping;

    // Set up a target ball for the camera to track
    // Update target ball's position as you scroll
    if (scrollOffset < cameraPanPivotPoint) {
      target.position.set(
        0, 
        0,
        // Move the point of focus forward at the same speed as the camera
        // don't move in any other direction until cameraPanPivotPoint
        -scrollOffset * 100
      );
    } else {
      target.position.set(
        0, 
        // Exponential for a slow, then fast movement once cameraPanPivotPoint
        // is reached
        (scrollOffset - cameraPanPivotPoint) ** 2 * 290,
        -scrollOffset * 100
      );
    }

    // Update camera to look at the target ball
    camera.lookAt(target.position);

    // Update camera matrix
    camera.updateProjectionMatrix();

  });

  // Set initial position
  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => { window.removeEventListener('scroll', onScroll) };
  }, [camera]);

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
      />
      <hemisphereLight args={["#AF67E9", "#6565E7", 2]} />
      <EffectComposer>
        <DepthOfField focusDistance={0.75} focalLength={0.2} bokehScale={2} height={480} />
      </EffectComposer>
    </>
  )
}

export default function RippleScene(props) {

  const [grid, setGrid] = useState({
    width: 120,
    height: 120,
    sep: 1.5,
  });

  useEffect(() => {
    // TODO: May need to make this change only when there is a shift to a different bucket
    //   This is causing issues when pulling down to refresh on iPhone at least
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setGrid({
          width: 60,
          height: 50,
          sep: 1.5,
        });
      } else if (window.innerWidth < 800) {
        setGrid({
          width: 60,
          height: 65,
          sep: 1.5,
        });
      } else if (window.innerWidth < 1000) {
        setGrid({
          width: 60,
          height: 80,
          sep: 1.5,
        });
      } else if (window.innerWidth < 1200) {
        setGrid({
          width: 60,
          height: 100,
          sep: 1.5,
        });
      } else {
        setGrid({
          width: 60,
          height: 120,
          sep: 1.5,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Canvas
        flat
        linear
        colorManagement={false}
        camera={{ 
          // position: [50, 10, 0],
          fov: 75, near: 1, far: 100
        }}
        className="gallery-canvas"
        style={props.style}
      >
        <color attach="background" args={["black"]} />
        <Suspense fallback={null}>
          <Scene grid={grid} />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
