"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, X, FolderGit2, ArrowLeft, Quote, FolderX } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";

// Filter 1: Kategori Tech
const categories = ["All", "Fullstack", "Frontend", "Backend"];

// Filter 2: Tipe Project
const projectTypes = ["All", "Freelance", "Personal", "Demo"];

export default function ProjectsPage() {
    const { t } = useLanguage();

    // State Filter
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState("All");

    const projectsData = t.projectsPage.items;

    type ProjectItem = typeof projectsData[0] & {
        type?: "freelance" | "personal" | "demo";
        testimonial?: {
            quote: string;
            clientName: string;
            clientRole?: string;
            clientAvatar?: string;
        };
    };

    const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
    const [activeMobileCardId, setActiveMobileCardId] = useState<string | null>(null);

    // MENGHENTIKAN SCROLL SAAT MODAL BUKA
    useEffect(() => {
        const lenis = (window as unknown as { lenisInstance?: { stop: () => void; start: () => void } }).lenisInstance;

        if (activeProject) {
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
    }, [activeProject]);

    // FILTER GANDA
    const filteredProjects = (projectsData as ProjectItem[]).filter((p) => {
        const matchesCategory =
            selectedCategory === "All" ||
            p.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesType =
            selectedType === "All" ||
            p.type?.toLowerCase() === selectedType.toLowerCase();

        return matchesCategory && matchesType;
    });

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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-10 text-left"
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight lowercase">
                        {t.projectsPage.title}
                    </h1>
                    <p className="text-base text-gray-500 max-w-xl">
                        {t.projectsPage.subtitle}
                    </p>

                    {/* DUA BARIS FILTER */}
                    <div className="flex flex-col gap-3 mt-6">

                        {/* FILTER 1: Tipe Project */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {projectTypes.map((type, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition-all duration-200 cursor-pointer ${selectedType === type
                                            ? "bg-amber-500 text-white shadow-xs"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                        }`}
                                >
                                    {type === "All" ? "All" : type}
                                </button>
                            ))}
                        </div>

                        {/* FILTER 2: Kategori Tech */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {categories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${selectedCategory === cat
                                            ? "bg-gray-900 text-white shadow-xs"
                                            : "bg-white text-gray-600 border border-gray-200/80 hover:border-gray-300 hover:text-gray-900"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                    </div>
                </motion.div>

                {/* Grid Projects / Empty State */}
                <AnimatePresence mode="wait">
                    {filteredProjects.length > 0 ? (
                        <motion.div
                            key="project-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredProjects.map((project, index) => {
                                const isMobileActive = activeMobileCardId === project.id;
                                const isFreelance = project.type?.toLowerCase() === "freelance";

                                return (
                                    <motion.div
                                        key={project.id}
                                        /* Animasi perlahan muncul halus (Fade In Soft + Stagger) */
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.05,
                                            ease: "easeOut"
                                        }}
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
                                                        ? "grayscale-0"
                                                        : "grayscale group-hover:grayscale-0"
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
                                                <div className="flex gap-1.5">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                                                        {project.category}
                                                    </span>
                                                    {project.type && (
                                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${isFreelance
                                                                ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                                                                : "bg-blue-50 text-blue-700 border border-blue-200/60"
                                                            }`}>
                                                            {project.type}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                                                {project.title}
                                            </h3>

                                            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
                                                {project.desc}
                                            </p>

                                            {/* Testimonial khusus Freelance */}
                                            {isFreelance && project.testimonial && (
                                                <div className="mb-4 p-2.5 bg-amber-50/50 border border-amber-100 rounded-xl relative">
                                                    <Quote size={12} className="text-amber-400 mb-1" />
                                                    <p className="text-[11px] text-amber-900/80 italic line-clamp-2 leading-tight">
                                                        &ldquo;{project.testimonial.quote}&rdquo;
                                                    </p>
                                                    <span className="text-[10px] font-semibold text-amber-900 block mt-1">
                                                        — {project.testimonial.clientName}
                                                    </span>
                                                </div>
                                            )}

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
                        </motion.div>
                    ) : (
                        /* TAMPILAN ELEGAN SAAT PROJECT KOSONG (EMPTY STATE) */
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center my-6 shadow-xs"
                        >
                            <div className="p-4 bg-gray-50 text-gray-400 rounded-full mb-4 border border-gray-100">
                                <FolderX size={36} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-base font-bold text-gray-900 mb-1">
                                Belum Ada Project
                            </h3>

                            <p className="text-xs text-gray-500 max-w-sm leading-relaxed mb-6">
                                Project untuk kategori <span className="font-semibold text-gray-700">&ldquo;{selectedType !== "All" ? selectedType : ""}{selectedType !== "All" && selectedCategory !== "All" ? " - " : ""}{selectedCategory !== "All" ? selectedCategory : ""}&rdquo;</span> saat ini belum tersedia atau sedang dalam tahap pengembangan.
                            </p>

                            <button
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSelectedType("All");
                                }}
                                className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
                            >
                                Tampilkan Semua Project
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Pop-up Modal View Detail (Animasi Halus) */}
            <AnimatePresence>
                {activeProject && (
                    <div
                        onClick={() => setActiveProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white border border-gray-200 rounded-2xl max-w-md md:max-w-lg w-full p-5 md:p-6 shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto"
                        >
                            {/* Tombol Close */}
                            <button
                                onClick={() => setActiveProject(null)}
                                className="absolute top-4 right-4 z-10 p-1.5 bg-white/90 backdrop-blur-md text-gray-600 hover:text-gray-900 rounded-full transition-colors cursor-pointer shadow-sm border border-gray-200"
                            >
                                <X size={18} />
                            </button>

                            {/* Gambar Preview */}
                            <div className="relative w-full h-40 sm:h-48 bg-gray-50 rounded-xl overflow-hidden mb-4 shrink-0 border border-gray-200/80 p-2 flex items-center justify-center">
                                <Image
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>

                            {/* Detail Deskripsi */}
                            <div className="mb-4">
                                <div className="flex gap-2 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                                        {activeProject.category}
                                    </span>
                                    {activeProject.type && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                                            {activeProject.type}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                    {activeProject.title}
                                </h3>

                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4">
                                    {activeProject.desc}
                                </p>

                                {/* Testimonial Lengkap */}
                                {activeProject.type?.toLowerCase() === "freelance" && activeProject.testimonial && (
                                    <div className="mb-4 p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl relative">
                                        <Quote size={18} className="text-amber-500 mb-2" />
                                        <p className="text-xs text-amber-950 italic leading-relaxed mb-3">
                                            &ldquo;{activeProject.testimonial.quote}&rdquo;
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {activeProject.testimonial.clientAvatar && (
                                                <Image
                                                    src={activeProject.testimonial.clientAvatar}
                                                    alt={activeProject.testimonial.clientName}
                                                    width={28}
                                                    height={28}
                                                    className="rounded-full object-cover"
                                                />
                                            )}
                                            <div>
                                                <span className="text-xs font-bold text-amber-950 block">
                                                    {activeProject.testimonial.clientName}
                                                </span>
                                                {activeProject.testimonial.clientRole && (
                                                    <span className="text-[10px] text-amber-800/80 block">
                                                        {activeProject.testimonial.clientRole}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

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