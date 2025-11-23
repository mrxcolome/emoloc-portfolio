'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Manifesto from '@/components/Manifesto';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact'


// Cargamos los componentes
const FloatingOrb = dynamic(() => import('@/components/FloatingOrb'), { ssr: false });
const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), { ssr: false });

export default function Home() {
  return (
    // CAMBIO CLAVE 1: Quitamos 'h-screen' y 'overflow-hidden' de aquí.
    // Ahora el 'main' puede crecer tanto como quiera hacia abajo.
    <main className="relative w-full bg-[#050505] min-h-screen">
      
      {/* --- SECCIÓN 1: HERO (La portada) --- */}
      {/* Esta sección SÍ tiene 'h-screen' para ocupar la primera vista completa */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Fondo de Luces (Solo para el Hero) */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>

        {/* Escenario 3D */}
        <div className="absolute inset-0 z-10">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 5, 2]} intensity={1} />
              <FloatingOrb />
            </Canvas>
          </Suspense>
        </div>

        {/* Texto Principal */}
       <div className="z-20 text-center pointer-events-none select-none relative px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-custom-innovative tracking-tighter drop-shadow-2xl uppercase">
            XAVI <br className="md:hidden" /> {/* Salto de línea solo en móvil */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
              COLOMÉ
            </span>
          </h1>
          
          <div className="mt-6 flex flex-col items-center">
            <p className="text-sm md:text-2xl font-inter tracking-[0.3em] md:tracking-[0.5em] text-gray-300 uppercase font-bold border-b border-cyan-500/30 pb-4 mb-4">
              Digital Director
            </p>
            <p className="text-xs text-gray-500 font-mono tracking-widest">
              STRATEGY · ECOMMERCE · INNOVATION
            </p>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 top-[350px] md:top-[400px] opacity-50">
              <span className="text-[10px] tracking-widest mb-2 block animate-pulse">SCROLL</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent mx-auto"></div>
          </div>
        </div>
      </section>


      {/* --- SECCIÓN 2: EL MANIFIESTO --- */}
      {/* Esto ahora está FUERA de la sección Hero, así que aparecerá al bajar */}
      <Manifesto />
      

      {/* --- SECCIÓN 3: PROYECTOS --- */}
      <div className="relative z-20">
        <Projects />  {/* <--- ESTA es la clave. Si esto falta, el import de arriba se ve gris */}
      </div>

      {/* Contact (El Cierre) */}
      <Contact />  {/* <--- AÑADIR AQUÍ */}


    </main>
  );
} 