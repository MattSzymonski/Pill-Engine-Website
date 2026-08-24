// REQUIREMENTS
//   - Browser with WebGL support (falls back to orbs + grid without WebGL).
//   - /pill_pattern.png served from the docs public dir (optional; a black
//     fallback texture is used when the image is missing).
//
// DESCRIPTION
//   Ports the landing page hero background (landing_page/src/components/
//   sections/Hero.jsx) to the docs home page as a dependency-free, fixed,
//   full-viewport layer. The stack, in painting order, is:
//     1. An animated WebGL "dither" canvas (identical shader to the landing
//        Dither.jsx component, with the Hero's exact prop values).
//     2. Three blurred brand-red glow orbs that gently pulse.
//     3. A subtle 64px grid pattern.
//   The layer is mounted only while the home page (.VPContent.is-home) is
//   the active route and is torn down everywhere else (guide/reference).
//
// USAGE
//   import { initHomeBackground } from './hero-dither'
//   initHomeBackground()   // call once in enhanceApp (client only)
//
// EXAMPLE USAGE
//   enhanceApp(ctx) {
//     if (typeof window === 'undefined') return
//     initHomeBackground()
//     ...
//   }

// ── WebGL shaders ──
// Vertex shader draws a fullscreen triangle strip.
const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Fragment shader: animated grain + fbm noise field, two drifting orbs,
// warm center glow, floating specks, vignette and a pill-pattern mask.
// Identical to landing_page/src/components/effects/Dither.jsx.
const FRAGMENT_SHADER = `
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

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
    );
}

float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 3; i++) {
        value += amp * noise(p * freq);
        freq *= 2.0;
        amp *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float t = time;

    // Animated grain - faster, more alive
    float grain = hash(uv + t * 0.3 + sin(uv.y * 50.0 + t) * 0.02) * 0.05;

    // Noise field with drifting motion
    float n = fbm(uv * 3.0 + vec2(t * 0.08, t * 0.05)) * waveAmplitude * 0.45;
    float n2 = fbm(uv * 5.5 + vec2(-t * 0.06, t * 0.07) + n) * 0.15;

    // Drifting orbs - brand red slowly orbits, blue orbits opposite
    vec2 orb1Center = vec2(0.75 + sin(t * 0.15) * 0.06, 0.35 + cos(t * 0.18) * 0.05);
    vec2 orb1 = uv - orb1Center;
    float glow1 = exp(-length(orb1) * 2.5) * (0.10 + sin(t * 0.4) * 0.03);
    vec3 orbColor1 = vec3(1.0, 0.39, 0.39);

    vec2 orb2Center = vec2(0.22 + cos(t * 0.13) * 0.05, 0.75 + sin(t * 0.16) * 0.06);
    vec2 orb2 = uv - orb2Center;
    float glow2 = exp(-length(orb2) * 3.0) * (0.07 + cos(t * 0.35) * 0.02);
    vec3 orbColor2 = vec3(0.25, 0.45, 0.9);

    // Warm center glow - gently pulsing
    vec2 center = uv - vec2(0.5 + sin(t * 0.1) * 0.03, 0.45 + cos(t * 0.12) * 0.02);
    float glowCenter = exp(-length(center) * 4.0) * (0.04 + sin(t * 0.5) * 0.015);

    // Floating specks
    float specks = 0.0;
    for (int i = 0; i < 6; i++) {
        float fi = float(i);
        vec2 speckPos = vec2(
            sin(t * (0.3 + fi * 0.03) + fi) * 0.45 + 0.5,
            cos(t * (0.22 + fi * 0.04) + fi * 2.0) * 0.45 + 0.5
        );
        float dist = length(uv - speckPos);
        float speckGlow = exp(-dist * 40.0) * (0.02 + sin(t * 1.5 + fi) * 0.01);
        specks += speckGlow;
    }

    // Compose
    float base = n + n2 + grain;
    vec3 col = vec3(0.0);

    col += orbColor1 * glow1;
    col += orbColor2 * glow2;
    col += vec3(1.0, 0.7, 0.5) * glowCenter;
    col += vec3(1.0, 0.9, 0.8) * specks * 0.6;
    col += base * 0.055;

    // Subtle vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.4;
    col *= vignette;

    // Pill pattern mask
    vec2 patternUV = mod(gl_FragCoord.xy, textureSize) / textureSize;
    float patternMask = texture2D(patternTexture, patternUV).r;
    float pillMask = 1.0 - patternMask * 0.25;
    col *= pillMask;

    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
}
`;

// Dither settings copied from the landing page Hero.jsx <Dither ... /> props.
const DITHER_SETTINGS = {
  waveSpeed: 0.03,
  waveFrequency: 2.5,
  waveAmplitude: 0.24,
  waveColor: [0.6, 0.6, 0.6] as const,
  colorNum: 5,
  disableAnimation: false,
  enableMouseInteraction: false,
  mouseRadius: 0.25,
};

// Single active background layer. Only one is ever mounted at a time.
let backgroundLayer: HTMLElement | null = null;
let stopDither: (() => void) | null = null;
let routeObserver: MutationObserver | null = null;

// True while the docs theme is in dark mode (drives the isDarkTheme uniform).
function isDarkTheme(): boolean {
  return document.documentElement.classList.contains('dark');
}

