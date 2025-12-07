import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence as FramerAnimatePresence } from 'framer-motion';
// @ts-ignore
import { AnimatePresence as AnimationComponent } from './Animation';
import { Terminal, Code2, Cpu, Download } from 'lucide-react';
import cvFile from '../assets/ErickSeis.pdf';

const Hero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const pupilX = useTransform(mouseX, (value) => value * 0.4);
  const pupilY = useTransform(mouseY, (value) => value * 0.4);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    x.set(xPos / 5);
    y.set(yPos / 5);
    setIsHovered(true);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <AnimationComponent />
        <div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse" 
        />
        <div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px] animate-pulse delay-1000"
         />
        <div
         className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" 
         />
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
                <motion.div 
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ x: mouseX, y: mouseY }}

                  className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center relative group cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-dark-card to-black">
                    <div className="absolute inset-0 bg-neon-cyan/5 group-hover:bg-neon-cyan/10 transition-colors" />
                  </div>
                  
                  {/* Floating Icons */}
                  {/* Floating Icons or Face */}
                  <FramerAnimatePresence mode="wait">
                    {!isHovered ? (
                      <motion.div 
                        key="icons"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
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
                    ) : (
                      <motion.div
                        key="face"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 flex flex-col items-center gap-6"
                      >
                        {/* Eyes */}
                        {/* Eyes */}
                        <div className="flex gap-8">
                          <motion.div 
                            className="w-14 h-20 bg-neon-cyan/20 border-2 border-neon-cyan rounded-[50%] relative overflow-hidden flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                            layoutId="eye-left"
                          >
                             {/* Shine */}
                             <div className="absolute top-3 left-3 w-3 h-4 bg-white/80 rounded-full z-20 blur-[1px]" />
                             
                             {/* Pupil */}
                             <motion.div 
                               className="w-6 h-8 bg-neon-cyan rounded-full z-10 shadow-[0_0_10px_rgba(0,243,255,0.8)]" 
                               style={{ x: pupilX, y: pupilY }}
                             />
                          </motion.div>
                          <motion.div 
                            className="w-14 h-20 bg-neon-cyan/20 border-2 border-neon-cyan rounded-[50%] relative overflow-hidden flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                            layoutId="eye-right"
                          >
                             {/* Shine */}
                             <div className="absolute top-3 left-3 w-3 h-4 bg-white/80 rounded-full z-20 blur-[1px]" />
                             
                             {/* Pupil */}
                             <motion.div 
                               className="w-6 h-8 bg-neon-cyan rounded-full z-10 shadow-[0_0_10px_rgba(0,243,255,0.8)]" 
                               style={{ x: pupilX, y: pupilY }}
                             />
                          </motion.div>
                        </div>
                        {/* Mouth */}
                        <motion.div 
                          className="w-10 bg-neon-purple shadow-[0_0_15px_rgba(180,0,255,0.6)]"
                          animate={{ 
                            height: [6, 12, 8, 16, 6],
                            borderRadius: [
                              "2px 2px 10px 10px", 
                              "4px 4px 12px 12px", 
                              "3px 3px 10px 10px", 
                              "4px 4px 14px 14px", 
                              "2px 2px 10px 10px"
                            ]
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            times: [0, 0.3, 0.5, 0.8, 1]
                          }}
                        />
                        
                        {/* Speech Bubble */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0, x: 20, y: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                            className="absolute -top-32 -right-36 z-50 bg-black/80 backdrop-blur-xl border border-neon-cyan/50 p-5 rounded-2xl rounded-bl-sm w-56 shadow-[0_0_20px_rgba(0,243,255,0.15)] pointer-events-none"
                        >
                            <div className="space-y-2">
                                <h3 className="text-neon-cyan font-bold text-sm tracking-wide">SOY BOTERIC</h3>
                                <div className="w-full h-[1px] bg-gradient-to-r from-neon-cyan/50 to-transparent" />
                                <p className="text-xs text-gray-300 font-mono leading-relaxed">
                                   &gt; Full Stack Developer <br/>
                                   &gt; Experto en UI/UX <br/>
                                   &gt; Integrador de IA
                                </p>
                            </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </FramerAnimatePresence>
                </motion.div>
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
