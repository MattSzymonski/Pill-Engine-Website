import { Check } from 'lucide-react';

// Mirrors the shipped entries of the feature list in the engine README.
// Anything marked 🚧 there is deliberately absent here.
// prettier-ignore
const groups = [
    {
        title: 'Platforms',
        rows: [
            { name: 'Windows' },
            { name: 'Linux' },
            { name: 'macOS' },
            { name: 'Web (wasm32)' },
        ],
    },
    {
        title: 'Runtime',
        rows: [
            { name: 'Archetype-based ECS' },
            { name: '3D graphics — Blinn-Phong, instancing' },
            { name: 'Scenes' },
            { name: 'Input — keyboard, mouse, gamepad' },
            { name: 'Sound — mono, spatial' },
        ],
    },
    {
        title: 'Content pipeline',
        rows: [
            { name: 'Resources — mesh, texture, shader, material, sound' },
            { name: 'Material system, custom shader loading' },
            { name: 'Custom systems, components, resources' },
        ],
    },
    {
        title: 'Tooling',
        rows: [
            { name: 'Launcher tool' },
            { name: 'Game project hot-reloading' },
            { name: 'Engine code hot-reloading' },
            { name: 'Error chaining' },
        ],
    },
];

const Support = () => {
    return (
        <section
            id="support"
            className="relative scroll-mt-24 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 section-divider"
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] tracking-tight mb-10">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    {groups.map((group) => (
                        <div key={group.title}>
                            <h3 className="text-xl font-semibold text-gray-300 flex items-center gap-3 mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                                {group.title}
                            </h3>
                            <ul className="space-y-2">
                                {group.rows.map((row) => (
                                    <li
                                        key={row.name}
                                        className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.05]"
                                    >
                                        <span className="text-md text-gray-400 leading-snug">
                                            {row.name}
                                        </span>
                                        <Check className="w-4 h-4 flex-shrink-0 text-brand-400" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Support;
