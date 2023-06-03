// https://www.youtube.com/watch?v=wRmeFtRkF-8

import React, { Suspense, useCallback, useMemo, useRef } from "react";
// import * as THREE from "three";
import { HemisphereLight, DirectionalLight } from "three";
import { applyProps, Canvas, useFrame, extend } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import noise, { perlin3 } from "../effects/noise";
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
    // Interpolate between two colours by finding their r/g/b,
    // using the average point as the intercept/constant, 
    // then dividing the distance between the midpoint and the lower
    // end by the magnitude of raw z (seems to be -3.3--3 with current
    // perlin noise parameters). Could functionalise if we figure out
    // the max of the perlin3 function given certain parameters, but
    // this isn't great since it doesn't give us a mid-point to delineate
    // colours. Prefer old method for now.
    // return {
    //   r: (198 + z * -18.2) / 255,
    //   g: (154 + z * -4.2) / 255,
    //   b:  (230 + z * 5.5) / 255
    // };

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
        // map={imgTex}
        // color={0x00aaff}
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

export default function RippleScene(props) {
  return (
    <>
      <Canvas
        flat
        linear
        colorManagement={false}
        camera={{ position: [50, 10, 0], fov: 75, near: 1, far: 100 }}
        className="gallery-canvas"
        style={props.style}
      >
        <color attach="background" args={["black"]} />
        <Suspense fallback={null}>
          <ProceduralPoints
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            grid={{
              width: 120,
              height: 150,
              sep: 1.5,
            }}
            anim={{
              init: 0,
              update: (t) => t + 0.02 * 0.2,
            }}
          />
          <hemisphereLight args={["#AF67E9", "#6565E7", 2]} />
          <EffectComposer>
            <DepthOfField focusDistance={0.75} focalLength={0.2} bokehScale={2} height={480} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
