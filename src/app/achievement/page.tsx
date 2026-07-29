"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ExternalLink,
    Calendar,
    MapPin,
    Building2,
    X,
    ArrowLeft,
    CheckCircle,
    FileText
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

export default function AchievementPage() {
    const { t } = useLanguage();

    // Ambil data achievement langsung dari LanguageContext
    const achievementsData = t.achievementPage.items;

    // State untuk Pop-up Detail
    const [activeItem, setActiveItem] = useState<typeof achievementsData[0] | null>(null);

    // Efek hentikan Lenis scroll halaman belakang tanpa melompat ke atas saat modal buka
    useEffect(() => {
        const lenis = (window as unknown as { lenisInstance?: { stop: () => void; start: () => void } }).lenisInstance;

        if (activeItem) {
            if (lenis) lenis.stop();
            document.documentElement.classList.add("overflow-hidden");
        } else {
            if (lenis) lenis.start();
            document.documentElement.classList.remove("overflow-hidden");
        }

        return () => {
            if (lenis) lenis.start();
            document.documentElement.classList.remove("overflow-hidden");
        };
    }, [activeItem]);

    return (
        <main className="min-h-screen bg-[#f8f9fa] pt-28 pb-20 px-6 font-sans select-none">
            <Navbar />
            <div className="max-w-5xl mx-auto">

                {/* Back to Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft size={16} /> {t.achievementPage.backHome}
                </Link>

                {/* Header Section Utama */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-left"
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight lowercase">
                        {t.achievementPage.title}
                    </h1>
                    <p className="text-base text-gray-500 max-w-xl">
                        {t.achievementPage.subtitle}
                    </p>
                </motion.div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievementsData.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_-8px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                {/* Tag Role & Tanggal */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md">
                                        {item.role}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <Calendar size={13} />
                                        <span>{item.date}</span>
                                    </div>
                                </div>

                                {/* Judul Achievement */}
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors leading-snug">
                                    {item.title}
                                </h3>

                                {/* Info Penyelenggara & Lokasi */}
                                <div className="space-y-1.5 mb-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <Building2 size={14} className="text-gray-400 shrink-0" />
                                        <span className="font-medium text-gray-700">{item.issuer}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={14} className="text-gray-400 shrink-0" />
                                        <span>{item.location}</span>
                                    </div>
                                </div>

                                {/* Deskripsi Singkat */}
                                <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-6">
                                    {item.description}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <button
                                    onClick={() => setActiveItem(item)}
                                    className="text-xs font-semibold text-gray-900 hover:underline cursor-pointer"
                                >
                                    {t.achievementPage.viewDetail}
                                </button>

                                {item.certificateUrl && (
                                    <a
                                        href={item.certificateUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-2xs"
                                    >
                                        <FileText size={13} />
                                        <span>{t.achievementPage.certificate}</span>
                                        <ExternalLink size={12} className="opacity-70" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* Modal Detail Pop-up */}
            <AnimatePresence>
                {activeItem && (
                    <div
                        onClick={() => setActiveItem(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white border border-gray-200 rounded-2xl max-w-md md:max-w-lg w-full p-6 shadow-xl relative overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveItem(null)}
                                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md mb-3 inline-block">
                                {activeItem.role}
                            </span>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {activeItem.title}
                            </h3>

                            <div className="space-y-1 text-xs text-gray-500 mb-5">
                                <p className="flex items-center gap-2">
                                    <Building2 size={14} className="text-gray-400" />
                                    <span>{t.achievementPage.issuerLabel}: <strong className="text-gray-800">{activeItem.issuer}</strong></span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin size={14} className="text-gray-400" />
                                    <span>{t.achievementPage.locationLabel}: <strong className="text-gray-800">{activeItem.location}</strong></span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-400" />
                                    <span>{t.achievementPage.dateLabel}: <strong className="text-gray-800">{activeItem.date}</strong></span>
                                </p>
                            </div>

                            <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6">
                                {activeItem.description}
                            </p>

                            <div className="mb-6">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.achievementPage.skillsTitle}</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {activeItem.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md flex items-center gap-1.5"
                                        >
                                            <CheckCircle size={12} className="text-gray-900" />
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                {activeItem.certificateUrl && (
                                    <a
                                        href={activeItem.certificateUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 bg-gray-900 text-white text-xs font-medium rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        <FileText size={15} />
                                        <span>{t.achievementPage.openCert}</span>
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}