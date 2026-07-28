import { ChevronRight } from 'lucide-react';

/**
 * Generic benchmark card with Raycast-style glass styling.
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon        - Icon component
 * @param {string}         props.title        - Card title
 * @param {string}         props.description  - Body text
 * @param {React.ReactNode} props.metric      - Metric display (value + suffix)
 * @param {string}         props.background   - CSS background (gradient)
 * @param {string}         props.glow         - CSS box-shadow glow portion
 * @param {React.ReactNode} props.visual      - Bottom visual area content
 */
export default function Card({ icon, title, description, metric, background, glow, visual }) {
    const boxShadow = `rgba(255,255,255,0.1) 0px 1px 0px 0px inset, ${glow}, rgba(255,255,255,0.06) 0px 0px 0px 1px inset`;

    return (
        <div className="flex-shrink-0 w-[280px] sm:w-auto group">
            <div
                className="rounded-2xl flex flex-col h-full transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                style={{ background, boxShadow }}
            >
                {/* Header */}
                <div className="p-5 sm:p-6 pb-4">
                    <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.07] flex items-center justify-center text-white shrink-0">
                            {icon}
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                            <div className="flex items-center gap-1.5">
                                <h3 className="text-sm font-semibold text-white">{title}</h3>
                                <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
                </div>

                {/* Metric pill */}
                <div className="px-5 sm:px-6 pb-3">
                    <div className="inline-flex items-baseline gap-0.5 bg-white/[0.04] rounded-lg px-3 py-1.5 border border-white/[0.05]">
                        {metric}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mx-5 sm:mx-6" />

                {/* Visual area */}
                <div
                    className="aspect-square w-full relative"
                    style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(255,255,255,0.02) 100%)' }}
                >
                    {visual}
                </div>
            </div>
        </div>
    );
}
