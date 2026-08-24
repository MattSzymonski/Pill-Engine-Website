import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Pixel Swap - background/texture swap effect implemented from scratch.
 *
 * REQUIREMENTS
 *   - React 18+ only; zero third-party dependencies. Uses the Web Animations
 *     API (element.animate), ResizeObserver, and setTimeout.
 *
 * DESCRIPTION
 *   Renders `firstContent` and `secondContent` as stacked absolute layers. On
 *   trigger (hover or click) a grid of square "pixels" covers the container;
 *   each pixel is a window onto a clone of the incoming content and animates
 *   open (scale up + optional spin + fade) in a staggered pattern, revealing
 *   the new content underneath. The incoming content inside each pixel is
 *   counter-transformed so it never drifts or scales.
 *
 * USAGE
 *   <PixelSwap
 *     firstContent={<div />}
 *     secondContent={<div />}
 *     gap={9}
 *     pattern="random"
 *     trigger="hover"
 *     className="absolute inset-0"
 *   />
 *
 * PROPS
 *   firstContent   - ReactNode shown in the initial state.
 *   secondContent  - ReactNode revealed after the pixel cover.
 *   pixelSize      - square pixel edge length in px (auto-grown when the grid
 *                    would exceed MAX_PIXELS).
 *   gap            - space between pixels in px.
 *   pixelRadius    - corner rounding of each pixel as a percentage (0-50).
 *   pixelScale     - starting scale of each pixel relative to its final size.
 *   pixelSpin      - degrees each pixel rotates as it opens.
 *   fade           - fade each pixel in as it opens.
 *   duration       - total transition duration in ms.
 *   pixelDuration  - time a single pixel takes to open, in ms.
 *   pattern        - order pixels animate: 'random' | 'center' | 'edges' |
 *                    'left-to-right' | 'right-to-left' | 'top-to-bottom' |
 *                    'bottom-to-top' | 'diagonal' | 'spiral'.
 *   randomness     - noise mixed into the pattern order, 0 (strict) to 1 (full).
 *   easing         - named ease ('linear' | 'ease' | 'ease-in' | 'ease-out' |
 *                    'ease-in-out') or a 'cubic-bezier(x1,y1,x2,y2)' string.
 *   trigger        - 'hover' | 'click' | 'manual'. Use 'manual' together with
 *                    the controlled `active` prop when the parent owns the
 *                    state (no interaction handlers are attached).
 *   initialActive  - whether secondContent is visible initially.
 *   active         - controlled active state. When provided, the component
 *                    stops tracking internal state and the parent must update
 *                    this prop (via onActiveChange) to drive transitions.
 *   onActiveChange - called with the new desired active state when an
 *                    interaction requests a change.
 *   onComplete     - called with the new active state when a swap finishes.
 *   persistPixels  - keep the pixel grid mounted after the swap finishes so
 *                    the revealed mosaic stays visible (never torn down).
 *   aspectRatio    - CSS aspect-ratio for the wrapper ('auto' by default).
 *   className      - extra classes for the wrapper (e.g. 'absolute inset-0').
 *   style          - extra inline styles for the wrapper.
 * --- SCRIPT ---
 */

// Cap the number of pixels so the grid stays cheap; pixel size grows to fit.
const MAX_PIXELS = 220;
// Number of interpolation steps for the shared keyframe pair.
const KEYFRAME_STEPS = 14;

// Each pattern maps a normalized cell position (0-1) to a 0-1 progress value
// that staggers when that pixel opens. `null` means "fully random".
const PATTERNS = {
    random: () => null,
    center: (x, y) => Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2,
    edges: (x, y) => Math.min(x, 1 - x, y, 1 - y) * 2,
    'left-to-right': (x) => x,
    'right-to-left': (x) => 1 - x,
    'top-to-bottom': (_x, y) => y,
    'bottom-to-top': (_x, y) => 1 - y,
    diagonal: (x, y) => (x + y) / 2,
    spiral: (x, y) => {
        const angle = (Math.atan2(y - 0.5, x - 0.5) + Math.PI) / (Math.PI * 2);
        const radius = Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2;
        return (angle + radius) % 1;
    }
};

const NAMED_EASINGS = {
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    'ease-in': [0.42, 0, 1, 1],
    'ease-out': [0, 0, 0.58, 1],
    'ease-in-out': [0.42, 0, 0.58, 1]
};

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

// Deterministic pseudo-random value in [0, 1) from a seed.
const noise = (seed) => {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
};

