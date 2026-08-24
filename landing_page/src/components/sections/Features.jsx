import { useState } from 'react';
import {
    Flame, Layers, FolderOpen, Eye, Cog, Palette, Search,
    RefreshCw, Wrench, Gamepad2, Volume2, Puzzle, GitBranch,
    Pencil, Microchip, Gauge, Orbit, ChevronDown
} from 'lucide-react';

const featureCategories = [
    {
        title: 'General',
        features: [
            { icon: <Flame className="w-5 h-5" />, title: 'Archetype-based ECS', description: 'Entity Component System architecture optimized for maximum performance.', inProgress: false },
            { icon: <Layers className="w-5 h-5" />, title: 'Scene System', description: 'Intuitive scene management and transitions.', inProgress: false },
            { icon: <FolderOpen className="w-5 h-5" />, title: 'Resource System', description: 'Meshes, textures, shaders, materials, sounds, as well as custom resources.', inProgress: false },
        ]
    },
    {
        title: 'Graphics',
        features: [
            { icon: <Eye className="w-5 h-5" />, title: '3D Graphics', description: 'PBR shading model with optimized instancing support for stunning visuals.', inProgress: false },
            { icon: <Cog className="w-5 h-5" />, title: 'Scriptable Rendering Pipeline', description: 'Programmable pipeline with custom render passes, render targets, and shaders.', inProgress: false },
            { icon: <Palette className="w-5 h-5" />, title: 'Material System', description: 'Advanced material system with custom shader loading capabilities.', inProgress: false },
            { icon: <Search className="w-5 h-5" />, title: 'Post-processing', description: 'Palette of post-processing effects for stunning visuals.', inProgress: true },
        ]
    },
    {
        title: 'Development Utilities',
        features: [
            { icon: <RefreshCw className="w-5 h-5" />, title: 'Hot-Reloading', description: 'Game project hot-reloading for rapid iteration and development.', inProgress: true },
            { icon: <RefreshCw className="w-5 h-5" />, title: 'Shader Hot-reloading', description: 'Instant shader hot-reloads without restarting the game or engine.', inProgress: true },
            { icon: <Wrench className="w-5 h-5" />, title: 'Launcher Tool', description: 'Streamlined project setup and management with the included launcher.', inProgress: false },
        ]
    },
    {
        title: 'Audio & Input',
        features: [
            { icon: <Volume2 className="w-5 h-5" />, title: 'Audio System', description: '3D spatial audio with full mixer control and effect chains.', inProgress: false },
            { icon: <Gamepad2 className="w-5 h-5" />, title: 'Input System', description: 'Flexible input handling with gamepad, keyboard, and mouse support.', inProgress: false },
        ]
    },
    {
        title: 'Core Systems',
        features: [
            { icon: <Puzzle className="w-5 h-5" />, title: 'Plugin System', description: 'Extensible architecture with a powerful plugin system for custom functionality.', inProgress: false },
            { icon: <GitBranch className="w-5 h-5" />, title: 'Editor & Tools', description: 'Integrated editor with scene view, inspector, and debugging tools.', inProgress: false },
            { icon: <Pencil className="w-5 h-5" />, title: 'Scripting', description: 'Rust-based scripting with full access to the engine API.', inProgress: false },
        ]
    },
    {
        title: 'Platform & Performance',
        features: [
            { icon: <Microchip className="w-5 h-5" />, title: 'Cross-Platform', description: 'Deploy to Windows, macOS, and Linux from a single codebase.', inProgress: false },
            { icon: <Gauge className="w-5 h-5" />, title: 'Optimized Rendering', description: 'GPU-driven rendering with automatic instancing and culling.', inProgress: false },
            { icon: <Orbit className="w-5 h-5" />, title: 'Multithreading', description: 'Parallel system execution for maximum CPU utilization.', inProgress: false },
        ]
    },
];

/**
 * Presentational feature card. The description stays collapsed unless the
 * parent category passes `expanded`; the fold uses a smooth grid animation.
 */
const FeatureCard = ({ feature, expanded }) => {
    return (
        <div className="glass-card p-2.5 md:p-5 group flex gap-4 items-start">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                feature.inProgress
                    ? 'bg-yellow-500/10 text-yellow-500'
                    : 'bg-brand-500/10 text-brand-400'
            }`}>
                {feature.icon}
            </div>
            <div className={`min-w-0 flex-1 transition-all duration-300 ease-in-out ${expanded ? 'mt-0' : 'mt-[6px]'}`}>
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-semibold text-white">
                        {feature.title}
                    </h4>
                    {feature.inProgress && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                            Soon
                        </span>
                    )}
                </div>
                <div className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <p className="text-md text-gray-500 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Feature category with a single "Expand/Collapse" button next to the title
 * that toggles the descriptions of every card in the category at once.
 */
const FeatureCategory = ({ category }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-gray-300 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    {category.title}
                </h3>
                <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    aria-expanded={expanded}
                    className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-white transition-colors duration-150"
                >
                    {expanded ? 'Collapse' : 'Expand'}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.features.map((feature, featureIndex) => (
                    <FeatureCard key={featureIndex} feature={feature} expanded={expanded} />
                ))}
            </div>
        </div>
    );
};

const Features = () => {
    return (
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 section-divider">
            <div className="max-w-6xl mx-auto">
                {/* Section heading */}
                <div className="mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl  text-white leading-[1.15] tracking-tight mb-4">
                        Everything you need
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Pill ships with a comprehensive set of tools and systems out of the box.
                    </p>
                </div>

                {/* Feature categories */}
                <div className="space-y-16">
                    {featureCategories.map((category, categoryIndex) => (
                        <FeatureCategory key={categoryIndex} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
