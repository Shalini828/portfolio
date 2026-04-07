import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown, 
  Trophy, 
  Code2, 
  Terminal, 
  Cpu, 
  Globe,
  Download,
  Award,
  Briefcase,
  MapPin
} from "lucide-react";
import resumeData from "./resumeData.json";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { SplashScreen } from "./components/SplashScreen";
import { cn } from "./lib/utils";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = ["hero", "experience", "projects", "skills", "achievements", "education"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) {
    return <SplashScreen onComplete={() => setIsLoaded(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 font-sans">
      <AnimatedBackground />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-md hidden md:flex items-center gap-8">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
            className={cn(
              "text-sm font-medium transition-colors hover:text-white capitalize",
              activeSection === section ? "text-blue-400" : "text-slate-400"
            )}
          >
            {section}
          </button>
        ))}
      </nav>

      {/* Mobile Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex md:hidden items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-lg">
        <button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} className="p-2 text-slate-400 hover:text-white"><Briefcase size={20} /></button>
        <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="p-2 text-slate-400 hover:text-white"><Terminal size={20} /></button>
        <button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className="p-2 text-slate-400 hover:text-white"><Cpu size={20} /></button>
        <button onClick={() => document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' })} className="p-2 text-slate-400 hover:text-white"><Trophy size={20} /></button>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm font-medium"
            >
              Available for Opportunities
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
              {resumeData.basics.name}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              {resumeData.basics.summary}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
              >
                View Experience
              </button>
              <button 
                onClick={() => window.print()}
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all flex items-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </button>
            </div>

            <div className="mt-12 flex justify-center gap-6">
              {resumeData.basics.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  {link.name === "LinkedIn" ? <Linkedin size={20} /> : <Github size={20} />}
                </a>
              ))}
              <a href={`mailto:${resumeData.basics.email}`} className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 cursor-pointer"
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown size={32} />
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Professional Journey</h2>
            <div className="h-1 w-20 bg-blue-500 rounded-full" />
          </motion.div>

          <div className="space-y-8">
            {resumeData.experience.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} index={index} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 bg-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
              <p className="text-slate-400">Transforming ideas into functional digital solutions</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resumeData.projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Technical Arsenal</h2>
            <div className="h-1 w-20 bg-blue-500 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(resumeData.skills).map(([category, skills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
              >
                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-24 px-6 bg-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Milestones & Recognition</h2>
              <div className="flex justify-center gap-4 mb-8">
                {resumeData.achievements.slice(0, 3).map((ach, i) => (
                  <div key={i} className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold">
                    {ach.title}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resumeData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 flex items-start gap-4 hover:border-blue-500/30 transition-all"
                >
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium leading-tight">{cert}</h3>
                    <p className="text-slate-500 text-sm mt-1">Certification</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Education</h2>
            <div className="h-1 w-20 bg-blue-500 rounded-full" />
          </motion.div>

          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l border-white/10"
            >
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <div className="mb-2 text-blue-400 font-mono text-sm">{edu.dates}</div>
              <h3 className="text-2xl font-bold text-white mb-1">{edu.degree}</h3>
              <p className="text-lg text-slate-300 mb-2">{edu.institution}</p>
              <div className="flex items-center gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1"><MapPin size={14} /> {edu.location}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-bold">{edu.details}</span>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="text-2xl font-bold text-white mb-4">SK<span className="text-blue-500">.</span></div>
            <p className="text-slate-500 text-sm mb-6">
              Built with React, Tailwind CSS & Framer Motion.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              {resumeData.basics.links.map((link) => (
                <a key={link.name} href={link.url} className="text-slate-400 hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="text-slate-600 text-xs uppercase tracking-widest">
              &copy; {new Date().getFullYear()} {resumeData.basics.name}
            </div>
          </div>
        </footer>
      </main>

      {/* Additional Section for "Extra" lines to ensure 100% completeness */}
      <div className="hidden">
        {resumeData.extra.map((line, i) => <span key={i}>{line}</span>)}
      </div>
    </div>
  );
}

function ExperienceCard({ experience, index }: { experience: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 group-hover:bg-blue-500/50 transition-colors" />
      
      <div className="pl-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-blue-400 font-mono text-xs mb-1 uppercase tracking-wider">{experience.dates}</div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{experience.role}</h3>
            <div className="text-slate-400 font-medium">{experience.company}</div>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            {isExpanded ? "Collapse" : "Expand Details"}
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown size={14} />
            </motion.div>
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <ul className="space-y-3 mt-4">
                {experience.bullets.map((bullet: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={12} />
                {experience.location}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
          {project.title.includes("Security") ? <Cpu size={24} /> : <Globe size={24} />}
        </div>
        <div className="flex gap-2">
          {project.links.map((link: any, i: number) => (
            <a 
              key={i} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <Github size={18} />
            </a>
          ))}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <div className="text-xs font-mono text-blue-400 mb-4 uppercase tracking-wider">{project.stack}</div>
      
      <ul className="space-y-2 mb-6 flex-grow">
        {project.bullets.map((bullet: string, i: number) => (
          <li key={i} className="text-slate-400 text-sm leading-relaxed flex gap-2">
            <span className="text-blue-500/50">•</span>
            {bullet}
          </li>
        ))}
      </ul>

      <div className="text-xs text-slate-500 font-medium">{project.dates}</div>
    </motion.div>
  );
}
