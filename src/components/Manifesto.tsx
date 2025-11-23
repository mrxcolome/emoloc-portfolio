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
      

      <div className="max-w-4xl mx-auto">
        

        <div className="space-y-12 text-3xl md:text-7xl font-bold leading-tight text-gray-500">
          
          {/* Frase 1: Tu enfoque estratégico */}
          <ManifestoItem delay={0}>
            Transformo datos en <span className="text-blue-100">rentabilidad</span> y estrategia.
          </ManifestoItem>

          {/* Frase 2: Tu experiencia (Castañer, Tous, etc.) */}
          <ManifestoItem delay={0.2}>
            Más de 15 años liderando la <span className="text-blue-100">evolución digital</span> de marcas globales.
          </ManifestoItem>

          {/* Frase 3: Tu filosofía (Business + UX) */}
          <ManifestoItem delay={0.4}>
            Donde el <span className="text-blue-100">Business Plan</span> se encuentra con la <span className="text-blue-100">Experiencia de Usuario</span>.
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