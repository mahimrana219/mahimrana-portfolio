import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, ChevronLeft, ChevronRight, Download, ShieldCheck, Smartphone, X } from "lucide-react";

import canamIcon from "../../../assets/canam/icon.webp";
import canamHero from "../../../assets/canam/hero.webp";
import canamConvert1 from "../../../assets/canam/convert-1.webp";
import canamConvert2 from "../../../assets/canam/convert-2.webp";
import canamQuote from "../../../assets/canam/quote.webp";
import canamHistory from "../../../assets/canam/history.webp";
import canamUpload from "../../../assets/canam/upload.webp";
import canamAlerts from "../../../assets/canam/alerts.webp";
import canamProfile from "../../../assets/canam/profile.webp";

import innovatorsIcon from "../../../assets/innovators/icon.webp";
import innovatorsSplash from "../../../assets/innovators/splash.webp";
import innovatorsDashboard from "../../../assets/innovators/dashboard.webp";
import innovatorsMenu from "../../../assets/innovators/menu.webp";
import innovatorsAttendance from "../../../assets/innovators/attendance.webp";
import innovatorsResult from "../../../assets/innovators/result.webp";
import innovatorsQuizzes from "../../../assets/innovators/quizzes.webp";
import innovatorsLibrary from "../../../assets/innovators/library.webp";

// To add a new app, add another object to this list.
const apps = [
  {
    id: 2,
    name: "The Innovators",
    icon: innovatorsIcon,
    category: "Education · School Management",
    storeUrl: "https://play.google.com/store/apps/details?id=com.edspire.innovators",
    stats: [
      { value: "2 roles", label: "Students & Teachers" },
      { value: "18+", label: "School modules" },
      { value: "Live", label: "on Google Play" },
    ],
    description: [
      "A school management and learning app for Innovators School System & Science Academy, built on the Edspire platform. It brings a student's or teacher's entire school day into one app — homework, attendance, timetable, exam results, fee dues, circulars and announcements — connected live to the school's web portal.",
      "Students get a personalised dashboard with today's schedule and quick access to everything they need, while teachers can mark attendance, manage homework, review submissions, share resources and handle leave and complaints — all from their phone, with real-time notifications keeping everyone in sync.",
    ],
    features: [
      "Role-based app for students and teachers with a personalised dashboard",
      "Homework & assignments — create, submit and review",
      "Attendance calendar with present, absent, leave & late tracking",
      "Exam results, mark sheets, quizzes & datesheet",
      "Fee dues & invoices, circulars and consent forms",
      "Digital library, learning resources & lecture materials",
      "Leave requests, inbox messaging, events & news feed with real-time notifications",
    ],
    screens: [
      { src: innovatorsSplash, caption: "Splash screen" },
      { src: innovatorsDashboard, caption: "Student dashboard & quick access" },
      { src: innovatorsMenu, caption: "Side menu with all school modules" },
      { src: innovatorsAttendance, caption: "Attendance calendar" },
      { src: innovatorsResult, caption: "Exam result & performance summary" },
      { src: innovatorsQuizzes, caption: "Quizzes — active, upcoming & completed" },
      { src: innovatorsLibrary, caption: "Digital library" },
    ],
  },
  {
    id: 1,
    name: "CanAm Currency Exchange",
    icon: canamIcon,
    category: "Finance · Currency Exchange",
    storeUrl: "https://play.google.com/store/apps/details?id=com.canam",
    stats: [
      { value: "5K+", label: "Downloads" },
      { value: "Live", label: "on Google Play" },
      { value: "FINTRAC", label: "Regulated client" },
    ],
    description: [
      "A mobile trading app for CanAm Currency Exchange, a FINTRAC-registered currency exchange business in Canada. The app lets customers check live USD ↔ CAD rates, get an instant quote, book trades and track every transfer — all from their phone, without calling or visiting an office.",
      "The focus was on trust and speed: live rates shown to 4 decimal points, a simple step-by-step booking flow, secure document upload for verification, and rate alerts that notify customers the moment their target rate is reached.",
    ],
    features: [
      "Live exchange rates for USD, CAD, EUR, GBP & MXN with a currency converter",
      "Instant quotes and electronic trade booking with confirmation ID",
      "Trading history with booked, pending & completed trades",
      "Rate alerts — get notified when a target rate is hit",
      "Take a photo / upload documents straight from the camera",
      "Real-time market trends & historical pricing",
      "Customer profile, transactions & in-app support contact",
    ],
    screens: [
      { src: canamHero, caption: "Simple transfers, best rates" },
      { src: canamConvert1, caption: "Currency converter — 5+ currencies" },
      { src: canamConvert2, caption: "Buy / sell amount calculator" },
      { src: canamQuote, caption: "Quick quote & electronic trade booking" },
      { src: canamHistory, caption: "Trading history & market trends" },
      { src: canamUpload, caption: "Take a photo & upload documents" },
      { src: canamAlerts, caption: "Price alerts on target rates" },
      { src: canamProfile, caption: "Profile & account menu" },
    ],
  },
];

