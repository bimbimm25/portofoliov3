"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext"; // Import useLanguage

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="w-full bg-white border-t border-gray-100 py-6 px-6 font-sans">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">

                {/* Left: Brand & Copyright */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="font-extrabold text-gray-900 hover:opacity-80 transition-opacity">
                        Bima<span className="text-gray-400">.</span>
                    </Link>
                    <span className="text-gray-300">•</span>
                    <p>© {currentYear} Bima Ardiansyah. {t.footer.rights}</p>
                </div>

                {/* Right: Social Media Links */}
                <div className="flex items-center gap-5">
                    <a href="https://github.com/bimbimm25" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors flex items-center gap-1.5">
                        <FaGithub size={14} />
                        <span>GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/bima-ardiansyah-062016353/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors flex items-center gap-1.5">
                        <FaLinkedin size={14} />
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://instagram.com/bimm.zhr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors flex items-center gap-1.5">
                        <FaInstagram size={14} />
                        <span>Instagram</span>
                    </a>
                </div>

            </div>
        </footer>
    );
}