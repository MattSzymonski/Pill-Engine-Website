import React from 'react';
import { Code2, Rocket, Package, Terminal, Book, ChevronDown } from 'lucide-react';
import Features from './Features';

const Paragraphs = () => {
    const capabilities = [
        {
            icon: <Code2 className="w-12 h-12" />,
            title: 'Developer-Friendly API',
            description: 'Clean, intuitive API designed for productivity and ease of use. Write less boilerplate and focus on what matters - creating amazing gameplay experiences.',
            details: 'Rust\'s type system and our carefully crafted API ensure you catch errors at compile time, not runtime.'
        },
        {
            icon: <Rocket className="w-12 h-12" />,
            title: 'Production Ready',
            description: 'Battle-tested architecture for real-world game development. Built with performance and stability in mind from day one.',
            details: 'Used in production games, optimized for both desktop and mobile platforms with proven scalability.'
        },
        {
            icon: <Package className="w-12 h-12" />,
            title: 'Modular Design',
            description: 'Use only what you need with fully modular components. Cherry-pick systems and features without bloating your build.',
            details: 'Each system is self-contained and optional, giving you full control over your engine\'s footprint and complexity.'
        },
        {
            icon: <Terminal className="w-12 h-12" />,
            title: 'CLI Tools',
            description: 'Powerful command-line tools for project management, asset pipeline, and build automation.',
            details: 'Generate boilerplate, hot-reload assets, and manage your entire development workflow from the terminal.'
        },
        {
            icon: <Book className="w-12 h-12" />,
            title: 'Open Source',
            description: 'Fully open source with an active community of developers and contributors worldwide.',
            details: 'Transparent development, community-driven features, and complete freedom to modify and extend the engine.'
        }
    ];

    return (
        <section className="relative pt-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Features Component */}
                <div className="">
                    <Features />
                </div>

                {/* ECS Architecture Section */}
                <div className="mb-32 mt-32 max-w-6xl mx-auto">
                    <h3 className="text-4xl md:text-6xl font-bold mb-6 text-left">
                        Powered by <strong className="text-pill-red">ECS</strong>
                    </h3>
                    <div className="space-y-6 text-left">
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl">
                            The archetype-based Entity Component System at the heart of Pill Engine delivers
                            exceptional performance through data-oriented design. This isn't just another ECS -
                            it's a carefully engineered system that puts data locality and cache efficiency first.
                        </p>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl">
                            Components are stored contiguously in memory by archetype, enabling optimal cache utilization
                            and allowing your game to scale to thousands of entities without breaking a sweat. Query entities
                            with lightning-fast iteration, and leverage parallel system execution for maximum CPU utilization.
                        </p>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl">
                            Whether you're building a simple 2D platformer or a complex open-world game with millions of entities,
                            the ECS architecture scales with your ambitions while maintaining predictable, deterministic behavior.
                        </p>
                        <div className="pt-6">
                            <div className="inline-block px-8 py-4 bg-gradient-to-r from-pill-red/20 to-pill-red-light/20 border border-pill-red/30 rounded-xl">
                                <p className="text-xl font-semibold text-pill-red">
                                    Data-Oriented. Cache-Friendly. Lightning Fast.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developer Experience Section */}
                <div className="mb-32 max-w-6xl mx-auto">
                    <h3 className="text-4xl md:text-6xl font-bold mb-6 text-left">
                        Built for <strong className="text-pill-red">Developers</strong>
                    </h3>
                    <p className="text-lg md:text-xl text-gray-400 mb-12 text-left max-w-4xl leading-relaxed">
                        Every aspect of Pill Engine is designed with developer experience in mind. From the API design
                        to the tooling ecosystem, everything is focused on making game development faster, safer, and more enjoyable.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {capabilities.map((cap, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-pill-red transition-all duration-300 hover:scale-[102%] hover:shadow-glow-sm"
                            >
                                <div className="mb-6">
                                    <div className="text-pill-red group-hover:scale-110 transition-transform duration-300 mb-4">
                                        {cap.icon}
                                    </div>
                                    <h4 className="text-2xl font-bold mb-3 text-white">
                                        {cap.title}
                                    </h4>
                                </div>
                                <p className="text-base text-gray-300 mb-4 leading-relaxed">
                                    {cap.description}
                                </p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {cap.details}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Getting Started Section */}
                <div className="text-left max-w-6xl mx-auto">
                    <div className="box rounded-[2.5rem] p-8 md:p-20 shadow-2xl border-2 border-pill-red/20 hover:border-pill-red/40 transition-all duration-500 group relative overflow-hidden">
                        {/* Animated shimmer overlay */}
                        <div className="absolute inset-0 shimmer"></div>

                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-5xl font-bold mb-6">
                                Ready to <strong className="text-pill-red">Build</strong>?
                            </h3>
                            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-4xl leading-relaxed">
                                Join the growing community of developers building the next generation of games with Pill Engine.
                            </p>
                        </div>
                    </div>

                    {/* Animated Chevron Arrows */}
                    <div className="flex justify-center gap-4 my-[100px]">
                        <ChevronDown className="w-[80px] h-[50px] text-pill-red animate-bounce" />
                        <ChevronDown className="w-[80px] h-[50px] text-pill-red animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <ChevronDown className="w-[80px] h-[50px] text-pill-red animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Paragraphs;
