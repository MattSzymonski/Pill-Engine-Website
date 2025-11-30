import React from 'react';
import { Target, Zap, Boxes } from 'lucide-react';

const About = () => {
    return (
        <section className="relative pt-32 px-5 sm:px-6 lg:px-8 overflow-hidden">
            {/* Animated background grid */}
            <div className="background-grid"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Main headline - left aligned */}
                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-white animate-slide-up">
                        Power that can keep up with the wildest imaginations.
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-4xl leading-relaxed animate-slide-up mb-8" style={{ animationDelay: '0.1s' }}>
                        Define breakthrough game mechanics, create lifelike characters, or animate every detail in your world—and render it all at the speed you can dream it. We originally designed Pill Engine to give us the creative freedom we always wanted as developers. Today, our goal is to push the boundaries of performance and simplicity with every release so that only you, not your tools, get to decide the limits of what's possible.
                    </p>

                    <p className="text-lg md:text-xl text-gray-300 max-w-4xl leading-relaxed animate-slide-up mb-8" style={{ animationDelay: '0.1s' }}>
                        Whether you're a solo indie developer or part of a larger team, Pill Engine provides the foundation you need to bring your creative vision to life. No royalties, no restrictions, just pure game development freedom.
                    </p>
                    <a href="https://github.com/pill-engine" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-pill-red hover:text-pill-red-light font-semibold text-lg transition-colors duration-300">
                        See all features →
                    </a>
                </div>

                {/* Design Goals with enhanced effects */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="group box rounded-3xl p-10 hover:border-pill-red transition-all duration-500 relative overflow-hidden animate-scale-in hover:scale-105 hover:shadow-glow-md">
                        <div className="absolute inset-0 bg-gradient-to-br from-pill-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex justify-center mb-6">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-pill-red/30 to-pill-red-light/20 group-hover:scale-110  transition-all duration-500">
                                    <Target className="w-14 h-14 text-pill-red icon-glow" />
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-center mb-4 text-white group-hover:text-pill-red transition-colors duration-300">Clean & Simple</h3>
                            <p className="text-lg text-gray-300 text-center leading-relaxed">
                                Elegant API design that gets out of your way
                            </p>
                        </div>
                    </div>

                    <div className="group box rounded-3xl p-10 hover:border-pill-red-light transition-all duration-500 relative overflow-hidden animate-scale-in hover:scale-105 hover:shadow-glow-md" style={{ animationDelay: '0.1s' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-pill-red-light/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex justify-center mb-6">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-pill-red-light/30 to-pill-red/20 group-hover:scale-110  transition-all duration-500">
                                    <Zap className="w-14 h-14 text-pill-red-light icon-glow" />
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-center mb-4 text-white group-hover:text-pill-red-light transition-colors duration-300">Blazing Fast</h3>
                            <p className="text-lg text-gray-300 text-center leading-relaxed">
                                ECS-based architecture written in Rust for maximum performance
                            </p>
                        </div>
                    </div>

                    <div className="group box rounded-3xl p-10 hover:border-pill-red-light transition-all duration-500 relative overflow-hidden animate-scale-in hover:scale-105 hover:shadow-glow-md" style={{ animationDelay: '0.2s' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-pill-red-light/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex justify-center mb-6">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-pill-red-light/30 to-pill-red/20 group-hover:scale-110  transition-all duration-500">
                                    <Boxes className="w-14 h-14 text-pill-red-light icon-glow" />
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-center mb-4 text-white group-hover:text-pill-red-light transition-colors duration-300">Highly Extensible</h3>
                            <p className="text-lg text-gray-300 text-center leading-relaxed">
                                Custom systems, components, and resources
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ships fully loaded section - left aligned */}
                <div className="mb-20 animate-slide-up">
                    <h3 className="text-4xl md:text-6xl font-black mb-6 text-white">
                        Ships fully loaded for everyone.
                    </h3>
                    <p className="text-lg md:text-xl text-gray-300 max-w-4xl leading-relaxed mb-8">
                        Develop games. Create simulations. Build next-generation visualizations. Or design immersive experiences we haven't even thought of yet. No matter what style, screen size, or project you have in mind, Pill Engine comes standard with everything you need to help you make it real.
                    </p>
                    <p className="text-lg md:text-xl text-gray-300 max-w-4xl leading-relaxed">
                        Powered by an <strong className="text-pill-red font-black">archetype-based Entity Component System</strong> written in <strong className="text-rust-orange font-black">Rust</strong>, Pill Engine delivers unmatched performance, memory safety for modern game development.
                    </p>
                </div>


            </div>
        </section>
    );
};

export default About;
