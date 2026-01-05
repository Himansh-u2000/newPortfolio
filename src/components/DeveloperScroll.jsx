import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const TOTAL_FRAMES = 80;
const SCROLL_HEIGHT = '300vh'; // Increased for 80 frames
const FRAME_START_INDEX = 0; // Frames start at 000 // Your frames start at 001, not 000

// Text overlay configuration
const TEXT_OVERLAYS = [
    {
        id: 'hero',
        start: 0,
        end: 0.15,
        content: (
            <div className="text-center">
                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight gradient-text mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Himanshu Haldar
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-white/60 tracking-[0.3em] uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    MERN Stack Developer
                </motion.p>
            </div>
        ),
    },
    {
        id: 'phase1',
        start: 0.25,
        end: 0.40,
        content: (
            <div className="text-center max-w-3xl mx-auto">
                <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90">
                    Building modern web experiences
                    <span className="block mt-2 text-white/60">with React & motion</span>
                </p>
            </div>
        ),
    },
    {
        id: 'phase2',
        start: 0.55,
        end: 0.70,
        content: (
            <div className="text-center max-w-4xl mx-auto">
                <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90">
                    Scalable backends.
                    <span className="block mt-2 text-white/60">Clean architecture. Performance first.</span>
                </p>
            </div>
        ),
    },
    {
        id: 'cta',
        start: 0.85,
        end: 1,
        content: (
            <div className="text-center">
                <p className="text-3xl md:text-5xl lg:text-6xl font-light text-white/90 mb-12">
                    Let's build something impactful.
                </p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    <a href="#projects" className="cta-button-primary cta-button">
                        Projects
                    </a>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-button"
                    >
                        GitHub
                    </a>
                    <a href="#contact" className="cta-button">
                        Contact
                    </a>
                </div>
            </div>
        ),
    },
];

// Preload images utility
const preloadImages = (totalFrames) => {
    return new Promise((resolve) => {
        const images = [];
        let loadedCount = 0;

        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            const frameNumber = String(i + FRAME_START_INDEX).padStart(3, '0');
            img.src = `/frames/Slow_Motion_Video_Transition_${frameNumber}.jpg`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    resolve(images);
                }
            };

            img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    resolve(images);
                }
            };

            images.push(img);
        }

        // Fallback timeout
        setTimeout(() => resolve(images), 5000);
    });
};

// Loading component
const Loader = ({ progress }) => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
        <div className="relative">
            <div className="w-16 h-16 border border-white/20 rounded-full loader-pulse" />
            <div
                className="absolute inset-0 border border-white/80 rounded-full"
                style={{
                    clipPath: `polygon(0 0, 100% 0, 100% ${progress}%, 0 ${progress}%)`,
                }}
            />
        </div>
        <p className="mt-6 text-sm text-white/40 tracking-[0.2em] uppercase">
            Loading Experience
        </p>
        <p className="mt-2 text-xs text-white/20 font-mono">
            {Math.round(progress)}%
        </p>
    </div>
);

// Text overlay component
const TextOverlay = ({ overlay, progress }) => {
    const { start, end, content } = overlay;

    // Calculate opacity based on scroll progress
    const fadeRange = 0.05;
    let opacity = 0;

    if (progress >= start && progress <= end) {
        if (progress < start + fadeRange) {
            opacity = (progress - start) / fadeRange;
        } else if (progress > end - fadeRange) {
            opacity = (end - progress) / fadeRange;
        } else {
            opacity = 1;
        }
    }

    if (opacity <= 0) return null;

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center px-6 z-20 pointer-events-none"
            style={{ opacity }}
        >
            <div className="pointer-events-auto">
                {content}
            </div>
        </motion.div>
    );
};

export default function DeveloperScroll() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const currentFrameRef = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Smooth spring for frame animation - snappier settings
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 300,
        damping: 40,
        restDelta: 0.001,
    });

    // Transform progress to frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    // Preload images on mount
    useEffect(() => {
        let isMounted = true;

        const loadImages = async () => {
            const loadedImages = [];

            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const img = new Image();
                const frameNumber = String(i + FRAME_START_INDEX).padStart(3, '0');
                img.src = `/frames/Slow_Motion_Video_Transition_${frameNumber}.jpg`;

                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });

                loadedImages.push(img);

                if (isMounted) {
                    setLoadProgress(((i + 1) / TOTAL_FRAMES) * 100);
                }
            }

            if (isMounted) {
                setImages(loadedImages);
                setIsLoading(false);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, []);

    // Draw frame to canvas
    const drawFrame = useCallback((index) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const frameIdx = Math.min(Math.max(Math.round(index), 0), images.length - 1);
        const img = images[frameIdx];

        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Prevent unnecessary redraws
        if (currentFrameRef.current === frameIdx) return;
        currentFrameRef.current = frameIdx;

        // Get container dimensions
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        // Only resize canvas if dimensions changed
        const targetWidth = Math.floor(rect.width * dpr);
        const targetHeight = Math.floor(rect.height * dpr);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
        }

        // Reset transform and set scale fresh each time (prevents accumulation)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Disable image smoothing for sharper rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Calculate cover sizing
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = rect.width / rect.height;

        let drawWidth, drawHeight, drawX, drawY;

        if (imgRatio > canvasRatio) {
            drawHeight = rect.height;
            drawWidth = drawHeight * imgRatio;
            drawX = (rect.width - drawWidth) / 2;
            drawY = 0;
        } else {
            drawWidth = rect.width;
            drawHeight = drawWidth / imgRatio;
            drawX = 0;
            drawY = (rect.height - drawHeight) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }, [images]);

    // Subscribe to frame index changes with RAF for smooth rendering
    useEffect(() => {
        let rafId = null;

        const unsubscribe = frameIndex.on('change', (latest) => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                drawFrame(latest);
            });
        });

        // Initial draw
        if (images.length > 0) {
            drawFrame(0);
        }

        return () => {
            unsubscribe();
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [frameIndex, drawFrame, images]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (images.length > 0) {
                currentFrameRef.current = -1; // Force redraw
                drawFrame(frameIndex.get());
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [drawFrame, frameIndex, images]);

    // Track scroll progress for text overlays
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setProgress(latest);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    if (isLoading) {
        return <Loader progress={loadProgress} />;
    }

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: SCROLL_HEIGHT }}
        >
            {/* Sticky canvas container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
                {/* Canvas for frame animation */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ backgroundColor: '#050505' }}
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/40 pointer-events-none" />

                {/* Text overlays */}
                {TEXT_OVERLAYS.map((overlay) => (
                    <TextOverlay
                        key={overlay.id}
                        overlay={overlay}
                        progress={progress}
                    />
                ))}

                {/* Scroll indicator */}
                {progress < 0.1 && (
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <span className="text-xs text-white/50 tracking-[0.2em] uppercase">
                            Scroll
                        </span>
                        <motion.div
                            className="w-px h-12 bg-linear-to-b from-white/90 to-transparent"
                            animate={{ scaleY: [1, 0.6, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
