
const SHOWCASE_ITEMS = [
    {
        title: 'Pill Teaser',
        video: '/images/xenium_rc1.mp4',
    },
];


const Showcase = () => {
    return (
        <section
            id="showcase"
            className="relative scroll-mt-24 py-8 sm:py-10 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto">
                <div className="space-y-14">
                    {SHOWCASE_ITEMS.map((item) => (
                        <section key={item.title}>
                            <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                                <video
                                    src={item.video}
                                    className="w-full h-auto"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    controls={false}
                                />
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Showcase;
