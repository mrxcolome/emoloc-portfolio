'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const GyroStars = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree(); // Para detectar ratón/touch si no hay giroscopio

  // Estado para guardar la inclinación objetivo
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  // Estado para saber si tenemos acceso al giroscopio
  const [hasGyro, setHasGyro] = useState(false);

  useEffect(() => {
    // Esta función maneja los datos del giroscopio si están disponibles
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
        if (!event.beta || !event.gamma) return;
        setHasGyro(true); // ¡Hemos detectado datos!

        // Beta es la inclinación adelante/atrás (Eje X)
        // Gamma es la inclinación izquierda/derecha (Eje Y)
        // Dividimos por un factor alto (ej: 40) para que el movimiento sea sutil y elegante, no mareante.
        const x = (event.beta || 0) / 40; 
        const y = (event.gamma || 0) / 40;
        
        setTargetRotation({ x, y });
    };

    // Intentamos añadir el "escuchador" del movimiento del móvil
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    // Limpieza al salir
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // 1. ROTACIÓN AUTOMÁTICA SUAVE (Para que siempre esté vivo)
      groupRef.current.rotation.z += delta * 0.02; // Gira lentamente sobre sí mismo

      let targetX = targetRotation.x;
      let targetY = targetRotation.y;

      // 2. SI NO HAY GIROSCOPIO (Desktop o iPhone sin permiso), usamos el ratón/touch
      if (!hasGyro) {
        // Usamos la posición del puntero (ratón o dedo)
        // Multiplicamos por 0.5 para que sea sutil
        targetX = -pointer.y * 0.5;
        targetY = pointer.x * 0.5;
      }

      // 3. INTERPOLACIÓN (La clave de la suavidad)
      // En lugar de saltar a la nueva posición, nos movemos un 5% hacia ella en cada frame.
      // Esto elimina los temblores del sensor del móvil.
      const smoothness = hasGyro ? 0.05 : 0.1; // Más suave en móvil, más rápido en desktop
      
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
      {/* Componente de Estrellas optimizado de 'drei'.
        radius: Qué tan lejos están.
        depth: Sensación de profundidad 3D.
        count: Cuántas estrellas.
        factor: Tamaño de las estrellas.
        saturation: 0 es blanco y negro, 1 es color completo.
      */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
      />
    </group>
  );
};

export default GyroStars;