'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const GyroStars = () => {
  const bgRef = useRef<THREE.Group>(null);
  const midRef = useRef<THREE.Group>(null);
  const fgRef = useRef<THREE.Group>(null);
  
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Nuevo estado para ratón global
  const [hasGyro, setHasGyro] = useState(false);

  useEffect(() => {
    // 1. GIROSCOPIO (Móvil)
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
        if (!event.beta || !event.gamma) return;
        setHasGyro(true);
        const x = Math.min(Math.max((event.beta || 0) / 150, -0.3), 0.3);
        const y = Math.min(Math.max((event.gamma || 0) / 150, -0.3), 0.3);
        setTargetRotation({ x, y });
    };

    // 2. RATÓN GLOBAL (PC) - Usamos window para que funcione aunque el canvas esté detrás
    const handleMouseMove = (event: MouseEvent) => {
      // Normalizamos de -1 a 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    // Calculamos el objetivo basado en si hay giroscopio o ratón
    let targetX = targetRotation.x;
    let targetY = targetRotation.y;

    if (!hasGyro) {
      // Usamos nuestra variable mousePosition manual
      targetX = -mousePosition.y / 20;
      targetY = mousePosition.x / 20;
    }

    // --- NUEVO: PARALLAX POR SCROLL ---
    // Calculamos cuánto ha bajado el usuario en la web
    const scrollY = window.scrollY; 
    const scrollRotation = scrollY * 0.0005; // Ajusta este número para más/menos velocidad al bajar

    const smoothness = 2 * delta; 

    // CAPA 1: FONDO
    if (bgRef.current) {
      bgRef.current.rotation.z += delta * 0.002; 
      // Añadimos scrollRotation al eje X para que parezca que viajas hacia abajo
      bgRef.current.rotation.x = THREE.MathUtils.lerp(bgRef.current.rotation.x, targetX * 0.3 + scrollRotation, smoothness);
      bgRef.current.rotation.y = THREE.MathUtils.lerp(bgRef.current.rotation.y, targetY * 0.3, smoothness);
    }

    // CAPA 2: MEDIO
    if (midRef.current) {
      midRef.current.rotation.x = THREE.MathUtils.lerp(midRef.current.rotation.x, targetX * 0.35 + scrollRotation * 1.2, smoothness);
      midRef.current.rotation.y = THREE.MathUtils.lerp(midRef.current.rotation.y, targetY * 0.35, smoothness);
    }

    // CAPA 3: FRENTE
    if (fgRef.current) {
      fgRef.current.rotation.x = THREE.MathUtils.lerp(fgRef.current.rotation.x, targetX * 0.4 + scrollRotation * 1.5, smoothness);
      fgRef.current.rotation.y = THREE.MathUtils.lerp(fgRef.current.rotation.y, targetY * 0.4, smoothness);
    }
  });

  return (
    <>
      <group ref={bgRef}>
        <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade />
      </group>

      <group ref={midRef}>
        <Sparkles count={80} scale={12} size={3} speed={0.2} opacity={0.5} color="#ffffff" />
      </group>

      <group ref={fgRef}>
        <Sparkles count={15} scale={8} size={20} speed={0.1} opacity={0.2} color="#ffffff" noise={0.1} />
        <Sparkles count={6} scale={6} size={40} speed={0.1} opacity={0.1} color="#ffffff" noise={0.1} />
      </group>
    </>
  );
};

export default GyroStars;