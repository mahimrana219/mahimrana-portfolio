import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Eye, X } from "lucide-react";

import { websites, screenshot, domain, type Website } from "./websitesData";

const Screenshot = ({ site }: { site: Website }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-foreground/10" />}
      <img
        src={screenshot(site.url)}
        alt={site.title}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
};

interface WebsiteShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebsiteShowcase = ({ isOpen, onClose }: WebsiteShowcaseProps) => {
  const [preview, setPreview] = useState<Website | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const openPreview = (site: Website) => {
    if (site.embeddable) {
      setIframeLoaded(false);
      setPreview(site);
    } else {
      window.open(site.url, "_blank", "noopener,noreferrer");
    }
  };

  // Close on Esc + lock background scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (preview) setPreview(null);
      else onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, preview, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            data-lenis-prevent
            className="absolute inset-0 sm:inset-6 overflow-y-auto sm:rounded-3xl bg-background border border-foreground/10"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-5 bg-background/80 backdrop-blur-md border-b border-foreground/10">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 hover:bg-foreground/10 text-sm font-medium shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </button>
              <h2 className="text-xl md:text-3xl font-bold tracking-tight text-right">
                <span className="text-neutral-900 dark:text-white">Website</span>{" "}
                <span className="text-gradient-primary">Development</span>
              </h2>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Live, custom-coded websites I've designed & developed — from corporate sites to full e-commerce stores.
              </p>

              {/* Website cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {websites.map((site, i) => (
                  <motion.div
                    key={site.id}
                    className="group rounded-2xl overflow-hidden border border-foreground/10 bg-foreground/[0.02] flex flex-col"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    {/* Browser frame */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-foreground/5 border-b border-foreground/10">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      <span className="ml-3 flex-1 truncate text-xs text-muted-foreground bg-foreground/5 rounded-md px-3 py-1">
                        {domain(site.url)}
                      </span>
                    </div>

                    <button
                      onClick={() => openPreview(site)}
                      className="relative block w-full aspect-[16/10] overflow-hidden bg-foreground/5 cursor-pointer"
                    >
                      <Screenshot site={site} />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                          <Eye className="w-4 h-4" /> Live Preview
                        </span>
                      </div>
                    </button>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold tracking-tight">{site.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">{site.description}</p>

                      <div className="flex gap-2 mt-5">
                        <button
                          onClick={() => openPreview(site)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-sm font-medium cursor-pointer"
                        >
                          <Eye className="w-4 h-4" /> Live Preview
                        </button>
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
                        >
                          Visit Site <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>
              </div>
            </div>
          </motion.div>

          {/* Live iframe preview */}
          <AnimatePresence>
            {preview && (
              <motion.div
                className="fixed inset-0 z-[1001] bg-black/80 flex items-center justify-center p-2 sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                }}
              >
                <motion.div
                  className="w-full h-full max-w-7xl flex flex-col rounded-2xl overflow-hidden bg-background border border-foreground/10"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3 px-4 py-3 bg-foreground/5 border-b border-foreground/10">
                    <span className="flex-1 truncate text-sm text-muted-foreground">{domain(preview.url)}</span>
                    <a
                      href={preview.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary"
                    >
                      Open in new tab <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setPreview(null)}
                      className="w-8 h-8 rounded-full hover:bg-foreground/10 flex items-center justify-center cursor-pointer"
                      aria-label="Close preview"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative flex-1 bg-white">
                    {!iframeLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-neutral-300 border-t-neutral-800 animate-spin" />
                      </div>
                    )}
                    <iframe
                      src={preview.url}
                      title={preview.title}
                      onLoad={() => setIframeLoaded(true)}
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebsiteShowcase;
