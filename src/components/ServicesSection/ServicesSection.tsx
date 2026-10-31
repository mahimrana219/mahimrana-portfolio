import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Globe, ShoppingCart, LayoutDashboard, Bot, Smartphone, Server, ArrowRight, X, Check, MessageCircle, Handshake, FolderOpen } from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Website Development",
    showcase: "websites",
    description: "From landing pages to full web platforms — fast, responsive, and built to convert visitors into customers.",
    stacks: ["React", "Next.js", "Tailwind", "Framer Motion"],
    number: "01",
    details: {
      heading: "Why Your Business Needs a Professional Website",
      why: "Your website is your #1 salesperson — working 24/7. A slow, outdated, or poorly designed website loses customers before they even read your offer. I build websites that load fast, look stunning, and turn visitors into paying clients.",
      benefits: [
        "First impression that builds instant trust",
        "Mobile-first design for every screen size",
        "SEO-ready structure to rank on Google",
        "Fast load times that reduce bounce rate",
        "Clear call-to-actions that drive conversions",
        "Scalable — grows as your business grows",
      ],
      process: ["Discovery & Planning", "UI/UX Design", "Development", "Testing", "Launch"],
    },
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "E-Commerce Systems",
    showcase: "ecommerce",
    description: "Complete online stores with product management, payments, and order tracking — built to scale.",
    stacks: ["React", "Node.js", "Express", "MongoDB"],
    number: "02",
    details: {
      heading: "Sell More With a Powerful Online Store",
      why: "An e-commerce system is more than just a cart. It's your entire sales engine. I build stores that are fast, secure, easy to manage, and designed to maximize every sale — from product discovery to payment completion.",
      benefits: [
        "Seamless checkout that reduces cart abandonment",
        "Secure payment gateway integration",
        "Real-time inventory and order management",
        "Mobile shopping experience that converts",
        "Discount codes, coupons, and promotions",
        "Analytics to track sales and growth",
      ],
      process: ["Store Planning", "Product Setup", "Payment Integration", "Testing", "Launch"],
    },
  },
  {
    icon: <LayoutDashboard className="w-8 h-8" />,
    title: "Admin Portals & SaaS",
    showcase: "saas",
    description: "Custom dashboards, multi-role admin panels, and full SaaS platforms built for real business operations.",
    stacks: ["React", "Node.js", "MongoDB", "REST APIs"],
    number: "03",
    details: {
      heading: "Run Your Business Smarter With Custom Dashboards",
      why: "Generic software never fits your exact workflow. A custom admin portal or SaaS platform gives you full control — built exactly the way your team works. No paying for features you don't need, no missing features you do.",
      benefits: [
        "Role-based access for teams of any size",
        "Real-time data and reporting dashboards",
        "Custom workflows built for your process",
        "Multi-tenant SaaS architecture",
        "API integrations with your existing tools",
        "Scalable infrastructure that grows with you",
      ],
      process: ["Requirements Analysis", "Architecture Design", "Development", "QA Testing", "Deployment"],
    },
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "AI Automation",
    showcase: "ai",
    description: "Smart workflows and AI-powered tools that save time, reduce manual work, and run your business on autopilot.",
    stacks: ["n8n", "Python", "AI Chatbots", "Webhooks"],
    number: "04",
    details: {
      heading: "Let AI Do the Heavy Lifting For Your Business",
      why: "Time is your most valuable resource. AI automation eliminates repetitive tasks, reduces human error, and lets your team focus on what actually matters. From chatbots to data pipelines — I build systems that work while you sleep.",
      benefits: [
        "Automate repetitive tasks and save hours daily",
        "AI chatbots for 24/7 customer support",
        "Smart data processing and reporting",
        "Workflow automation across your tools",
        "Lead generation and follow-up on autopilot",
        "Custom AI models trained on your data",
      ],
      process: ["Process Audit", "Automation Design", "AI Integration", "Testing", "Go Live"],
    },
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile Applications",
    showcase: "mobile",
    description: "Cross-platform iOS and Android apps with smooth UX, offline support, and native-level performance.",
    stacks: ["Flutter", "Firebase", "Supabase"],
    number: "05",
    details: {
      heading: "Put Your Business in Your Customers' Pockets",
      why: "Mobile is where your customers spend most of their time. A well-built app builds loyalty, increases engagement, and opens a direct channel to your audience. I build apps that feel native, run fast, and keep users coming back.",
      benefits: [
        "Works on both iOS and Android — one codebase",
        "Offline support for uninterrupted experience",
        "Push notifications to re-engage users",
        "Smooth animations and native-feel UI",
        "App Store and Play Store submission",
        "Ongoing updates and maintenance",
      ],
      process: ["Wireframing", "UI Design", "Development", "App Store Review", "Launch"],
    },
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Systems & API Architecture",
    description: "Scalable backend systems, microservices, and API integrations built to handle real enterprise-level loads.",
    stacks: ["Node.js", "Express", "REST APIs", "MySQL"],
    number: "06",
    details: {
      heading: "Infrastructure That Never Lets You Down",
      why: "A great product is only as good as its backend. Slow APIs, crashing servers, and poor architecture kill user experience. I design systems built for performance, reliability, and scale — so your product never breaks under pressure.",
      benefits: [
        "APIs that handle millions of requests",
        "Microservices for independent scaling",
        "99.9% uptime with proper infrastructure",
        "Secure authentication and data protection",
        "Third-party integrations done right",
        "Monitoring, logging, and alerting built in",
      ],
      process: ["System Design", "API Development", "Infrastructure Setup", "Load Testing", "Deployment"],
    },
  },
];

