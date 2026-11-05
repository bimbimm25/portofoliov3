"use client";
import { useState } from "react";
import {
    SiReact,
    SiNextdotjs,
    SiCss,
    SiTailwindcss,
    SiBootstrap,
    SiPhp,
    SiLaravel,
    SiMysql,
    SiSupabase,
    SiPostman,
    SiFigma,
    SiBruno
} from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

export default function TechStack() {
    const { t } = useLanguage();
    const [activeTechId, setActiveTechId] = useState<string | null>(null);

    const techCategories = [
        {
            title: t.techStack.categories.frontend.title,
            desc: t.techStack.categories.frontend.desc,
            techs: [
                { id: "react", name: "React", icon: <SiReact className="text-[#61DAFB] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
                { id: "nextjs", name: "Next.js", icon: <SiNextdotjs className="text-gray-900 text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
            ],
        },
        {
            title: t.techStack.categories.styling.title,
            desc: t.techStack.categories.styling.desc,
            techs: [
                { id: "css", name: "CSS3", icon: <SiCss className="text-[#1572B6] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
                { id: "tailwind", name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
                { id: "bootstrap", name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
            ],
        },
        {
            title: t.techStack.categories.backend.title,
            desc: t.techStack.categories.backend.desc,
            techs: [
                { id: "php", name: "PHP", icon: <SiPhp className="text-[#777BB4] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
                { id: "laravel", name: "Laravel", icon: <SiLaravel className="text-[#FF2D20] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
            ],
        },
        {
            title: t.techStack.categories.database.title,
            desc: t.techStack.categories.database.desc,
            techs: [
                { id: "mysql", name: "MySQL", icon: <SiMysql className="text-[#4479A1] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
                { id: "supabase", name: "Supabase", icon: <SiSupabase className="text-[#3ECF8E] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
            ],
        },
        {
            title: t.techStack.categories.tools.title,
            desc: t.techStack.categories.tools.desc,
            techs: [
                { id: "postman", name: "Postman", icon: <SiPostman className="text-[#FF6C37] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
                { id: "figma", name: "Figma", icon: <SiFigma className="text-[#F24E1E] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
                { id: "bruno", name: "Bruno", icon: <SiBruno className="text-[#D8663F] text-xl md:text-2xl group-hover:scale-110 transition-transform" /> },
            ],
        },
    ];

    const duplicatedCategories = [...techCategories, ...techCategories];

    const handleTechTap = (e: React.MouseEvent, uniqueId: string) => {
        e.stopPropagation();
        setActiveTechId((prev) => (prev === uniqueId ? null : uniqueId));
    };

    const handleReset = () => {
        if (activeTechId !== null) {
            setActiveTechId(null);
        }
    };

    const isPaused = activeTechId !== null;

    return (
        <section
            onClick={handleReset}
            className="py-16 md:py-20 bg-[#f8f9fa] overflow-hidden w-full select-none font-sans"
        >
            {/* Header Section */}
            <div className="max-w-5xl mx-auto px-6 mb-10 text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight lowercase">
                    {t.techStack.title}
                </h2>
                <p className="text-base text-gray-500">
                    {t.techStack.subtitle}
                </p>
            </div>

            {/* Infinite Slider Container */}
            <div className="relative flex items-center w-full">

                {/* Efek Gradasi Sisi Kiri & Kanan */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none"></div>

                {/* Wrapper Animasi Pure CSS Hardware-Accelerated */}
                <div
                    className="flex w-max will-change-transform transform-gpu animate-marquee-smooth"
                    style={{
                        animationPlayState: isPaused ? "paused" : "running",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    {duplicatedCategories.map((category, catIdx) => (
                        <div
                            key={catIdx}
                            className="mr-5 min-w-[280px] md:min-w-[340px] bg-white border border-gray-200/80 p-6 md:p-8 rounded-xl flex flex-col items-center text-center hover:shadow-sm transition-all duration-300 cursor-default"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-1.5">
                                {category.title}
                            </h3>
                            <p className="text-gray-500 text-xs md:text-sm mb-6">
                                {category.desc}
                            </p>

                            {/* Lingkaran Logo Teknologi */}
                            <div className="flex flex-wrap justify-center gap-3.5 mt-auto">
                                {category.techs.map((tech, techIdx) => {
                                    const uniqueId = `${catIdx}-${tech.id}-${techIdx}`;
                                    const isActiveOnMobile = activeTechId === uniqueId;

                                    return (
                                        <div
                                            key={techIdx}
                                            onClick={(e) => handleTechTap(e, uniqueId)}
                                            className="group relative flex flex-col items-center gap-1.5 cursor-pointer"
                                            title={tech.name}
                                        >
                                            <div className={`w-12 h-12 md:w-14 md:h-14 bg-white border rounded-full flex items-center justify-center transition-all duration-300 ${isActiveOnMobile
                                                ? "border-gray-900 shadow-md scale-110"
                                                : "border-gray-100 shadow-xs group-hover:shadow-md group-hover:border-gray-200"
                                                }`}>
                                                {tech.icon}
                                            </div>

                                            {/* Nama Logo / Pop-up Mini */}
                                            <span className={`text-[11px] font-semibold text-gray-700 transition-all duration-200 ${isActiveOnMobile
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-1 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0"
                                                }`}>
                                                {tech.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}