"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ArrowUpRight, Sparkles, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const [isTapped, setIsTapped] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    // Menangani klik/tap di luar gambar untuk mengembalikan foto ke kondisi abu-abu di HP
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (imageRef.current && !imageRef.current.contains(event.target as Node)) {
                setIsTapped(false);
            }
        };

        document.addEventListener("touchstart", handleClickOutside);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("touchstart", handleClickOutside);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section className="min-h-[90vh] flex items-center justify-center pt-24 pb-12 px-6 bg-linear-to-b from-gray-50/50 to-white overflow-hidden">
            <div className="max-w-4xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">

                {/* Teks Deskripsi */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 text-center md:text-left space-y-5"
                >
                    {/* Badge Status */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {t.hero.badge}
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        {t.hero.greeting} <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-gray-700 to-gray-500">
                            {t.hero.name}
                        </span>
                    </h1>

                    <h2 className="text-lg sm:text-xl font-semibold text-gray-600 flex items-center justify-center md:justify-start gap-2">
                        <Sparkles size={18} className="text-gray-400" />
                        {t.hero.role}
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base max-w-md mx-auto md:mx-0">
                        {t.hero.desc}
                    </p>

                    {/* Tombol Aksi (CTA) */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                        <a
                            href="mailto:bimaardiansyah2509@gmail.com"
                            className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium shadow-md hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            <Mail size={18} className="text-gray-400" />
                            {t.hero.contactBtn}
                            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                        <a
                            href="#about"
                            className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                        >
                            {t.hero.aboutBtn}
                        </a>
                    </div>
                </motion.div>

                {/* Foto & Lokasi */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-col items-center shrink-0"
                >
                    {/* Frame Foto */}
                    <div
                        ref={imageRef}
                        className="relative p-2 bg-white border border-gray-200/80 rounded-3xl shadow-lg shadow-gray-200/40 mb-4"
                    >
                        <div
                            onClick={() => setIsTapped(!isTapped)}
                            className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 relative rounded-2xl overflow-hidden bg-gray-100 cursor-pointer"
                        >
                            <Image
                                src="/profil.jpeg"
                                alt={`Foto Profil ${t.hero.name}`}
                                fill
                                priority
                                className={`object-cover transition-all duration-500 md:hover:grayscale-0 md:hover:scale-105 ${isTapped ? "grayscale-0 scale-105" : "grayscale"
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Lokasi Badge */}
                    <div className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200/80 px-3.5 py-1.5 rounded-full shadow-sm">
                        <MapPin size={15} className="text-gray-500" />
                        <span className="text-xs font-medium">{t.hero.location}</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}