
import { useRef, useState, useEffect, useCallback } from 'react';
import { Maximize, Minimize, Volume2, VolumeX } from 'lucide-react';

const SHOWCASE_ITEMS = [
    {
        title: 'Pill Teaser',
        video: '/images/xenium_rc1.mp4',
    },
];

const getFullscreenElement = () =>
    document.fullscreenElement || document.webkitFullscreenElement || null;

const Showcase = () => {
    const containerRefs = useRef({});
    const videoRefs = useRef({});
    const [fullscreenTitle, setFullscreenTitle] = useState(null);
    // Sound is disabled by default; keyed by item title.
    const [mutedByTitle, setMutedByTitle] = useState(() =>
        Object.fromEntries(SHOWCASE_ITEMS.map((item) => [item.title, true]))
    );

    // Keep state in sync with the browser's fullscreen element.
    useEffect(() => {
        const handler = () => {
            const fsEl = getFullscreenElement();
            if (!fsEl) {
                setFullscreenTitle(null);
                return;
            }
            const match = Object.entries(containerRefs.current).find(
                ([, el]) => el === fsEl
            );
            setFullscreenTitle(match ? match[0] : null);
        };

        document.addEventListener('fullscreenchange', handler);
        document.addEventListener('webkitfullscreenchange', handler);
        return () => {
            document.removeEventListener('fullscreenchange', handler);
            document.removeEventListener('webkitfullscreenchange', handler);
        };
    }, []);

    // Keep the DOM muted state in sync (more reliable than the React prop alone).
    useEffect(() => {
        Object.entries(mutedByTitle).forEach(([title, muted]) => {
            const video = videoRefs.current[title];
            if (video) video.muted = muted;
        });
    }, [mutedByTitle]);

    const toggleFullscreen = useCallback((title) => {
        const el = containerRefs.current[title];
        if (!el) return;

        if (getFullscreenElement()) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            return;
        }

        const request = el.requestFullscreen || el.webkitRequestFullscreen;
        if (request) {
            Promise.resolve(request.call(el)).catch(() => {});
        }
    }, []);

    const toggleSound = (title) => {
        setMutedByTitle((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    // Mobile: double-tap toggles fullscreen (touch devices only).
    const handleVideoDoubleClick = (title) => {
        if (window.matchMedia('(hover: none)').matches) {
            toggleFullscreen(title);
        }
    };

    return (
        <section
            id="showcase"
            className="relative scroll-mt-24 py-8 sm:py-10 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto">
                <div className="space-y-14">
                    {SHOWCASE_ITEMS.map((item) => {
                        const isFullscreen = fullscreenTitle === item.title;
                        const isMuted = mutedByTitle[item.title] ?? true;
                        return (
                            <section key={item.title} className="group relative">
                                <div
                                    ref={(el) => {
                                        containerRefs.current[item.title] = el;
                                    }}
                                    className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-black [:fullscreen]:rounded-none [:fullscreen]:border-0"
                                >
                                    <video
                                        ref={(el) => {
                                            videoRefs.current[item.title] = el;
                                        }}
                                        src={item.video}
                                        className="w-full h-auto touch-manipulation"
                                        autoPlay
                                        loop
                                        muted={isMuted}
                                        playsInline
                                        controls={false}
                                        onDoubleClick={() => handleVideoDoubleClick(item.title)}
                                    />
                                    <div className="absolute top-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 [@media(hover:none)]:hidden">
                                        <button
                                            type="button"
                                            onClick={() => toggleSound(item.title)}
                                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                                            title={isMuted ? 'Unmute' : 'Mute'}
                                            className="p-2 rounded-lg bg-black/50 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-sm cursor-pointer transition-all duration-200"
                                        >
                                            {isMuted ? (
                                                <VolumeX className="w-5 h-5" />
                                            ) : (
                                                <Volume2 className="w-5 h-5" />
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => toggleFullscreen(item.title)}
                                            aria-label={isFullscreen ? 'Exit fullscreen' : 'Open fullscreen'}
                                            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                                            className="p-2 rounded-lg bg-black/50 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-sm cursor-pointer transition-all duration-200"
                                        >
                                            {isFullscreen ? (
                                                <Minimize className="w-5 h-5" />
                                            ) : (
                                                <Maximize className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Showcase;
