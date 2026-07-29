"use client";
import { motion } from "framer-motion";
import { Code2, Server, Layout } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    // Data untuk kartu highlight dengan terjemahan dinamis
    const highlights = [
        {
            icon: <Layout size={22} />,
            title: t.about.card1Title,
            desc: t.about.card1Desc,
        },
        {
            icon: <Server size={22} />,
            title: t.about.card2Title,
            desc: t.about.card2Desc,
        },
        {
            icon: <Code2 size={22} />,
            title: t.about.card3Title,
            desc: t.about.card3Desc,
        },
    ];

    return (
        <section id="about" className="py-16 md:py-20 px-6 bg-white border-t border-gray-100 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Judul Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{t.about.title}</h2>
                    <div className="w-12 h-1 bg-gray-900 mx-auto rounded-full"></div>
                </motion.div>

                {/* Teks Deskripsi */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl mx-auto text-base text-gray-600 leading-relaxed text-center mb-12"
                >
                    <p>{t.about.p1}</p>
                    <p className="mt-3">{t.about.p2}</p>
                </motion.div>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className="p-5 bg-gray-50 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all duration-300"
                        >
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-900 mb-3 shadow-xs border border-gray-100">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1.5">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}