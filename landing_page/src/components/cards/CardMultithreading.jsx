import { Layers } from 'lucide-react';
import { useId, useMemo } from 'react';
import Card from './Card';

// ── Layout ──
const LANES               = 6;
const LANE_START_Y        = 40;    // px - first lane center
const LANE_SPACING        = 52;    // px - vertical gap between lanes
const LANE_INSET_X        = 10;    // px - horizontal inset
const LANE_WIDTH           = 340;   // px
const LANE_HEIGHT         = 32;    // px
const LANE_RADIUS         = 6;     // px - corner radius
const LANE_OPACITY_BASE   = 0.4;
const LANE_OPACITY_STEP   = 0.08;
const LANE_BORDER_SW      = 1;
const LANE_BORDER_OP      = 0.08;

// ── Thread pills ──
const PILL_WIDTH          = 30;    // px
const PILL_HEIGHT         = 12;    // px
const PILL_RADIUS         = 6;     // px (height / 2)
const PILL_STROKE_W       = 0.2;   // px
const PILL_FILL_OPACITY   = 0.05;


// ── Fade ──
const FADE_COLOR          = '#140B2A';
const FADE_STOP_OFFSET    = '80%';

// ── Animation ──
const ANIM_START_X        = -40;   // px - start offscreen left
const ANIM_END_X          = 400;   // px - end offscreen right

// ── Randomization ranges ──
const PILL_DURATION_MIN   = 14;    // s - minimum per-pill cycle duration
const PILL_DURATION_MAX   = 26;    // s - maximum per-pill cycle duration

function ThreadsVisual() {
    const gid = useId().replace(/[^a-zA-Z0-9]/g, '');
    const color = 'rgb(167,139,250)';

    // Generate stable random per-lane values: randomized duration and a negative prewarm delay
    // so each pill appears already mid-flight when the component mounts
    const laneAnimations = useMemo(() => {
        return Array.from({ length: LANES }, () => {
            const duration = PILL_DURATION_MIN + Math.random() * (PILL_DURATION_MAX - PILL_DURATION_MIN);
            // Negative delay offsets the animation start into the past, placing the pill
            // at a random position along its path on first render
            const prewarmDelay = -(Math.random() * duration);
            return { duration, prewarmDelay };
        });
    }, []);

    return (
        <svg viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id={`fade-${gid}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={FADE_COLOR} stopOpacity="0" />
                    <stop offset={FADE_STOP_OFFSET} stopColor={FADE_COLOR} stopOpacity="1" />
                </linearGradient>
                <linearGradient id={`lane-${gid}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={color} stopOpacity="0" />
                    <stop offset="15%" stopColor={color} stopOpacity="0.06" />
                    <stop offset="85%" stopColor={color} stopOpacity="0.06" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <linearGradient id={`pill-${gid}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                    <stop offset="50%" stopColor={color} stopOpacity="0.7" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.4" />
                </linearGradient>
            </defs>

            {/* Lane backgrounds */}
            {Array.from({ length: LANES }, (_, i) => {
                const y = LANE_START_Y + i * LANE_SPACING;
                const top = y - LANE_HEIGHT / 2;
                const bottom = y + LANE_HEIGHT / 2;
                return (
                    <g key={`lane-${i}`}>
                        <rect x={LANE_INSET_X} y={top} width={LANE_WIDTH} height={LANE_HEIGHT} rx={LANE_RADIUS} fill={`url(#lane-${gid})`} opacity={LANE_OPACITY_BASE + i * LANE_OPACITY_STEP} />
                        <line x1={LANE_INSET_X} y1={top} x2={LANE_INSET_X + LANE_WIDTH} y2={top} stroke={color} strokeWidth={LANE_BORDER_SW} opacity={LANE_BORDER_OP} />
                        <line x1={LANE_INSET_X} y1={bottom} x2={LANE_INSET_X + LANE_WIDTH} y2={bottom} stroke={color} strokeWidth={LANE_BORDER_SW} opacity={LANE_BORDER_OP} />
                    </g>
                );
            })}

            {/* Moving thread pills */}
            {Array.from({ length: LANES }, (_, i) => {
                const y = LANE_START_Y + i * LANE_SPACING;
                const { duration, prewarmDelay } = laneAnimations[i];
                return (
                    <g key={`thread-${i}`}>
                        <rect x="0" y={y - PILL_HEIGHT / 2} width={PILL_WIDTH} height={PILL_HEIGHT} rx={PILL_RADIUS} fill={`url(#pill-${gid})`} opacity={PILL_FILL_OPACITY}
                            style={{ animation: `thread-${gid} ${duration}s ${prewarmDelay}s linear infinite` }} />
                        <rect x="0" y={y - PILL_HEIGHT / 2} width={PILL_WIDTH} height={PILL_HEIGHT} rx={PILL_RADIUS} stroke={color} strokeWidth={PILL_STROKE_W} fill="none"
                            style={{ animation: `thread-${gid} ${duration}s ${prewarmDelay}s linear infinite` }} />
                    </g>
                );
            })}

            <rect width="360" height="360" fill={`url(#fade-${gid})`} />

            <style>{`
                @keyframes thread-${gid} {
                    0%   { transform: translateX(${ANIM_START_X}px); }
                    100% { transform: translateX(${ANIM_END_X}px); }
                }
            `}</style>
        </svg>
    );
}

const metric = <><span className="text-xl font-bold text-white tracking-tight tabular-nums leading-none">100</span><span className="text-xs font-medium text-gray-400 leading-none">%</span></>;

export default function CardMultithreading() {
    return (
        <Card
            icon={<Layers className="w-7 h-7" />}
            title="Perfect Multithreading"
            description="Every core pulls its weight. Systems schedule in parallel with automatic dependency resolution."
            metric={metric}
            background="linear-gradient(138deg, rgba(82, 48, 145, 0.63) 22%, rgba(26, 11, 51, 0.63) 82%)"
            glow="rgba(82, 48, 145, 0.05) 0px 0px 20px 3px, rgba(82, 48, 145, 0.05) 0px 0px 40px 20px"
            visual={<ThreadsVisual />}
        />
    );
}
