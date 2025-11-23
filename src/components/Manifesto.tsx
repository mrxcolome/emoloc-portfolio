'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Detectamos el progreso del scroll dentro de este contenedor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.5"]
  });

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center py-24 px-6">
      
      {/* Línea de tiempo lateral (Decoración) */}
      <div className="absolute left-4 md:left-10 top-0 bottom-0 w-[1px] bg-gray-900">
        <motion.div 
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          className="w-full h-full bg-gradient-to-b from-indigo-500 to-cyan-400 shadow-[0_0_10px_#4F46E5]"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm md:text-base text-cyan-400 font-custom-innovative tracking-widest mb-10 uppercase">
          // Xavi Colomé _ Digital Director
        </h2>

        <div className="space-y-12 text-3xl md:text-5xl font-bold leading-tight text-gray-800">
          
          {/* Frase 1: Tu enfoque estratégico */}
          <ManifestoItem delay={0}>
            Transformo datos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">rentabilidad</span> y estrategia.
          </ManifestoItem>

          {/* Frase 2: Tu experiencia (Castañer, Tous, etc.) */}
          <ManifestoItem delay={0.2}>
            Más de 15 años liderando la <span className="text-indigo-500 drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]">evolución digital</span> de marcas globales.
          </ManifestoItem>

          {/* Frase 3: Tu filosofía (Business + UX) */}
          <ManifestoItem delay={0.4}>
            Donde el <span className="text-cyan-400">Business Plan</span> se encuentra con la <span className="text-white italic font-serif">Experiencia de Usuario</span>.
          </ManifestoItem>

        </div>
      </div>
    </section>
  );
}

// Un sub-componente para animar cada frase suavemente al aparecer
function ManifestoItem({ children, delay }: { children: React.ReactNode, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
    >
      <p>{children}</p>
    </motion.div>
  );
}