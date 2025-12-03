import React from 'react';
import { Cpu, Zap, Code } from 'lucide-react';
import Dither from '../effects/DitherBackground';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ clipPath: 'inset(0)' }}>
            <div className="fixed inset-0 overflow-hidden z-0" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                <Dither
                    waveColor={[0.6, 0.6, 0.6]}
                    disableAnimation={false}
                    enableMouseInteraction={false}
                    mouseRadius={0.25}
                    colorNum={5}
                    waveAmplitude={0.2}
                    waveFrequency={2.5}
                    waveSpeed={0.03}
                />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
                <div className="animate-slide-up">
                    {/* Logo/Icon with gradient background */}
                    <div className="relative pt-20 pb-8 flex justify-center">
                        {/* Multiple glow layers for depth */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-pill-blue/10 dark:bg-pill-red/10 rounded-full filter blur-[150px] animate-pulse-glow -z-10"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pill-blue/15 dark:bg-pill-red/15 rounded-full filter blur-[100px] animate-pulse-glow -z-10" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pill-blue-light/25 dark:bg-pill-red-light/25 rounded-full filter blur-[80px] animate-pulse-glow -z-10" style={{ animationDelay: '1s' }}></div>
                        {/* Pill Logo/Icon with enhanced effects */}
                    </div>
                    <h1 className=" text-[140px] sm:text-[220px] md:text-[300px] lg:text-[320px] mb-8 text-white lowercase pill-logo-text">
                        <span className="drop-shadow-glow-md ">
                            pill
                        </span>
                    </h1>

                    <p className="text-xl md:text-4xl text-gray-200 mt-[64px] mb-6 max-w-4xl mx-auto leading-relaxed drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                        Modern, <span className="text-pill-blue dark:text-pill-red font-bold">free</span> and <span className="text-pill-blue dark:text-pill-red font-bold">blazingly fast</span> game engine
                    </p>

                    <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        Because everyone's idea deserves an open source, next generation game engine to bring it to life
                    </p>

                    {/* Enhanced CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 pointer-events-auto">
                        <a href="/guide" target="_blank" rel="noopener noreferrer"
                            className="group relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-pill-blue to-pill-blue-light dark:from-pill-red dark:to-pill-red-light rounded-2xl font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-glow-md btn-glow">
                            <span className="relative z-10 flex items-center gap-3 text-[15px] md:text-lg">
                                <Code className="w-5 h-5 md:w-6 md:h-6" />
                                Get Started
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pill-blue-dark to-pill-blue dark:from-pill-red-dark dark:to-pill-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                        <a href="https://github.com/MattSzymonski/Pill-Engine" target="_blank" rel="noopener noreferrer"
                            className="group relative px-8 py-4 md:px-10 md:py-5 border-2 border-pill-blue dark:border-pill-red text-pill-blue dark:text-pill-red rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-pill-blue dark:hover:bg-pill-red hover:text-white hover:scale-110 hover:shadow-glow-sm flex items-center gap-3 overflow-hidden">
                            <span className="relative z-10 text-[15px] md:text-lg white-text-glow">View on GitHub</span>
                            <div className="absolute inset-0 bg-pill-blue dark:bg-pill-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
