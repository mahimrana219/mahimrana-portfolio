import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, LayoutDashboard, X } from "lucide-react";
import { StoreAdmin } from "./StoreAdmin";
import { SalesAnalytics } from "./SalesAnalytics";
import { CustomerInsights } from "./CustomerInsights";

// To add a new dashboard, create a component and add it to this list.
const dashboards: {
  id: number;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  Component: ComponentType;
}[] = [
  {
    id: 1,
    title: "E-Commerce Admin Panel",
    tagline: "Your store's control room",
    description:
      "An admin panel for online store owners to run their business from one screen. It shows today's orders, visitors, monthly revenue and pending orders at a glance, so the owner knows exactly how the store is performing and what needs attention right now.",
    features: [
      "Live KPI cards — orders, visitors, revenue, pending orders",
      "Monthly order summary: online vs in-store",
      "Weekly revenue trend chart",
      "Top-selling products with low-stock alerts",
      "Recent orders table with status filters (Paid / Pending / Shipped / Refunded)",
    ],
    Component: StoreAdmin,
  },
  {
    id: 2,
    title: "Sales Analytics Dashboard",
    tagline: "What sold, and where",
    description:
      "A sales reporting dashboard that turns raw sales data into clear insights. Switch between 7 days, 30 days and 12 months to compare performance, see which channel brings the most sales and understand the gap between gross and net revenue after fees and refunds.",
    features: [
      "Period switcher (7D / 30D / 12M) — all data updates instantly",
      "Total sales, net sales, new customers & average order value with % change",
      "Sales by channel donut — Website, App, Marketplace, Social",
      "Gross vs net sales trend",
      "Top categories ranking",
    ],
    Component: SalesAnalytics,
  },
  {
    id: 3,
    title: "Customer Insights Dashboard",
    tagline: "Know your best customers",
    description:
      "A customer analysis dashboard that helps businesses understand who their best customers are and who is about to leave. It tracks store visits against orders, ranks top spenders and flags customers who haven't purchased recently so the team can win them back with offers.",
    features: [
      "Active customers, transactions, items ordered & repeat purchase rate",
      "Store visits vs orders — monthly trend",
      "Top customers by total spend",
      "Searchable customer table with last purchase date",
      "Automatic Active / Cooling / At-risk status for retention",
    ],
    Component: CustomerInsights,
  },
];

type Dashboard = (typeof dashboards)[number];

// Renders the dashboard at 1280px and scales it to the card width — a real live thumbnail
const ScaledPreview = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1280));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full aspect-[16/10] overflow-hidden bg-background">
      <div
        inert
        aria-hidden
        className="absolute top-0 left-0 w-[1280px] h-[800px] origin-top-left pointer-events-none"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
};

interface EcommerceShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EcommerceShowcase = ({ isOpen, onClose }: EcommerceShowcaseProps) => {
  const [active, setActive] = useState<Dashboard | null>(null);

  // Close on Esc + lock background scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (active) setActive(null);
      else onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, active, onClose]);

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
                <span className="text-neutral-900 dark:text-white">E-Commerce</span>{" "}
                <span className="text-gradient-primary">Systems</span>
              </h2>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
              <p className="text-muted-foreground mb-10 max-w-3xl leading-relaxed">
                Custom-built dashboards that turn store data into clear decisions — sales, orders, products and
                customers in one place. Every preview below is live and interactive: open a dashboard and try the
                filters, period switcher and search.
              </p>

              <div className="space-y-10">
                {dashboards.map((d, i) => (
                  <motion.div
                    key={d.id}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <button
                      onClick={() => setActive(d)}
                      className={`group lg:col-span-3 block rounded-2xl overflow-hidden border border-foreground/10 text-left cursor-pointer ${
                        i % 2 ? "lg:order-2" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-foreground/5 border-b border-foreground/10">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                      <div className="relative">
                        <ScaledPreview>
                          <d.Component />
                        </ScaledPreview>
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                            <LayoutDashboard className="w-4 h-4" /> Open Dashboard
                          </span>
                        </div>
                      </div>
                    </button>

                    <div className="lg:col-span-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{d.tagline}</p>
                      <h3 className="text-2xl font-bold tracking-tight mt-1">{d.title}</h3>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{d.description}</p>
                      <ul className="mt-4 space-y-2">
                        {d.features.map((f) => (
                          <li key={f} className="flex gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setActive(d)}
                        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Open Dashboard
                      </button>
                    </div>
                  </motion.div>
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

          {/* Full interactive dashboard */}
          <AnimatePresence>
            {active && (
              <motion.div
                className="fixed inset-0 z-[1001] bg-black/80 flex items-center justify-center p-2 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(null);
                }}
              >
                <motion.div
                  className="w-full h-full max-w-[1400px] flex flex-col rounded-2xl overflow-hidden bg-background border border-foreground/10"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3 px-4 py-3 bg-foreground/5 border-b border-foreground/10">
                    <button
                      onClick={() => setActive(null)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <span className="flex-1 truncate text-center text-sm font-semibold">{active.title}</span>
                    <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      Demo data
                    </span>
                    <button
                      onClick={() => setActive(null)}
                      className="w-8 h-8 rounded-full hover:bg-foreground/10 flex items-center justify-center cursor-pointer"
                      aria-label="Close dashboard"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div data-lenis-prevent className="flex-1 overflow-y-auto">
                    <active.Component />
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

export default EcommerceShowcase;
