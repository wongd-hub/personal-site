import { ShaderMaterial, Vector3, Color } from 'three';
// import { extend } from '@react-three/fiber';

const vertexShader = `
  varying vec2 vUv;

  void main()  {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = 8.0 * ( 300.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform vec3 color;

  void main() {
    float len = length(vUv - vec2(0.5));
    if (len > 0.5) discard;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const myPointMaterial = new ShaderMaterial({
  uniforms: {
    color: { value: new Color('red') },
  },
  vertexShader,
  fragmentShader,
  transparent: true,
});

export default myPointMaterial