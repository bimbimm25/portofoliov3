"use client";
import React, { createContext, useContext, useState } from "react";

type Language = "id" | "en";

const translations = {
    id: {
        nav: {
            home: "Home",
            project: "Proyek",
            services: "Layanan",
            achievement: "Pencapaian",
            letsTalk: "Hubungi Saya",
        },
        hero: {
            badge: "Tersedia untuk pekerjaan freelance",
            greeting: "Halo, Saya",
            name: "Bima Ardiansyah",
            role: "Fullstack Web Developer",
            desc: "Saya membangun aplikasi web yang tidak hanya terlihat indah secara visual, tetapi juga memiliki performa tinggi, struktur kode yang bersih, dan pengalaman pengguna yang mulus dari frontend hingga backend.",
            contactBtn: "Hubungi Saya",
            aboutBtn: "Tentang Saya",
            location: "Sidoarjo, Jawa Timur, Indonesia",
        },
        about: {
            title: "Tentang Saya",
            p1: "Halo! Saya adalah seorang Fullstack Web Developer. Saya memiliki ketertarikan mendalam pada pengembangan aplikasi web modern, mulai dari merancang antarmuka pengguna (UI/UX) yang menawan hingga membangun arsitektur sistem di balik layar yang efisien.",
            p2: "Pendekatan saya selalu mengutamakan performa dan pengalaman pengguna, memastikan setiap proyek tidak hanya berfungsi dengan baik, tetapi juga memberikan dampak positif bagi penggunanya.",
            card1Title: "Frontend Development",
            card1Desc: "Membangun antarmuka yang interaktif, responsif, dan mudah digunakan (user-friendly).",
            card2Title: "Backend Architecture",
            card2Desc: "Merancang API dan database yang tangguh, aman, dan dapat diskalakan (scalable).",
            card3Title: "Clean Code",
            card3Desc: "Menulis kode yang rapi, terstruktur, dan mudah di-maintain oleh tim.",
        },
        techStack: {
            title: "keahlian teknis",
            subtitle: "Teknologi dan tools yang saya gunakan untuk mengimplementasikan ide.",
            categories: {
                frontend: { title: "Frontend", desc: "membangun antarmuka pengguna yang interaktif" },
                styling: { title: "Styling", desc: "menciptakan desain yang indah dan responsif" },
                backend: { title: "Backend", desc: "mengembangkan logika server-side yang tangguh" },
                database: { title: "Database", desc: "mengelola dan menyimpan data secara aman" },
                tools: { title: "Tools", desc: "meningkatkan produktivitas dan alur kerja" }
            }
        },
        experience: {
            title: "pengalaman kerja",
            subtitle: "Pengalaman kerja profesional dan proyek yang berkontribusi dalam pengembangan keahlian saya.",
            items: [
                {
                    id: 1,
                    title: "PT. Evotek",
                    role: "Fullstack Developer (Magang)",
                    date: "Jul 2026 - Sekarang",
                    location: "Indonesia",
                    description: "Bertanggung jawab sebagai Fullstack Developer untuk merancang dan membangun website aplikasi Kantin Digital secara end-to-end.",
                    logoSrc: "/logo-evotek.jpg",
                },
                {
                    id: 2,
                    title: "Uji Kenaikan Level Sekolah",
                    role: "Fullstack Web Developer",
                    date: "Jun 2026",
                    location: "Sekolah",
                    description: "Menyelesaikan proyek akhir kenaikan level dengan sukses membangun Sistem Perpustakaan Digital secara penuh (Frontend, Backend, dan Database).",
                    logoSrc: "/logo-smk.jpg",
                },
                {
                    id: 3,
                    title: "TechSprint Innovation Cup 2026 by Codelab",
                    role: "Peserta Kompetisi",
                    date: "23 Mei 2026",
                    location: "Online / Sidoarjo",
                    description: "Berpartisipasi aktif dalam ajang kompetisi inovasi teknologi, mengembangkan ide dan mengimplementasikan solusi pemrograman dalam waktu yang ditentukan.",
                    logoSrc: "/logo-techsprint.png",
                },
            ]
        },
        education: {
            title: "pendidikan",
            subtitle: "Latar belakang akademis dan perjalanan pendidikan saya.",
            items: [
                {
                    id: 1,
                    school: "SMK PGRI 2 Sidoarjo",
                    degree: "Siswa (Jurusan Rekayasa Perangkat Lunak)",
                    date: "2024 - Sekarang",
                    location: "Sidoarjo, Jawa Timur",
                    description: "Fokus mempelajari pengembangan perangkat lunak, pemrograman web, dan basis data. Membangun fondasi kuat sebagai seorang Fullstack Developer melalui praktik langsung dan proyek sekolah.",
                    logoSrc: "/logo-smk.jpg",
                },
                {
                    id: 2,
                    school: "SMPN 2 Gedangan",
                    degree: "Siswa",
                    date: "2021 - 2024",
                    location: "Sidoarjo, Jawa Timur",
                    description: "Menyelesaikan pendidikan menengah pertama dengan baik, membangun dasar akademik yang kuat, serta aktif dalam kegiatan sekolah.",
                    logoSrc: "/logo-smp.png",
                },
            ]
        },
        contact: {
            title: "hubungi saya",
            subtitle: "Punya ide proyek, tawaran pekerjaan, atau sekadar ingin berdiskusi? Jangan ragu untuk menghubungi saya.",
            connectTitle: "Mari Terhubung",
            emailLabel: "Email",
            locationLabel: "Lokasi",
            locationValue: "Sidoarjo, Jawa Timur, Indonesia",
            followMe: "Ikuti Saya",
            nameLabel: "Nama Lengkap",
            namePlaceholder: "Masukkan nama lengkap",
            emailInputLabel: "Alamat Email",
            emailPlaceholder: "Masukkan email",
            subjectLabel: "Subjek",
            subjectPlaceholder: "Tawaran Proyek / Freelance",
            messageLabel: "Pesan",
            messagePlaceholder: "Ceritakan tentang proyek atau ide Anda...",
            sending: "Mengirim...",
            sendBtn: "Kirim Pesan",
            successMsg: "Pesan berhasil dikirim! Saya akan segera membalasnya.",
            errorMsg: "Terjadi kesalahan saat mengirim pesan. Coba lagi ya.",
            failedMsg: "Gagal mengirim pesan. Pastikan koneksi internet kamu lancar."
        },
        projectsPage: {
            title: "proyek saya",
            subtitle: "Daftar lengkap proyek pribadi dan profesional yang telah saya bangun.",
            viewDetail: "Lihat Detail",
            techUsed: "Teknologi yang Digunakan",
            liveDemo: "Live Demo",
            githubRepo: "GitHub Repo",
            backHome: "Kembali ke Home",
            items: [
                {
                    id: "kantin-digital",
                    title: "Aplikasi Kantin Digital",
                    category: "Fullstack",
                    image: "/projects/web-kantin.png",
                    desc: "Sistem pemesanan kantin berbasis web secara end-to-end dengan fitur manajemen stok, transaksi digital, dan laporan penjualan.",
                    techs: ["Laravel", "Tailwind CSS", "MySQL"],
                    demoUrl: "",
                    githubUrl: "",
                },
                {
                    id: "perpustakaan-digital",
                    title: "Sistem Perpustakaan Digital",
                    category: "Fullstack",
                    image: "/projects/perpustakaan.png",
                    desc: "Aplikasi manajemen perpustakaan digital untuk Uji Kenaikan Level Sekolah, mencakup peminjaman buku, denda otomatis, dan sistem keanggotaan.",
                    techs: ["PHP", "Tailwind", "MySQL"],
                    demoUrl: "",
                    githubUrl: "",
                },
                {
                    id: "web-pos",
                    title: "Web POS (Sistem Kasir)",
                    category: "Fullstack",
                    image: "/projects/web-pos.png",
                    desc: "Website kasir dengan sistem scan QR dan input otomatis lalu menghitung harganya secara otomatis.",
                    techs: ["PHP", "Bootstrap", "MySQL"],
                    demoUrl: "",
                    githubUrl: "",
                },
                {
                    id: "rental-mobil",
                    title: "Website Rental Mobil",
                    category: "Frontend",
                    image: "/projects/rental-mobil.png",
                    desc: "Website rental mobil dengan sistem booking yang terintegrasi dengan WhatsApp.",
                    techs: ["Next.js", "Tailwind"],
                    demoUrl: "https://rental-mobil-abs.vercel.app/",
                    githubUrl: "https://github.com/bimbimm25/rental-mobil.git",
                },
                {
                    id: "rental-iphone",
                    title: "Website Rental iPhone",
                    category: "Frontend",
                    image: "/projects/rental-iphone.png",
                    desc: "Website rental iPhone dengan sistem booking yang terintegrasi dengan WhatsApp.",
                    techs: ["Next.js", "Tailwind"],
                    demoUrl: "https://sewa-iphone-khaki.vercel.app/",
                    githubUrl: "https://github.com/bimbimm25/sewa-iphone.git",
                },
                {
                    id: "web-barber",
                    title: "Website Barbershop",
                    category: "Frontend",
                    image: "/projects/web-barber.png",
                    desc: "Website barber shop dengan sistem booking otomatis yang terintegrasi dengan WhatsApp.",
                    techs: ["Next.js", "Tailwind"],
                    demoUrl: "https://barbershop-alpha-ten.vercel.app/",
                    githubUrl: "https://github.com/bimbimm25/barbershop.git",
                },
                {
                    id: "web-cafe1",
                    title: "Website Tomeet Cafe",
                    category: "Frontend",
                    image: "/projects/web-cafe1.png",
                    desc: "Website cafe elegan dengan sistem reservasi yang otomatis terintegrasi dengan WhatsApp.",
                    techs: ["Next.js", "Tailwind"],
                    demoUrl: "https://tomeet-cafe.vercel.app/",
                    githubUrl: "https://github.com/bimbimm25/tomeet-cafe.git",
                },
                {
                    id: "web-cafe2",
                    title: "Website Cafe Sidoarjo",
                    category: "Frontend",
                    image: "/projects/web-cafe2.png",
                    desc: "Website cafe elegan dengan sistem reservasi yang otomatis terintegrasi dengan WhatsApp.",
                    techs: ["Next.js", "Tailwind"],
                    demoUrl: "https://web-cafe-bice.vercel.app/",
                    githubUrl: "https://github.com/bimbimm25/web-cafe.git",
                },
            ]
        },
        servicesPage: {
            title: "layanan",
            subtitle: "Solusi dan layanan pengembangan perangkat lunak yang dapat saya berikan untuk membantu mewujudkan ide Anda.",
            backHome: "Kembali ke Home",
            workflowTitle: "Workflow & Proses",
            workflowSubtitle: "Pendekatan terstruktur dalam menyelesaikan setiap proyek secara efektif.",
            faqTitle: "Frequently Asked Questions",
            items: [
                {
                    id: "frontend",
                    title: "Frontend Development",
                    desc: "Membangun antarmuka web modern, responsif, dan interaktif dengan performa optimal serta pengalaman pengguna (UI/UX) yang intuitif.",
                    features: [
                        "React.js / Next.js Development",
                        "Responsive & Mobile-First Design",
                        "Tailwind CSS & Component Styling",
                        "Animation & Interactive UI"
                    ]
                },
                {
                    id: "backend",
                    title: "Backend Architecture & API",
                    desc: "Merancang arsitektur server yang tangguh, aman, dan dapat diskalakan serta integrasi RESTful API untuk kebutuhan sistem aplikasi.",
                    features: [
                        "RESTful API Development",
                        "Laravel / Node.js Framework",
                        "Authentication & Security System",
                        "Database Design (MySQL / Postgre)"
                    ]
                },
                {
                    id: "fullstack",
                    title: "Fullstack Web Application",
                    desc: "Pengembangan solusi aplikasi web end-to-end dari perancangan basis data hingga tampilan akhir frontend yang siap rilis.",
                    features: [
                        "Custom Web App Development",
                        "Admin Dashboard & Management System",
                        "Third-Party Service Integration",
                        "Deployment & Cloud Hosting Setup"
                    ]
                },
                {
                    id: "optimization",
                    title: "Performance & Refactoring",
                    desc: "Mengoptimalkan kecepatan loading website, memperbaiki bugs, serta merapikan struktur kode agar mudah dipelihara (Clean Code).",
                    features: [
                        "Core Web Vitals Optimization",
                        "SEO-friendly Structure",
                        "Code Maintenance & Refactoring",
                        "Cross-browser Compatibility"
                    ]
                }
            ],
            workflows: [
                { step: "01", title: "Discovery", desc: "Mendiskusikan ide, kebutuhan proyek, serta target pengguna." },
                { step: "02", title: "Planning & Architecture", desc: "Merancang alur database, desain antarmuka, dan struktur kode." },
                { step: "03", title: "Development", desc: "Proses koding frontend dan backend dengan prinsip Clean Code." },
                { step: "04", title: "Testing & Deployment", desc: "Pengujian fungsionalitas dan peluncuran aplikasi ke server." }
            ],
            faqs: [
                {
                    q: "Berapa lama waktu pengerjaan satu proyek web?",
                    a: "Waktu pengerjaan sangat bervariasi tergantung pada kompleksitas fitur aplikasi. Untuk landing page sederhana biasanya memakan waktu 3-7 hari, sedangkan aplikasi web fullstack membutuhkan waktu 2-4 minggu."
                },
                {
                    q: "Teknologi apa saja yang biasanya kamu gunakan?",
                    a: "Saya utamanya menggunakan Stack JavaScript modern seperti React/Next.js, Tailwind CSS untuk Frontend, serta Laravel, Node.js, dan MySQL/Supabase untuk Backend."
                },
                {
                    q: "Apakah aplikasi yang dibuat sudah responsif di HP?",
                    a: "Tentu saja. Semua proyek web dirancang menggunakan pendekatan Mobile-First, sehingga dipastikan tampil dengan baik di perangkat seluler, tablet, maupun desktop."
                }
            ]
        },
        achievementPage: {
            title: "pencapaian",
            subtitle: "Rekam jejak pencapaian, penghargaan kompetisi, dan sertifikasi profesional yang telah saya raih.",
            viewDetail: "Lihat Detail",
            certificate: "Sertifikat",
            openCert: "Buka Sertifikat (Google Drive)",
            backHome: "Kembali ke Home",
            issuerLabel: "Penyelenggara",
            locationLabel: "Lokasi",
            dateLabel: "Tanggal",
            skillsTitle: "Skills & Knowledge",
            items: [
                {
                    id: "techsprint-2026",
                    title: "TechSprint Innovation Cup 2026",
                    role: "Peserta Kompetisi",
                    issuer: "Codelab Indonesia",
                    date: "23 Mei 2026",
                    location: "Sidoarjo / Online",
                    certificateUrl: "https://drive.google.com/file/d/1mMcKLnPUcdiWKq1m03ekZh0a5k1HRfwy/view?usp=sharing",
                    description: "Berpartisipasi aktif dalam ajang kompetisi inovasi teknologi nasional, mengembangkan ide dan mengimplementasikan solusi pemrograman dalam batas waktu yang ditentukan.",
                    skills: ["Problem Solving", "Web Development", "Teamwork"],
                },
                {
                    id: "dicoding",
                    title: "Financial Literacy",
                    role: "Sertifikasi",
                    issuer: "Dicoding Indonesia",
                    date: "Mei 2026",
                    location: "Sidoarjo / Online",
                    certificateUrl: "https://drive.google.com/file/d/1PCACwV0Tc1AS4Xa-JNnxiZC1VRBSZCa1/view?usp=sharing",
                    description: "Lulus sertifikasi membangun pemahaman yang kuat tentang prinsip-prinsip dasar literasi finansial, menerapkannya dalam pengambilan keputusan keuangan sehari-hari, serta merancang strategi finansial jangka panjang.",
                    skills: ["Kelola Keuangan", "Konsep Investasi", "Konsep Pinjaman"],
                },
                {
                    id: "pixelnoid",
                    title: "Pixelnoid Dev Weekend Season 2 Mini Competition",
                    role: "Peserta Kompetisi",
                    issuer: "Pixelnoid",
                    date: "12 - 13 Juli 2026",
                    location: "Online",
                    certificateUrl: "https://drive.google.com/file/d/1P2H-MxzGuU85vRIbs5Q2-WsgDBr31V0y/view?usp=drive_link",
                    description: "Berpartisipasi aktif dalam ajang mini kompetisi Dev Weekend, mengembangkan model machine learning dan mengoptimalkan tampilan website.",
                    skills: ["Machine Learning", "Laravel", "Tailwind"],
                }
            ]
        },
        footer: {
            rights: "Hak cipta dilindungi.",
        },
    },
    en: {
        nav: {
            home: "Home",
            project: "Projects",
            services: "Services",
            achievement: "Achievements",
            letsTalk: "Let's Talk",
        },
        hero: {
            badge: "Available for freelance work",
            greeting: "Hello, I'm",
            name: "Bima Ardiansyah",
            role: "Fullstack Web Developer",
            desc: "I build web applications that not only look visually appealing but also offer high performance, clean code architecture, and seamless user experiences from frontend to backend.",
            contactBtn: "Contact Me",
            aboutBtn: "About Me",
            location: "Sidoarjo, East Java, Indonesia",
        },
        about: {
            title: "About Me",
            p1: "Hello! I am a Fullstack Web Developer. I have a deep passion for modern web application development, ranging from designing engaging user interfaces (UI/UX) to building efficient behind-the-scenes system architectures.",
            p2: "My approach always prioritizes performance and user experience, ensuring that every project not only functions smoothly but also delivers a positive impact to its users.",
            card1Title: "Frontend Development",
            card1Desc: "Building interactive, responsive, and user-friendly web interfaces.",
            card2Title: "Backend Architecture",
            card2Desc: "Designing robust, secure, and scalable APIs and databases.",
            card3Title: "Clean Code",
            card3Desc: "Writing clean, structured, and easily maintainable code for teams.",
        },
        techStack: {
            title: "technical skills",
            subtitle: "Technologies and tools I use to bring ideas to life.",
            categories: {
                frontend: { title: "Frontend", desc: "building interactive user interfaces" },
                styling: { title: "Styling", desc: "creating beautiful and responsive designs" },
                backend: { title: "Backend", desc: "developing robust server-side logic" },
                database: { title: "Database", desc: "managing and storing data securely" },
                tools: { title: "Tools", desc: "enhancing productivity and workflow" }
            }
        },
        experience: {
            title: "work experience",
            subtitle: "Professional work experience and projects that contributed to the development of my skills.",
            items: [
                {
                    id: 1,
                    title: "PT. Evotek",
                    role: "Fullstack Developer (Internship)",
                    date: "Jul 2026 - Present",
                    location: "Indonesia",
                    description: "Responsible as a Fullstack Developer for designing and building the Digital Canteen web application end-to-end.",
                    logoSrc: "/logo-evotek.jpg",
                },
                {
                    id: 2,
                    title: "School Level Advancement Test",
                    role: "Fullstack Web Developer",
                    date: "Jun 2026",
                    location: "School",
                    description: "Successfully completed the level advancement final project by building a complete Digital Library System (Frontend, Backend, and Database).",
                    logoSrc: "/logo-smk.jpg",
                },
                {
                    id: 3,
                    title: "TechSprint Innovation Cup 2026 by Codelab",
                    role: "Competition Participant",
                    date: "23 May 2026",
                    location: "Online / Sidoarjo",
                    description: "Actively participated in a tech innovation competition, developing ideas and implementing programming solutions within the given timeframe.",
                    logoSrc: "/logo-techsprint.png",
                },
            ]
        },
        education: {
            title: "education",
            subtitle: "My academic background and educational journey.",
            items: [
                {
                    id: 1,
                    school: "SMK PGRI 2 Sidoarjo",
                    degree: "Student (Software Engineering Major)",
                    date: "2024 - Present",
                    location: "Sidoarjo, East Java",
                    description: "Focusing on software development, web programming, and databases. Building a strong foundation as a Fullstack Developer through hands-on practice and school projects.",
                    logoSrc: "/logo-smk.jpg",
                },
                {
                    id: 2,
                    school: "SMPN 2 Gedangan",
                    degree: "Student",
                    date: "2021 - 2024",
                    location: "Sidoarjo, East Java",
                    description: "Successfully completed junior high school education, building a solid academic foundation and actively participating in school activities.",
                    logoSrc: "/logo-smp.png",
                },
            ]
        },
        contact: {
            title: "contact me",
            subtitle: "Have a project idea, job offer, or just want to chat? Feel free to reach out to me.",
            connectTitle: "Let's Connect",
            emailLabel: "Email",
            locationLabel: "Location",
            locationValue: "Sidoarjo, East Java, Indonesia",
            followMe: "Follow Me",
            nameLabel: "Full Name",
            namePlaceholder: "Enter your full name",
            emailInputLabel: "Email Address",
            emailPlaceholder: "Enter your email",
            subjectLabel: "Subject",
            subjectPlaceholder: "Project Proposal / Freelance",
            messageLabel: "Message",
            messagePlaceholder: "Tell me about your project or idea...",
            sending: "Sending...",
            sendBtn: "Send Message",
            successMsg: "Message sent successfully! I will reply as soon as possible.",
            errorMsg: "An error occurred while sending the message. Please try again.",
            failedMsg: "Failed to send message. Make sure your internet connection is stable."
        },
        projectsPage: {
            title: "my projects",
            subtitle: "A complete showcase of personal and professional projects I have built.",
            viewDetail: "View Detail",
            techUsed: "Technologies Used",
            liveDemo: "Live Demo",
            githubRepo: "GitHub Repo",
            backHome: "Back to Home",
            items: [
                {
                    id: "kantin-digital",
                    title: "Digital Canteen App",
                    category: "Fullstack",
                    image: "/projects/web-kantin.png",
                    desc: "An end-to-end web-based canteen ordering system with inventory management, digital transactions, and sales reporting.",
                    techs: ["Laravel", "Tailwind CSS", "MySQL"],
                    demoUrl: "",
                    githubUrl: "",
                },
                {
                    id: "perpustakaan-digital",
                    title: "Digital Library System",
                    category: "Fullstack",
                    image: "/projects/perpustakaan.png",
                    desc: "Digital library management application built for the School Level Advancement Test, featuring book borrowing, automatic fines, and membership system.",
                    techs: ["PHP", "Tailwind", "MySQL"],
                    demoUrl: "",
                    githubUrl: "",
                },
                {
                    id: "web-pos",
                    title: "Web POS (Cashier System)",
                    category: "Fullstack",
                    image: "/projects/web-pos.png",
                    desc: "Cashier website equipped with QR scanning, automated input, and automatic price calculation.",
                    techs: ["PHP", "Bootstrap", "MySQL"],
                    demoUrl: "",
                    githubUrl: "",
                },
                {
                    id: "rental-mobil",
                    title: "Car Rental Website",
                    category: "Frontend",
                    image: "/projects/rental-mobil.png",
                    desc: "Car rental website featuring a WhatsApp-integrated booking system.",
                    techs: ["Next.js", "Tailwind"],
                    demoUrl: "https://rental-mobil-abs.vercel.app/",
                    githubUrl: "https://github.com/bimbimm25/rental-mobil.git",
                },
                {
                    id: "rental-iphone",
                    title: "iPhone Rental Website",
                    category: "Frontend",
                    image: "/projects/rental-iphone.png",
                    desc: "iPhone rental website featuring a WhatsApp-integrated booking system.",
                    techs: ["Next.js", "Tailwind"],
                    demoUrl: "https://sewa-iphone-khaki.vercel.app/",
                    githubUrl: "https://github.com/bimbimm25/sewa-iphone.git",
                },
                {
                    id: "web-barber",
                    title: "Barbershop Website",
                    category: "Frontend",
                    image: "/projects/web-barber.png",
                    desc: "Barbershop website with automated WhatsApp-integrated appointment booking.",
                    techs: ["Next.js", "Tailwind"],
                    demoUrl: "https://barbershop-alpha-ten.vercel.app/",
                    githubUrl: "https://github.com/bimbimm25/barbershop.git",
                },
                {
                    id: "web-cafe1",
                    title: "Tomeet Cafe Website",
                    category: "Frontend",
                    image: "/projects/web-cafe1.png",
                    desc: "An elegant cafe website with an automated reservation system integrated with WhatsApp.",
                    techs: ["Next.js", "Tailwind"],
                    demoUrl: "https://tomeet-cafe.vercel.app/",
                    githubUrl: "https://github.com/bimbimm25/tomeet-cafe.git",
                },
                {
                    id: "web-cafe2",
                    title: "Sidoarjo Cafe Website",
                    category: "Frontend",
                    image: "/projects/web-cafe2.png",
                    desc: "An elegant cafe website with an automated reservation system integrated with WhatsApp.",
                    techs: ["Next.js", "Tailwind"],
                    demoUrl: "https://web-cafe-bice.vercel.app/",
                    githubUrl: "https://github.com/bimbimm25/web-cafe.git",
                },
            ]
        },
        servicesPage: {
            title: "services",
            subtitle: "Software development solutions and services I provide to help bring your ideas to life.",
            backHome: "Back to Home",
            workflowTitle: "Workflow & Process",
            workflowSubtitle: "A structured approach to effectively completing every project.",
            faqTitle: "Frequently Asked Questions",
            items: [
                {
                    id: "frontend",
                    title: "Frontend Development",
                    desc: "Building modern, responsive, and interactive web interfaces with optimal performance and intuitive user experience (UI/UX).",
                    features: [
                        "React.js / Next.js Development",
                        "Responsive & Mobile-First Design",
                        "Tailwind CSS & Component Styling",
                        "Animation & Interactive UI"
                    ]
                },
                {
                    id: "backend",
                    title: "Backend Architecture & API",
                    desc: "Designing robust, secure, and scalable server architecture alongside RESTful API integrations for application needs.",
                    features: [
                        "RESTful API Development",
                        "Laravel / Node.js Framework",
                        "Authentication & Security System",
                        "Database Design (MySQL / Postgre)"
                    ]
                },
                {
                    id: "fullstack",
                    title: "Fullstack Web Application",
                    desc: "End-to-end web application development from database architecture design to production-ready frontend user interfaces.",
                    features: [
                        "Custom Web App Development",
                        "Admin Dashboard & Management System",
                        "Third-Party Service Integration",
                        "Deployment & Cloud Hosting Setup"
                    ]
                },
                {
                    id: "optimization",
                    title: "Performance & Refactoring",
                    desc: "Optimizing website loading speed, fixing bugs, and refactoring codebase structures for easier maintenance (Clean Code).",
                    features: [
                        "Core Web Vitals Optimization",
                        "SEO-friendly Structure",
                        "Code Maintenance & Refactoring",
                        "Cross-browser Compatibility"
                    ]
                }
            ],
            workflows: [
                { step: "01", title: "Discovery", desc: "Discussing project ideas, requirements, and target audience." },
                { step: "02", title: "Planning & Architecture", desc: "Designing database schema, UI flows, and codebase architecture." },
                { step: "03", title: "Development", desc: "Frontend and backend coding implementation following Clean Code principles." },
                { step: "04", title: "Testing & Deployment", desc: "Quality assurance testing and deploying the application to servers." }
            ],
            faqs: [
                {
                    q: "How long does a web project typically take?",
                    a: "Timeline varies depending on feature complexity. Simple landing pages take 3-7 days, while fullstack web applications take around 2-4 weeks."
                },
                {
                    q: "What tech stack do you usually use?",
                    a: "I mainly use modern JavaScript stacks like React/Next.js and Tailwind CSS for Frontend, plus Laravel, Node.js, and MySQL/Supabase for Backend."
                },
                {
                    q: "Will the web application be mobile responsive?",
                    a: "Absolutely. All web projects are built with a Mobile-First approach to ensure optimal appearance on mobile, tablet, and desktop screens."
                }
            ]
        },
        achievementPage: {
            title: "achievements",
            subtitle: "A showcase of my career milestones, competition awards, and professional certifications.",
            viewDetail: "View Detail",
            certificate: "Certificate",
            openCert: "Open Certificate (Google Drive)",
            backHome: "Back to Home",
            issuerLabel: "Organizer",
            locationLabel: "Location",
            dateLabel: "Date",
            skillsTitle: "Skills & Knowledge",
            items: [
                {
                    id: "techsprint-2026",
                    title: "TechSprint Innovation Cup 2026",
                    role: "Competition Participant",
                    issuer: "Codelab Indonesia",
                    date: "23 May 2026",
                    location: "Sidoarjo / Online",
                    certificateUrl: "https://drive.google.com/file/d/1mMcKLnPUcdiWKq1m03ekZh0a5k1HRfwy/view?usp=sharing",
                    description: "Actively participated in a national technology innovation competition, developing ideas and implementing programming solutions within given deadlines.",
                    skills: ["Problem Solving", "Web Development", "Teamwork"],
                },
                {
                    id: "dicoding",
                    title: "Financial Literacy",
                    role: "Certification",
                    issuer: "Dicoding Indonesia",
                    date: "May 2026",
                    location: "Sidoarjo / Online",
                    certificateUrl: "https://drive.google.com/file/d/1PCACwV0Tc1AS4Xa-JNnxiZC1VRBSZCa1/view?usp=sharing",
                    description: "Passed certification establishing a solid understanding of fundamental financial literacy principles, applying them to daily financial decisions, and planning long-term financial strategies.",
                    skills: ["Financial Management", "Investment Concepts", "Loan Concepts"],
                },
                {
                    id: "pixelnoid",
                    title: "Pixelnoid Dev Weekend Season 2 Mini Competition",
                    role: "Competition Participant",
                    issuer: "Pixelnoid",
                    date: "12 - 13 July 2026",
                    location: "Online",
                    certificateUrl: "https://drive.google.com/file/d/1P2H-MxzGuU85vRIbs5Q2-WsgDBr31V0y/view?usp=drive_link",
                    description: "Actively participated in the Dev Weekend mini competition, developing machine learning models and optimizing website frontend performance.",
                    skills: ["Machine Learning", "Laravel", "Tailwind"],
                }
            ]
        },
        footer: {
            rights: "All rights reserved.",
        },
    },
};

interface LanguageContextType {
    lang: Language;
    toggleLanguage: () => void;
    t: typeof translations.id;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Ubah default state ke "en"
    const [lang, setLang] = useState<Language>("en");

    const toggleLanguage = () => {
        setLang((prev) => (prev === "en" ? "id" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}