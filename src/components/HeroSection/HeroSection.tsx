import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Instagram } from "lucide-react";
import TechStackSection from "../TechStackSection/TechStackSection";
import logo from '../../assets/logo.webp';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection = ({ onOpenResume }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col pt-20 overflow-hidden bg-background">
      {/* Google Font Import for Elite Cursive Joining Style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .cursive-joining {
          font-family: 'Caveat', cursive;
        }
      `}</style>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E4FF]/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex-1 flex flex-col items-center text-center justify-center gap-8 py-16">
        
        {/* Available Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-foreground/10 bg-background/50 dark:bg-card/30 backdrop-blur-md shadow-sm -mt-14"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25e43b] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#19cb25]"></span>
          </span>
          <span className="text-xs font-medium text-muted-foreground">Available for work</span>
        </motion.div>

    {/* Combined Heading & Sub-heading with Zero Gap */}
        <motion.div
          className="flex flex-col items-center text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none m-0 p-0">
            <span className="text-foreground">I am </span>
            <span className="text-[#00E4FF]">Mahim Rana</span>
          </h1>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-2 p-0">
            As a <span className="text-[#00E4FF]">software engineer</span>, I build high-performance digital engines that help businesses attract more clients and scale effortlessly. Your idea deserves more than just a website; it needs a product that sells, scales, and wins.
          </p>
        </motion.div>
        
        {/* Circular Image with Glow */}
        <motion.div 
          className="relative my-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[#00E4FF] blur-[50px] opacity-20 rounded-full animate-pulse" />
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden glass-panel border-4 border-background shadow-2xl">
            <img 
              src={logo} 
              alt="Mahim Rana"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <button 
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="h-12 px-8 rounded-full bg-[#00E4FF] text-black font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,228,255,0.3)] hover:-translate-y-1"
          >
            View Work <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={onOpenResume}
            className="h-12 px-8 rounded-full glass-panel text-foreground border border-foreground/10 font-semibold flex items-center gap-2 hover:bg-foreground/10 transition-all hover:-translate-y-1"
          >
            Resume <Download className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Social Links with Real Destinations */}
        <motion.div 
          className="flex items-center gap-6 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/mahimrana219" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-[#00E4FF] transition-colors hover:-translate-y-1 transform duration-200"
          >
            <Linkedin className="w-6 h-6" />
          </a>

          {/* GitHub */}
          <a 
            href="https://github.com/mahimrana219" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub"
            className="text-muted-foreground hover:text-[#00E4FF] transition-colors hover:-translate-y-1 transform duration-200"
          >
            <Github className="w-6 h-6" />
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/mahimrana_develops?igsh=Y2s0N2Zpc2MzZnc1" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
            className="text-muted-foreground hover:text-[#00E4FF] transition-colors hover:-translate-y-1 transform duration-200"
          >
            <Instagram className="w-6 h-6" />
          </a>

          {/* Email */}
          <a 
            href="mailto:mahimrana219@gmail.com" 
            aria-label="Email"
            className="text-muted-foreground hover:text-[#00E4FF] transition-colors hover:-translate-y-1 transform duration-200"
          >
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      {/* TechStack Section */}
      <div className="w-full relative z-10 mt-auto">
        <TechStackSection />
      </div>
    </section>
  );
};