"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fungsi pengiriman form ke Formspree tanpa memindahkan halaman
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xwvgypwq", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert(t.contact.successMsg);
                form.reset();
            } else {
                alert(t.contact.errorMsg);
            }
        } catch (error) {
            alert(t.contact.failedMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 md:py-20 px-6 bg-white border-t border-gray-100 font-sans" id="contact">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-left"
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight lowercase">
                        {t.contact.title}
                    </h2>
                    <p className="text-base text-gray-500 max-w-xl">
                        {t.contact.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                    {/* Kolom Kiri: Informasi Kontak */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-5"
                    >
                        <div className="bg-gray-50 p-5 md:p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-5">{t.contact.connectTitle}</h3>

                            <div className="space-y-4">
                                <a href="mailto:bimaardiansyah2509@gmail.com" className="flex items-center gap-3.5 text-gray-600 hover:text-gray-900 transition-colors group">
                                    <div className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center shadow-xs border border-gray-100 group-hover:border-gray-300 transition-all">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 mb-0.5">{t.contact.emailLabel}</p>
                                        <p className="text-xs md:text-sm font-semibold">bimaardiansyah2509@gmail.com</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-3.5 text-gray-600">
                                    <div className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center shadow-xs border border-gray-100">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 mb-0.5">{t.contact.locationLabel}</p>
                                        <p className="text-xs md:text-sm font-semibold">{t.contact.locationValue}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="mt-8 pt-6 border-t border-gray-200/80">
                                <p className="text-xs font-medium text-gray-400 mb-3">{t.contact.followMe}</p>
                                <div className="flex gap-3">
                                    <a href="https://github.com/bimbimm25" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-xs border border-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-300">
                                        <FaGithub size={16} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/bima-ardiansyah-062016353/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-xs border border-gray-100 hover:bg-[#0A66C2] hover:text-white transition-all duration-300">
                                        <FaLinkedin size={16} />
                                    </a>
                                    <a href="https://instagram.com/bimm.zhr" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-xs border border-gray-100 hover:bg-[#E4405F] hover:text-white transition-all duration-300">
                                        <FaInstagram size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Kolom Kanan: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7"
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="text-xs font-medium text-gray-700">{t.contact.nameLabel}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder={t.contact.namePlaceholder}
                                        className="w-full px-3.5 py-2.5 text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-xs font-medium text-gray-700">{t.contact.emailInputLabel}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder={t.contact.emailPlaceholder}
                                        className="w-full px-3.5 py-2.5 text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="subject" className="text-xs font-medium text-gray-700">{t.contact.subjectLabel}</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    placeholder={t.contact.subjectPlaceholder}
                                    className="w-full px-3.5 py-2.5 text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="message" className="text-xs font-medium text-gray-700">{t.contact.messageLabel}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    placeholder={t.contact.messagePlaceholder}
                                    className="w-full px-3.5 py-2.5 text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto px-6 py-3 bg-gray-900 text-white text-xs md:text-sm font-medium rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        {t.contact.sending}
                                    </span>
                                ) : (
                                    <>
                                        {t.contact.sendBtn}
                                        <Send size={15} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}