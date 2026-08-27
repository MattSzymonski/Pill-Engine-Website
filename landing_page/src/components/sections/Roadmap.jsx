import { ThumbsUp } from 'lucide-react';

// prettier-ignore
const roadmapItems = [
    'Rust scripting',
    'C# scripting, with types generated on reload',
    'Scene and project serialization',
    'Modular engine - split into separate DLLs',
    'Hot reload, two levels: rebuild and relink a DLL, or patch a single function in place',
    'State kept across reloads, including migration when data types change',
    'Editor - minimum viable version',
    'Tracing, with logging built on the same pipeline',
    'Error handling with full callstacks, ready to feed telemetry',
    'Tests: unit tests next to the Rust source, integration tests driven from Python',
    'Documentation generated from source, published to the docs site',
    'Embedding: your application owns the window, event loop and GPU device, the engine renders into a texture you hand it',
    'Headless rendering, for servers and CI',
];

/**
 * One timeline entry: a node sitting on the spine, the item text, and a vote
 * affordance. The button is presentational for now - votes are not collected.
 */
const RoadmapItem = ({ item }) => (
        <li className="relative pl-10 sm:pl-12">
            <span
                className="absolute left-[11px] sm:left-[15px] top-[22px] w-2.5 h-2.5 rounded-full ring-4 bg-brand-400 ring-brand-400/20"
                aria-hidden="true"
            />
            <div className="glass-card p-4 sm:p-5 group flex items-start gap-4">
                <p className="min-w-0 flex-1 text-md sm:text-lg text-gray-300 leading-relaxed">
                    {item}
                </p>
                <button
                    type="button"
                    aria-label={`Vote for ${item}`}
                    className="inline-flex items-center gap-1.5 flex-shrink-0 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
                >
                    <ThumbsUp className="w-4 h-4" />
                </button>
            </div>
        </li>
);

const Roadmap = () => {
    return (
        <section
            id="roadmap"
            className="relative scroll-mt-24 py-8 sm:py-10 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section heading */}
                <div className="mb-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] tracking-tight mb-4">
                        What's next is worth waiting for
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        We're forging the future. Vote on what matters most to you, or{' '}
                        <a
                            href="mailto:contact@pillengine.org"
                            className="text-brand-400 hover:text-brand-300 transition-colors duration-150"
                        >
                            contact us
                        </a>
                        .
                    </p>
                </div>

                {/* Vertical timeline */}
                <div className="relative">
                    {/* Spine */}
                    <span
                        className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-white/[0.08]"
                        aria-hidden="true"
                    />
                    <ul className="space-y-3">
                        {roadmapItems.map((item, index) => (
                            <RoadmapItem key={index} item={item} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
