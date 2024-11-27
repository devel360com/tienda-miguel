import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from '@/context/CartContext';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pool Paradise - Tu tienda de piscinas",
  description: "Encuentra todo lo que necesitas para tu piscina en un solo lugar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 font-montserrat`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Pool Paradise</h3>
                  <p className="text-gray-600">Tu tienda de confianza para todo lo relacionado con piscinas.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
                  <ul className="space-y-2">
                    <li><a href="/productos" className="text-gray-600 hover:text-blue-600">Productos</a></li>
                    <li><a href="/contacto" className="text-gray-600 hover:text-blue-600">Contacto</a></li>
                    <li><a href="/about" className="text-gray-600 hover:text-blue-600">Sobre Nosotros</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Email: info@poolparadise.com</li>
                    <li>Teléfono: +34 900 123 456</li>
                    <li>Dirección: Calle Principal 123, Madrid</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} Pool Paradise. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
