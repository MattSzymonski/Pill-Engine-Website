/* eslint-disable react/no-unknown-property */
import { useRef, useEffect, forwardRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { Effect } from 'postprocessing';
import * as THREE from 'three';

import '../../index.css';

const waveVertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;

const waveFragmentShader = `
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

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = pattern(uv);
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  vec3 col = mix(vec3(0.0), waveColor, f);
  gl_FragColor = vec4(col, 1.0);
}
`;

const ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
uniform int isDarkTheme;

// 14x14 pattern array (0 = black, 1 = color) - scaled up 2x
// Center pixels have color, rest is black
const float pattern[196] = float[196](
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.2, 0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.2, 0.8, 1.0, 1.0, 0.8, 0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.2, 0.8, 0.8, 1.0, 1.0, 0.8, 0.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.2, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.8, 0.2, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.8, 0.8, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.8, 0.8, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.8, 0.2, 0.0, 0.0,
  0.0, 0.0, 0.2, 0.8, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.8, 0.8, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.8, 0.8, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.2, 0.8, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 0.8, 1.0, 1.0, 0.8, 0.8, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.8, 1.0, 1.0, 0.8, 0.2, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.2, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
);

// 8x8 Bayer matrix for dithering
const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 coord, vec3 color) {
  // Bayer matrix lookup (cached in registers)
  int x = int(mod(coord.x, 8.0));
  int y = int(mod(coord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  
  // Apply dithering with brightness boost for mid-tones
  float step = 1.0 / (colorNum - 1.0);
  float brightness = (color.r + color.g + color.b) / 3.0;
  
  // Boost red for dark theme, blue for light theme
  if (isDarkTheme == 1) {
    color.rgb += (brightness >= 0.02 && brightness <= 0.17) ? vec3(color.r * 0.12, 0.0, 0.0) : vec3(0.0);
  } else {
    color.rgb += (brightness >= 0.02 && brightness <= 0.17) ? vec3(0.0, 0.0, color.b * 0.14) : vec3(0.0);
  }
  
  //color.r += (color.r >= 0.02 && color.r <= 0.17) ? color.r * 0.10 : 0.0;
  color += threshold * step;
  color = clamp(color - 0.2, 0.0, 1.0);
  
  // Quantize and apply color reduction in one step
  vec3 ditheredColor = floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
  
  // Apply color tint based on theme
  if (isDarkTheme == 1) {
    ditheredColor.rgb *= vec3(1.1, 0.6, 0.6); // Red tint for dark theme
  } else {
    ditheredColor.rgb *= vec3(0.6, 0.6, 1.1); // Blue tint for light theme
  }
  
  ditheredColor.rgb += 0.001;

  return ditheredColor;
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  // Quantize screen into 14x14 pixel blocks (2x scale)
  float blockSize = 14.0;
  
  // Find which block this pixel belongs to
  vec2 blockCoord = floor(gl_FragCoord.xy / blockSize) * blockSize;
  vec2 blockUV = blockCoord / resolution;
  
  // Find position within the block (0-13)
  vec2 posInBlock = mod(gl_FragCoord.xy, blockSize);
  int x = int(posInBlock.y);
  int y = int(posInBlock.x);
  
  // Get pattern value for this position
  float patternValue = pattern[x * 14 + y];
  
  // Sample color from the block
  vec4 blockColor = texture2D(inputBuffer, blockUV);
  
  // Apply dithering to the block color
  vec3 ditheredColor = dither(gl_FragCoord.xy, blockColor.rgb);
  
  // Apply pattern: 0 = black, pattern value = dithered block color
  outputColor = vec4(ditheredColor * patternValue, blockColor.a);
}
`;

class RetroEffectImpl extends Effect {
    constructor() {
        const uniforms = new Map([
            ['colorNum', new THREE.Uniform(4.0)],
            ['pixelSize', new THREE.Uniform(2.0)],
            ['isDarkTheme', new THREE.Uniform(1)]
        ]);
        super('RetroEffect', ditherFragmentShader, { uniforms });
        this.uniforms = uniforms;
    }
    set colorNum(value) {
        this.uniforms.get('colorNum').value = value;
    }
    get colorNum() {
        return this.uniforms.get('colorNum').value;
    }
    set pixelSize(value) {
        this.uniforms.get('pixelSize').value = value;
    }
    get pixelSize() {
        return this.uniforms.get('pixelSize').value;
    }
    set isDarkTheme(value) {
        this.uniforms.get('isDarkTheme').value = value ? 1 : 0;
    }
    get isDarkTheme() {
        return this.uniforms.get('isDarkTheme').value;
    }
}

const RetroEffect = forwardRef((props, ref) => {
    const { colorNum, pixelSize, isDarkTheme } = props;
    const WrappedRetroEffect = wrapEffect(RetroEffectImpl);
    return <WrappedRetroEffect ref={ref} colorNum={colorNum} pixelSize={pixelSize} isDarkTheme={isDarkTheme} />;
});

RetroEffect.displayName = 'RetroEffect';

function DitheredWaves({
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius
}) {
    const mesh = useRef(null);
    const mouseRef = useRef(new THREE.Vector2());
    const { viewport, size, gl } = useThree();

    // Track theme state
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    const waveUniformsRef = useRef({
        time: new THREE.Uniform(0),
        resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
        waveSpeed: new THREE.Uniform(waveSpeed),
        waveFrequency: new THREE.Uniform(waveFrequency),
        waveAmplitude: new THREE.Uniform(waveAmplitude),
        waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),
        mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),
        enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
        mouseRadius: new THREE.Uniform(mouseRadius)
    });

    useEffect(() => {
        const dpr = gl.getPixelRatio();
        const newWidth = Math.floor(size.width * dpr);
        const newHeight = Math.floor(size.height * dpr);
        const currentRes = waveUniformsRef.current.resolution.value;
        if (currentRes.x !== newWidth || currentRes.y !== newHeight) {
            currentRes.set(newWidth, newHeight);
        }
    }, [size, gl]);

    const prevColor = useRef([...waveColor]);
    useFrame(({ clock }) => {
        const u = waveUniformsRef.current;

        if (!disableAnimation) {
            u.time.value = clock.getElapsedTime();
        }

        if (u.waveSpeed.value !== waveSpeed) u.waveSpeed.value = waveSpeed;
        if (u.waveFrequency.value !== waveFrequency) u.waveFrequency.value = waveFrequency;
        if (u.waveAmplitude.value !== waveAmplitude) u.waveAmplitude.value = waveAmplitude;

        if (!prevColor.current.every((v, i) => v === waveColor[i])) {
            u.waveColor.value.set(...waveColor);
            prevColor.current = [...waveColor];
        }

        u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
        u.mouseRadius.value = mouseRadius;

        if (enableMouseInteraction) {
            u.mousePos.value.copy(mouseRef.current);
        }
    });

    const handlePointerMove = (e) => {
        if (!enableMouseInteraction) return;
        const rect = gl.domElement.getBoundingClientRect();
        const dpr = gl.getPixelRatio();
        mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
    };

    return (
        <>
            <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                    vertexShader={waveVertexShader}
                    fragmentShader={waveFragmentShader}
                    uniforms={waveUniformsRef.current}
                />
            </mesh>

            <EffectComposer>
                <RetroEffect colorNum={colorNum} pixelSize={pixelSize} isDarkTheme={isDark} />
            </EffectComposer>

            <mesh
                onPointerMove={handlePointerMove}
                position={[0, 0, 0.01]}
                scale={[viewport.width, viewport.height, 1]}
                visible={false}
            >
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
        </>
    );
}

export default function Dither({
    waveSpeed = 0.05,
    waveFrequency = 3,
    waveAmplitude = 0.3,
    waveColor = [0.5, 0.5, 0.5],
    colorNum = 4,
    pixelSize = 2,
    disableAnimation = false,
    enableMouseInteraction = true,
    mouseRadius = 1
}) {
    return (
        <Canvas
            className="dither-container"
            camera={{ position: [0, 0, 6] }}
            dpr={1}
            gl={{ antialias: true, preserveDrawingBuffer: true }}
        >
            <DitheredWaves
                waveSpeed={waveSpeed}
                waveFrequency={waveFrequency}
                waveAmplitude={waveAmplitude}
                waveColor={waveColor}
                colorNum={colorNum}
                pixelSize={pixelSize}
                disableAnimation={disableAnimation}
                enableMouseInteraction={enableMouseInteraction}
                mouseRadius={mouseRadius}
            />
        </Canvas>
    );
}
