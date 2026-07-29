import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen font-sans selection:bg-gray-900 selection:text-white">

      {/* Navbar ditaruh paling atas agar fixed melayang di atas semua section */}
      <Navbar />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Me Section */}
      <About />

      {/* 3. Tech Stack Section */}
      <TechStack />

      {/* 4. Experience Section */}
      <Experience />

      {/* 5. Education Section */}
      <Education />

      {/* 6. Contact Section */}
      <Contact />

      {/* Footer */}


    </main>
  );
}