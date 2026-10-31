
import { Github, Linkedin, Instagram, Mail, ArrowUp, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-background text-foreground pt-16 pb-10 relative overflow-hidden border-t border-foreground/5 [&_*]:[--primary:var(--color-primary,#00E4FF)]">
      
      {/* Background Watermark Big Text (small and behind the content so it doesn't overlap the text) */}
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* Top Section / Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              MAHIM <span className="text-[#00E4FF]">RANA</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              A passionate Software Engineer dedicated to building high-performance web and mobile applications, helping businesses scale, and sharing engineering knowledge with the community.
            </p>
          </div>

          {/* Column 2: Quick Links / Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-[#00E4FF] transition-colors">About Me</a>
              </li>
              <li>
                <a href="#education" className="hover:text-[#00E4FF] transition-colors">Academic Background</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#00E4FF] transition-colors">Expertise & Skills</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#00E4FF] transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Get in Touch with Icons */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#00E4FF] shrink-0" />
                <span>Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00E4FF] shrink-0" />
                <a href="mailto:mahimrana219@gmail.com" className="hover:text-[#00E4FF] transition-colors">
                  mahimrana219@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00E4FF] shrink-0" />
                <span className="font-medium text-foreground">+92 336 7389032</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar (Back to top, Copyright, Social Icons with Blue Theme) */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Back to Top Button */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-[#00E4FF] transition-colors cursor-pointer group  mb-14"
          >
            <span className="w-7 h-7 rounded-full border border-foreground/10 flex items-center justify-center group-hover:border-[#00E4FF] group-hover:bg-[#00E4FF]/10 transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
            Back To Top
          </button>

          {/* Copyright Text */}
          <div className="text-xs text-muted-foreground text-center  mb-14">
            {currentYear} © MAHIM RANA. All Rights Reserved.
          </div>

          {/* Social Icons (Theme Blue & Dark Minimal) */}
          <div className="flex items-center gap-3 mb-14">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mahimrana219"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-xl bg-foreground/90 text-background flex items-center justify-center hover:bg-[#00E4FF] hover:text-background transition-all shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/mahimrana219"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-xl bg-foreground/90 text-background flex items-center justify-center hover:bg-[#00E4FF] hover:text-background transition-all shadow-sm"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/mahimrana_develops?igsh=Y2s0N2Zpc2MzZnc1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-xl bg-foreground/90 text-background flex items-center justify-center hover:bg-[#00E4FF] hover:text-background transition-all shadow-sm"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Email */}
            <a
              href="mailto:mahimrana219@gmail.com"
              aria-label="Email"
              className="w-10 h-10 rounded-xl bg-foreground/90 text-background flex items-center justify-center hover:bg-[#00E4FF] hover:text-background transition-all shadow-sm"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};