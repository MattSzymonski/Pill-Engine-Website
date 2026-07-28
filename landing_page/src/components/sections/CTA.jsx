import { BookOpen, ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Main CTA card */}
                <div className="glass-card p-8 sm:p-12 md:p-16 relative overflow-hidden glass-reflection">
                    <div className="relative z-10">
                        <div className="flex flex-wrap gap-3 mb-10">
                            <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                                Open Source
                            </span>
                            <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-white/[0.03] text-gray-400 border border-white/[0.06]">
                                Actively Developed
                            </span>
                            <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-white/[0.03] text-gray-400 border border-white/[0.06]">
                                Community Driven
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-4">
                            Start Building Today
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
                            New to game development? Making the switch from another engine? Wherever
                            you&apos;re coming from, we&apos;ve got documentation, examples, and a supportive
                            community to help you get started building your project.
                        </p>

                        <a
                            href="/guide"
                            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl transition-all duration-200 text-base"
                        >
                            <BookOpen className="w-4 h-4" />
                            Start with Pill Guide
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </a>
                    </div>

                    {/* Subtle background accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/3 blur-3xl rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default CTA;
