import { Cpu, Package, Layers, Zap, Boxes } from 'lucide-react';

// prettier-ignore
const usps = [
    {
        icon: <Cpu className="w-5 h-5" />,
        metric: '500K+',
        label: 'Entities @ 60 FPS',
    },
    {
        icon: <Package className="w-5 h-5" />,
        metric: '500KB',
        label: 'WASM build',
    },
    {
        icon: <Layers className="w-5 h-5" />,
        metric: '100%',
        label: 'Core utilization',
    },
    {
        icon: <Zap className="w-5 h-5" />,
        metric: '<1ms',
        label: 'Asset streaming',
    },
    {
        icon: <Boxes className="w-5 h-5" />,
        metric: 'MIT',
        label: 'Open source, free forever',
    },
];

/**
 * Compact above-the-fold proof strip. Mirrors the benchmark figures from the
 * Performance section cards so a visitor sees the numbers without scrolling.
 */
const UspStrip = () => {
    return (
        <div id="features" className="scroll-mt-24 grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
            {usps.map((usp, index) => (
                <div
                    key={usp.metric}
                    className={`glass-card p-3 sm:p-4 flex flex-col items-center text-center gap-1.5 sm:gap-2 ${
                        index === usps.length - 1 ? 'col-span-2 lg:col-span-1' : ''
                    }`}
                >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
                        {usp.icon}
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight leading-none">
                        {usp.metric}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 leading-snug">
                        {usp.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default UspStrip;
