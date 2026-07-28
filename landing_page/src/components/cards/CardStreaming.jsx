import { Zap } from 'lucide-react';
import { useId } from 'react';
import Card from './Card';

// ── Tunnel ──
const TUNNEL_LANES      = 12;
const VANISH_X          = 180;
const VANISH_Y          = 180;
const TUNNEL_MAX_R      = 250;
const TUNNEL_DEPTH      = 0.6;
const LANE_SW           = 0.9;
const LANE_OPACITY_BASE = 0.01;
const LANE_OPACITY_STEP = 0.015;

// ── Glow ──
const GLOW_STOPS = [
    { offset: '0%',   opacity: 0.35 },
    { offset: '30%',  opacity: 0.16 },
    { offset: '70%',  opacity: 0.02 },
    { offset: '100%', opacity: 0 },
];

// ── Rings ──
const RING_COUNT        = 3;
const RING_RADIUS       = 15;
const RING_SW           = 0.6;
const RING_OPACITY      = 0.3;
const RING_DUR_BASE     = 6;
const RING_DUR_STEP     = 0.8;
const RING_DELAY_STEP   = 0.6;
const RING_SCALE_START  = 0.3;
const RING_SCALE_END    = 14;

// ── Center ──
const CENTER_R          = 3;
const CENTER_OPACITY    = 0.5;

// ── Fade ──
const FADE_COLOR        = '#1A0808';
const FADE_STOP         = '80%';

function StreamVisual() {
    const gid = useId().replace(/[^a-zA-Z0-9]/g, '');
    const color = 'rgb(255,99,99)';

    const laneAngles = Array.from({ length: TUNNEL_LANES }, (_, i) => (i / TUNNEL_LANES) * Math.PI * 2);

    return (
        <svg viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <radialGradient id={`glow-${gid}`} cx="50%" cy="50%" r="50%">
                    {GLOW_STOPS.map((s, i) => <stop key={i} offset={s.offset} stopColor={color} stopOpacity={s.opacity} />)}
                </radialGradient>
                <linearGradient id={`fade-${gid}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={FADE_COLOR} stopOpacity="0" />
                    <stop offset={FADE_STOP} stopColor={FADE_COLOR} stopOpacity="1" />
                </linearGradient>
            </defs>

            {/* Central glow */}
            <circle cx={VANISH_X} cy={VANISH_Y} r={TUNNEL_MAX_R} fill={`url(#glow-${gid})`} />

            {/* Converging tunnel lane lines */}
            {laneAngles.map((angle, i) => {
                const cos = Math.cos(angle), sin = Math.sin(angle);
                const outerR = TUNNEL_MAX_R;
                const innerR = outerR * (1 - TUNNEL_DEPTH);
                const x1 = VANISH_X + cos * outerR, y1 = VANISH_Y + sin * outerR;
                const x2 = VANISH_X + cos * innerR, y2 = VANISH_Y + sin * innerR;
                return <line key={`lane-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={LANE_SW} opacity={LANE_OPACITY_BASE + i * LANE_OPACITY_STEP} />;
            })}

            {/* Expanding rings */}
            {Array.from({ length: RING_COUNT }, (_, ring) => (
                <g key={`ring-${ring}`} style={{ transformOrigin: `${VANISH_X}px ${VANISH_Y}px`, animation: `ring-out-${gid} ${RING_DUR_BASE + ring * RING_DUR_STEP}s ${ring * RING_DELAY_STEP}s ease-out infinite` }}>
                    <circle cx={VANISH_X} cy={VANISH_Y} r={RING_RADIUS} stroke={color} strokeWidth={RING_SW} opacity={RING_OPACITY} fill="none" />
                </g>
            ))}

            {/* Center point */}
            <circle cx={VANISH_X} cy={VANISH_Y} r={CENTER_R} fill={color} opacity={CENTER_OPACITY} />

            <rect width="360" height="360" fill={`url(#fade-${gid})`} />

            <style>{`
                @keyframes ring-out-${gid} {
                    0%   { transform: scale(${RING_SCALE_START}); opacity: 1; }
                    100% { transform: scale(${RING_SCALE_END}); opacity: 0; }
                }
            `}</style>
        </svg>
    );
}

const metric = <><span className="text-xl font-bold text-white tracking-tight tabular-nums leading-none">&lt;1</span><span className="text-xs font-medium text-gray-400 leading-none">ms</span></>;

export default function CardStreaming() {
    return (
        <Card
            icon={<Zap className="w-7 h-7" />}
            title="Ultra-Fast Streaming"
            description="Zero-copy pipeline. Assets stream straight from NVMe to GPU - no staging buffers, no waiting."
            metric={metric}
            background="linear-gradient(138deg, rgba(255, 99, 99, 0.45) 22%, rgba(40, 10, 10, 0.63) 82%)"
            glow="rgba(255, 99, 99, 0.05) 0px 0px 20px 3px, rgba(255, 99, 99, 0.05) 0px 0px 40px 20px"
            visual={<StreamVisual />}
        />
    );
}
