import React from 'react';
import {
    Box, Lightbulb, Layers, Gamepad2, Volume2, FolderOpen,
    Palette, Puzzle, GitBranch, Wrench, Flame, RefreshCw
} from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Box className="w-12 h-12" />,
            title: 'Archetype-based ECS',
            description: "Modern Entity Component System architecture for optimal performance and flexibility.",
        },
        {
            icon: <Lightbulb className="w-12 h-12" />,
            title: '3D Graphics',
            description: 'Blinn-Phong shading model with instancing support for stunning visuals.',
        },
        {
            icon: <Layers className="w-12 h-12" />,
            title: 'Scene System',
            description: 'Organize your game with intuitive scene management and transitions.',
        },
        {
            icon: <Gamepad2 className="w-12 h-12" />,
            title: 'Input Handling',
            description: 'Comprehensive keyboard, mouse, and gamepad support out of the box.',
        },
        {
            icon: <Volume2 className="w-12 h-12" />,
            title: 'Sound System',
            description: 'Play mono and spatial audio to bring your game world to life.',
        },
        {
            icon: <FolderOpen className="w-12 h-12" />,
            title: 'Resource System',
            description: 'Efficient management of meshes, textures, shaders, materials, and sounds.',
        },
        {
            icon: <Palette className="w-12 h-12" />,
            title: 'Material System',
            description: 'Advanced material system with custom shader loading capabilities.',
        },
        {
            icon: <Puzzle className="w-12 h-12" />,
            title: 'Custom Extensions',
            description: 'Create custom systems, components, and resources with ease.',
        },
        {
            icon: <GitBranch className="w-12 h-12" />,
            title: 'Error Chaining',
            description: 'Comprehensive error handling for robust game development.',
        },
        {
            icon: <Wrench className="w-12 h-12" />,
            title: 'Launcher Tool',
            description: 'Streamlined project setup and management with the included launcher.',
        },
        {
            icon: <RefreshCw className="w-12 h-12" />,
            title: 'Hot-Reloading',
            description: 'Game project hot-reloading for rapid iteration and development.',
        },
        {
            icon: <Flame className="w-12 h-12" />,
            title: 'Rust Performance',
            description: 'Built with Rust for memory safety and blazing fast execution.',
        }
    ];

    return (
        <section className="relative pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden" >

            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white animate-slide-up">
                    Powerful features built for developers.
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Everything you need to build amazing games, right out of the box. From advanced 3D graphics with Blinn-Phong shading to comprehensive input handling, spatial audio, and hot-reloading for rapid iteration—Pill Engine is equipped to handle projects of any scale.
                </p>
                <a href="https://github.com/pill-engine" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-pill-red hover:text-pill-red-light font-semibold text-lg transition-colors duration-300 mb-12">
                    View all features →
                </a>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group feature-card glass rounded-3xl p-8 text-center border-2 border-gray-800/50 hover:border-pill-red transition-all duration-500 relative overflow-hidden"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pill-red/5 via-transparent to-pill-red-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="flex justify-center mb-6 relative z-10">
                                <div className="relative p-5 rounded-2xl bg-gradient-to-br from-pill-red/10 to-pill-red-light/10 group-hover:scale-110  transition-all duration-500 shadow-lg group-hover:shadow-pill-red/30">
                                    {/* Animated ring */}
                                    <div className="absolute inset-0 rounded-2xl border-2 border-pill-red/30 group-hover:scale-110 transition-transform duration-500"></div>
                                    {React.cloneElement(feature.icon, {
                                        className: 'w-12 h-12 relative z-10',
                                        style: {
                                            stroke: 'url(#redGradient)',
                                            filter: 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))',
                                        }
                                    })}
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white relative z-10 group-hover:text-pill-red transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed relative z-10">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#ff6b35', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
};

export default Features;
