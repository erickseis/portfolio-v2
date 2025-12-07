import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Plataforma Gestión de Metodologias",
      description: "Plataforma interna para la gestión de metas y métricas predictivas. Digitalizó la metodología 4DX, mejorando la organización y el cumplimiento de objetivos clave del equipo.",
      tags: ["React", "Node.js", "Dashboard", "Management"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
      links: {
        demo: "#",
        github: "#"
      }
    },
    {
      title: "Dashboard Financiero Real-Time",
      description: "Dashboard estadístico en tiempo real para visualizar indicadores críticos (ventas, facturación, cuentas por cobrar). Facilita la toma de decisiones basada en datos.",
      tags: ["Data Visualization", "Real-time", "Analytics", "Finance"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      links: {
        demo: "#",
        github: "#"
      }
    },
    {
      title: "Optimización Web & Refactorización",
      description: "Optimización de rendimiento y refactorización clave en frontend y backend para Asunción Digital. Reducción de tiempos de respuesta en un 30% y disminución de errores.",
      tags: ["Performance", "Refactoring", "Optimization", "Web"],
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000",
      links: {
        demo: "#",
        github: "#"
      }
    }
  ];

  return (
    <SectionWrapper id="projects" className="py-20 relative bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow">
              Proyectos Destacados
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Una selección de desarrollos donde la innovación se encuentra con la funcionalidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-dark-card rounded-xl overflow-hidden border border-white/10 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]"
            >
              {/* Image Overlay */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent z-10" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 relative z-20 -mt-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-dark-bg rounded-lg border border-white/10 group-hover:border-neon-cyan/30 transition-colors">
                    <Layers className="text-neon-cyan" size={20} />
                  </div>
                  <div className="flex gap-3">
                    <a href={project.links.github} className="text-gray-400 hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={project.links.demo} className="text-gray-400 hover:text-neon-cyan transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded bg-white/5 text-gray-300 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
