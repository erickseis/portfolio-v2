import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Redux", "Tailwind CSS"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Python", "PostgreSQL", "RESTful APIs"]
    },
    {
      title: "Herramientas & Métodos",
      skills: ["Git", "GitHub", "Scrum", "Agile", "VS Code"]
    },
    {
      title: "Soft Skills & Idiomas",
      skills: ["Liderazgo Técnico", "Resolución de Problemas", "Inglés (B1)", "Portugués (B1)", "Español (Nativo)"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <SectionWrapper id="skills" className="py-20 bg-dark-card/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow">
              Arsenal Tecnológico
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Herramientas y tecnologías que domino para construir soluciones robustas y futuristas.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-dark-card/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-neon-cyan/30 transition-colors group"
            >
              <h3 className="text-xl font-bold text-white mb-6 group-hover:text-neon-cyan transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-md bg-white/5 text-sm text-gray-300 border border-white/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/20 hover:text-neon-cyan transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
