import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  ConciergeBell,
  Globe,
  Maximize2,
  ShieldCheck,
  Sparkles,
  UserCog,
  X,
} from "lucide-react";

// Screenshots: src/assets/luxurystay/<name>.webp (full) + <name>-thumb.webp (card)
const files = import.meta.glob("../../../assets/luxurystay/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const img = (name: string) => files[`../../../assets/luxurystay/${name}.webp`];
const thumb = (name: string) => files[`../../../assets/luxurystay/${name}-thumb.webp`];

const gallery = [
  {
    tab: "Guest Website",
    shots: [
      { name: "home-hero", caption: "Home — hero with live offer countdown & promo bar" },
      { name: "home-about", caption: "About section with highlights & stats" },
      { name: "home-amenities", caption: "Amenities & special services" },
      { name: "home-policies", caption: "Stay policies & commitments" },
      { name: "home-faq", caption: "FAQ accordion (concierge desk)" },
      { name: "home-feedback", caption: "Guest feedback form & live reviews" },
      { name: "home-contact", caption: "Contact form with Google Maps" },
      { name: "guest-register", caption: "Guest registration + Google sign-up" },
      { name: "guest-login", caption: "Guest login + Continue with Google" },
      { name: "guest-profile", caption: "Guest profile & preferences" },
      { name: "guest-password", caption: "Change password" },
      { name: "guest-bookings", caption: "My bookings with services & cancel option" },
      { name: "guest-invoices", caption: "My invoices — room, services, tax, total" },
    ],
  },
  {
    tab: "Admin Panel",
    shots: [
      { name: "admin-dashboard", caption: "Enterprise dashboard — revenue, occupancy, KPIs" },
      { name: "admin-guests", caption: "Guest users directory" },
      { name: "admin-add-room", caption: "Add new room with images" },
      { name: "admin-rooms", caption: "Room inventory with live status" },
      { name: "admin-staff", caption: "Staff directory with activate / deactivate" },
      { name: "admin-add-service", caption: "Add a new hotel service" },
      { name: "admin-services", caption: "All additional services" },
      { name: "admin-bookings", caption: "Bookings registry with status filters" },
      { name: "admin-feedback", caption: "Guest feedback management" },
      { name: "admin-contacts", caption: "Contact message inbox" },
      { name: "admin-maintenance", caption: "Maintenance & issue tracker" },
      { name: "admin-settings-general", caption: "System settings — general rules" },
      { name: "admin-settings-pricing", caption: "System settings — tax & cancellation policy" },
      { name: "admin-profile", caption: "Admin account profile" },
      { name: "admin-password", caption: "Admin change password" },
    ],
  },
  {
    tab: "Staff Portals",
    shots: [
      { name: "staff-login", caption: "Staff login — role-based, blocks deactivated accounts" },
      { name: "reception-dashboard", caption: "Receptionist dashboard" },
      { name: "reception-availability", caption: "Room availability lookup by date" },
      { name: "reception-rooms", caption: "Available rooms catalog for walk-in booking" },
      { name: "reception-walkin", caption: "Walk-in guest reservation with add-on services" },
      { name: "reception-invoices", caption: "Billing & invoices ledger with search" },
      { name: "housekeeping-dashboard", caption: "Housekeeping — cleaning tasks, mark room available" },
      { name: "housekeeping-maintenance", caption: "Housekeeping — report maintenance issue" },
      { name: "manager-dashboard", caption: "Manager dashboard — operations overview" },
      { name: "manager-services", caption: "Manager — hotel services directory" },
    ],
  },
];

type Tab = (typeof gallery)[number]["tab"];

const portals = [
  {
    icon: Globe,
    title: "Guest Website",
    points: [
      "Modern hotel website with offer countdown, amenities, policies, FAQ & Google Maps",
      "Register / login with email or Google",
      "Book rooms with add-on services (food, transport, laundry…)",
      "My Bookings — check-in/out dates, services, cancel booking",
      "My Invoices — room charges, services, tax & total",
      "Leave reviews that appear live on the website",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Admin Panel",
    points: [
      "Dashboard with revenue, occupancy rate, bookings, guests & maintenance KPIs",
      "Rooms — add rooms with images, price, capacity; track available / occupied / maintenance",
      "Staff — add staff, assign roles, activate or deactivate accounts",
      "Services — create, edit & delete paid hotel services",
      "Bookings registry filtered by Pending, Confirmed, Check-in, Check-out, Cancelled",
      "Feedback, contact inbox, maintenance tracker & system settings (tax %, policies, check-in times)",
    ],
  },
  {
    icon: ConciergeBell,
    title: "Receptionist Portal",
    points: [
      "Check room availability for any date range",
      "Walk-in reservations with guest details, preferences & add-on services",
      "Billing & invoice ledger with payment method and search",
      "Guest list, rooms and services at a glance",
    ],
  },
  {
    icon: Sparkles,
    title: "Housekeeping Portal",
    points: [
      "Live list of rooms that need cleaning",
      "One click to mark a room as available again",
      "Report maintenance issues (AC, plumbing, smart lock…) straight to admin",
    ],
  },
  {
    icon: UserCog,
    title: "Manager Portal",
    points: [
      "Operations overview — bookings, guests, revenue, occupancy",
      "View rooms, staff, services, feedback & guest contacts",
      "Report maintenance issues",
    ],
  },
];

const techStack = [
  { name: "MongoDB", role: "Database", color: "#10b981" },
  { name: "Express.js", role: "REST API", color: "#64748b" },
  { name: "React", role: "Frontend", color: "#38bdf8" },
  { name: "Node.js", role: "Backend", color: "#22c55e" },
];

const stats = [
  { value: "5", label: "Role-based portals" },
  { value: "38+", label: "Screens built" },
  { value: "End-to-end", label: "Booking → invoice flow" },
];

interface SaasShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaasShowcase = ({ isOpen, onClose }: SaasShowcaseProps) => {
  const [tab, setTab] = useState<Tab>("Guest Website");
  const [viewer, setViewer] = useState<number | null>(null);

  const shots = gallery.find((g) => g.tab === tab)!.shots;
  const step = (dir: number) => setViewer((v) => (v === null ? v : (v + dir + shots.length) % shots.length));

  // Close on Esc, arrow keys for next/prev + lock background scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (viewer !== null && e.key === "ArrowRight") step(1);
      if (viewer !== null && e.key === "ArrowLeft") step(-1);
      if (e.key !== "Escape") return;
      if (viewer !== null) setViewer(null);
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
                <span className="text-neutral-900 dark:text-white">Admin Portals</span>{" "}
                <span className="text-gradient-primary">& SaaS</span>
              </h2>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
              {/* Project intro */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Full-Stack MERN Project</p>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
                    Luxury Stay — <span className="text-gradient-primary">Hotel Management System</span>
                  </h3>
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    A complete, end-to-end hotel management platform I designed and developed from scratch. It
                    combines a modern public website where guests can explore rooms, sign up and book their stay, with
                    a powerful back-office that runs the entire hotel — rooms, bookings, billing, staff, services,
                    housekeeping and maintenance.
                  </p>
                  <p className="text-muted-foreground mt-3 leading-relaxed">
                    Every user sees only what they need: guests, admins, receptionists, housekeeping staff and managers
                    each get their own secure, role-based portal. A booking made on the website flows automatically
                    through check-in, housekeeping and invoicing — with tax, add-on services and cancellation rules
                    applied from the admin settings.
                  </p>
                  <p className="text-muted-foreground mt-3 leading-relaxed">
                    Built on the MERN stack: a React frontend for the website and all portals, a Node.js + Express REST
                    API handling authentication, role permissions, bookings and billing logic, and MongoDB storing
                    rooms, guests, staff, bookings, invoices and maintenance tickets.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {techStack.map((t) => (
                      <span
                        key={t.name}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] text-sm"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                        <span className="font-semibold">{t.name}</span>
                        <span className="text-xs text-muted-foreground">{t.role}</span>
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {stats.map((s) => (
                      <div key={s.label} className="rounded-xl bg-foreground/5 p-3">
                        <p className="text-lg md:text-xl font-bold">{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setTab("Admin Panel");
                    setViewer(0);
                  }}
                  className="group relative rounded-2xl overflow-hidden border border-foreground/10 cursor-pointer"
                >
                  <img
                    src={thumb("admin-dashboard")}
                    alt="Luxury Stay admin dashboard"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-medium">
                    <Maximize2 className="w-3.5 h-3.5" /> View full size
                  </span>
                </button>
              </div>

              {/* Portals & features */}
              <h4 className="text-2xl font-bold tracking-tight mt-16 mb-6 flex items-center gap-2">
                <BedDouble className="w-6 h-6 text-primary" /> What's inside
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portals.map(({ icon: Icon, title, points }) => (
                  <div key={title} className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
                        <Icon className="w-5 h-5" />
                      </span>
                      <h5 className="font-bold">{title}</h5>
                    </div>
                    <ul className="space-y-2">
                      {points.map((p) => (
                        <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Screenshot gallery */}
              <div className="flex flex-wrap items-end justify-between gap-4 mt-16 mb-6">
                <h4 className="text-2xl font-bold tracking-tight">Screens</h4>
                <div className="inline-flex p-1 rounded-full bg-foreground/5">
                  {gallery.map((g) => (
                    <button
                      key={g.tab}
                      onClick={() => setTab(g.tab)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        tab === g.tab ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {g.tab} <span className="opacity-60">({g.shots.length})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shots.map((s, i) => (
                  <motion.button
                    key={s.name}
                    onClick={() => setViewer(i)}
                    className="group text-left rounded-xl overflow-hidden border border-foreground/10 bg-foreground/[0.02] cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.04 }}
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-foreground/5">
                      <img
                        src={thumb(s.name)}
                        alt={s.caption}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="px-3 py-2.5 text-xs text-muted-foreground">{s.caption}</p>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center mt-14">
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
            {viewer !== null && (
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
                    {viewer + 1} / {shots.length} · {shots[viewer].caption}
                  </span>
                  <button
                    onClick={() => setViewer(null)}
                    className="w-9 h-9 rounded-full hover:bg-white/10 grid place-items-center cursor-pointer shrink-0"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16 pb-6">
                  <img
                    key={shots[viewer].name}
                    src={img(shots[viewer].name)}
                    alt={shots[viewer].caption}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      step(-1);
                    }}
                    className="absolute left-2 sm:left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      step(1);
                    }}
                    className="absolute right-2 sm:right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center cursor-pointer"
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

export default SaasShowcase;
