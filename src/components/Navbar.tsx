"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Ambil state bahasa & fungsi toggle dari LanguageContext
    const { lang, toggleLanguage, t } = useLanguage();

    const navLinks = [
        { name: t.nav.home, href: "/" },
        { name: t.nav.project, href: "/projects" },
        { name: t.nav.services, href: "/services" },
        { name: t.nav.achievement, href: "/achievement" },
    ];

    // Deteksi scroll untuk gaya floating navbar desktop
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Kunci scroll halaman saat mobile menu fullscreen terbuka
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${isScrolled ? "pt-3 md:pt-4 px-4 md:px-0" : "pt-0 px-0"
                }`}
        >
            <div
                className={`w-full transition-all duration-500 ${isScrolled
                        ? "max-w-3xl bg-white/70 backdrop-blur-md border border-gray-200/80 shadow-xs rounded-full px-5 py-2.5 md:px-6 md:py-3"
                        : "max-w-5xl bg-transparent border-b border-transparent px-6 py-6"
                    }`}
            >
                <div className="flex items-center justify-between">
                    {/* Brand Logo / Name */}
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg md:text-xl font-black text-gray-900 tracking-tight hover:opacity-80 transition-opacity z-50 relative shrink-0"
                    >
                        Bima<span className="text-gray-400">.</span>
                    </Link>

                    {/* Desktop Navigation Links (Lebar Tetap & Alignment Presisi) */}
                    <nav className="hidden md:flex items-center justify-center gap-2">
                        {navLinks.map((link, index) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors relative group py-1 w-24 text-center flex items-center justify-center ${isActive
                                            ? "text-gray-900 font-semibold"
                                            : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    <span className="truncate">{link.name}</span>
                                    <span
                                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-gray-900 transition-all duration-300 ${isActive ? "w-4/5" : "w-0 group-hover:w-4/5"
                                            }`}
                                    ></span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop Actions: Toggle Bahasa (Slide Presisi Tanpa Bergeser) */}
                    <div className="hidden md:flex items-center justify-end shrink-0">
                        <div className="flex items-center gap-1.5 bg-gray-100/90 p-1 rounded-full border border-gray-200/80 shadow-inner">
                            <Globe size={13} className="text-gray-400 ml-1.5 shrink-0" />
                            <div
                                onClick={toggleLanguage}
                                className="relative flex items-center bg-transparent rounded-full cursor-pointer select-none w-16 h-6"
                            >
                                {/* Opsi EN (Kiri) */}
                                <button
                                    type="button"
                                    className={`relative z-10 w-1/2 text-center text-[10px] font-bold transition-colors duration-200 ${lang === "en" ? "text-white" : "text-gray-400 hover:text-gray-700"
                                        }`}
                                >
                                    EN
                                </button>

                                {/* Opsi ID (Kanan) */}
                                <button
                                    type="button"
                                    className={`relative z-10 w-1/2 text-center text-[10px] font-bold transition-colors duration-200 ${lang === "id" ? "text-white" : "text-gray-400 hover:text-gray-700"
                                        }`}
                                >
                                    ID
                                </button>

                                {/* Sliding Background Indicator */}
                                <motion.div
                                    className="absolute top-0 bottom-0 bg-gray-900 rounded-full w-1/2 shadow-xs"
                                    initial={false}
                                    animate={{
                                        left: lang === "en" ? "0%" : "50%",
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Controls: Switch Language & Hamburger */}
                    <div className="flex items-center gap-2.5 md:hidden z-50">
                        {/* Tombol Toggle Bahasa Slide/Pill (Mobile) */}
                        <div className="flex items-center bg-gray-100 p-0.5 rounded-full border border-gray-200/80">
                            <div
                                onClick={toggleLanguage}
                                className="relative flex items-center bg-transparent rounded-full cursor-pointer select-none w-14 h-5"
                            >
                                <button
                                    type="button"
                                    className={`relative z-10 w-1/2 text-center text-[9px] font-bold transition-colors duration-200 ${lang === "en" ? "text-white" : "text-gray-400"
                                        }`}
                                >
                                    EN
                                </button>
                                <button
                                    type="button"
                                    className={`relative z-10 w-1/2 text-center text-[9px] font-bold transition-colors duration-200 ${lang === "id" ? "text-white" : "text-gray-400"
                                        }`}
                                >
                                    ID
                                </button>

                                <motion.div
                                    className="absolute top-0 bottom-0 bg-gray-900 rounded-full w-1/2"
                                    initial={false}
                                    animate={{
                                        left: lang === "en" ? "0%" : "50%",
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            </div>
                        </div>

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-1.5 text-gray-900 focus:outline-none cursor-pointer"
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Fullscreen Navigation Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white/85 flex flex-col justify-between p-8 md:hidden"
                    >
                        {/* Area Tengah: List Menu Navigasi */}
                        <div className="my-auto flex flex-col gap-6 items-start w-full">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                Navigation
                            </span>

                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.3, delay: index * 0.08 }}
                                        className="w-full"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`text-3xl font-extrabold flex items-center justify-between w-full transition-colors ${isActive
                                                    ? "text-gray-900"
                                                    : "text-gray-400 hover:text-gray-900"
                                                }`}
                                        >
                                            <span>{link.name}</span>
                                            {isActive && (
                                                <span className="w-2.5 h-2.5 bg-gray-900 rounded-full"></span>
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Area Bawah: Info Footer Mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="pt-6 border-t border-gray-200/80 flex flex-col gap-4"
                        >
                            <p className="text-center text-xs text-gray-400">
                                © Bima Ardiansyah. Fullstack Developer.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}