// Builds a cubic-bezier easing function from a named ease or a bezier string.
const makeEasing = (value) => {
    const match = /cubic-bezier\(([^)]+)\)/.exec(value);
    const points = match ? match[1].split(',').map(Number) : NAMED_EASINGS[value];
    if (!points || points.length !== 4 || points.some(Number.isNaN)) return makeEasing('ease');

    const [x1, y1, x2, y2] = points;
    if (x1 === y1 && x2 === y2) return (progress) => progress;

    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;

    // Newton-Raphson solve for t given x, then evaluate the y bezier.
    return (progress) => {
        let t = progress;
        for (let i = 0; i < 5; i += 1) {
            const slope = (3 * ax * t + 2 * bx) * t + cx;
            if (!slope) break;
            t -= (((ax * t + bx) * t + cx) * t - progress) / slope;
        }
        t = clamp(t, 0, 1);
        return ((ay * t + by) * t + cy) * t;
    };
};

// Final scale for a pixel so gaps and rounded corners close completely.
// Slight overlap is invisible because every pixel shows the same content
// locked to the same origin.
const coverScale = (size, gap, radius) => {
    const p = clamp(radius, 0, 50) / 100;
    const corner = Math.SQRT1_2 / (Math.SQRT2 * (0.5 - p) + p);
    return ((size + gap) / size) * Math.max(1, corner);
};

// Builds the pixel grid: positions, sizes, and per-pixel stagger offsets.
const buildGrid = ({ width, height, pixelSize, gap, pattern, randomness }) => {
    let size = pixelSize;
    let columns = Math.max(1, Math.ceil((width + gap) / (size + gap)));
    let rows = Math.max(1, Math.ceil((height + gap) / (size + gap)));

    if (columns * rows > MAX_PIXELS) {
        size = Math.ceil(size * Math.sqrt((columns * rows) / MAX_PIXELS));
        columns = Math.max(1, Math.ceil((width + gap) / (size + gap)));
        rows = Math.max(1, Math.ceil((height + gap) / (size + gap)));
    }

    // Overhang the box so edge pixels stay square instead of being cut short.
    const stride = size + gap;
    const originX = (width - (columns * stride - gap)) / 2;
    const originY = (height - (rows * stride - gap)) / 2;
    const order = PATTERNS[pattern] ?? PATTERNS.random;
    const mix = clamp(randomness, 0, 1);
    const pixels = [];

    for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
            const index = row * columns + column;
            const x = columns <= 1 ? 0.5 : column / (columns - 1);
            const y = rows <= 1 ? 0.5 : row / (rows - 1);
            const base = order(x, y);
            const random = noise(index + 1);

            pixels.push({
                id: index,
                left: originX + column * stride,
                top: originY + row * stride,
                offset: base === null ? random : base * (1 - mix) + random * mix
            });
        }
    }

    return { pixels, size, gap, width, height };
};

// One shared pair of keyframe lists for the whole grid: the pixel "window"
// transform and its exact inverse for the cloned content inside, so the
// revealed content never drifts or scales.
const buildKeyframes = ({ ease, startScale, endScale, spin, fade }) => {
    const windowKeyframes = [];
    const contentKeyframes = [];

    for (let step = 0; step <= KEYFRAME_STEPS; step += 1) {
        const progress = step / KEYFRAME_STEPS;
        const eased = ease(progress);
        const scale = startScale + (endScale - startScale) * eased;
        const angle = spin * (1 - eased);

        windowKeyframes.push({
            offset: progress,
            opacity: fade ? Math.min(1, eased * 1.6) : 1,
            transform: `rotate(${angle}deg) scale(${scale})`
        });
        contentKeyframes.push({
            offset: progress,
            transform: `scale(${1 / scale}) rotate(${-angle}deg)`
        });
    }

    return { windowKeyframes, contentKeyframes };
};

