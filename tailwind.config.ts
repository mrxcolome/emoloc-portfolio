import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // AQUÍ ESTÁ LA MAGIA: Conectamos 'sans' con la variable de Asap
        sans: ['var(--font-asap)', 'sans-serif'],
        // Mantenemos esta por si acaso, apuntando a lo mismo
        'custom-innovative': ['var(--font-asap)', 'sans-serif'], 
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;