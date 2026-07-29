"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, X, FolderGit2, ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";

const categories = ["All", "Fullstack", "Frontend", "Backend"];

export default function ProjectsPage() {
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState("All");

    const projectsData = t.projectsPage.items;

    const [activeProject, setActiveProject] = useState<typeof projectsData[0] | null>(null);
    const [activeMobileCardId, setActiveMobileCardId] = useState<string | null>(null);

    // MENGHENTIKAN SCROLL TANPA MERUSAK LAYOUT & TANPA MELOMPAT KE ATAS
    useEffect(() => {
        const lenis = (window as unknown as { lenisInstance?: { stop: () => void; start: () => void } }).lenisInstance;

        if (activeProject) {
            // Hentikan Lenis agar halaman diam di tempatnya (tidak lompat ke atas & layout tetap utuh)
            if (lenis) lenis.stop();
            document.documentElement.classList.add("overflow-hidden");
        } else {
            // Jalankan kembali Lenis saat modal ditutup
            if (lenis) lenis.start();
            document.documentElement.classList.remove("overflow-hidden");
        }

        return () => {
            if (lenis) lenis.start();
            document.documentElement.classList.remove("overflow-hidden");
        };
    }, [activeProject]);

    const filteredProjects = selectedCategory === "All"
        ? projectsData
        : projectsData.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

    const handleOutsideClick = () => {
        if (activeMobileCardId !== null) {
            setActiveMobileCardId(null);
        }
    };

    const handleCardTap = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (activeMobileCardId === id) {
            setActiveMobileCardId(null);
        } else {
            setActiveMobileCardId(id);
        }
    };

    return (
        <main
            onClick={handleOutsideClick}
            className="min-h-screen bg-[#f8f9fa] pt-28 pb-20 px-6 font-sans select-none"
        >
            <Navbar />

            <div className="max-w-5xl mx-auto">
                {/* Back to Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft size={16} /> {t.projectsPage.backHome}
                </Link>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-left"
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight lowercase">
                        {t.projectsPage.title}
                    </h1>
                    <p className="text-base text-gray-500 max-w-xl">
                        {t.projectsPage.subtitle}
                    </p>

                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${selectedCategory === cat
                                    ? "bg-gray-900 text-white shadow-xs"
                                    : "bg-white text-gray-600 border border-gray-200/80 hover:border-gray-300 hover:text-gray-900"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredProjects.map((project) => {
                            const isMobileActive = activeMobileCardId === project.id;

                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={(e) => handleCardTap(e, project.id)}
                                    className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_-8px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-300 flex flex-col group cursor-pointer"
                                >
                                    <div className="relative w-full aspect-video bg-gray-50 border-b border-gray-100 p-2 overflow-hidden flex items-center justify-center">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className={`object-contain p-1 rounded-lg transition-all duration-500 ${isMobileActive
                                                ? "grayscale-0 scale-102"
                                                : "grayscale group-hover:grayscale-0 group-hover:scale-102"
                                                }`}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-300 -z-10">
                                            <FolderGit2 size={32} strokeWidth={1.5} />
                                            <span className="text-xs mt-1">Project Preview</span>
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                                                {project.category}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
                                            {project.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.techs.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[11px] font-medium text-gray-600 bg-gray-100/70 px-2 py-0.5 rounded-md"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-3 pt-3 border-t border-gray-100 mt-auto">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveProject(project);
                                                }}
                                                className="text-xs font-semibold text-gray-900 hover:underline cursor-pointer"
                                            >
                                                {t.projectsPage.viewDetail}
                                            </button>

                                            <div className="flex items-center gap-2 ml-auto">
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                                                        title="GitHub Repository"
                                                    >
                                                        <FaGithub size={16} />
                                                    </a>
                                                )}
                                                {project.demoUrl && (
                                                    <a
                                                        href={project.demoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                                                        title="Live Preview"
                                                    >
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Pop-up Modal View Detail (Tetap Melayang di Atas Posisi Scroll Sekarang) */}
            <AnimatePresence>
                {activeProject && (
                    <div
                        onClick={() => setActiveProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white border border-gray-200 rounded-2xl max-w-md md:max-w-lg w-full p-5 md:p-6 shadow-2xl relative flex flex-col"
                        >
                            {/* Tombol Close */}
                            <button
                                onClick={() => setActiveProject(null)}
                                className="absolute top-4 right-4 z-10 p-1.5 bg-white/90 backdrop-blur-md text-gray-600 hover:text-gray-900 rounded-full transition-colors cursor-pointer shadow-sm border border-gray-200"
                            >
                                <X size={18} />
                            </button>

                            {/* Gambar Preview Proporsional */}
                            <div className="relative w-full h-40 sm:h-48 bg-gray-50 rounded-xl overflow-hidden mb-4 shrink-0 border border-gray-200/80 p-2 flex items-center justify-center">
                                <Image
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>

                            {/* Detail Deskripsi Tampil Utuh */}
                            <div className="mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md mb-2 inline-block">
                                    {activeProject.category}
                                </span>

                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                    {activeProject.title}
                                </h3>

                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4">
                                    {activeProject.desc}
                                </p>

                                <div>
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.projectsPage.techUsed}</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {activeProject.techs.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100 mt-auto">
                                {activeProject.demoUrl && (
                                    <a
                                        href={activeProject.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-2.5 bg-gray-900 text-white text-xs font-medium rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                                    >
                                        {t.projectsPage.liveDemo} <ExternalLink size={14} />
                                    </a>
                                )}
                                {activeProject.githubUrl && (
                                    <a
                                        href={activeProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-2.5 bg-gray-100 text-gray-800 text-xs font-medium rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        {t.projectsPage.githubRepo} <FaGithub size={15} />
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