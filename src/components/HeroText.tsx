'use client';

import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function HeroText() {
  // Configuración base
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Física del movimiento (Spring)
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // --- CONFIGURACIÓN DE CAPAS (PARALLAX) ---
  
  // CAPA 1: TÍTULO (XAVI COLOMÉ)
  // Se mueve más rápido (factor 1.0), dando sensación de estar "más cerca" de la pantalla.
  const titleX = useTransform(springX, (val) => val * 1.0);
  const titleY = useTransform(springY, (val) => val * 1.0);

  // CAPA 2: PUESTO (DIGITAL DIRECTOR)
  // Se mueve un poco más lento (factor 0.6), parece estar unos centímetros detrás del nombre.
  const roleX = useTransform(springX, (val) => val * 0.6);
  const roleY = useTransform(springY, (val) => val * 0.6);

  // CAPA 3: TAGS (STRATEGY...)
  // Se mueve muy lento (factor 0.3), parece estar al fondo, pegado a las estrellas.
  const tagsX = useTransform(springX, (val) => val * 0.3);
  const tagsY = useTransform(springY, (val) => val * 0.3);

  useEffect(() => {
    // 1. LÓGICA MÓVIL (Giroscopio)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma || 0; 
      const beta = e.beta || 0;
      x.set(Math.min(Math.max(gamma / 2, -40), 40)); 
      y.set(Math.min(Math.max(beta / 2, -40), 40));
    };

    // 2. LÓGICA PC (Ratón)
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      x.set((clientX - centerX) / 25);
      y.set((clientY - centerY) / 25);
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
       window.addEventListener('deviceorientation', handleOrientation);
    }
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  return (
    <div className="z-20 text-center pointer-events-none select-none relative px-4 perspective-500">
        
        {/* BLOQUE 1: NOMBRE COMPLETO (Se mueven juntos) */}
        <motion.h1 
            style={{ x: titleX, y: titleY }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tighter relative z-30"
        >
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                Xavi
            </span>
            <br className="md:hidden" />
            <span className="md:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                Colomé
            </span>
        </motion.h1>
        
        <div className="mt-8 flex flex-col items-center relative">
            
            {/* BLOQUE 2: PUESTO (Movimiento medio) */}
            <motion.p 
                style={{ x: roleX, y: roleY }}
                className="text-lg md:text-2xl text-gray-200 uppercase font-bold tracking-[0.2em] border-b border-cyan-500/50 pb-4 mb-5 relative z-20"
            >
                Digital Director
            </motion.p>
            
            {/* BLOQUE 3: TAGS (Movimiento lento/fondo) */}
            <motion.p 
                style={{ x: tagsX, y: tagsY }}
                className="text-xs md:text-sm text-gray-400 font-medium tracking-widest opacity-80 relative z-10"
            >
                STRATEGY <span className="text-cyan-500 mx-2">•</span> ECOMMERCE <span className="text-cyan-500 mx-2">•</span> INNOVATION
            </motion.p>

        </div>

        {/* INDICADOR DE SCROLL (Casi estático) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[450px] opacity-60">
            <span className="text-[10px] font-bold tracking-widest mb-3 block animate-pulse">SCROLL</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-cyan-400 to-transparent mx-auto"></div>
        </div>
    </div>
  );
}