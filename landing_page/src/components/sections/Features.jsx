import React, { useEffect, useState } from 'react';
import {
    Box, Eye, Cog, Layers, Gamepad2, Volume2, FolderOpen,
    Palette, Puzzle, GitBranch, Wrench, Flame, RefreshCw, Search, PenLine,
    PencilLine, Link, Orbit, Network, Pencil, PackageCheck, Microchip, Gauge,
    Microscope, ChartLine,
    Cpu
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

    const featureSections = [
        {
            title: 'General',
            features: [
                {
                    icon: <Flame className="w-12 h-12" />,
                    title: 'Archetype-based ECS',
                    description: "Entity Component System architecture optimized for maximum performance.",
                    inProgress: false,
                },
                {
                    icon: <Layers className="w-12 h-12" />,
                    title: 'Scene System',
                    description: 'Intuitive scene management and transitions.',
                    inProgress: false,
                },
                {
                    icon: <FolderOpen className="w-12 h-12" />,
                    title: 'Resource System',
                    description: 'Meshes, textures, shaders, materials, sounds, as well as custom resources.',
                    inProgress: false,
                },
            ]
        },
        {
            title: 'Graphics',
            features: [
                {
                    icon: <Eye className="w-12 h-12" />,
                    title: '3D Graphics',
                    description: 'PBR shading model with optimized instancing support for stunning visuals.',
                    inProgress: false,
                },
                {
                    icon: <Cog className="w-12 h-12" />,
                    title: 'Scriptable Rendering Pipeline',
                    description: 'Programmable pipeline with custom render passes, render targets, and shaders.',
                    inProgress: false,
                },
                {
                    icon: <Palette className="w-12 h-12" />,
                    title: 'Material System',
                    description: 'Advanced material system with custom shader loading capabilities.',
                    inProgress: false,
                },
                {
                    icon: <Search className="w-12 h-12" />,
                    title: 'Post-processing',
                    description: 'Palette of post-processing effects for stunning visuals.',
                    inProgress: true,
                },
            ]
        },
        {
            title: 'Development Utilities',
            features: [
                {
                    icon: <RefreshCw className="w-12 h-12" />,
                    title: 'Hot-Reloading',
                    description: 'Game project hot-reloading for rapid iteration and development.',
                    inProgress: true,
                },
                {
                    icon: <RefreshCw className="w-12 h-12" />,
                    title: 'Shader Hot-reloading',
                    description: 'Instant shader hot-reloads without restarting the game or engine.',
                    inProgress: true,
                },
                {
                    icon: <Wrench className="w-12 h-12" />,
                    title: 'Launcher Tool',
                    description: 'Streamlined project setup and management with the included launcher.',
                    inProgress: false,
                },
                {
                    icon: <PencilLine className="w-12 h-12" />,
                    title: 'Configurable Logging',
                    description: 'Powerful logging system for debugging and performance monitoring.',
                    inProgress: false,
                },
                {
                    icon: <ChartLine className="w-12 h-12" />,
                    title: 'Profiling Tools',
                    description: 'Profiling utilities for efficient performance analysis and optimization.',
                    inProgress: false,
                },
                {
                    icon: <Link className="w-12 h-12" />,
                    title: 'Error Chaining',
                    description: 'Comprehensive error handling for robust game development.',
                    inProgress: false,
                },
            ]
        },
        {
            title: 'Features',
            features: [
                {
                    icon: <Gamepad2 className="w-12 h-12" />,
                    title: 'Input Handling',
                    description: 'Comprehensive keyboard, mouse, and gamepad support out of the box.',
                    inProgress: false,
                },
                {
                    icon: <Volume2 className="w-12 h-12" />,
                    title: 'Sound System',
                    description: 'Play mono and spatial audio to bring your game world to life.',
                    inProgress: false,
                },
                {
                    icon: <Orbit className="w-12 h-12" />,
                    title: 'Physics System',
                    description: 'Robust physics system for realistic interactions and collisions.',
                    inProgress: true,
                },
                {
                    icon: <Network className="w-12 h-12" />,
                    title: 'Networking',
                    description: 'Multiplayer networking support for building connected experiences.',
                    inProgress: false,
                },
            ]
        },
        {
            title: 'Targets',
            features: [
                {
                    icon: <PackageCheck className="w-12 h-12" />,
                    title: 'Cross Platform',
                    description: 'Deploy your game across web, desktop, and mobile platforms effortlessly.',
                    inProgress: false,
                },
                {
                    icon: <Cpu className="w-12 h-12" />,
                    title: 'ESP32 Target',
                    description: 'Running on ESP32 microcontrollers',
                    inProgress: true,
                },
            ]
        },
        {
            title: 'Other',
            features: [
                {
                    icon: <Puzzle className="w-12 h-12" />,
                    title: 'Custom Extensions',
                    description: 'Create custom systems, components, and resources with ease.',
                    inProgress: true,
                },
                {
                    icon: <Gauge className="w-12 h-12" />,
                    title: 'Rust Performance',
                    description: 'Built with Rust for memory safety and blazing fast execution.',
                    inProgress: false,
                },
            ]
        },
    ];

    return (
        <section className="relative overflow-hidden" >

            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-white animate-slide-up">
                    Powerful features built-in
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Everything you need to build amazing projects, right out of the box. From advanced 3D graphics with PBR shading to comprehensive input handling, spatial audio, and hot-reloading for rapid iteration - Pill is equipped to handle projects of any scale.
                </p>

                {featureSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-20">
                        <h3 className="text-3xl md:text-4xl font-black mb-8 text-white">
                            {section.title}
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            {section.features.map((feature, featureIndex) => (
                                <div
                                    key={featureIndex}
                                    className="group box rounded-2xl md:rounded-3xl p-4 md:p-10 hover:border-pill-primary transition-all duration-500 relative overflow-hidden animate-scale-in hover:scale-105 hover:shadow-glow-md"
                                    style={{ animationDelay: `${(sectionIndex * section.features.length + featureIndex) * 0.05}s` }}
                                >
                                    {/* Hover gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-pill-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative z-10">
                                        <div className="flex justify-center mb-3 md:mb-6">
                                            <div className="p-2 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-pill-primary/20 to-pill-primary-light/10 group-hover:scale-110 transition-all duration-500">
                                                {React.cloneElement(feature.icon, {
                                                    className: 'w-8 h-8 md:w-14 md:h-14 text-pill-primary icon-glow',
                                                    style: {
                                                        stroke: isDark ? 'url(#redGradient)' : 'url(#blueGradient)',
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <h3 className="text-sm md:text-3xl font-black text-center mb-2 md:mb-4 text-white group-hover:text-pill-primary transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs md:text-lg text-gray-300 text-center leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* In Progress Stripes */}
                                    {feature.inProgress && (
                                        <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 overflow-hidden rounded-b-2xl md:rounded-b-3xl">
                                            <div className="w-full h-full bg-gradient-to-r from-transparent via-transparent to-transparent" style={{
                                                backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 10px, #fbbf24 10px, #fbbf24 20px)',
                                                backgroundSize: '28.28px 28.28px'
                                            }}></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

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
