import { useState } from 'react';
import { Hammer, ArrowUpNarrowWide, MessagesSquare, HandMetal } from 'lucide-react';

// Obfuscated so the address never appears verbatim in the source.
const SPONSOR_EMAIL = ['contact', '@', 'pillengine', '.', 'org'].join('');

const offers = [
    {
        icon: <Hammer className="w-5 h-5" />,
        title: 'Fund a feature',
        description: 'You need something the engine is still missing? We build it, and it lands upstream under the same licence.',
    },
    {
        icon: <ArrowUpNarrowWide className="w-5 h-5" />,
        title: 'Move it up the roadmap',
        description: 'Sponsors reorder the list above. What you need stops waiting behind what we found interesting.',
    },
    {
        icon: <HandMetal className="w-5 h-5" />,
        title: 'Empower the people',
        description: 'Pill is an open source project. By sponsoring, you help the whole community.',
    },
    {
        icon: <MessagesSquare className="w-5 h-5" />,
        title: 'Direct access',
        description: 'A direct link to the people who wrote the engine. No ticket queues, no support tiers.',
    },
];

const Sponsor = () => {
    const [copied, setCopied] = useState(false);

    // Copy the address to the clipboard (with a fallback for older browsers)
    // and show a short-lived confirmation on the button instead of an alert.
    const copySponsorEmail = async () => {
        try {
            await navigator.clipboard.writeText(SPONSOR_EMAIL);
        } catch {
            const input = document.createElement('input');
            input.value = SPONSOR_EMAIL;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="sponsor"
            className="relative scroll-mt-24 py-8 sm:py-10 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] tracking-tight mb-4">
                    Sponsorship & cooperation
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mb-10">
                    Focus on your craft/players/customers rather than the engine.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {offers.map((offer) => (
                        <div
                            key={offer.title}
                            className="glass-card p-6 group relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/[0.12] before:to-transparent before:rounded-t-2xl before:pointer-events-none"
                        >
                            <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-4 group-hover:bg-brand-500/20 transition-colors duration-300">
                                {offer.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {offer.title}
                            </h3>
                            <p className="text-md text-gray-500 leading-relaxed">
                                {offer.description}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={copySponsorEmail}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/[0.04] border border-white/[0.08] text-white font-semibold rounded-xl hover:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-200 text-base cursor-pointer"
                >
                    {copied ? 'Email copied!' : 'Talk to us'}
                </button>
            </div>
        </section>
    );
};

export default Sponsor;
