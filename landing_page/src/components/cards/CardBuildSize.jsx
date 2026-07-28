import { Package } from 'lucide-react';
import { useId } from 'react';
import Card from './Card';

// ── ViewBox ──
const VIEWBOX = 180;

// ── Center pill ──
const CENTER_W = 80, CENTER_H = 28, CENTER_SW = 1.2, CENTER_OP = 0.6, CENTER_FILL = 0.08;

// ── Orbiting ring ──
const ORBIT_R = 100, ORBIT_N = 8, ORBIT_W = 22, ORBIT_H = 8, ORBIT_SW = 0.8, ORBIT_OP = 0.35, ORBIT_FILL = 0.06;

// ── Glow ──
const GLOW_R = 160;
const GLOW_STOPS = [
    { offset: '0%',   opacity: 0 },
    { offset: '25%',  opacity: 0.15 },
    { offset: '70%',  opacity: 0.05 },
    { offset: '100%', opacity: 0.02 },
];

// ── Grid ──
const GRID_SIZE = 24;
const GRID_SW = 0.6;
const GRID_OP = 0.18;

// ── Fade ──
const FADE_COLOR = '#051A14';
const FADE_STOP = '60%';

// ── Pulse animation ──
const PULSE_SCALE = 0.55;
const PULSE_OPACITY = 0.5;
const PULSE_DURATION_S = 8;

function capsulePath(w, h) {
    const r = h / 2, hs = w / 2.2 - r;
    return `M ${-hs} ${-r} L ${hs} ${-r} A ${r} ${r} 0 0 1 ${hs} ${r} L ${-hs} ${r} A ${r} ${r} 0 0 1 ${-hs} ${-r}`;
}

function PillPulseVisual() {
    const gid = useId().replace(/[^a-zA-Z0-9]/g, '');
    const color = 'rgb(52,211,153)';
    return (
        <svg viewBox={`${-VIEWBOX} ${-VIEWBOX} ${VIEWBOX * 2} ${VIEWBOX * 2}`} fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <pattern id={`grid-${gid}`} x="0" y="0" width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
                    <path d={`M ${GRID_SIZE} 0 L 0 0 L 0 ${GRID_SIZE}`} fill="none" stroke={color} strokeWidth={GRID_SW} opacity={GRID_OP} />
                </pattern>
                <linearGradient id={`glow-${gid}`} x1="0" y1="0" x2="0" y2="1">
                    {GLOW_STOPS.map((s, i) => <stop key={i} offset={s.offset} stopColor={color} stopOpacity={s.opacity} />)}
                </linearGradient>
                <linearGradient id={`fade-${gid}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={FADE_COLOR} stopOpacity="0" /><stop offset={FADE_STOP} stopColor={FADE_COLOR} stopOpacity="1" />
                </linearGradient>
            </defs>
            <rect x={-VIEWBOX} y={-VIEWBOX} width={VIEWBOX * 2} height={VIEWBOX * 2} fill={`url(#grid-${gid})`} />
            <rect x={-VIEWBOX} y={-VIEWBOX} width={VIEWBOX * 2} height={VIEWBOX * 2} fill={`url(#fade-${gid})`} />
            <circle cx="0" cy="0" r={GLOW_R} fill={`url(#glow-${gid})`} />
            <g style={{ transformOrigin: '0px 0px', animation: `pulse-${gid} ${PULSE_DURATION_S}s ease-in-out infinite` }}>
                {Array.from({ length: ORBIT_N }, (_, i) => {
                    const a = (i / ORBIT_N) * Math.PI * 2, cx = Math.cos(a) * ORBIT_R, cy = Math.sin(a) * ORBIT_R;
                    return <g key={i} transform={`translate(${cx}, ${cy}) rotate(${(a * 180) / Math.PI})`}><path d={capsulePath(ORBIT_W, ORBIT_H)} stroke={color} strokeWidth={ORBIT_SW} opacity={ORBIT_OP} fill={color} fillOpacity={ORBIT_FILL} /></g>;
                })}
            </g>
            <path d={capsulePath(CENTER_W, CENTER_H)} stroke={color} strokeWidth={CENTER_SW} opacity={CENTER_OP} fill={color} fillOpacity={CENTER_FILL} />
            <style>{`@keyframes pulse-${gid}{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(${PULSE_SCALE});opacity:${PULSE_OPACITY}}}`}</style>
        </svg>
    );
}

const metric = <>
    <span className="text-sm font-light text-white translate-y-[-2px] leading-none">&lt;</span>
    <span className="text-xl font-bold text-white tracking-tight tabular-nums leading-none">0.5</span>
    <span className="text-xs font-medium text-gray-400 leading-none">MB</span>
</>;


export default function CardBuildSize() {
    return (
        <Card
            icon={<Package className="w-7 h-7" />}
            title="Tiny Build Size"
            description="Ship a complete game smaller than a JPEG. Dead code elimination and modular crates - zero bloat."
            metric={metric}
            background="linear-gradient(138deg, rgba(14, 116, 52, 0.63) 22%, rgba(5, 42, 20, 0.63) 82%)"
            glow="rgba(14, 116, 52, 0.05) 0px 0px 20px 3px, rgba(14, 116, 52, 0.05) 0px 0px 40px 20px"
            visual={<PillPulseVisual />}
        />
    );
}
