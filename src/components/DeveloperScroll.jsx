import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ================= CONFIG ================= */

const TOTAL_FRAMES = 80;
const SCROLL_HEIGHT = "400vh"; // More scroll distance for smoother animation

const frameSrc = (i) =>
    `/frames/Slow_Motion_Video_Transition_${String(i).padStart(3, "0")}.jpg`;

/* ================= TEXT OVERLAYS ================= */

const overlays = [
    { start: 0, end: 0.15, id: "hero" },
    { start: 0.20, end: 0.42, id: "phase1" },
    { start: 0.48, end: 0.70, id: "phase2" },
    { start: 0.78, end: 1, id: "cta" },
];

/* ================= COMPONENT ================= */

export default function DeveloperScrollGSAP() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const currentFrameRef = useRef(0);

    const [loaded, setLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    /* ===== PRELOAD IMAGES ===== */

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            const imgs = [];

            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const img = new Image();
                img.src = frameSrc(i);

                await new Promise((res) => {
                    img.onload = res;
                    img.onerror = res;
                });

                imgs.push(img);

                if (mounted) {
                    setLoadProgress(Math.round(((i + 1) / TOTAL_FRAMES) * 100));
                }
            }

            if (mounted) {
                imagesRef.current = imgs;
                setLoaded(true);
            }
        };

        load();
        return () => { mounted = false; };
    }, []);

    /* ===== DRAW FRAME ===== */

    const drawFrame = useCallback((index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        const img = imagesRef.current[index];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Prevent unnecessary redraws
        if (currentFrameRef.current === index) return;
        currentFrameRef.current = index;

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        // Resize canvas if needed
        const targetWidth = Math.floor(rect.width * dpr);
        const targetHeight = Math.floor(rect.height * dpr);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
        }

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

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
    }, []);

    /* ===== SCROLLTRIGGER ===== */

    useEffect(() => {
        if (!loaded) return;

        // Initial draw
        drawFrame(0);

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5, // Smooth scrubbing
                pin: canvasRef.current.parentElement,
                onUpdate: (self) => {
                    const frame = Math.min(
                        Math.max(Math.round(self.progress * (TOTAL_FRAMES - 1)), 0),
                        TOTAL_FRAMES - 1
                    );
                    drawFrame(frame);

                    // Update text overlays with smooth fade
                    overlays.forEach(({ start, end, id }) => {
                        const el = document.getElementById(id);
                        if (!el) return;

                        const fadeRange = 0.05;
                        let opacity = 0;

                        if (self.progress >= start && self.progress <= end) {
                            if (self.progress < start + fadeRange) {
                                opacity = (self.progress - start) / fadeRange;
                            } else if (self.progress > end - fadeRange) {
                                opacity = (end - self.progress) / fadeRange;
                            } else {
                                opacity = 1;
                            }
                        }

                        el.style.opacity = opacity;
                    });
                },
            });
        });

        return () => ctx.revert();
    }, [loaded, drawFrame]);

    /* ===== HANDLE RESIZE ===== */

    useEffect(() => {
        if (!loaded) return;

        const handleResize = () => {
            currentFrameRef.current = -1; // Force redraw
            drawFrame(0);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [loaded, drawFrame]);

    /* ===== LOADING STATE ===== */

    if (!loaded) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border border-white/20 rounded-full" />
                    <div
                        className="absolute inset-0 border border-white/80 rounded-full transition-all duration-300"
                        style={{
                            clipPath: `polygon(0 0, 100% 0, 100% ${loadProgress}%, 0 ${loadProgress}%)`,
                        }}
                    />
                </div>
                <p className="mt-6 text-sm text-white/40 tracking-[0.2em] uppercase">
                    Loading Experience
                </p>
                <p className="mt-2 text-xs text-white/20 font-mono">{loadProgress}%</p>
            </div>
        );
    }

    return (
        <section
            ref={containerRef}
            style={{ height: SCROLL_HEIGHT }}
            className="relative bg-[#050505]"
        >
            <div className="h-screen relative overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ backgroundColor: "#050505" }}
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/40 pointer-events-none" />

                {/* ===== TEXT OVERLAYS ===== */}

                <Overlay id="hero">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight gradient-text mb-4">
                            Himanshu Haldar
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 tracking-[0.3em] uppercase">
                            MERN Stack Developer
                        </p>
                    </div>
                </Overlay>

                <Overlay id="phase1">
                    <div className="text-center max-w-3xl mx-auto px-6">
                        <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90">
                            Building Modern Web Experiences
                            <span className="block mt-2 text-white/60">with React & Tailwind CSS</span>
                        </p>
                    </div>
                </Overlay>

                <Overlay id="phase2">
                    <div className="text-center max-w-4xl mx-auto px-6">
                        <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90">
                            Scalable backends.
                            <span className="block mt-2 text-white/60">Clean architecture. Performance first.</span>
                        </p>
                    </div>
                </Overlay>

                <Overlay id="cta">
                    <div className="text-center">
                        <p className="text-3xl md:text-5xl lg:text-6xl font-light text-white/90 mb-12">
                            Let's build something impactful.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            <a href="#projects" className="cta-button-primary cta-button">
                                Projects
                            </a>
                            <a
                                href="https://github.com/Himansh-u2000/"
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
                </Overlay>

                {/* Scroll indicator */}
                <div
                    id="scroll-indicator"
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-white/40 tracking-[0.2em] uppercase">
                        Scroll
                    </span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
                </div>

                {/* Fixed Contact Button */}
                <a
                    href="#contact"
                    className="fixed bottom-8 right-8 z-50 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm tracking-wide shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                </a>
            </div>
        </section>
    );
}

/* ================= OVERLAY ================= */

function Overlay({ id, children }) {
    return (
        <div
            id={id}
            className="absolute inset-0 flex items-center justify-center px-6 z-20 pointer-events-none opacity-0 transition-opacity duration-300"
        >
            <div className="pointer-events-auto">{children}</div>
        </div>
    );
}
