'use client';
import { useState } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="text-5xl font-bold text-blue-600">
            Pool Paradise
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-3xl text-gray-700 hover:text-blue-600">
              Inicio
            </Link>
            <Link href="/productos" className="text-3xl text-gray-700 hover:text-blue-600">
              Productos
            </Link>
            <Link href="/contacto" className="text-3xl text-gray-700 hover:text-blue-600">
              Contacto
            </Link>
            <Link 
              href="/carrito" 
              className="relative text-3xl text-gray-700 hover:text-blue-600"
            >
              <ShoppingCart className="h-10 w-10" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 bg-blue-500 text-white text-xl rounded-full h-8 w-8 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link 
              href="/carrito" 
              className="relative mr-4"
            >
              <ShoppingCart className="h-10 w-10" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 bg-blue-500 text-white text-xl rounded-full h-8 w-8 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? (
                <X className="h-10 w-10" />
              ) : (
                <Menu className="h-10 w-10" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-6 space-y-4">
                <Link
                  href="/"
                  className="block text-3xl text-gray-700 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  href="/productos"
                  className="block text-3xl text-gray-700 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Productos
                </Link>
                <Link
                  href="/contacto"
                  className="block text-3xl text-gray-700 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Contacto
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
