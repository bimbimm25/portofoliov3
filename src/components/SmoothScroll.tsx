"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2, // Durasi scroll (semakin tinggi semakin halus)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Kurva akselerasi/dekselerasi
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        // Simpan instance ke window secara bebas (type-casting ke any untuk menghindari bentrokan tipe TS bawaan lenis)
        (window as unknown as Record<string, unknown>).lenisInstance = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            delete (window as unknown as Record<string, unknown>).lenisInstance;
        };
    }, []);

    return <>{children}</>;
}