import React, { useEffect, useState } from 'react';
import {
    Box, Eye, Layers, Gamepad2, Volume2, FolderOpen,
    Palette, Puzzle, GitBranch, Wrench, Flame, RefreshCw
} from 'lucide-react';

const Features = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            icon: <Box className="w-12 h-12" />,
            title: 'Archetype-based ECS',
            description: "Modern Entity Component System architecture optimized for maximum performance.",
        },
        {
            icon: <Eye className="w-12 h-12" />,
            title: '3D Graphics',
            description: 'PBR shading model with instancing support for stunning visuals.',
        },
        {
            icon: <Eye className="w-12 h-12" />,
            title: 'Scriptable Rendering Pipeline',
            description: 'Programmable rendering pipeline with support for custom render passes, render targets, and shaders.',
        },
        {
            icon: <RefreshCw className="w-12 h-12" />,
            title: 'Hot-Reloading',
            description: 'Game project hot-reloading for rapid iteration and development.',
        },
        {
            icon: <Layers className="w-12 h-12" />,
            title: 'Multiplatform Support',
            description: 'Deploy your game across web, desktop, and mobile platforms effortlessly.',
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
            icon: <Flame className="w-12 h-12" />,
            title: 'ESP32 Target',
            description: 'Running on ESP32 microcontrollers',
        },
        {
            icon: <Flame className="w-12 h-12" />,
            title: 'Post-processing',
            description: 'Palette of post-processing effects for stunning visuals.',
        },
        {
            icon: <Flame className="w-12 h-12" />,
            title: 'Shader Hot-reloading',
            description: 'Instantly update shaders without restarting the game or engine.',
        },
        {
            icon: <Flame className="w-12 h-12" />,
            title: 'Physics System',
            description: 'Robust physics system for realistic interactions and collisions.',
        },
        {
            icon: <Flame className="w-12 h-12" />,
            title: 'Configurable Logging',
            description: 'Powerful logging system for debugging and performance monitoring.',
        },
        {
            icon: <Flame className="w-12 h-12" />,
            title: 'Networking',
            description: 'Multiplayer networking support for building connected experiences.',
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
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-white animate-slide-up">
                    Powerful features built for developers.
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Everything you need to build amazing games, right out of the box. From advanced 3D graphics with Blinn-Phong shading to comprehensive input handling, spatial audio, and hot-reloading for rapid iteration—Pill Engine is equipped to handle projects of any scale.
                </p>
                <a href="https://github.com/pill-engine" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-pill-red dark:hover:text-pill-red-light font-semibold text-lg transition-colors duration-300 mb-12">
                    View all features →
                </a>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group box rounded-3xl p-10 hover:border-pill-primary transition-all duration-500 relative overflow-hidden animate-scale-in hover:scale-105 hover:shadow-glow-md"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pill-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-pill-primary/20 to-pill-primary-light/10 group-hover:scale-110 transition-all duration-500">
                                        {React.cloneElement(feature.icon, {
                                            className: 'w-14 h-14 text-pill-primary icon-glow',
                                            style: {
                                                stroke: isDark ? 'url(#redGradient)' : 'url(#blueGradient)',
                                            }
                                        })}
                                    </div>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-center mb-4 text-white group-hover:text-pill-primary transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-gray-300 text-center leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                        </linearGradient>
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
