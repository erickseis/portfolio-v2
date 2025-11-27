import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, Star, Calendar } from 'lucide-react';

interface TimelineItemProps {
  data: {
    title: string;
    company: string;
    date: string;
    description: string;
    icon: React.ReactNode;
    type: string;
    tags: string[];
  };
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ data, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });

  return (
    <div 
      ref={ref}
      className={`flex justify-between items-center w-full mb-8 ${
        index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Empty space for the other side */}
      <div className="hidden md:block w-5/12" />

      {/* Center Line Node */}
      <div className="z-20 flex items-center justify-center w-8 h-8 rounded-full bg-dark-card border-2 border-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]">
        <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse" />
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full md:w-5/12"
      >
        <div className="bg-dark-card/80 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-neon-cyan/30 transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)] group hover:shadow-[0_0_20px_rgba(0,243,255,0.1)]">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${
              data.type === 'work' ? 'bg-neon-purple/10 text-neon-purple' : 
              data.type === 'education' ? 'bg-neon-cyan/10 text-neon-cyan' : 
              'bg-neon-green/10 text-neon-green'
            }`}>
              {data.icon}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono bg-white/5 px-2 py-1 rounded">
              <Calendar size={12} />
              {data.date}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
            {data.title}
          </h3>
          <h4 className="text-sm text-gray-400 mb-3 font-mono">
            {data.company}
          </h4>
          
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 rounded text-xs bg-white/5 border border-white/5 text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

import SectionWrapper from './SectionWrapper';

// ... (imports remain same)

const Timeline: React.FC = () => {
  const experiences = [
    {
      title: "Freelancer Full Stack Developer",
      company: "Independiente",
      date: "Nov 2023 - Presente",
      description: "Lidero el desarrollo de soluciones web a medida, dashboards financieros y plataformas de gestión. Implemento arquitecturas modernas con React, Node.js y PostgreSQL. Automatizo tareas con IA, acelerando entregas en un 35%.",
      icon: <Briefcase size={20} />,
      type: "work",
      tags: ["React", "Node.js", "PostgreSQL", "AI Automation"]
    },
    {
      title: "Desarrollador Full Stack",
      company: "Asunción Digital",
      date: "Oct 2022 - Nov 2023",
      description: "Desarrollé interfaces responsivas con React y Redux. Implementé backends robustos con Node.js y Express, mejorando el rendimiento en un 25%. Optimicé procesos y resolví bugs críticos.",
      icon: <Briefcase size={20} />,
      type: "work",
      tags: ["React", "Redux", "Node.js", "Express", "Scrum"]
    },
    {
      title: "Analista Programador",
      company: "INACAP",
      date: "Mar 2024 - Presente",
      description: "Estudio de fundamentos de programación, algoritmos, bases de datos y metodologías ágiles.",
      icon: <GraduationCap size={20} />,
      type: "education",
      tags: ["Algorithms", "Databases", "Agile"]
    },
    {
      title: "Desarrollador Full Stack MERN",
      company: "Academlo",
      date: "Ene 2022 - Jul 2022",
      description: "Programa intensivo en HTML, CSS, JavaScript, React, Node.js y PostgreSQL.",
      icon: <GraduationCap size={20} />,
      type: "education",
      tags: ["MERN Stack", "Full Stack Development"]
    }
  ];

  return (
    <SectionWrapper id="experience" className="py-20 relative overflow-hidden">
      {/* Background Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent -translate-x-1/2 hidden md:block" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow">
              Trayectoria & Proyectos
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Un recorrido por mi evolución profesional y los hitos que han marcado mi carrera.
          </p>
        </div>

        <div className="relative flex flex-col items-center">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} data={exp} index={index} />
          ))}
          
          {/* Final Star Node */}
          <div className="z-20 flex items-center justify-center w-10 h-10 rounded-full bg-dark-card border-2 border-neon-purple shadow-[0_0_15px_rgba(188,19,254,0.5)] mt-4">
            <Star size={20} className="text-neon-purple" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Timeline;
