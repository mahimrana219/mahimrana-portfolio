import SkillCategory from "./SkillCategory";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export const EducationSection = () => {
  const education = [
    {
      degree: "Bachelor of Engineering in Software Engineering",
      school: "NED University of Engineering and Technology",
      year: "2026 – Present",
      details: [
        "Currently pursuing Software Engineering degree from NED University",
        "Exploring advanced core concepts, system engineering, and algorithms",
        "Continuously upskilling with new languages, modern frameworks, and cutting-edge technologies"
      ]
    },
    {
      degree: "Advance Diploma in Software Engineering",
      school: "Apptech",
      year: "Sep 2024 – Nov 2026",
      details: [
        "Currently in the final semester with 6 consecutive semesters of A+ grades",
        "Competed in programming competitions and won standout awards",
        "Awarded Project of the Month for high-quality practical engineering work",
        "Built real-world applications across multiple modern languages and tech stacks"
      ]
    },
    {
      degree: "Intermediate in Computer Science",
      school: "Sr Public College",
      year: "Feb 2025 – Jul 2026",
      details: [
        "Completed with A+ Grade, focusing heavily on Computer Science",
        "Built a strong conceptual foundation in programming logic and problem-solving",
        "Core skills focused on Full-Stack and Mobile Application Development"
      ]
    },
    {
      degree: "Matriculation in Computer Science",
      school: "Pak Aspire School System",
      year: "Jan 2023 – Nov 2024",
      details: [
        "Completed Matriculation with Computer Science group",
        "The starting milestone where my passion and journey into the tech world officially began"
      ]
    }
  ];

  return (
    <section id="education" className="max-w-5xl mx-auto px-6 py-24 space-y-24 [&_*]:[--primary:var(--color-primary,#00E4FF)]">
      
      {/* Education Block */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-[#00E4FF]/20 bg-[#00E4FF]/10">
              <GraduationCap className="text-[#00E4FF] w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Academic <span className="text-[#00E4FF]">Background</span>
            </h2>
          </div>
          <p className="text-muted-foreground ml-0 md:ml-16 max-w-2xl">
            Building the theoretical foundation that empowers practical engineering and continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-0 md:ml-16">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-foreground/10 bg-background/50 dark:bg-card/30 backdrop-blur-md relative overflow-hidden group hover:border-[#00E4FF]/50 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E4FF]/5 rounded-bl-[100px] transition-colors group-hover:bg-[#00E4FF]/15 pointer-events-none" />
              
              <h3 className="text-xl font-bold text-foreground mb-1 shadow-sm relative z-10">{edu.degree}</h3>
              <p className="text-sm font-medium text-[#00E4FF] mb-6 relative z-10">{edu.school} • {edu.year}</p>
              
              <ul className="space-y-3 relative z-10">
                {edu.details.map((detail, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex gap-3">
                    <span className="text-[#00E4FF] mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills Component Integration */}
      <div className="ml-0 md:ml-16">
        <SkillCategory />
      </div>

    </section>
  );
};