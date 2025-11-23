'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei'; // Importamos Sparkles también
import * as THREE from 'three';

const GyroStars = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [hasGyro, setHasGyro] = useState(false);

  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
        if (!event.beta || !event.gamma) return;
        setHasGyro(true);
        const x = (event.beta || 0) / 40; 
        const y = (event.gamma || 0) / 40;
        setTargetRotation({ x, y });
    };
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.01; // Rotación muy lenta

      let targetX = targetRotation.x;
      let targetY = targetRotation.y;

      if (!hasGyro) {
        targetX = -pointer.y * 0.3; // Un poco más sutil
        targetY = pointer.x * 0.3;
      }

      const smoothness = hasGyro ? 0.05 : 0.1;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        smoothness
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        smoothness
      );
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* CAPA 1: Fondo lejano (El Universo) 
          factor={4} hace que el "ruido" de fondo sea visible pero pequeño.
      */}
      <Stars 
        radius={80} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />

      {/* CAPA 2: Estrellas GRANDES y cercanas (El primer plano) 
          size={6}: Tamaño máximo (serán aleatorias entre 0 y 6)
          scale={12}: Ocupan un espacio amplio
          opacity={0.8}: Brillan más
          noise={1}: Añade variación de movimiento
      */}
      <Sparkles 
        count={70} 
        scale={12} 
        size={6} 
        speed={0.4} 
        opacity={1} 
        color="#ffffff"
      />
      
      {/* CAPA 3: Unas pocas estrellas GIGANTES y desenfocadas (Efecto Bokeh/Cine) 
          Estas son muy pocas (solo 15) pero muy grandes, dan sensación de cercanía.
      */}
      <Sparkles 
        count={15} 
        scale={10} 
        size={15} 
        speed={0.2} 
        opacity={0.5} 
        color="#cyan" // Un toque sutil azulado
      />

    </group>
  );
};

export default GyroStars;