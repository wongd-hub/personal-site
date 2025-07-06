import { ShaderMaterial } from 'three';

const vertexShader = `
  attribute vec3 color;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = 0.5 * ( 300.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    // Create circular point by measuring distance from center
    vec2 coord = gl_PointCoord - vec2(0.5);
    float len = length(coord);
    
    // Discard pixels outside the circle
    if (len > 0.5) discard;
    
    // Smooth edge for anti-aliasing
    float alpha = 1.0 - smoothstep(0.4, 0.5, len);
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const CircularPointMaterial = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent: true,
  vertexColors: true,
});

export default CircularPointMaterial;