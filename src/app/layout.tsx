import type { Metadata } from "next";
import { Asap } from "next/font/google"; // Importamos Asap
import "./globals.css";

// 1. Configuramos la fuente
const asap = Asap({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Cargamos todos los pesos necesarios
  variable: "--font-asap", // Definimos el nombre de la variable
});

export const metadata: Metadata = {
  title: "Xavi Colomé | Digital Director",
  description: "Portfolio de Estrategia Digital e Innovación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 2. APLICAMOS LA VARIABLE Y FORZAMOS LA CLASE font-sans */}
      <body className={`${asap.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}