const floatVariants: Variants = {
  animate: {
    y: [0, -6, 0],
    rotate: [0, 8, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export const ServicesSection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="services" className="max-w-5xl mx-auto px-6 py-24 relative">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#00E1FC]/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
        className="mb-20 text-center relative z-10"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4"
        >
          Services
        </motion.p>
        <h2
          className="text-3xl md:text-5xl font-bold tracking-tight mb-5 bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(to right, #00E1FC, #3b82f6)" }}
        >
          What I Do My Best For You
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
          End-to-end digital solutions — from your first idea to a fully shipped, revenue-generating product.
        </p>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-[2px] mx-auto mt-6 rounded-full"
          style={{ background: "linear-gradient(to right, #00E1FC, #3b82f6)" }}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="glass-panel p-8 rounded-[2rem] border border-foreground/10 hover:border-[#00E1FC]/50 transition-all duration-500 group relative overflow-hidden cursor-pointer"
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            onClick={() => setSelected(i)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E1FC]/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[#00E1FC]/15" />
            <div className="absolute top-6 right-8 text-5xl font-black text-foreground/5 group-hover:text-[#00E1FC]/10 transition-colors duration-500 select-none">
              {service.number}
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <motion.div
                className="mb-6 p-4 w-max rounded-2xl glass-panel border border-[#00E1FC]/20 bg-[#00E1FC]/10 text-foreground dark:text-[#00E1FC]"
                variants={floatVariants}
                animate="animate"
                whileHover={{ scale: 1.15 }}
              >
                {service.icon}
              </motion.div>

              <h3 className="text-2xl font-bold mb-3 text-foreground tracking-tight group-hover:text-[#00E1FC] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-grow mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.stacks.map((stack, j) => (
                  <span
                    key={j}
                    className="text-xs font-semibold px-3 py-1 rounded-full border border-[#00E1FC]/30 text-[#00E1FC]"
                    style={{ backgroundColor: "rgba(0, 225, 252, 0.08)" }}
                  >
                    {stack}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-[#00E1FC]/40 text-[#00E1FC] group-hover:bg-[#00E1FC] group-hover:text-black transition-all duration-300"
                  style={{ backgroundColor: "rgba(0, 225, 252, 0.08)" }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelected(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 180 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[85vh] flex flex-col glass-panel rounded-3xl border border-[#00E1FC]/30 bg-background/98 dark:bg-card/98 backdrop-blur-xl shadow-[0_0_60px_rgba(0,225,252,0.15)]"
            >
              {/* Sticky header */}
              <div className="sticky top-0 z-10 bg-background/98 dark:bg-card/98 backdrop-blur-xl px-8 pt-6 pb-4 border-b border-foreground/10 shrink-0 flex items-center gap-4 rounded-t-3xl">
                <div className="p-3 rounded-2xl border border-[#00E1FC]/20 bg-[#00E1FC]/10 text-foreground dark:text-[#00E1FC] shrink-0">
                  {services[selected].icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-0.5">
                    {services[selected].number}
                  </p>
                  <h3 className="text-xl font-bold text-foreground truncate">
                    {services[selected].title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/15 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all shrink-0 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Close</span>
                </button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6">

                <h4
                  className="text-lg font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(to right, #00E1FC, #3b82f6)" }}
                >
                  {services[selected].details.heading}
                </h4>

                <p className="text-muted-foreground leading-relaxed text-sm">
                  {services[selected].details.why}
                </p>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">What You Get:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {services[selected].details.benefits.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 p-1 rounded-full bg-[#00E1FC]/10 border border-[#00E1FC]/30 shrink-0">
                          <Check className="w-3 h-3 text-[#00E1FC]" />
                        </div>
                        <span className="text-sm text-foreground/70">{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">My Process:</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {services[selected].details.process.map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#00E1FC]/30 text-foreground dark:text-[#00E1FC]"
                          style={{ backgroundColor: "rgba(0, 225, 252, 0.08)" }}
                        >
                          {i + 1}. {step}
                        </span>
                        {i < services[selected].details.process.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-[#00E1FC]/20 bg-[#00E1FC]/5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-[#00E1FC]/10 border border-[#00E1FC]/20">
                      <MessageCircle className="w-4 h-4 text-[#00E1FC]" />
                    </div>
                    <p className="text-sm font-bold text-foreground">Can't Fully Explain Your Idea?</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No problem at all. You don't need a perfect brief or technical knowledge. Just share what you have in mind — even a rough idea — and I'll ask the right questions to understand exactly what you need. Together, we'll turn your vision into a clear plan and then into a real product.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-[#00E1FC]/20 bg-[#00E1FC]/5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-[#00E1FC]/10 border border-[#00E1FC]/20">
                      <Handshake className="w-4 h-4 text-[#00E1FC]" />
                    </div>
                    <p className="text-sm font-bold text-foreground">I'm With You After Launch Too</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    My work doesn't stop at delivery. After launch, I stay available for bug fixes, new features, performance improvements, and long-term maintenance. You'll always have someone who knows your product inside out — ready to help whenever you need it.
                  </p>
                </div>

                {"showcase" in services[selected] && (
                  <button
                    onClick={() => {
                      const key = (services[selected] as { showcase: string }).showcase;
                      setSelected(null);
                      window.dispatchEvent(new CustomEvent("open-showcase", { detail: key }));
                    }}
                    className="w-full h-12 rounded-full font-semibold flex items-center justify-center gap-2 border border-[#00E1FC]/40 text-[#00E1FC] hover:bg-[#00E1FC]/10 transition-all cursor-pointer"
                  >
                    <FolderOpen className="w-4 h-4" /> See My Work
                  </button>
                )}

                <a
                  href="#contact"
                  onClick={() => setSelected(null)}
                  className="w-full h-12 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-1 text-black shadow-[0_0_25px_rgba(0,225,252,0.35)] cursor-pointer"
                  style={{ background: "linear-gradient(to right, #00E1FC, #3b82f6)" }}
                >
                  Let's Build This Together <ArrowRight className="w-4 h-4" />
                </a>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};