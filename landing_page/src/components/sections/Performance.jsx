import { useMemo } from 'react';
import { generateGranuleField } from '../effects/granules';
import CardEntities from '../cards/CardEntities';
import CardBuildSize from '../cards/CardBuildSize';
import CardMultithreading from '../cards/CardMultithreading';
import CardStreaming from '../cards/CardStreaming';

const cards = [<CardEntities key="entities" />, <CardBuildSize key="build" />, <CardMultithreading key="threads" />, <CardStreaming key="stream" />];

const Performance = () => {
    const granuleField = useMemo(() => generateGranuleField({ seed: 77 }), []);

    return (
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 section-divider">
            {/* Section heading - standard content width */}
            <div className="max-w-6xl mx-auto mb-16 sm:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl  text-white leading-[1.15] tracking-tight mb-6">
                    Raw speed, minimal footprint
                    <br />
                    No compromises
                </h2>
                <div className="space-y-4 max-w-3xl">
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Performance isn&apos;t a bullet point - it&apos;s the foundation. From entity processing
                        and multithreaded scheduling to asset streaming and final build footprint, every
                        layer of the engine is designed to run fast and stay lean.
                    </p>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        These aren&apos;t empty claims. Every figure on this page comes from automated
                        benchmarks that run against every engine version. Regressions are caught before they
                        reach you - we track entity throughput, frame times, build sizes, and load
                        latencies in CI, and the numbers don&apos;t lie.
                    </p>
                    <p className="text-xl text-brand-400 font-semibold leading-relaxed">
                        Benchmarked. Measured. Proven.
                    </p>
                </div>
            </div>

            {/* Benchmark cards - wider container for 4-column grid */}
            <div className="max-w-7xl mx-auto relative">
                {/* Granule-field backdrop */}
                <div
                    className="absolute -inset-8 pointer-events-none"
                    dangerouslySetInnerHTML={granuleField}
                />
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:px-0 sm:mx-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 scrollbar-none relative z-10">
                    {cards}
                </div>
            </div>
        </section>
    );
};

export default Performance;
