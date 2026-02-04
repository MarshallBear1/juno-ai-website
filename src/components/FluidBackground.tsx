'use client';

import { useEffect, useRef } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader - subtle gradient with faint aurora
    const fragmentShaderSource = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform float u_time;

      // Simple noise function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;

        // Base gradient - lighter at top, darker at bottom and sides
        float verticalGradient = 1.0 - uv.y;
        float horizontalDarken = abs(uv.x - 0.5) * 0.3;

        // Rich vibrant blue/indigo color
        vec3 darkBlue = vec3(0.04, 0.02, 0.18);
        vec3 midBlue = vec3(0.12, 0.08, 0.45);
        vec3 lightBlue = vec3(0.22, 0.18, 0.65);

        // Create base gradient (lighter at top)
        vec3 baseColor = mix(lightBlue, darkBlue, verticalGradient * 0.7 + horizontalDarken);

        // Curved aurora bands across middle
        float time = u_time * 0.5;

        float band = 0.0;

        // Curved band 1
        float curve1 = sin(uv.x * 4.0 + time) * 0.06 + sin(uv.x * 2.0 - time * 0.7) * 0.04;
        float dist1 = abs(uv.y - 0.5 - curve1);
        band += smoothstep(0.08, 0.0, dist1) * 0.5;

        // Curved band 2
        float curve2 = cos(uv.x * 3.5 - time * 0.8) * 0.05 + sin(uv.x * 2.5 + time * 0.6) * 0.03;
        float dist2 = abs(uv.y - 0.53 - curve2);
        band += smoothstep(0.06, 0.0, dist2) * 0.4;

        // Curved band 3
        float curve3 = sin(uv.x * 3.0 + time * 1.1) * 0.04 + cos(uv.x * 2.0 - time * 0.5) * 0.03;
        float dist3 = abs(uv.y - 0.47 - curve3);
        band += smoothstep(0.05, 0.0, dist3) * 0.3;

        // Soft edge fade
        float edgeFade = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);
        band *= edgeFade;

        // Aurora color (softer)
        vec3 auroraColor = vec3(0.30, 0.35, 0.65);

        // Add subtle curved bands
        vec3 finalColor = baseColor + auroraColor * band * 0.25;

        // Subtle vignette
        float vignette = 1.0 - length((uv - 0.5) * vec2(0.8, 0.6)) * 0.3;
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Compile shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up geometry (fullscreen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');

    let animationId: number;
    let startTime = Date.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const time = (Date.now() - startTime) / 1000;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
