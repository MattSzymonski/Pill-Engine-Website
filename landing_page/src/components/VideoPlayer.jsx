import { useRef, useState, useEffect, useCallback } from 'react';
import { Maximize, Minimize, Volume1, Volume2, VolumeX } from 'lucide-react';

// Returns the element currently in fullscreen (cross-browser), or null.
const getFullscreenElement = () =>
    document.fullscreenElement || document.webkitFullscreenElement || null;

/**
 * Self-contained custom video player: autoplay loop, hover-revealed
 * controls, a draggable vertical volume slider (desktop only) and fullscreen
 * toggling. Owns all of its own player state, so it can be dropped anywhere.
 *
 * Props:
 * - src: video source URL
 * - autoPlay / loop: playback behavior (default true)
 * - showVolumeControl: render the mute button + volume slider (default true)
 * - showFullscreenControl: render the fullscreen toggle (default true)
 * - showQualityControl: render the HD/4K quality toggle (default false)
 * - src4k: URL of the higher-quality source used by the quality toggle
 * - fullscreenMode: how the video fills the fullscreen - 'letterbox' |
 *   'width' | 'height' (default 'letterbox': whole video visible with bars)
 */
const VideoPlayer = ({
    src,
    autoPlay = true,
    loop = true,
    showVolumeControl = true,
    showFullscreenControl = true,
    showQualityControl = false,
    src4k,
    fullscreenMode = 'letterbox',
}) => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const volumeTrackRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    // Sound is disabled by default.
    const [muted, setMuted] = useState(true);
    // Volume 0..1, driven by the vertical slider.
    const [volume, setVolume] = useState(1);
    // True while the slider is being dragged - keeps the bar open.
    const [isDragging, setIsDragging] = useState(false);
    // The source currently rendered into the <video> (HD or 4K).
    const [currentSrc, setCurrentSrc] = useState(src);
    // True once the user switched to the 4K source.
    const [is4K, setIs4K] = useState(false);
    // True while the higher-quality source is loading.
    const [isQualityLoading, setIsQualityLoading] = useState(false);
    // True when the blur/spinner overlay is visible (only if load > 1s).
    const [showQualityOverlay, setShowQualityOverlay] = useState(false);
    // Keeps the player box at the old video's aspect ratio while the new
    // source loads, so the layout doesn't collapse/flicker.
    const [placeholderAspectRatio, setPlaceholderAspectRatio] = useState(null);
    // Last frame of the old source, shown instead of black while the new
    // quality source loads.
    const [frozenFrameUrl, setFrozenFrameUrl] = useState(null);
    // Resume info for the pending quality switch (time + was playing).
    const pendingResumeRef = useRef(null);
    // 1s timer that decides whether the spinner overlay should appear.
    const qualityOverlayTimerRef = useRef(null);

    const isMuted = muted || volume === 0;

    // Keep the fullscreen state in sync with the browser's fullscreen element.
    useEffect(() => {
        const handler = () => {
            setIsFullscreen(getFullscreenElement() === containerRef.current);
        };
        document.addEventListener('fullscreenchange', handler);
        document.addEventListener('webkitfullscreenchange', handler);
        return () => {
            document.removeEventListener('fullscreenchange', handler);
            document.removeEventListener('webkitfullscreenchange', handler);
        };
    }, []);

    // Keep the DOM volume/muted state in sync (more reliable than the React
    // props alone - the browser otherwise clamps the first writes).
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.volume = volume;
        video.muted = muted || volume === 0;
    }, [volume, muted]);

    // Clear the quality-overlay timer if the player unmounts mid-switch.
    useEffect(() => {
        return () => clearTimeout(qualityOverlayTimerRef.current);
    }, []);

    // When the rendered source changes to the 4K file, wait for it to load,
    // then resume playback from the exact position the HD video was at.
    useEffect(() => {
        const video = videoRef.current;
        const pending = pendingResumeRef.current;
        if (!video || !pending) return;
        pendingResumeRef.current = null;

        let finished = false;
        const finish = () => {
            if (finished) return;
            finished = true;
            cleanup();
            clearTimeout(qualityOverlayTimerRef.current);
            setIsQualityLoading(false);
            setShowQualityOverlay(false);
            setPlaceholderAspectRatio(null);
            setFrozenFrameUrl(null);
        };
        const handleLoadedMetadata = () => {
            video.currentTime = pending.resumeTime;
        };
        const handleSeeked = () => {
            if (pending.wasPlaying) video.play().catch(() => {});
        };
        const handleCanPlay = () => {
            if (pending.wasPlaying) video.play().catch(() => {});
            finish();
        };
        const handleError = () => finish();
        const cleanup = () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('seeked', handleSeeked);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('error', handleError);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('seeked', handleSeeked);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('error', handleError);
        return cleanup;
    }, [currentSrc]);

    const toggleFullscreen = useCallback(() => {
        const el = containerRef.current;
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

    const toggleSound = () => setMuted((prev) => !prev);

    // Convert a pointer position inside the volume track to a 0..1 volume.
    const updateVolumeFromPointer = (event) => {
        const track = volumeTrackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const ratio = 1 - (event.clientY - rect.top) / rect.height;
        setVolume(Math.min(1, Math.max(0, ratio)));
    };

    // Start dragging the vertical volume slider (pointer capture keeps the
    // drag going even when the cursor leaves the track).
    const handleVolumePointerDown = (event) => {
        event.preventDefault();
        const track = volumeTrackRef.current;
        if (!track) return;
        track.setPointerCapture(event.pointerId);
        setIsDragging(true);
        // Adjusting the slider implies intent to hear the sound - unmute.
        setMuted(false);
        updateVolumeFromPointer(event);
    };

    const handleVolumePointerMove = (event) => {
        if (!isDragging) return;
        updateVolumeFromPointer(event);
    };

    const handleVolumePointerUp = (event) => {
        setIsDragging(false);
        const track = volumeTrackRef.current;
        if (track?.hasPointerCapture?.(event.pointerId)) {
            track.releasePointerCapture(event.pointerId);
        }
    };

    // Toggle between the HD and 4K sources in either direction. Remember the
    // current time, show the spinner overlay only if loading takes longer
    // than 1 second.
    const switchQuality = () => {
        const video = videoRef.current;
        if (!video || !src4k || isQualityLoading) return;

        pendingResumeRef.current = {
            resumeTime: video.currentTime,
            wasPlaying: !video.paused,
        };
        // Remember the old video's aspect ratio so the player box keeps its
        // size (no flicker) while the new source loads.
        setPlaceholderAspectRatio(
            video.videoWidth && video.videoHeight
                ? `${video.videoWidth} / ${video.videoHeight}`
                : null
        );
        // Capture the current frame so the player shows the old picture
        // instead of blinking black while the new source loads.
        if (video.videoWidth && video.videoHeight) {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            setFrozenFrameUrl(canvas.toDataURL('image/jpeg', 0.7));
        }
        setIs4K((prev) => !prev);
        setIsQualityLoading(true);
        setShowQualityOverlay(false);
        clearTimeout(qualityOverlayTimerRef.current);
        qualityOverlayTimerRef.current = setTimeout(() => {
            setShowQualityOverlay(true);
        }, 1000);
        setCurrentSrc(is4K ? src : src4k);
    };

    // Mobile: double-tap toggles fullscreen (touch devices only).
    const handleVideoDoubleClick = () => {
        if (window.matchMedia('(hover: none)').matches) toggleFullscreen();
    };

    // Fullscreen sizing mode: letterbox (contain), fill width, or fill height.
    const fullscreenModes = ['letterbox', 'width', 'height'];
    const effectiveFullscreenMode = fullscreenModes.includes(fullscreenMode)
        ? fullscreenMode
        : 'letterbox';

    return (
        <div
            ref={containerRef}
            className={`group relative rounded-xl overflow-hidden border border-white/[0.06] bg-black [:fullscreen]:rounded-none [:fullscreen]:border-0 player-video-fullscreen-${effectiveFullscreenMode}`}
        >
            <video
                ref={videoRef}
                src={currentSrc}
                className="player-video w-full h-auto touch-manipulation"
                style={
                    placeholderAspectRatio
                        ? { aspectRatio: placeholderAspectRatio }
                        : undefined
                }
                autoPlay={autoPlay}
                loop={loop}
                muted={isMuted}
                playsInline
                controls={false}
                onDoubleClick={handleVideoDoubleClick}
            />
            {/* Last frame of the old source, covering the black blink while
                the new quality source loads. */}
            {frozenFrameUrl && (
                <img
                    src={frozenFrameUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
            )}
            {/* Blur + darken + spinner while the 4K source loads (fades in/out). */}
            <div
                className={`quality-overlay${showQualityOverlay ? ' quality-overlay-visible' : ''}`}
                aria-hidden="true"
            >
                <div className="quality-spinner" />
            </div>
            {(showVolumeControl || showFullscreenControl || showQualityControl) && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 [@media(hover:none)]:hidden">
                    {showQualityControl && src4k && (
                        <button
                            type="button"
                            onClick={switchQuality}
                            disabled={isQualityLoading}
                            aria-label={is4K ? 'Switch to HD' : 'Switch to 4K'}
                            title={is4K ? 'Switch to HD' : 'Switch to 4K'}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/50 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-sm cursor-pointer transition-all duration-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-wait"
                        >
                            {is4K ? '4K' : 'HD'}
                        </button>
                    )}
                    {showVolumeControl && (
                        <div className="volume-control relative flex flex-col gap-[10px]">
                            <button
                                type="button"
                                onClick={toggleSound}
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                                title={isMuted ? 'Unmute' : 'Mute'}
                                className="p-2 rounded-lg bg-black/50 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-sm cursor-pointer transition-all duration-200"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5" />
                                ) : volume < 0.5 ? (
                                    <Volume1 className="w-5 h-5" />
                                ) : (
                                    <Volume2 className="w-5 h-5" />
                                )}
                            </button>
                            {/* Vertical volume slider, unfolds on hover (desktop only). */}
                            <div
                                className={`volume-slider${
                                    isDragging ? ' volume-slider-dragging' : ''
                                }${isMuted ? ' volume-slider-muted' : ''}`}
                            >
                                <div
                                    ref={volumeTrackRef}
                                    role="slider"
                                    aria-label="Volume"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={Math.round(volume * 100)}
                                    className="volume-track"
                                    onPointerDown={handleVolumePointerDown}
                                    onPointerMove={handleVolumePointerMove}
                                    onPointerUp={handleVolumePointerUp}
                                    onPointerCancel={handleVolumePointerUp}
                                >
                                    <div
                                        className="volume-fill"
                                        style={{ height: `${volume * 100}%` }}
                                    />
                                    <div
                                        className="volume-thumb"
                                        style={{ bottom: `${volume * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {showFullscreenControl && (
                        <button
                            type="button"
                            onClick={toggleFullscreen}
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
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
