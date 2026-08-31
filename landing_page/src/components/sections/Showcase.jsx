
import VideoPlayer from '../VideoPlayer';

const SHOWCASE_ITEMS = [
    {
        title: 'Pill Teaser',
        video: '/images/xenium_30fps_1920.mp4',
        videoHighQuality: '/images/xenium_30fps_4k.mp4',
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
                    {/* On mobile the player is given a tall fixed height and the
                        video crops (object-fit: cover) to fill it, so it reads
                        larger on the height dimension; desktop shows it whole. */}
                    {SHOWCASE_ITEMS.map((item) => (
                        <VideoPlayer
                            key={item.title}
                            src={item.video}
                            src4k={item.videoHighQuality}
                            showQualityControl={Boolean(item.videoHighQuality)}
                            cover
                            className="h-[70vh] sm:h-auto"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Showcase;
