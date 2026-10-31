import React from "react";
import { Download, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

interface AtsResumeProps {
  pdfUrl?: string;
}

export const AtsResume: React.FC<AtsResumeProps> = ({ pdfUrl = "/resume/Mahim_Rana_Resume.pdf" }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 md:p-12 bg-white text-slate-900 rounded-2xl shadow-2xl my-10 font-sans border border-slate-200">
      
      {/* Top Action Bar for Download / Print */}
      <div className="flex justify-between items-center pb-6 mb-8 border-b border-slate-200 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">ATS-Optimized Resume</h2>
          <p className="text-sm text-slate-500">I am happy to see you there, I hope you find best here.</p>
        </div>
        <div className="flex gap-3">
          <a
            href={pdfUrl}
            download="Mahim_Rana_Resume.pdf"
            className="px-5 py-2 bg-[#00E4FF] hover:bg-[#00d1ea] text-black font-semibold rounded-xl text-sm flex items-center gap-2 transition-all shadow-md"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
        </div>
      </div>

      {/* Resume Content Start */}
      <div className="space-y-6">
        
        {/* Header / Contact Info */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">MAHIM RANA</h1>
          <p className="text-base font-semibold text-[#0099aa]">Full-Stack Software Engineer & Mobile App Developer</p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm text-slate-600 pt-1">
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> 03367389032</span>
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" /> mahimrana219@gmail.com</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Shah Faisal Colony Asfabad, Karachi</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5 text-slate-400" /> linkedin.com/in/mahimrana219</span>
            <span className="flex items-center gap-1"><Github className="w-3.5 h-3.5 text-slate-400" /> github.com/mahimrana219</span>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Professional Summary */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-900 pb-1">Professional Summary</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Highly motivated and hardworking Full-Stack Software Engineer with a deep-rooted passion for continuous learning and technological evolution. Eagerly driven to master new programming languages, adapt to fast-paced industry transformations, and seamlessly integrate artificial intelligence into modern web architectures. Proactive in exploring cutting-edge ecosystems such as Python, n8n automated workflows, and AI chatbots to engineer smart, high-performance applications. Adept at leveraging the MERN stack, Next.js, and scalable cloud databases to build robust digital solutions that maximize user engagement and solve complex business challenges with exceptional efficiency.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-900 pb-1">Technical Skills</h2>
          <div className="text-sm space-y-1.5 text-slate-700">
            <p><strong>Core Expertise:</strong> Full-Stack Development, MERN Stack, Mobile App Development, REST APIs, Scalable Architecture</p>
            <p><strong>Programming Languages:</strong> JavaScript, Python, HTML, CSS, JSON</p>
            <p><strong>Frameworks & Libraries:</strong> Next.js, React.js, Node.js, Express.js, Flutter, Tailwind CSS, Framer Motion, Bootstrap, Material UI</p>
            <p><strong>Databases & Cloud:</strong> MongoDB, MySQL, Firebase, Supabase</p>
            <p><strong>Tools & Integrations:</strong> Git, GitHub, VS Code, Vercel, n8n, AI Chatbots</p>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-900 pb-1">Professional Experience</h2>
          
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-bold text-slate-900">Junior Software Engineer</h3>
              <span className="text-xs font-semibold text-slate-500">2026 - Present</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Maystone Digital</p>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 pt-1">
              <li>Developing comprehensive agency websites, high-converting landing pages, and interactive UI components using Next.js, Tailwind CSS, and MERN stack technologies.</li>
              <li>Building and integrating scalable backend APIs and database schemas to optimize digital business solutions.</li>
              <li>Implementing fluid web animations to elevate user engagement and product performance.</li>
            </ul>
          </div>

          <div className="space-y-1 pt-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-bold text-slate-900">Full Stack Developer</h3>
              <span className="text-xs font-semibold text-slate-500">2025 (7 Months)</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Gemini Logo Design</p>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 pt-1">
              <li>Engineered dynamic client-facing web applications, custom digital branding interfaces, and responsive portfolio layouts.</li>
              <li>Managed end-to-end full-stack tasks, ensuring clean component modularity, optimized database structures, and seamless API integrations.</li>
            </ul>
          </div>

          <div className="space-y-1 pt-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-bold text-slate-900">FullStack Developer (Intern)</h3>
              <span className="text-xs font-semibold text-slate-500">2025 (3 Months)</span>
            </div>
            <p className="text-xs font-medium text-slate-600">CodeAlpha</p>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 pt-1">
              <li>Collaborated on building responsive web application components and improving user interface responsiveness.</li>
              <li>Optimized web performance, resolved layout bugs, and practiced clean version control workflows using Git and GitHub.</li>
            </ul>
          </div>

          <div className="space-y-1 pt-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-bold text-slate-900">Freelance Software Developer</h3>
              <span className="text-xs font-semibold text-slate-500">2024 - Present</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Local & Remote Clients</p>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 pt-1">
              <li>Delivered custom MERN stack solutions including complete Hotel Management systems, Dental Clinic platforms, and custom Agency CRM solutions.</li>
              <li>Assisted local businesses with website customization, performance optimization, bug fixing, and modern tool integrations.</li>
            </ul>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-900 pb-1">Education & Certifications</h2>
          <div className="text-sm space-y-2 text-slate-700">
            <div className="flex justify-between">
              <span><strong>Advance Diploma In Software Engineering (ADSE)</strong> | Aptech, Karachi (Currently in 6th Semester)</span>
              <span className="text-xs font-semibold text-slate-500">2026 - Present</span>
            </div>
            <div className="flex justify-between">
              <span><strong>Intermediate (Computer Science)</strong> | Intermediate Board, Karachi</span>
              <span className="text-xs font-semibold text-slate-500">2024 - 2025</span>
            </div>
            <div className="flex justify-between">
              <span><strong>Matriculation (Computer Science)</strong> | Karachi Board</span>
              <span className="text-xs font-semibold text-slate-500">2022 - 2023</span>
            </div>
          </div>
          <div className="text-xs text-slate-600 pt-2">
            <p><strong>Certifications:</strong> Information Technology Management System (1 Year Diploma), Soft Skills (Google), MS-Office (Aptech), UI/UX Designing (HubSpot Academy).</p>
          </div>
        </section>

        {/* Key Projects */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-900 pb-1">Key Projects</h2>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1.5">
            <li><strong>Agency CRM Systems:</strong> Developed custom Next.js and MERN-based CRM platforms designed for agencies to track leads, manage clients, and streamline operational workflows.</li>
            <li><strong>Dental Clinic Platform & Appointment System:</strong> Built a complete healthcare web solution featuring robust MERN backend integration, interactive UI elements, and a seamless patient appointment booking mechanism.</li>
            <li><strong>Full-Stack Hotel Management System:</strong> Engineered an end-to-end management portal utilizing MongoDB and Node.js featuring secure user authentication, booking workflows, and room management.</li>
            <li><strong>Currency Conversion Mobile App & Utility Tools:</strong> Designed functional mobile applications delivering real-time financial calculations and smooth cross-platform user experiences.</li>
          </ul>
        </section>

        {/* Soft Skills */}
        <section className="space-y-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-900 pb-1">Soft Skills</h2>
          <p className="text-xs text-slate-700">Communication, Problem-Solving, Adaptability, Fast Learner, Time Management, Teamwork</p>
        </section>

      </div>
    </div>
  );
};

export default AtsResume;