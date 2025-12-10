/* eslint-disable react/no-unknown-property */
import { useRef, useEffect, useState } from 'react';
import '../../index.css';

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;
uniform float colorNum;
uniform int isDarkTheme;
uniform sampler2D patternTexture;
uniform vec2 textureSize;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2)); 
}

// Brightness wave that sweeps across periodically
float brightnessWave(vec2 uv, float t) {
  // Create a moving wave front
  float wavePos = mod(t * 0.3, 3.0) - 1.5; // Repeats every ~10 seconds
  float dist = length(uv - vec2(wavePos, 0.0));
  
  // Create a smooth circular wave with falloff (tighter wave)
  float wave = 1.0 - smoothstep(0.0, 0.7, dist);
  wave = pow(wave, 2.0);
  
  return wave * 0.4; // Max brightness boost of 0.4
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = pattern(uv);
  
  // Add brightness wave
  float brightBoost = brightnessWave(uv, time);
  f += brightBoost;
  
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  vec3 col = mix(vec3(0.0), waveColor, f);
  
  // Apply dithering inline with 4x4 Bayer matrix (30% larger pixels)
  vec2 coord = gl_FragCoord.xy / 1.5;
  int x = int(mod(coord.x, 4.0));
  int y = int(mod(coord.y, 4.0));
  int idx = y * 4 + x;
  
  // Bayer 4x4 thresholds (WebGL 1.0 compatible)
  float threshold = 0.0;
  if (idx == 0) threshold = 0.0/16.0;
  else if (idx == 1) threshold = 8.0/16.0;
  else if (idx == 2) threshold = 2.0/16.0;
  else if (idx == 3) threshold = 10.0/16.0;
  else if (idx == 4) threshold = 12.0/16.0;
  else if (idx == 5) threshold = 4.0/16.0;
  else if (idx == 6) threshold = 14.0/16.0;
  else if (idx == 7) threshold = 6.0/16.0;
  else if (idx == 8) threshold = 3.0/16.0;
  else if (idx == 9) threshold = 11.0/16.0;
  else if (idx == 10) threshold = 1.0/16.0;
  else if (idx == 11) threshold = 9.0/16.0;
  else if (idx == 12) threshold = 15.0/16.0;
  else if (idx == 13) threshold = 7.0/16.0;
  else if (idx == 14) threshold = 13.0/16.0;
  else if (idx == 15) threshold = 5.0/16.0;
  
  threshold -= 0.25;
  float step = 1.0 / (colorNum - 1.0);
  float brightness = col.r;
  
  if (isDarkTheme == 1) {
    float boostFactor = smoothstep(0.02, 0.07, brightness) * (1.0 - smoothstep(0.17, 0.22, brightness));
    col.rgb += vec3(col.r * 0.2 * boostFactor, 0.0, 0.0);
  } else {
    float boostFactor = smoothstep(0.02, 0.07, brightness) * (1.0 - smoothstep(0.17, 0.22, brightness));
    col.rgb += vec3(0.0, 0.0, col.b * 0.2 * boostFactor);
  }
  
  col += threshold * step;
  vec3 dithered = floor(clamp(col - 0.2, 0.0, 1.0) * (colorNum - 1.0) + 0.5) / (colorNum - 1.0) + vec3(0.033);
  
  if (isDarkTheme == 1) {
    dithered.r *= 1.2;
  } else {
    dithered.b *= 1.2;
  }
  
  // Apply pattern mask
  vec2 patternUV = mod(gl_FragCoord.xy, textureSize) / textureSize;
  float patternMask = texture2D(patternTexture, patternUV).r;
  
  gl_FragColor = vec4(dithered * patternMask, 1.0);
}
`;


function useWebGLShader(canvasRef, {
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius
}) {
    const [isDark, setIsDark] = useState(true);
    const glRef = useRef(null);
    const programRef = useRef(null);
    const uniformsRef = useRef({});
    const mouseRef = useRef({ x: 0, y: 0 });
    const startTimeRef = useRef(Date.now());
    const rafRef = useRef(null);
    const textureRef = useRef(null);
    const textureSizeRef = useRef({ width: 14, height: 14 });

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }
        glRef.current = gl;

        // Compile shaders
        const createShader = (type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vs = createShader(gl.VERTEX_SHADER, vertexShader);
        const fs = createShader(gl.FRAGMENT_SHADER, fragmentShader);

        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return;
        }

        programRef.current = program;
        gl.useProgram(program);

        // Setup geometry (fullscreen quad)
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1
        ]), gl.STATIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        // Get uniform locations
        uniformsRef.current = {
            resolution: gl.getUniformLocation(program, 'resolution'),
            time: gl.getUniformLocation(program, 'time'),
            waveSpeed: gl.getUniformLocation(program, 'waveSpeed'),
            waveFrequency: gl.getUniformLocation(program, 'waveFrequency'),
            waveAmplitude: gl.getUniformLocation(program, 'waveAmplitude'),
            waveColor: gl.getUniformLocation(program, 'waveColor'),
            mousePos: gl.getUniformLocation(program, 'mousePos'),
            enableMouseInteraction: gl.getUniformLocation(program, 'enableMouseInteraction'),
            mouseRadius: gl.getUniformLocation(program, 'mouseRadius'),
            colorNum: gl.getUniformLocation(program, 'colorNum'),
            isDarkTheme: gl.getUniformLocation(program, 'isDarkTheme'),
            patternTexture: gl.getUniformLocation(program, 'patternTexture'),
            textureSize: gl.getUniformLocation(program, 'textureSize')
        };

        // Load pattern texture
        const texture = gl.createTexture();
        textureRef.current = texture;
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        // Load image
        const image = new Image();
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            textureSizeRef.current = { width: image.width, height: image.height };
        };
        image.src = '/pill_pattern.png';

        // Handle resize
        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uniformsRef.current.resolution, canvas.width, canvas.height);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // Handle mouse
        const handleMouseMove = (e) => {
            if (!enableMouseInteraction) return;
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            mouseRef.current.x = (e.clientX - rect.left) * dpr;
            mouseRef.current.y = (e.clientY - rect.top) * dpr;
        };

        canvas.addEventListener('mousemove', handleMouseMove);

        // Render loop
        const render = () => {
            const gl = glRef.current;
            const program = programRef.current;
            const uniforms = uniformsRef.current;

            if (!gl || !program) return;

            gl.useProgram(program);

            // Update uniforms
            const currentTime = disableAnimation ? 0 : (Date.now() - startTimeRef.current) / 1000;
            gl.uniform1f(uniforms.time, currentTime);
            gl.uniform1f(uniforms.waveSpeed, waveSpeed);
            gl.uniform1f(uniforms.waveFrequency, waveFrequency);
            gl.uniform1f(uniforms.waveAmplitude, waveAmplitude);
            gl.uniform3f(uniforms.waveColor, waveColor[0], waveColor[1], waveColor[2]);
            gl.uniform2f(uniforms.mousePos, mouseRef.current.x, mouseRef.current.y);
            gl.uniform1i(uniforms.enableMouseInteraction, enableMouseInteraction ? 1 : 0);
            gl.uniform1f(uniforms.mouseRadius, mouseRadius);
            gl.uniform1f(uniforms.colorNum, colorNum);
            gl.uniform1i(uniforms.isDarkTheme, isDark ? 1 : 0);

            // Set texture uniforms
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
            gl.uniform1i(uniforms.patternTexture, 0);
            gl.uniform2f(uniforms.textureSize, textureSizeRef.current.width, textureSizeRef.current.height);

            // Draw
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            rafRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            if (gl && program) {
                gl.deleteProgram(program);
            }
            if (gl && textureRef.current) {
                gl.deleteTexture(textureRef.current);
            }
        };
    }, [waveSpeed, waveFrequency, waveAmplitude, waveColor, colorNum, disableAnimation, enableMouseInteraction, mouseRadius, isDark]);
}

export default function Dither({
    waveSpeed = 0.05,
    waveFrequency = 3,
    waveAmplitude = 0.3,
    waveColor = [0.5, 0.5, 0.5],
    colorNum = 4,
    disableAnimation = false,
    enableMouseInteraction = true,
    mouseRadius = 1
}) {
    const canvasRef = useRef(null);

    useWebGLShader(canvasRef, {
        waveSpeed,
        waveFrequency,
        waveAmplitude,
        waveColor,
        colorNum,
        disableAnimation,
        enableMouseInteraction,
        mouseRadius
    });

    return (
        <canvas
            ref={canvasRef}
            className="dither-container"
            style={{
                width: '100%',
                height: '100%',
                display: 'block'
            }}
        />
    );
}
