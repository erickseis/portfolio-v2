import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Cpu, Download } from 'lucide-react';
import cvFile from '../assets/ErickSeis.pdf';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-sm font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
              </span>
              System Online
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Hola, soy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow">
                Erick Seis
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Desarrollador Full Stack con 3 años de experiencia. Especializado en crear soluciones web modernas, eficientes y escalables con <span className="text-white font-semibold">React</span>, <span className="text-white font-semibold">Node.js</span> y <span className="text-white font-semibold">IA</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start flex-wrap">
              <a 
                href="#projects"
                className="px-8 py-3 rounded-lg bg-neon-cyan text-black font-bold hover:bg-neon-cyan/90 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] text-center"
              >
                Ver Proyectos
              </a>
              <a 
                href="#contact"
                className="px-8 py-3 rounded-lg border border-white/20 hover:bg-white/5 hover:border-neon-purple/50 transition-all text-white text-center"
              >
                Contactar
              </a>
              <a 
                href={cvFile}
                download="CV_Erick_Seis.pdf"
                className="px-8 py-3 rounded-lg border border-white/20 hover:bg-white/5 hover:border-neon-green/50 transition-all text-white flex items-center justify-center gap-2"
              >
                <Download size={18} />
                <span>Descargar CV</span>
              </a>
            </div>
          </motion.div>

          {/* Visual/Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Decorative Circles */}
              <div className="absolute inset-0 border border-neon-cyan/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border border-neon-purple/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Central "AI" Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-dark-card to-black border border-white/10 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-neon-cyan/5 group-hover:bg-neon-cyan/10 transition-colors" />
                  
                  {/* Floating Icons */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 grid grid-cols-2 gap-4"
                  >
                    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <Code2 className="text-neon-cyan" size={32} />
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <Terminal className="text-neon-purple" size={32} />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <Cpu className="text-neon-green" size={32} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