const PixelSwap = ({
    firstContent,
    secondContent,
    pixelSize = 64,
    gap = 0,
    pixelRadius = 0,
    pixelSpin = 0,
    pixelScale = 0.35,
    fade = true,
    duration = 1400,
    pixelDuration = 450,
    pattern = 'random',
    randomness = 0,
    easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
    trigger = 'hover',
    initialActive = false,
    active,
    onActiveChange,
    onComplete,
    persistPixels = false,
    aspectRatio = 'auto',
    className = '',
    style
}) => {
    const [internalActive, setInternalActive] = useState(initialActive);
    const [shownActive, setShownActive] = useState(initialActive);
    const [transition, setTransition] = useState(null);
    const [persistedGrid, setPersistedGrid] = useState(null);
    const [box, setBox] = useState({ width: 0, height: 0 });

    const containerRef = useRef(null);
    const layerRefs = useRef([]);
    const pixelRefs = useRef([]);
    const animationsRef = useRef([]);
    const timerRef = useRef(0);
    const persistedRef = useRef(false);

    const desiredActive = active ?? internalActive;
    const incomingIndex = transition?.to ? 1 : 0;

    const grid = useMemo(
        () =>
            buildGrid({
                width: box.width,
                height: box.height,
                pixelSize: Math.max(8, Math.round(pixelSize)),
                gap: Math.max(0, Math.round(gap)),
                pattern,
                randomness
            }),
        [box.width, box.height, pixelSize, gap, pattern, randomness]
    );

    // Snapshot animation inputs so an in-flight transition is never rebuilt
    // halfway through by an unrelated prop change.
    const config = { duration, pixelDuration, pixelSpin, pixelScale, pixelRadius, fade, easing, persistPixels, onComplete };
    const configRef = useRef(config);
    const gridRef = useRef(grid);
    configRef.current = config;
    gridRef.current = grid;

    // Measure the padding box - the coordinate space layers and grid live in.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const measure = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (!width || !height) return;
            setBox((current) =>
                current.width === width && current.height === height ? current : { width, height }
            );
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const stopAnimations = useCallback(() => {
        // A persisted (sticky) grid is left intact so the reveal stays visible.
        if (!persistedRef.current) {
            animationsRef.current.forEach((animation) => animation.cancel());
            animationsRef.current = [];
            pixelRefs.current.forEach((pixel) => pixel?.replaceChildren());
        }
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = 0;
    }, []);

    useEffect(() => stopAnimations, [stopAnimations]);

    // Start a transition whenever the desired state differs from the shown one.
    useEffect(() => {
        // A persisted (sticky) mosaic counts as shown - never re-trigger over it.
        if (transition || persistedGrid || desiredActive === shownActive) return;
        // Starting a fresh transition - drop any previously persisted grid.
        persistedRef.current = false;
        setPersistedGrid(null);
        setTransition({ to: desiredActive, grid: gridRef.current });
    }, [desiredActive, shownActive, transition, persistedGrid]);

    // Drive the pixel grid animation for the current transition.
    useEffect(() => {
        if (!transition) return undefined;
        const settings = configRef.current;
        const { grid: frozenGrid, to } = transition;

        const finish = () => {
            if (settings.persistPixels && to) {
                // Freeze every pixel at scale 1 so the gaps between boxes stay
                // open and the pixelated mosaic persists instead of melting
                // into a flat gradient.
                frozenGrid.pixels.forEach((pixel, index) => {
                    const pixelElement = pixelRefs.current[index];
                    if (!pixelElement) return;
                    pixelElement.style.opacity = '1';
                    pixelElement.style.transform = 'scale(1)';
                });
                // Cancel the WAAPI animations so the inline freeze is authoritative
                // and can never be overridden by a lingering animation.
                animationsRef.current.forEach((animation) => animation.cancel());
                animationsRef.current = [];
                persistedRef.current = true;
                setPersistedGrid({ grid: frozenGrid, radius: settings.pixelRadius });
                // Keep the subtle (first) layer shown beneath the mosaic so the
                // gaps between pixels read as dark boxes.
                setTransition(null);
                settings.onComplete?.(to);
                return;
            }
            // Swap the layers and unmount the grid in a single commit - the
            // effect cleanup tears down the pixel animations atomically with
            // that commit, so the incoming content never flashes out.
            setShownActive(to);
            setTransition(null);
            settings.onComplete?.(to);
        };

        const source = layerRefs.current[to ? 1 : 0];
        const prefersReducedMotion =
            typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        if (!source || !frozenGrid.pixels.length || prefersReducedMotion) {
            finish();
            return undefined;
        }

        const total = Math.max(200, settings.duration);
        const pixelMs = clamp(settings.pixelDuration, 60, total);
        const spread = Math.max(0, total - pixelMs);
        // When persisting, end at scale 1 so the 9px gaps stay visible; otherwise
        // use coverScale so the reveal closes up completely.
        const endScale = settings.persistPixels ? 1 : coverScale(frozenGrid.size, frozenGrid.gap, settings.pixelRadius);
        const keyframes = buildKeyframes({
            ease: makeEasing(settings.easing),
            startScale: clamp(settings.pixelScale, 0.05, 1) * endScale,
            endScale,
            spin: settings.pixelSpin,
            fade: settings.fade
        });

        frozenGrid.pixels.forEach((pixel, index) => {
            const pixelElement = pixelRefs.current[index];
            if (!pixelElement) return;

            // Clone the rendered layer instead of re-rendering content through
            // React once per pixel: same visual result, a fraction of the cost.
            const content = document.createElement('div');
            content.style.position = 'absolute';
            content.style.left = `${-pixel.left}px`;
            content.style.top = `${-pixel.top}px`;
            content.style.width = `${frozenGrid.width}px`;
            content.style.height = `${frozenGrid.height}px`;
            // Counter-transform about the pixel's centre, not the content's, so
            // the two transforms cancel to an exact identity at every frame.
            const originX = pixel.left + frozenGrid.size / 2;
            const originY = pixel.top + frozenGrid.size / 2;
            content.style.transformOrigin = `${originX}px ${originY}px`;

            const clone = source.cloneNode(true);
            clone.style.visibility = 'visible';
            clone.removeAttribute('aria-hidden');
            content.appendChild(clone);
            pixelElement.replaceChildren(content);

            const timing = {
                duration: pixelMs,
                delay: pixel.offset * spread,
                easing: 'linear',
                fill: 'both'
            };
            animationsRef.current.push(
                pixelElement.animate(keyframes.windowKeyframes, timing),
                content.animate(keyframes.contentKeyframes, timing)
            );
        });

        timerRef.current = window.setTimeout(finish, total);
        return stopAnimations;
    }, [stopAnimations, transition]);

    const requestActive = useCallback(
        (next) => {
            if (active === undefined) setInternalActive(next);
            onActiveChange?.(next);
        },
        [active, onActiveChange]
    );

    const interactionProps = useMemo(() => {
        if (trigger === 'click') {
            return {
                onClick: () => requestActive(!desiredActive),
                onKeyDown: (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        requestActive(!desiredActive);
                    }
                },
                role: 'button',
                tabIndex: 0
            };
        }

        if (trigger === 'manual') {
            // Controlled mode: no interaction handlers - the parent owns the
            // active state, so nothing can ever request a swap back.
            return {};
        }

        // Default to hover trigger.
        return {
            onMouseEnter: () => requestActive(true),
            onMouseLeave: () => requestActive(false),
            onFocus: () => requestActive(true),
            onBlur: () => requestActive(false),
            tabIndex: 0
        };
    }, [desiredActive, requestActive, trigger]);

    const renderLayer = (content, index) => {
        const isShown = index === (shownActive ? 1 : 0);
        const isIncomingDuringTransition = transition && index === incomingIndex;
        return (
            <div
                key={index}
                ref={(element) => {
                    layerRefs.current[index] = element;
                }}
                className="absolute inset-0 h-full w-full"
                style={{
                    zIndex: isShown ? 2 : 1,
                    visibility: isShown && !isIncomingDuringTransition ? 'visible' : 'hidden'
                }}
                aria-hidden={!isShown}
            >
                {content}
            </div>
        );
    };

    // The grid shown on top: the active transition's grid, or the persisted
    // (sticky) grid that remains after a completed swap.
    const activeGrid = transition ? transition.grid : (persistedGrid?.grid ?? null);
    const activeRadius = transition ? pixelRadius : (persistedGrid?.radius ?? 0);

    return (
        <div
            ref={containerRef}
            className={`isolate w-full overflow-hidden outline-none ${className}`.trim()}
            style={{ aspectRatio, ...style }}
            data-active={shownActive}
            data-transitioning={!!transition}
            {...interactionProps}
        >
            {renderLayer(firstContent, 0)}
            {renderLayer(secondContent, 1)}

            {activeGrid && (
                <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden="true">
                    {activeGrid.pixels.map((pixel, index) => (
                        <div
                            key={pixel.id}
                            ref={(element) => {
                                pixelRefs.current[index] = element;
                            }}
                            className="absolute overflow-hidden opacity-0"
                            style={{
                                left: pixel.left,
                                top: pixel.top,
                                width: activeGrid.size,
                                height: activeGrid.size,
                                borderRadius: `${clamp(activeRadius, 0, 50)}%`,
                                contain: 'paint'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PixelSwap;