type App = (typeof apps)[number];

interface MobileShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileShowcase = ({ isOpen, onClose }: MobileShowcaseProps) => {
  const [viewer, setViewer] = useState<{ app: App; index: number } | null>(null);

  const step = (dir: number) =>
    setViewer((v) => (v ? { ...v, index: (v.index + dir + v.app.screens.length) % v.app.screens.length } : v));

  // Close on Esc, arrow keys for next/prev + lock background scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (viewer && e.key === "ArrowRight") step(1);
      if (viewer && e.key === "ArrowLeft") step(-1);
      if (e.key !== "Escape") return;
      if (viewer) setViewer(null);
      else onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  });

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
                <span className="text-neutral-900 dark:text-white">Mobile</span>{" "}
                <span className="text-gradient-primary">Applications</span>
              </h2>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10 space-y-20">
              {apps.map((app) => (
                <motion.section
                  key={app.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* App intro */}
                  <div className="flex flex-wrap items-center gap-5">
                    <img src={app.icon} alt={`${app.name} icon`} className="w-20 h-20 rounded-2xl shadow-lg border border-foreground/10" />
                    <div className="flex-1 min-w-[220px]">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary inline-flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" /> {app.category}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">{app.name}</h3>
                    </div>
                    <a
                      href={app.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
                    >
                      <Download className="w-4 h-4" /> Get it on Google Play <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                    <div className="lg:col-span-3">
                      {app.description.map((p) => (
                        <p key={p.slice(0, 20)} className="text-muted-foreground leading-relaxed mb-3">
                          {p}
                        </p>
                      ))}
                      <div className="grid grid-cols-3 gap-3 mt-5">
                        {app.stats.map((s) => (
                          <div key={s.label} className="rounded-xl bg-foreground/5 p-3">
                            <p className="text-lg md:text-xl font-bold">{s.value}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-2 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
                      <h4 className="font-bold mb-4 inline-flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" /> Key features
                      </h4>
                      <ul className="space-y-2.5">
                        {app.features.map((f) => (
                          <li key={f} className="flex gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Screens */}
                  <h4 className="text-2xl font-bold tracking-tight mt-14 mb-6">Screens</h4>
                  <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
                    {app.screens.map((s, i) => (
                      <button
                        key={s.caption}
                        onClick={() => setViewer({ app, index: i })}
                        className="group shrink-0 w-[180px] sm:w-[210px] snap-start text-left cursor-pointer"
                      >
                        <div className="rounded-[1.75rem] p-1.5 bg-neutral-900 shadow-xl">
                          <img
                            src={s.src}
                            alt={s.caption}
                            loading="lazy"
                            decoding="async"
                            className="w-full aspect-[1/2] object-cover rounded-[1.4rem] transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 px-1">{s.caption}</p>
                      </button>
                    ))}
                  </div>
                </motion.section>
              ))}

              <div className="flex justify-center">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>
              </div>
            </div>
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {viewer && (
              <motion.div
                className="fixed inset-0 z-[1001] bg-black/90 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setViewer(null);
                }}
              >
                <div className="flex items-center justify-between gap-4 px-4 py-3 text-white" onClick={(e) => e.stopPropagation()}>
                  <span className="text-sm opacity-80 truncate">
                    {viewer.index + 1} / {viewer.app.screens.length} · {viewer.app.screens[viewer.index].caption}
                  </span>
                  <button
                    onClick={() => setViewer(null)}
                    className="w-9 h-9 rounded-full hover:bg-white/10 grid place-items-center cursor-pointer shrink-0"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative flex-1 min-h-0 flex items-center justify-center px-14 pb-6">
                  <img
                    src={viewer.app.screens[viewer.index].src}
                    alt={viewer.app.screens[viewer.index].caption}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      step(-1);
                    }}
                    className="absolute left-3 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      step(1);
                    }}
                    className="absolute right-3 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileShowcase;
