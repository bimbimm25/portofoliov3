"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Layout,
    Server,
    Database,
    Zap,
    ChevronDown,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
    const { t } = useLanguage();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Pemetaan ikon berdasarkan ID layanan
    const getServiceIcon = (id: string) => {
        switch (id) {
            case "frontend":
                return <Layout size={24} className="text-gray-900" />;
            case "backend":
                return <Server size={24} className="text-gray-900" />;
            case "fullstack":
                return <Database size={24} className="text-gray-900" />;
            case "optimization":
                return <Zap size={24} className="text-gray-900" />;
            default:
                return <Layout size={24} className="text-gray-900" />;
        }
    };

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="min-h-screen bg-[#f8f9fa] pt-28 pb-20 px-6 font-sans">
            <Navbar />
            <div className="max-w-5xl mx-auto">

                {/* Back to Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft size={16} /> {t.servicesPage.backHome}
                </Link>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-left"
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight lowercase">
                        {t.servicesPage.title}
                    </h1>
                    <p className="text-base text-gray-500 max-w-xl">
                        {t.servicesPage.subtitle}
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {t.servicesPage.items.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white border border-gray-200/80 p-6 md:p-8 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_-8px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-300 flex flex-col"
                        >
                            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center mb-5">
                                {getServiceIcon(service.id)}
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                {service.title}
                            </h3>

                            <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6">
                                {service.desc}
                            </p>

                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                                            <CheckCircle2 size={14} className="text-gray-900 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Workflow Section */}
                <div className="mb-16">
                    <div className="text-left mb-8">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                            {t.servicesPage.workflowTitle}
                        </h2>
                        <p className="text-xs md:text-sm text-gray-500">
                            {t.servicesPage.workflowSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {t.servicesPage.workflows.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white/60 backdrop-blur-xs border border-gray-200/80 p-5 rounded-xl"
                            >
                                <span className="text-2xl font-black text-gray-300 mb-2 block">
                                    {item.step}
                                </span>
                                <h4 className="text-sm font-bold text-gray-900 mb-1">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white border border-gray-200/80 p-6 md:p-8 rounded-2xl">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        {t.servicesPage.faqTitle}
                    </h2>

                    <div className="space-y-3">
                        {t.servicesPage.faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="border border-gray-100 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-4 text-left flex items-center justify-between text-xs md:text-sm font-semibold text-gray-900 hover:bg-gray-50/80 transition-colors cursor-pointer"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="px-4 pb-4 text-xs text-gray-500 leading-relaxed border-t border-gray-50"
                                        >
                                            <p className="pt-2">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}