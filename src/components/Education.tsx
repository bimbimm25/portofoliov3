"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Education() {
    const { t } = useLanguage();

    return (
        <section className="py-16 md:py-20 px-6 bg-[#f8f9fa] relative overflow-hidden font-sans">
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-left"
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight lowercase">
                        {t.education.title}
                    </h2>
                    <p className="text-base text-gray-500">
                        {t.education.subtitle}
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Garis Vertikal Timeline */}
                    <div className="hidden md:block absolute left-6.75 md:left-7.75 top-4 bottom-4 w-0.5 bg-gray-200 z-0"></div>

                    <div className="space-y-6 md:space-y-8">
                        {t.education.items.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative flex flex-col md:flex-row items-start gap-4 md:gap-6 z-10"
                            >
                                {/* Kotak Logo */}
                                <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 bg-white border border-gray-200 rounded-2xl shadow-xs flex items-center justify-center overflow-hidden relative z-10">
                                    <div className="w-9 h-9 md:w-10 md:h-10 relative flex items-center justify-center">
                                        <Image
                                            src={edu.logoSrc}
                                            alt={`Logo ${edu.school}`}
                                            fill
                                            className="object-contain rounded-lg"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                        <span className="text-gray-300 text-[10px] text-center absolute -z-10">Logo</span>
                                    </div>
                                </div>

                                {/* Kartu Konten */}
                                <div className="flex-1 w-full bg-white border border-gray-200/80 p-5 md:p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_-8px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all duration-300 group">
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                                        {edu.school}
                                    </h3>
                                    <h4 className="text-sm md:text-base font-medium text-gray-600 mb-4">
                                        {edu.degree}
                                    </h4>

                                    {/* Date & Location Row */}
                                    <div className="flex flex-wrap items-center gap-3.5 text-xs md:text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={14} strokeWidth={2} />
                                            <span>{edu.date}</span>
                                        </div>
                                        <span className="hidden md:inline-block w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} strokeWidth={2} />
                                            <span>{edu.location}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                                        {edu.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}