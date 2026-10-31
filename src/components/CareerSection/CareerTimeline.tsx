
import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Layers, Users, Globe } from "lucide-react";

export const CareerTimeline = () => {
  const careerEvents = [
    {
      year: "2026 – Present",
      title: "Junior Software Engineer",
      subtitle: "Maystone Digital",
      description:
        "Developing comprehensive agency websites, high-converting landing pages, and interactive UI components using Next.js, Tailwind CSS, and MERN stack technologies. Building and integrating scalable backend APIs and database schemas to optimize digital business solutions. Implementing fluid web animations to elevate user engagement and product performance.",
      icon: <Globe className="h-4 w-4 mr-2 text-[#00E4FF]" />,
    },
    {
      year: "2025 (7 Months)",
      title: "Full Stack Developer",
      subtitle: "Gemini Logo Design",
      description:
        "Engineered dynamic client-facing web applications, custom digital branding interfaces, and responsive portfolio layouts. Managed end-to-end full-stack tasks, ensuring clean component modularity, optimized database structures, and seamless API integrations.",
      icon: <Layers className="h-4 w-4 mr-2 text-[#00E4FF]" />,
    },
    {
      year: "2025 (3 Months)",
      title: "Full Stack Developer (Intern)",
      subtitle: "CodeAlpha",
      description:
        "Collaborated on building responsive web application components and improving user interface responsiveness. Optimized web performance, resolved layout bugs, and practiced clean version control workflows using Git and GitHub.",
      icon: <Users className="h-4 w-4 mr-2 text-[#00E4FF]" />,
    },
    {
      year: "2024 – Present",
      title: "Freelance Software Developer",
      subtitle: "Local & Remote Clients",
      description:
        "Delivered custom MERN stack solutions including complete Hotel Management systems, Dental Clinic platforms, and custom Agency CRM solutions. Assisted local businesses with website customization, performance optimization, bug fixing, and modern tool integrations.",
      icon: <Briefcase className="h-4 w-4 mr-2 text-[#00E4FF]" />,
    },
  ];

  return (
    <div id="career" className="[&_*]:[--primary:var(--color-primary,#00E4FF)]">
      <ScrollTimeline
        events={careerEvents}
        title="Career Journey"
        subtitle="An evolving path of learning, building, and real-world impact"
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-[#00E4FF]/20"
        activeColor="bg-[#00E4FF]"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};