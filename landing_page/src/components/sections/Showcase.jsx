
import VideoPlayer from '../VideoPlayer';

const SHOWCASE_ITEMS = [
    {
        title: 'Pill Teaser',
        video: '/images/xenium_30fps_1920.mp4',
        video_high_quality: '/images/xenium_30fps_4k.mp4',
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
                        <VideoPlayer
                            key={item.title}
                            src={item.video}
                            {...(item.video_high_quality ? { showQualityControl: true, src4k: item.video_high_quality } : {})}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Showcase;
