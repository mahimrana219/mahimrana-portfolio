import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import aiAgentImg from "../../assets/aiagent.webp";
import webImg from "../../assets/web.webp";
import ecomImg from "../../assets/ecom.webp";
import sasImg from "../../assets/sas.webp";
import mobileImg from "../../assets/mobile.webp";
import { preloadWebsiteScreenshots } from "../Portfolio/Website/websitesData";

// Showcase popups are split into their own chunks so the first page load stays light
const loaders = {
  websites: () => import("../Portfolio/Website/Websitedevelopment"),
  ecommerce: () => import("../Portfolio/Ecommerce/EcommerceShowcase"),
  saas: () => import("../Portfolio/Saas/SaasShowcase"),
  ai: () => import("../Portfolio/AI/AiShowcase"),
  mobile: () => import("../Portfolio/Mobile/MobileShowcase"),
};
const WebsiteShowcase = lazy(loaders.websites);
const EcommerceShowcase = lazy(loaders.ecommerce);
const SaasShowcase = lazy(loaders.saas);
const AiShowcase = lazy(loaders.ai);
const MobileShowcase = lazy(loaders.mobile);

export const ProjectsSection = () => {
  const [isWebsitesOpen, setIsWebsitesOpen] = useState(false);
  const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);
  const [isSaasOpen, setIsSaasOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Open a showcase from elsewhere on the page (e.g. the Services "See My Work" button)
  useEffect(() => {
    const openers: Record<string, () => void> = {
      websites: () => setIsWebsitesOpen(true),
      ecommerce: () => setIsEcommerceOpen(true),
      saas: () => setIsSaasOpen(true),
      ai: () => setIsAiOpen(true),
      mobile: () => setIsMobileOpen(true),
    };
    const onOpen = (e: Event) => openers[(e as CustomEvent<string>).detail]?.();
    window.addEventListener("open-showcase", onOpen);
    return () => window.removeEventListener("open-showcase", onOpen);
  }, []);

  // Mount each popup the first time it's opened, then keep it mounted so the close animation still plays
  const opened = useRef({ websites: false, ecommerce: false, saas: false, ai: false, mobile: false });
  if (isWebsitesOpen) opened.current.websites = true;
  if (isEcommerceOpen) opened.current.ecommerce = true;
  if (isSaasOpen) opened.current.saas = true;
  if (isAiOpen) opened.current.ai = true;
  if (isMobileOpen) opened.current.mobile = true;

  // After page load: pre-cache website screenshots and prefetch the popup code so clicks open instantly
  useEffect(() => {
    const t = setTimeout(() => {
      preloadWebsiteScreenshots();
      Object.values(loaders).forEach((load) => load());
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Website Development",
      subtitle: "High-converting modern web design & digital platforms built for performance and scale.",
      link: "#",
      image: webImg,
    },
    {
      id: 2,
      title: "E-Commerce Systems",
      subtitle: "Scalable online stores and seamless checkout architectures that drive real revenue.",
      link: "#",
      image: ecomImg,
    },
    {
      id: 3,
      title: "Admin Portals & SaaS",
      subtitle: "Robust backend dashboards and enterprise control panels with full role-based access.",
      link: "#",
      image: sasImg,
    },
    {
      id: 4,
      title: "AI Automation & Chatbots",
      subtitle: "Smart automated workflows and intelligent conversational agents powered by modern LLMs.",
      link: "#",
      image: aiAgentImg,
    },
    {
      id: 5,
      title: "Mobile Applications",
      subtitle: "Cross-platform mobile apps with high-performance UI and smooth native-like experience across iOS and Android.",
      link: "#",
      image: mobileImg,
    },
  ];

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center md:text-left">
          <span className="text-neutral-900 dark:text-white">Selected</span> <span className="text-gradient-primary">Works</span>
        </h2>
        <p className="text-muted-foreground text-center md:text-left max-w-2xl">
          A showcase of complex systems, elegant interfaces, and scalable applications I've engineered.
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">

        {/* Row 1: Website Dev | E-Commerce */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.slice(0, 2).map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              onClick={(e) => {
                if (project.id === 1) {
                  e.preventDefault();
                  setIsWebsitesOpen(true);
                } else if (project.id === 2) {
                  e.preventDefault();
                  setIsEcommerceOpen(true);
                }
              }}
              className="w-full block group relative overflow-hidden rounded-2xl"
              style={{ minHeight: "420px" }}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/70 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 opacity-0 group-hover:opacity-100 mt-1 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Row 2: SaaS | AI Agent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.slice(2, 4).map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              onClick={(e) => {
                if (project.id === 3) {
                  e.preventDefault();
                  setIsSaasOpen(true);
                } else if (project.id === 4) {
                  e.preventDefault();
                  setIsAiOpen(true);
                }
              }}
              className="w-full block group relative overflow-hidden rounded-2xl"
              style={{ minHeight: "420px" }}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/70 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 opacity-0 group-hover:opacity-100 mt-1 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Row 3: Mobile — full width */}
        <motion.a
          href={projects[4].link}
          onClick={(e) => {
            e.preventDefault();
            setIsMobileOpen(true);
          }}
          className="block group relative overflow-hidden rounded-2xl flex-1"
          style={{ minHeight: "380px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src={projects[4].image}
            alt={projects[4].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {projects[4].title}
                </h3>
                <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    {projects[4].subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-white/90 underline underline-offset-2">
                    See More <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </motion.a>

      </div>

      <Suspense fallback={null}>
        {opened.current.websites && <WebsiteShowcase isOpen={isWebsitesOpen} onClose={() => setIsWebsitesOpen(false)} />}
        {opened.current.ecommerce && <EcommerceShowcase isOpen={isEcommerceOpen} onClose={() => setIsEcommerceOpen(false)} />}
        {opened.current.saas && <SaasShowcase isOpen={isSaasOpen} onClose={() => setIsSaasOpen(false)} />}
        {opened.current.ai && <AiShowcase isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />}
        {opened.current.mobile && <MobileShowcase isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />}
      </Suspense>
    </section>
  );
};

export default ProjectsSection;