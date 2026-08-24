import { Target, Zap, Boxes, Heart } from 'lucide-react';

const designGoals = [
    {
        icon: <Target className="w-5 h-5" />,
        title: 'Clean & Simple',
        description: 'Elegant and robust API design that gets out of your way. Focus on building games, not fighting the engine.',
    },
    {
        icon: <Zap className="w-5 h-5" />,
        title: 'Blazingly Fast',
        description: 'ECS-based architecture written in Rust designed for maximum performance. Data-oriented design at its core.',
    },
    {
        icon: <Boxes className="w-5 h-5" />,
        title: 'Open Source',
        description: 'Use it however you want. Change it however you need. Free of charge, always. No royalties, no restrictions.',
    },
    {
        icon: <Heart className="w-5 h-5" />,
        title: 'Passion Driven',
        description: 'Built by developers who refuse to compromise. Community-driven development with real-world feedback.',
    },
];

const About = () => {

    return (
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 section-divider">
            <div className="max-w-6xl mx-auto">
                {/* Section heading */}
                <div className="mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl  text-white leading-[1.15] tracking-tight mb-6">
                        Power that never falls short
                        <br />
                        of your boldest ambitions
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        Built for developers who refuse to compromise, Pill is an engine that delivers the raw speed
                        and creative freedom needed to bring even the wildest ideas to life. Designed from the ground
                        up to empower both teams and solo creators, it simplifies the complex while unlocking
                        performance far beyond traditional engines.
                    </p>
                </div>

                {/* Design goals grid */}
                <div className="relative mb-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                        {designGoals.map((goal, index) => (
                            <div
                                key={index}
                                className="glass-card p-6 group relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/[0.12] before:to-transparent before:rounded-t-2xl before:pointer-events-none"
                            >
                                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-4 group-hover:bg-brand-500/20 transition-colors duration-300">
                                    {goal.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {goal.title}
                                </h3>
                                <p className="text-md text-gray-500 leading-relaxed">
                                    {goal.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ships fully loaded section */}
                <div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl  text-white leading-[1.15] tracking-tight mb-6">
                        Ships fully equipped for
                        <br />
                        every kind of creator
                    </h3>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-4">
                        Develop games. Create simulations. Build next-generation visualizations. Or design
                        immersive experiences we haven&apos;t even thought of yet. No matter what style, screen
                        size, or project you have in mind, Pill comes standard with everything you need to
                        help you make it real.
                    </p>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        Engineered with passion. Aiming to deliver{' '}
                        <span className="text-brand-400 font-semibold">unmatched performance</span> for modern
                        game development.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
