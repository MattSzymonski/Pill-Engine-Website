import { Check } from 'lucide-react';

// Mirrors the shipped entries of the feature list in the engine README.
// Anything marked 🚧 there is deliberately absent here.
// prettier-ignore
const groups = [
    {
        title: 'Platforms',
        rows: ['Windows', 'Linux', 'macOS', 'Web (wasm32)'],
    },
    {
        title: 'Runtime',
        rows: [
            'Archetype-based ECS',
            '3D graphics - Blinn-Phong, instancing',
            'Scenes',
            'Input - keyboard, mouse, gamepad',
            'Sound - mono, spatial',
        ],
    },
    {
        title: 'Content pipeline',
        rows: [
            'Resources - mesh, texture, shader, material, sound',
            'Material system, custom shader loading',
            'Custom systems, components, resources',
        ],
    },
    {
        title: 'Tooling',
        rows: [
            'Launcher tool',
            'Game project hot-reloading',
            'Engine code hot-reloading',
            'Error chaining',
        ],
    },
];

const Features = () => {
    return (
        <section
            id="features"
            className="relative scroll-mt-24 py-8 sm:py-10 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] tracking-tight mb-4">
                    Everything you need
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mb-10">
                   Pill ships with a comprehensive set of tools and systems out of the box.
                </p>
                
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
                                        key={row}
                                        className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.05]"
                                    >
                                        <span className="text-md text-gray-400 leading-snug">
                                            {row}
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

export default Features;
