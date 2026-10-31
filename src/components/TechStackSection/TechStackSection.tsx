const technologies = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/javascript/javascript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/python/python-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/flutter/flutter-original.svg" },
  { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/android/android-original.svg" },
  { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/swift/swift-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/graphql/graphql-plain.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mysql/mysql-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/redis/redis-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/docker/docker-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/figma/figma-original.svg" },
  { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/redux/redux-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/vercel/vercel-original.svg" },
  { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/netlify/netlify-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/firebase/firebase-original.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/supabase/supabase-original.svg" },
  { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/kubernetes/kubernetes-plain.svg" },
];

const TechStackSection = () => {
  return (
    <div className="w-full py-6 border-t border-foreground/5 bg-foreground/[0.02] overflow-hidden relative">

      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        {[...technologies, ...technologies].map((tech, i) => (
          <div
            key={i}
            className="mx-4 p-3 rounded-xl border border-foreground/10 bg-background/50 flex items-center justify-center group hover:border-foreground/30 transition-all duration-300"
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className={`w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 ${
                tech.name === "Vercel" || tech.name === "Next.js" ? "dark:invert" : ""
              }`}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};


export default TechStackSection;


