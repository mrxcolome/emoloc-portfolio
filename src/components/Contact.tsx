'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <footer className="relative py-20 px-6 bg-black text-white overflow-hidden">
      
      {/* Fondo con degradado sutil inferior */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <p className="text-cyan-400 font-mono mb-4 tracking-widest uppercase text-sm">
                Available for new challenges
            </p>
            <h2 className="text-5xl md:text-8xl font-black font-custom-innovative tracking-tighter mb-10 uppercase">
                XAVI <br className="md:hidden" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">COLOMÉ</span>
            </h2>
        </motion.div>

        {/* Botón de contacto estilo Neón */}
       <motion.a 
            href="mailto:xavi@emoloc.com" // <--- TU EMAIL REAL
            // ... resto de propiedades ...
        >
            CONTACTAR
            <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">→</span>
        </motion.a>

        {/* Enlaces Sociales reales */}
        <div className="mt-24 flex flex-col md:flex-row justify-between items-center border-t border-gray-900 pt-10 text-gray-500 text-sm">
            <p>© 2025 Xavi Colomé. Emoloc.</p>
            
            <div className="flex space-x-8 mt-4 md:mt-0 font-mono">
                <a href="https://linkedin.com/in/xavicolome" target="_blank" className="hover:text-white transition-colors">LINKEDIN</a>
                <a href="https://instagram.com/xcolome" target="_blank" className="hover:text-white transition-colors">INSTAGRAM</a>
                <a href="https://twitter.com/xcolome" target="_blank" className="hover:text-white transition-colors">TWITTER</a>
            </div>
        </div>

      </div>
    </footer>
  );
}