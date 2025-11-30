import React from 'react';
import { Github, BookOpen, Download, Sparkles } from 'lucide-react';

const CTA = () => {
    return (
        <section className="relative pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Animated background grid */}
            <div className="background-grid"></div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="box rounded-[2.5rem] p-8 md:p-20 shadow-2xl border-2 border-pill-red/20 hover:border-pill-red/40 transition-all duration-500 animate-scale-in group relative overflow-hidden">
                    {/* Animated shimmer overlay */}
                    <div className="absolute inset-0 shimmer"></div>

                    <div className="flex flex-wrap gap-6 mb-14 text-sm text-gray-300">
                        <span className="px-6 py-3 glass rounded-full flex items-center gap-3 border-2 border-pill-red/30 hover:border-pill-red hover:scale-110 transition-all duration-300 cursor-pointer font-semibold">
                            <Sparkles className="w-5 h-5 text-pill-red icon-glow" /> Open Source
                        </span>
                        <span className="px-6 py-3 glass rounded-full flex items-center gap-3 border-2 border-pill-red-light/30 hover:border-pill-red-light hover:scale-110 transition-all duration-300 cursor-pointer font-semibold">
                            <Sparkles className="w-5 h-5 text-pill-red-light icon-glow" /> Actively Developed
                        </span>
                        <span className="px-6 py-3 glass rounded-full flex items-center gap-3 border-2 border-pill-red-light/30 hover:border-pill-red-light hover:scale-110 transition-all duration-300 cursor-pointer font-semibold">
                            <Sparkles className="w-5 h-5 text-pill-red-light icon-glow" /> Community Driven
                        </span>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-gray-100 dark:text-white">
                            How to get started in Pill Engine
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl leading-relaxed">
                            New to game development? Making the switch from another engine? Wherever you're coming from, we've got documentation, examples, and a supportive community to help you get started building your project.
                        </p>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black mb-6 text-pill-red drop-shadow-glow-lg">
                        Start Building Today
                    </h3>

                    <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl leading-relaxed">
                        Join the community of developers pushing the boundaries of game development. Install the engine with a single command and start your journey.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 mt-12 items-center">
                        <a href="/guide" target="_blank" rel="noopener noreferrer"
                            className="group relative px-10 py-5 bg-gradient-to-r from-pill-red to-pill-red-light rounded-2xl font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-glow-xl flex items-center gap-3 btn-glow">
                            <BookOpen className="w-7 h-7 text-white relative z-10" />
                            <span className="relative z-10">Start with Pill Guide</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pill-red-dark to-pill-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                    </div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[120px]">
                    <div className="glass rounded-3xl p-8 border-2 border-pill-red/20 hover:border-pill-red transition-all duration-500 hover:scale-105 hover:shadow-glow-lg animate-slide-in-left group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-pill-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-3xl md:text-4xl font-black text-pill-red mb-3 text-glow-sm">Memory Safe and Fast</div>
                            <div className="text-base text-gray-300 font-semibold">Rust Powered</div>
                        </div>
                    </div>
                    <div className="glass rounded-3xl p-8 border-2 border-pill-red/20 hover:border-pill-red transition-all duration-500 hover:scale-105 hover:shadow-glow-lg animate-scale-in group relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-pill-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-3xl md:text-4xl font-black text-pill-red mb-3 text-glow-sm">Passion Driven</div>
                            <div className="text-base text-gray-300 font-semibold">Community Built</div>
                        </div>
                    </div>
                    <div className="glass rounded-3xl p-8 border-2 border-pill-red/20 hover:border-pill-red transition-all duration-500 hover:scale-105 hover:shadow-glow-lg animate-slide-in-right group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-pill-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-3xl md:text-4xl font-black text-pill-red mb-3 text-glow-sm">Waiting for You</div>
                            <div className="text-base text-gray-300 font-semibold">Start Building Today</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
