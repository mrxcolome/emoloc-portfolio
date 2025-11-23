'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';

// DATOS REALES CON IMÁGENES
const projectsData = [
  {
    id: 1,
    title: "CASTAÑER",
    role: "Digital Director",
    period: "2015 – 2017 / 2019 – Act.",
    shortDesc: "Redefinición estratégica, expansión global y transformación omnicanal.",
    color: "from-red-500 to-orange-600",
    imageUrl: "https://emoloc.com/wp-content/uploads/2019/02/iph-cast3.jpg",
    details: [
      "Redefinición estratégica del canal y nueva imagen.",
      "Plan estratégico, Budget, P&L, KPIs y Expansión.",
      "Integración de canales y transformación digital.",
      "Captación de tráfico, conversión y fidelización (Social Ads).",
      "Gestión logística, integración ERP y MarketPlaces.",
      "Implantación de cuadros de mando y analítica."
    ]
  },
  {
    id: 2,
    title: "TEXTURA",
    role: "eCommerce Director",
    period: "2017 – 2019",
    shortDesc: "Dirección eCommerce, cumplimiento de Budget y control de P&L.",
    color: "from-stone-400 to-stone-600",
    imageUrl: "https://emoloc.com/wp-content/uploads/2019/02/iph-text3.jpg",
    details: [
      "Definición del plan estratégico y crecimiento.",
      "Gestión de catálogo, pricing y shootings.",
      "Marketing: PPC, RTB, Email MKT, CRO, UX/UI.",
      "Lanzamiento Magento 2 e integraciones logísticas.",
      "Operaciones logísticas y seguimiento CallCenter.",
      "Analítica avanzada y seguimiento de KPIs."
    ]
  },
  {
    id: 3,
    title: "TOUS",
    role: "Digital Marketing Manager",
    period: "2010 – 2015",
    shortDesc: "Lanzamiento tienda online y liderazgo en innovación digital.",
    color: "from-pink-400 to-rose-500",
    imageUrl: "https://emoloc.com/wp-content/uploads/2019/02/iph-tous3.jpg",
    details: [
      "Lanzamiento tienda online y estrategia performance.",
      "Brand Content y Email Marketing Plan.",
      "Presencia de marca en Mobile & Apps nativas.",
      "Implantación Performance (Search, Affiliation, RTB).",
      "Liderazgo en Innovación (Wearables, AR).",
      "Integración de hábitos de compra omnicanal."
    ]
  },
  {
    id: 4,
    title: "DOUBLEYOU",
    role: "Account Director",
    period: "2005 – 2010",
    shortDesc: "Gestión de grandes cuentas: Audi, Mahou, PortAventura.",
    color: "from-blue-600 to-cyan-500",
    imageUrl: "https://emoloc.com/wp-content/uploads/2019/02/iphone_dy3.jpg",
    details: [
      "Gestión de grandes cuentas en el ámbito digital.",
      "Definición de estrategias de comunicación anuales.",
      "Análisis, estudio e implementación de marketing.",
      "Coordinación de equipos y supervisión de procesos.",
      "Responsable de rentabilidad y cumplimiento de objetivos."
    ]
  }
];

export default function Projects() {
  return (
    <section className="min-h-screen py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold font-custom-innovative text-white mb-20 tracking-tighter ">
          Career <span className="text-transparent bg-clip-text text-white">Path</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projectsData.map((project) => (
            <FlipCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- COMPONENTE DE TARJETA GIRATORIA MEJORADO ---
function FlipCard({ project }: { project: any }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    // Si la tarjeta está girada (leyendo detalles), desactivamos el efecto de seguimiento del ratón
    if (isFlipped) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculamos la rotación basada en la posición del ratón
    const xPct = (mouseY / height - 0.5) * -20; // Tilt en eje X
    const yPct = (mouseX / width - 0.5) * 20;   // Tilt en eje Y

    setRotation({ x: xPct, y: yPct });
  }

  function handleMouseLeave() {
    // Al salir el ratón, volvemos a 0
    setRotation({ x: 0, y: 0 });
  }

  return (
    <div className="h-[450px] w-full perspective-1000">
      <motion.div
        // AQUÍ ESTÁ LA MAGIA: Usamos 'animate' para controlar todo el movimiento
        animate={{
          rotateX: isFlipped ? 0 : rotation.x, // Si está girada, quitamos la inclinación X para leer mejor
          rotateY: isFlipped ? 180 : rotation.y, // Si está girada, forzamos 180 grados
        }}
        transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
        }}
        className="relative w-full h-full cursor-pointer group"
        style={{ transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        
        {/* --- CARA FRONTAL --- */}
        <div 
            className="absolute inset-0 w-full h-full bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 flex flex-col justify-between overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }} // Oculta la cara trasera
        >
            {/* Imagen de fondo */}
            <Image 
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover opacity-30 grayscale mix-blend-luminosity transition-all duration-500 group-hover:scale-105 group-hover:opacity-40 group-hover:grayscale-0"
            />

            {/* Capas de color */}
            <div className={`absolute inset-0 opacity-40 bg-gradient-to-br ${project.color} mix-blend-overlay z-0`}></div>
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            
            {/* Textos */}
            <div className="relative z-10">
                <span className={`text-xs font-black tracking-widest uppercase bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                    {project.period}
                </span>
                <h3 className="text-4xl font-semibold text-white mt-2 mb-1 font-custom-innovative uppercase drop-shadow-lg">
                    {project.title}
                </h3>
                <p className="text-lg text-gray-300 font-mono drop-shadow-md">
                    {project.role}
                </p>
            </div>

            <div className="relative z-10">
                <p className="text-gray-200 text-sm leading-relaxed mb-6 drop-shadow-md font-medium">
                    {project.shortDesc}
                </p>
                <div className="flex items-center text-xs text-cyan-400 font-bold tracking-wider animate-pulse">
                    [ + ] CLICK FOR DETAILS
                </div>
            </div>
            
            <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/30 transition-colors duration-300 z-20"></div>
        </div>

        {/* --- CARA TRASERA --- */}
        <div 
            className="absolute inset-0 w-full h-full bg-[#111] border border-gray-700 rounded-2xl p-8 overflow-hidden"
            style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateY(180deg)' // Ya está girada esperando
            }}
        >
             <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} opacity-10 blur-[50px]`}></div>

             <div className="relative h-full flex flex-col z-30">
                <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                    <h3 className="text-xl font-bold text-white font-custom-innovative">{project.title}</h3>
                    <span className="text-xs text-gray-500 font-mono">KEY ACHIEVEMENTS</span>
                </div>

                <ul className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                    {project.details.map((detail: string, index: number) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                            <span className={`mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color} flex-shrink-0`}></span>
                            <span className="leading-relaxed">{detail}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-4 pt-2 border-t border-gray-800 text-center">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
                        [ - ] CLOSE
                    </span>
                </div>
             </div>
        </div>

      </motion.div>
    </div>
  );
}