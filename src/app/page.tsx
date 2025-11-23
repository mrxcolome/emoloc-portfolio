'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Manifesto from '@/components/Manifesto';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import HeroText from '@/components/HeroText';

const GyroStars = dynamic(() => import('@/components/GyroStars'), { ssr: false });
const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), { ssr: false });

export default function Home() {
  return (
    <main className="w-full min-h-screen text-white overflow-x-hidden bg-[#050505]">
      
      {/* --- FONDO FIJO COMPLETO (Universo + Luces) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* 1. LUCES DEGRADADAS (Ahora fijas aquí) */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>

        {/* 2. ESTRELLAS 3D */}
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 1] }}>
            <ambientLight intensity={0.5} />
            <GyroStars />
          </Canvas>
        </Suspense>
      </div>

      {/* --- CONTENIDO SCROLLEABLE --- */}
      <div className="relative z-10">
        
        {/* SECCIÓN 1: HERO */}
        {/* Quitamos las luces de aquí porque ya están en el fondo fijo */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5">
          <HeroText /> 
        </section>

        {/* SECCIÓN 2: MANIFESTO */}
        <div className="relative">
          <Manifesto />
        </div>

        {/* SECCIÓN 3: PROYECTOS */}
        <div className="relative">
          <Projects />
        </div>

        {/* SECCIÓN 4: CONTACTO */}
        <div className="relative bg-black/80 backdrop-blur-md">
           <Contact />
        </div>

      </div>
    </main>
  );
}