// Compiles one shader stage, returning null (and cleaning up) on failure.
function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Runs the animated WebGL dither on the given canvas. Returns a cleanup
// function that stops the render loop and releases GL resources.
function startDither(canvas: HTMLCanvasElement): () => void {
  const gl: WebGLRenderingContext | null =
    canvas.getContext('webgl') ||
    (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
  if (!gl) return () => {};

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return () => {};

  const program = gl.createProgram();
  if (!program) return () => {};
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return () => {};
  gl.useProgram(program);

  // Fullscreen triangle strip (two triangles from four vertices).
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const positionLocation = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    resolution: uniform('resolution'),
    time: uniform('time'),
    waveSpeed: uniform('waveSpeed'),
    waveFrequency: uniform('waveFrequency'),
    waveAmplitude: uniform('waveAmplitude'),
    waveColor: uniform('waveColor'),
    mousePos: uniform('mousePos'),
    enableMouseInteraction: uniform('enableMouseInteraction'),
    mouseRadius: uniform('mouseRadius'),
    colorNum: uniform('colorNum'),
    isDarkTheme: uniform('isDarkTheme'),
    patternTexture: uniform('patternTexture'),
    textureSize: uniform('textureSize'),
  };

  // Pill pattern texture (subtly darkens behind the logo area).
  const patternTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, patternTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  let textureSize = { width: 14, height: 14 };
  const patternImage = new Image();
  patternImage.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, patternTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, patternImage);
    textureSize = { width: patternImage.width, height: patternImage.height };
  };
  patternImage.onerror = () => {
    // Black 1x1 fallback keeps the mask neutral if the pattern is missing.
    gl.bindTexture(gl.TEXTURE_2D, patternTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    textureSize = { width: 1, height: 1 };
  };
  patternImage.src = '/pill_pattern.png';

  // Keep the drawing buffer in sync with the layer's viewport size.
  const handleResize = () => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.round(canvas.clientWidth * devicePixelRatio);
    canvas.height = Math.round(canvas.clientHeight * devicePixelRatio);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
  };
  handleResize();
  window.addEventListener('resize', handleResize);

  const startTime = Date.now();
  let animationFrame = 0;

  const render = () => {
    const currentTime = DITHER_SETTINGS.disableAnimation ? 0 : (Date.now() - startTime) / 1000;
    gl.uniform1f(uniforms.time, currentTime);
    gl.uniform1f(uniforms.waveSpeed, DITHER_SETTINGS.waveSpeed);
    gl.uniform1f(uniforms.waveFrequency, DITHER_SETTINGS.waveFrequency);
    gl.uniform1f(uniforms.waveAmplitude, DITHER_SETTINGS.waveAmplitude);
    gl.uniform3f(uniforms.waveColor, DITHER_SETTINGS.waveColor[0], DITHER_SETTINGS.waveColor[1], DITHER_SETTINGS.waveColor[2]);
    gl.uniform2f(uniforms.mousePos, 0, 0);
    gl.uniform1i(uniforms.enableMouseInteraction, DITHER_SETTINGS.enableMouseInteraction ? 1 : 0);
    gl.uniform1f(uniforms.mouseRadius, DITHER_SETTINGS.mouseRadius);
    gl.uniform1f(uniforms.colorNum, DITHER_SETTINGS.colorNum);
    gl.uniform1i(uniforms.isDarkTheme, isDarkTheme() ? 1 : 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, patternTexture);
    gl.uniform1i(uniforms.patternTexture, 0);
    gl.uniform2f(uniforms.textureSize, textureSize.width, textureSize.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    animationFrame = requestAnimationFrame(render);
  };
  render();

  return () => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationFrame);
    gl.deleteProgram(program);
    gl.deleteTexture(patternTexture);
  };
}

// Builds the fixed background layer: canvas + glow orbs + grid pattern.
function buildBackgroundLayer(): HTMLElement {
  const layer = document.createElement('div');
  layer.className = 'hero-background';
  layer.setAttribute('aria-hidden', 'true');

  const canvas = document.createElement('canvas');
  layer.appendChild(canvas);

  // Three blurred glow orbs, sized and placed like the landing hero's.
  const orbOne = document.createElement('div');
  orbOne.className = 'hero-orb orb-one';
  const orbTwo = document.createElement('div');
  orbTwo.className = 'hero-orb orb-two';
  const orbThree = document.createElement('div');
  orbThree.className = 'hero-orb orb-three';
  layer.append(orbOne, orbTwo, orbThree);

  // Subtle 64px grid pattern.
  const grid = document.createElement('div');
  grid.className = 'hero-grid';
  layer.appendChild(grid);

  return layer;
}

// Mounts the background layer and starts the dither render loop.
function mountBackground(): void {
  if (backgroundLayer) return;
  backgroundLayer = buildBackgroundLayer();
  document.body.appendChild(backgroundLayer);
  const canvas = backgroundLayer.querySelector('canvas');
  if (canvas) stopDither = startDither(canvas);
}

// Tears down the background layer and stops the render loop.
function unmountBackground(): void {
  stopDither?.();
  stopDither = null;
  backgroundLayer?.remove();
  backgroundLayer = null;
}

// Syncs the layer with the active route: home page mounts it, every other
// page removes it. Safe to call repeatedly.
function syncHomeBackground(): void {
  const isHomePage = document.querySelector('.VPContent.is-home') !== null;
  if (isHomePage) {
    mountBackground();
  } else {
    unmountBackground();
  }
}

// Initializes route syncing. Call once from enhanceApp (client only).
// A MutationObserver handles both the first render and SPA navigation.
export function initHomeBackground(): void {
  if (typeof window === 'undefined') return;
  syncHomeBackground();
  if (routeObserver) routeObserver.disconnect();
  routeObserver = new MutationObserver(() => syncHomeBackground());
  routeObserver.observe(document.body, { childList: true, subtree: true });
}
