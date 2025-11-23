'use client'; // Esto es OBLIGATORIO en App Router para cosas interactivas

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

const FloatingOrb = () => {
  const meshRef = useRef<any>();

  useFrame((state) => {
    const { mouse } = state;
    // Movimiento suave siguiendo el ratón
    if (meshRef.current) {
        // Multiplicamos por un valor pequeño para que rote suavemente
        meshRef.current.rotation.x = mouse.y * 0.5;
        meshRef.current.rotation.y = mouse.x * 0.5;
    }
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2.2} ref={meshRef}>
      <MeshDistortMaterial
        color="#4F46E5" // Electric Indigo
        attach="material"
        distort={0.5} // Cuánto se deforma
        speed={2} // Velocidad del movimiento líquido
        roughness={0.2}
        metalness={0.9} // Acabado metálico brillante
      />
      {/* Luz interna cyan para el brillo */}
      <pointLight position={[10, 10, 10]} intensity={2} color="#06B6D4" />
    </Sphere>
  );
};

export default FloatingOrb;