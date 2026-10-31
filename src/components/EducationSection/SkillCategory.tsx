import { motion, AnimatePresence } from "framer-motion";

export default function ProfessionalProfile() {
  const technicalSkills = [
    { name: "React.js / Next.js", level: 95 },
    { name: "Node.js / Express / MERN Stack", level: 90 },
    { name: "TypeScript & JavaScript", level: 92 },
    { name: "Mobile App Development", level: 88 },
    { name: "Databases (MongoDB / PostgreSQL)", level: 85 },
  ];

  const softSkills = [
    "Full-Stack Architecture",
    "Production Management",
    "Problem Solving",
    "Software Development",
    "UI/UX Implementation",
    "Cross-Team Collaboration",
  ];

  return (
    <motion.section
      id="skills"
      className="space-y-8 [&_*]:[--primary:var(--color-primary,#00E4FF)]"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { staggerChildren: 0.3, delayChildren: 0.4 },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-foreground">Expertise & <span className="text-[#00E4FF]">Skills</span></h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technical Skills */}
        <div className="glass-panel p-8 rounded-2xl border border-foreground/10 bg-background/50 dark:bg-card/30 backdrop-blur-md shadow-sm">
          <h4 className="text-lg font-bold text-foreground mb-6">Technical Arsenal</h4>
          <div className="space-y-5">
            {technicalSkills.map((skill, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">{skill.name}</span>
                  <span className="text-[#00E4FF]">{skill.level}%</span>
                </div>
                <div className="h-2.5 w-full bg-foreground/10 rounded-full overflow-hidden border border-foreground/5 relative">
                  {/* Progress Bar Fill (Stays fixed at skill.level after loading once) */}
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00E4FF]/50 to-[#00E4FF] rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "easeOut", 
                      delay: i * 0.2 
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Moving White Dot Animation looping continuously inside the filled bar */}
                    <motion.div 
                      className="absolute top-0 bottom-0 w-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 blur-[1px]"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0.8
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="glass-panel p-8 rounded-2xl border border-foreground/10 bg-background/50 dark:bg-card/30 backdrop-blur-md shadow-sm flex flex-col">
          <h4 className="text-lg font-bold text-foreground mb-6">Professional Traits</h4>
          <div className="flex flex-wrap gap-3">
            <AnimatePresence>
              {softSkills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full glass-panel border border-[#00E4FF]/30 text-sm font-medium text-[#00E4FF] shadow-[0_0_15px_rgba(0,228,255,0.15)] bg-[#00E4FF]/5 cursor-default transition-colors"
                >
                  {skill}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-auto pt-8">
            <div className="p-4 rounded-xl bg-[#00E4FF]/10 border border-[#00E4FF]/20 text-sm text-muted-foreground">
              <strong className="text-[#00E4FF] block mb-1">Constant Learner</strong>
              Always adapting to evolving technologies, full-stack stacks, and production workflows to deliver scalable, state-of-the-art solutions.
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}