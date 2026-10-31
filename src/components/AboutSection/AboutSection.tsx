import { motion } from "framer-motion";
import { Code2, Globe2, Layout, Users, Target, Zap, ShieldCheck, Cpu, HeartHandshake } from "lucide-react";

const stats = [
  { icon: <Layout className="w-6 h-6" style={{ color: "#00E4FF" }} />, label: "Years Experience", value: "4+" },
  { icon: <Code2 className="w-6 h-6" style={{ color: "#00E4FF" }} />, label: "Projects Completed", value: "55+" },
  { icon: <Users className="w-6 h-6" style={{ color: "#00E4FF" }} />, label: "Happy Clients", value: "40+" },
  { icon: <Globe2 className="w-6 h-6" style={{ color: "#00E4FF" }} />, label: "Global Brands", value: "8+" },
];
const solutions = [
  {
    icon: <Target className="w-5 h-5" style={{ color: "#00E4FF" }} />,
    title: "Understanding Your Business First",
    description: "Before writing a single line of code, I take time to understand your business goals, your users, and your challenges. This ensures every decision made is aligned with what actually matters — your growth.",
  },
  {
    icon: <Zap className="w-5 h-5" style={{ color: "#00E4FF" }} />,
    title: "Built Fast. Built to Last.",
    description: "I build high-performance web systems, SaaS platforms, and mobile apps using modern technologies. Fast load times, smooth integrations, and clean architecture — so your product works perfectly today and scales tomorrow.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" style={{ color: "#00E4FF" }} />,
    title: "Code You Can Trust",
    description: "Every product I deliver is clean, secure, and maintainable. No shortcuts, no messy code. Just solid engineering that your team can build on top of for years without headaches.",
  },
  {
    icon: <Cpu className="w-5 h-5" style={{ color: "#00E4FF" }} />,
    title: "Experience That Feels Right",
    description: "A great product isn't just functional — it feels good to use. I obsess over the details: smooth interactions, intuitive layouts, and responsive design across every screen size and device.",
  },
];
export const AboutSection = () => {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        className="flex flex-col gap-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}>
        <div className="flex flex-col md:flex-row gap-16 items-center">
  <div className="flex-1 space-y-8">
    <div>
      <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-3">
        About Me
      </p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
        I See the Gap.{" "}
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(to right, #00E4FF, #3b82f6)" }}
        >
          I Build the Bridge.
        </span>
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed">
 <strong> I'm a software engineer</strong> with 4+ years of experience building SaaS platforms, web systems, mobile apps, and AI-powered automations. I don't just write code — I study what businesses actually need, find what's missing, and build products that fill that gap. 55+ solutions delivered, and every single one built with one <strong> Goal: Results That Matter.</strong>
</p>
    </div>
  </div>

  <div className="flex-1 grid grid-cols-2 gap-4 w-full">
    {stats.map((stat, i) => (
      <motion.div
        key={i}
        className="glass-panel p-6 rounded-2xl border border-foreground/10 hover:border-[#00E4FF]/50 transition-colors group relative overflow-hidden bg-background/50 dark:bg-card/30"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#00E4FF]/10 rounded-full blur-2xl group-hover:bg-[#00E4FF]/20 transition-colors" />
        <div className="mb-4 p-3 bg-[#00E4FF]/10 w-max rounded-xl">
          {stat.icon}
        </div>
        <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
      </motion.div>
    ))}
  </div>
</div>
<div className="mt-8 border-t border-foreground/10 pt-16">
  <div className="text-center max-w-2xl mx-auto mb-16">
    <h3
      className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent"
      style={{ backgroundImage: "linear-gradient(to right, #00E4FF, #60a5fa)" }}
    >
      How I Solve Your Problem
    </h3>
    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
      A simple, results-driven approach to turning your ideas and challenges into products that actually work and grow your business.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    {solutions.map((item, index) => (
      <motion.div
        key={index}
        className="glass-panel p-8 rounded-2xl border border-foreground/10 hover:border-[#00E4FF]/40 transition-all bg-gradient-to-br from-background/60 via-[#00E4FF]/5 to-blue-500/10 dark:from-card/30 dark:via-[#00E4FF]/5 dark:to-blue-500/10 flex flex-col justify-between group relative overflow-hidden shadow-sm hover:shadow-[0_0_25px_rgba(0,228,255,0.15)]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#00E4FF]/5 rounded-full blur-3xl group-hover:bg-[#00E4FF]/20 transition-colors duration-500" />
        <div className="absolute -left-10 -top-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500" />

        <div>
          {/* Animated Icon */}
          <motion.div
            className="p-3.5 bg-[#00E4FF]/10 w-max rounded-xl mb-6 shadow-inner border border-[#00E4FF]/20"
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.4, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            {item.icon}
          </motion.div>

          <h4
            className="text-xl font-bold mb-3 tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #00E4FF, #60a5fa)" }}
          >
            {item.title}
          </h4>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>
    ))}
  </div>

  {/* Wide Card */}
  <motion.div
    className="glass-panel p-8 md:p-10 rounded-2xl border border-[#00E4FF]/30 hover:border-[#00E4FF]/60 transition-all bg-gradient-to-r from-[#00E4FF]/5 via-card/40 to-blue-500/10 relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(0,228,255,0.2)]"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#00E4FF]/10 rounded-full blur-3xl pointer-events-none" />
    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">

      {/* Animated Icon */}
      <motion.div
        className="p-4 bg-[#00E4FF]/10 rounded-2xl shadow-inner shrink-0 border border-[#00E4FF]/20"
        initial={{ scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.4, type: "spring", stiffness: 200 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        <HeartHandshake className="w-8 h-8" style={{ color: "#00E4FF" }} />
      </motion.div>

      <div className="space-y-2 flex-1">
        <h4
          className="text-xl md:text-2xl font-bold bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(to right, #00E4FF, #60a5fa)" }}
        >
          Your Satisfaction Is My Top Priority
        </h4>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          I stay with you until the job is truly done. Whether it's adding new features, improving performance, or providing long-term support — I'm always available to make sure your product keeps getting better. Your success is my success.
        </p>
      </div>
    </div>
  </motion.div>
</div>
      </motion.div>
    </section>
  );
};