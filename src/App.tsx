// import { useState, useEffect } from "react";
// import "./App.css";
// import Header from "./components/Header/Header";
// import { HeroSection } from "./components/HeroSection/HeroSection";
// import { AboutSection } from "./components/AboutSection/AboutSection";
// import { ServicesSection } from "./components/ServicesSection/ServicesSection";
// import { ProjectsSection } from "./components/ProjectsSection/ProjectsSection";
// import { EducationSection } from "./components/EducationSection/EducationSection";
// import { CareerTimeline } from "./components/CareerSection/CareerTimeline";
// import { ContactSection } from "./components/ContactSection/ContactSection";
// import    ResumeModal from "../src/components/Resume/Resumemodal"; // ResumeModal imported from your folder
// import ReactLenis from "lenis/react";
// import { Home, User, GraduationCap, Briefcase, FolderKanban, Send, MessageSquare, FileText } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Footer } from "./Footer";
// import Global from "./Global";
// import Reviews from "./Reviews";
// import AtsResume from "./components/Resume/Ats";

// function App() {
//   const [showDock, setShowDock] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isResumeModalOpen, setIsResumeModalOpen] = useState(false); // State for Resume Modal

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > 50) {
//         setShowDock(true); 
//       } else {
//         setShowDock(false); 
//       }
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   const scrollToSection = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   const dockItems = [
//     { icon: <Home size={22} />, label: "Home", onClick: () => scrollToSection("hero") },
//     { icon: <User size={22} />, label: "About", onClick: () => scrollToSection("about") },
//     { icon: <Briefcase size={22} />, label: "Career", onClick: () => scrollToSection("career") },
//     { icon: <FolderKanban size={22} />, label: "Projects", onClick: () => scrollToSection("projects") },
//     { icon: <GraduationCap size={22} />, label: "Education", onClick: () => scrollToSection("education") },
//     { icon: <MessageSquare size={22} />, label: "Testimonials", onClick: () => scrollToSection("testimonials") },
//     // Added Resume option right into the dock for instant access
//     { icon: <FileText size={22} />, label: "Resume", onClick: () => setIsResumeModalOpen(true) },
//     { icon: <Send size={22} />, label: "Contact", onClick: () => scrollToSection("contact") },
//   ];

//   return (
//     <div className="bg-transparent min-h-screen relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
//       <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
//         <Header onOpenResume={() => setIsResumeModalOpen(true)} />

//         <main className="w-full flex flex-col pt-10 border-none">
//           <HeroSection onOpenResume={() => setIsResumeModalOpen(true)} />
//           <AboutSection />
//           <ServicesSection />
//           <ProjectsSection />
//           <CareerTimeline />
//           <EducationSection />
//           <Global />
//           <ContactSection />
//           <Reviews />
//           <Footer />
//         </main>

//         {/* Resume Modal Component Call */}
//         <ResumeModal
//           isOpen={isResumeModalOpen}
//           onClose={() => setIsResumeModalOpen(false)}
//           pdfUrl="/resume/Mahim_Rana_Resume.pdf" 
//         />

//         <AtsResume />

//         <AnimatePresence>
//           {showDock && (
//             <motion.div
//               initial={{ y: 100, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 100, opacity: 0 }}
//               transition={{ duration: 0.4, ease: "easeInOut" }}
//               className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] glass-panel px-3 py-2 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-foreground/10 flex items-center gap-1"
//             >
//               {dockItems.map((item, i) => (
//                 <button
//                   key={i}
//                   onClick={item.onClick}
//                   className="p-2.5 sm:p-3 text-muted-foreground hover:text-primary hover:bg-foreground/5 rounded-full transition-colors relative group"
//                   title={item.label}
//                 >
//                   {item.icon}
//                 </button>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </ReactLenis>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { AboutSection } from "./components/AboutSection/AboutSection";
import { ServicesSection } from "./components/ServicesSection/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection/ProjectsSection";
import { EducationSection } from "./components/EducationSection/EducationSection";
import { CareerTimeline } from "./components/CareerSection/CareerTimeline";
import { ContactSection } from "./components/ContactSection/ContactSection";
import ResumeModal from "./components/Resume/Resumemodal"; // Check this path if the folder name is different
import ReactLenis from "lenis/react";
import { Home, User, GraduationCap, Briefcase, FolderKanban, Send, MessageSquare, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "./Footer";
import Global from "./Global";
import Reviews from "./Reviews";

// Import the resume PDF from assets (file name must match the one in the assets folder)
import pdfFile from "./assets/Mahim_Rana_Resume.pdf";

function App() {
  const [showDock, setShowDock] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setShowDock(true); 
      } else {
        setShowDock(false); 
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const dockItems = [
    { icon: <Home size={22} />, label: "Home", onClick: () => scrollToSection("hero") },
    { icon: <User size={22} />, label: "About", onClick: () => scrollToSection("about") },
    { icon: <Briefcase size={22} />, label: "Career", onClick: () => scrollToSection("career") },
    { icon: <FolderKanban size={22} />, label: "Projects", onClick: () => scrollToSection("projects") },
    { icon: <GraduationCap size={22} />, label: "Education", onClick: () => scrollToSection("education") },
    { icon: <MessageSquare size={22} />, label: "Testimonials", onClick: () => scrollToSection("testimonials") },
    { icon: <FileText size={22} />, label: "Resume", onClick: () => setIsResumeModalOpen(true) },
    { icon: <Send size={22} />, label: "Contact", onClick: () => scrollToSection("contact") },
  ];

  return (
    <div className="bg-transparent min-h-screen relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
        <Header onOpenResume={() => setIsResumeModalOpen(true)} />

        <main className="w-full flex flex-col pt-10 border-none">
          <HeroSection onOpenResume={() => setIsResumeModalOpen(true)} />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <CareerTimeline />
          <EducationSection />
          <Global />
          <ContactSection />
          <Reviews />
          <Footer />
        </main>

        {/* Resume Modal Component Call with Imported PDF File */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
          pdfUrl={pdfFile} 
        />

        <AnimatePresence>
          {showDock && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] glass-panel px-3 py-2 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-foreground/10 flex items-center gap-1"
            >
              {dockItems.map((item, i) => (
                <button
                  key={i}
                  onClick={item.onClick}
                  className="p-2.5 sm:p-3 text-muted-foreground hover:text-primary hover:bg-foreground/5 rounded-full transition-colors relative group cursor-pointer"
                  title={item.label}
                >
                  {item.icon}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </ReactLenis>
    </div>
  );
}

export default App;