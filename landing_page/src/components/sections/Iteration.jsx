import { RefreshCw, Zap, FileCode, Boxes, Layers } from 'lucide-react';

// prettier-ignore
const loop = [
    { icon: <RefreshCw className="w-5 h-5" />, metric: '1–2s', label: 'DLL rebuild and relink' },
    { icon: <Zap className="w-5 h-5" />, metric: '0.5s', label: 'Function patched in a running DLL' },
];

// Counted from the engine repo: .rs files under engine/, excluding target and vendor.
// prettier-ignore
const size = [
    { icon: <FileCode className="w-5 h-5" />, metric: '36K', label: 'Lines of engine Rust' },
    { icon: <Boxes className="w-5 h-5" />, metric: '2.5MB', label: 'Engine source on disk' },
    { icon: <Layers className="w-5 h-5" />, metric: '8', label: 'Crates you can read in a sitting' },
];

const Tile = ({ item }) => (
    <div className="glass-card p-3 sm:p-4 flex flex-col items-center text-center gap-1.5 sm:gap-2">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
            {item.icon}
        </div>
        <span className="text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight leading-none">
            {item.metric}
        </span>
        <span className="text-xs sm:text-sm text-gray-500 leading-snug">
            {item.label}
        </span>
    </div>
);

const Iteration = () => {
    return (
        <section
            id="iteration"
            className="relative scroll-mt-24 py-8 sm:py-10 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] tracking-tight mb-3">
                    Change code, keep playing
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mb-10">
                    Run with <code className="text-brand-400">-c hot-reload</code>, edit, while the game
                    reloads with your world state intact.
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-10">
                    {loop.map((item) => <Tile key={item.label} item={item} />)}
                </div>

                <h3 className="text-xl font-semibold text-gray-300 flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    The engine itself
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-10">
                    {size.map((item) => <Tile key={item.label} item={item} />)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Custom render passes
                        </h3>
                        <p className="text-md text-gray-500 leading-relaxed">
                            Games implement their own passes and combine them with engine passes into
                            a new pipeline.
                        </p>
                    </div>
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Reload keeps your state
                        </h3>
                        <p className="text-md text-gray-500 leading-relaxed">
                            Project state persists across reloads. Migration of changed data types is
                            in progress.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Iteration;
