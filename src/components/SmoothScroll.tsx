"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Cegah inisialisasi ganda di dev mode
        if ((window as unknown as Record<string, unknown>).lenisInstance) {
            return;
        }

        const lenis = new Lenis({
            duration: 0.8, // Nilai optimal untuk laptop agar tidak terasa berat/delay
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1,
            infinite: false,
            syncTouch: false, // Jangan manipulasi touch HP
        });

        (window as unknown as Record<string, unknown>).lenisInstance = lenis;

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            delete (window as unknown as Record<string, unknown>).lenisInstance;
        };
    }, []);

    return <>{children}</>;
}