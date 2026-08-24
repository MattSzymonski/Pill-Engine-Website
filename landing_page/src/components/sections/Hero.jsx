import { ArrowRight, Github } from 'lucide-react';
import Dither from '../effects/Dither';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Dither background */}
            <div className="absolute inset-0 overflow-hidden z-0" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                <Dither
                    waveColor={[0.6, 0.6, 0.6]}
                    disableAnimation={false}
                    enableMouseInteraction={false}
                    mouseRadius={0.25}
                    colorNum={5}
                    waveAmplitude={0.24}
                    waveFrequency={2.5}
                    waveSpeed={0.03}
                />
            </div>

            {/* Background glow orbs - Raycast style */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="glow-orb w-[800px] h-[800px] bg-brand-400/10 -top-40 -right-40 animate-orb-pulse" />
                <div className="glow-orb w-[600px] h-[600px] bg-brand-500/8 bottom-0 -left-40 animate-orb-pulse" style={{ animationDelay: '3s' }} />
                <div className="glow-orb w-[400px] h-[400px] bg-brand-400/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orb-pulse" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '64px 64px',
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Logo */}
                <div className="mb-10 animate-fade-in">
                    <img
                        src="/pill_logo.svg"
                        alt="Pill Engine"
                        className="h-[160px] sm:h-[325px] mx-auto"
                    />
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  text-white leading-[1.1] tracking-tight mb-6 animate-fade-in-up">
                    Modern, <span className="text-gradient">free</span> and <span className="text-gradient">blazingly fast</span> game engine<br />
                </h1>

                {/* Subheadline */}
                <p className="text-xl sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-16 md:mb-10 animate-fade-in-up delay-100 leading-relaxed">
                    Because everyone's idea deserves an open source, next generation game engine to bring it to life
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-sm sm:max-w-md mx-auto md:mb-16 animate-fade-in-up delay-200">
                    <a
                        href="https://docs.pill.rocks"
                        className="group inline-flex items-center justify-center gap-2 w-[60%] sm:flex-1 px-8 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 text-base"
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                    <a
                        href="https://github.com/MattSzymonski/Pill-Engine"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-[60%] sm:flex-1 px-8 py-3.5 bg-white/[0.04] border border-white/[0.08] text-white font-semibold rounded-xl hover:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-200 text-base"
                    >
                        <Github className="w-4 h-4" />
                        View on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
