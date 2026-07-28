import { Cpu } from 'lucide-react';
import { useRef, useEffect } from 'react';
import Card from './Card';

// ── Pill animation ──
const PILL_COUNT         = 20;
const PILL_PREWARM       = 10;    // first N start visible
const PILL_H_RATIO       = 0.35;  // height = width * ratio
const SIZE_MIN = 14, SIZE_MAX = 36, SPEED_MIN = 8, SPEED_MAX = 20;
const ROT_SPEED = 0.25, OPACITY_MIN = 0.1, OPACITY_MAX = 0.5;
const SPAWN_Y = 200, RECYCLE_Y = 60, MAX_DT = 0.1;

// ── Pill path style ──
const PILL_COLOR         = 'rgb(96,165,250)';
const PILL_FILL_OPACITY  = '0.06';
const PILL_STROKE_W      = '1';

// ── Background SVG ──
const BG_COLOR           = 'rgb(96,165,250)';
const BG_COLOR_ACCENT    = 'rgb(59,130,246)';

// ── Dot pattern ──
const DOT_PATTERN_SIZE   = 24;
const DOTS = [
    { cx: 2,  cy: 2,  r: 1.5, opacity: 0.3 },
    { cx: 14, cy: 8,  r: 1,   opacity: 0.15 },
    { cx: 8,  cy: 18, r: 1,   opacity: 0.2 },
];

// ── Fade ──
const FADE_COLOR         = '#080C21';
const FADE_STOP          = '70%';

function capsulePath(w, h) {
    const r = h / 2, hs = w / 2.2 - r;
    return `M ${-hs} ${-r} L ${hs} ${-r} A ${r} ${r} 0 0 1 ${hs} ${r} L ${-hs} ${r} A ${r} ${r} 0 0 1 ${-hs} ${-r}`;
}

function PillRainVisual() {
    const containerRef = useRef(null);
    const pillsRef = useRef([]);
    const elementsRef = useRef([]);
    const rafRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const initAndAnimate = () => {
            if (elementsRef.current.length === 0) {
                const w = container.clientWidth, h = container.clientHeight;
                if (w === 0 || h === 0) return;

                // Create shared SVG
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', 'absolute inset-0 w-full h-full pointer-events-none');
                svg.style.overflow = 'visible';
                container.appendChild(svg);

                for (let i = 0; i < PILL_COUNT; i++) {
                    const pillW = Math.random() * (SIZE_MAX - SIZE_MIN) + SIZE_MIN;
                    const pillH = pillW * PILL_H_RATIO;
                    const pill = { x: Math.random() * w, y: i < PILL_PREWARM ? Math.random() * h : -Math.random() * SPAWN_Y - 20, width: pillW, height: pillH, speed: Math.random() * (SPEED_MAX - SPEED_MIN) + SPEED_MIN, rotation: Math.random() * Math.PI * 2, rotationSpeed: (Math.random() - 0.5) * ROT_SPEED, opacity: Math.random() * (OPACITY_MAX - OPACITY_MIN) + OPACITY_MIN };
                    pillsRef.current.push(pill);

                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', capsulePath(pillW, pillH));
                    path.setAttribute('stroke', PILL_COLOR);
                    path.setAttribute('fill', PILL_COLOR);
                    path.setAttribute('fill-opacity', PILL_FILL_OPACITY);
                    path.setAttribute('stroke-width', PILL_STROKE_W);
                    svg.appendChild(path);
                    elementsRef.current.push(path);
                }
            }

            const pills = pillsRef.current, elements = elementsRef.current;
            let lastTime = performance.now();
            const animate = (now) => {
                const dt = Math.min((now - lastTime) / 1000, MAX_DT); lastTime = now;
                const w = container.clientWidth, h = container.clientHeight;
                for (let i = 0; i < pills.length; i++) {
                    const p = pills[i], el = elements[i];
                    p.y += p.speed * dt; p.rotation += p.rotationSpeed * dt;
                    if (p.y > h + RECYCLE_Y) {
                        p.y = -Math.random() * SPAWN_Y - 20; p.x = Math.random() * w;
                        p.width = Math.random() * (SIZE_MAX - SIZE_MIN) + SIZE_MIN;
                        p.height = p.width * PILL_H_RATIO;
                        el.setAttribute('d', capsulePath(p.width, p.height));
                    }
                    el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}rad)`;
                    el.style.opacity = p.opacity;
                }
                rafRef.current = requestAnimationFrame(animate);
            };
            rafRef.current = requestAnimationFrame(animate);
        };

        requestAnimationFrame(initAndAnimate);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []);
    useEffect(() => () => { elementsRef.current.forEach(el => el.remove()); }, []);

    return (
        <>
            <svg viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                <defs>
                    <pattern id="dots-entities" x="0" y="0" width={DOT_PATTERN_SIZE} height={DOT_PATTERN_SIZE} patternUnits="userSpaceOnUse">
                        {DOTS.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={BG_COLOR} opacity={d.opacity} />)}
                    </pattern>
                    <linearGradient id="fade-entities" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={FADE_COLOR} stopOpacity="0" /><stop offset={FADE_STOP} stopColor={FADE_COLOR} stopOpacity="1" />
                    </linearGradient>
                </defs>
                <rect width="360" height="360" fill="url(#dots-entities)" />
                <rect width="360" height="360" fill="url(#fade-entities)" />
            </svg>
            <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" />
        </>
    );
}

const metric = <><span className="text-xl font-bold text-white tracking-tight tabular-nums leading-none">60</span><span className="text-xs font-medium text-gray-400 leading-none">FPS</span></>;

export default function CardEntities() {
    return (
        <Card
            icon={<Cpu className="w-7 h-7" />}
            title="500K+ Entities"
            description="Half a million entities updating every frame. Archetype-based ECS keeps data contiguous and cache lines full."
            metric={metric}
            background="linear-gradient(138deg, rgba(32, 35, 91, 0.7) 22%, rgba(7, 9, 33, 0.7) 82%)"
            glow="rgba(7, 13, 79, 0.05) 0px 0px 20px 3px, rgba(7, 13, 79, 0.05) 0px 0px 40px 20px"
            visual={<PillRainVisual />}
        />
    );
}
