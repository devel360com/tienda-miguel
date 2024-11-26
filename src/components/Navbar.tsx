'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Pool Paradise</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Inicio
            </Link>
            <Link href="/productos" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Productos
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Contacto
            </Link>
            <button className="flex items-center text-gray-700 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              <span className="ml-2">Carrito (0)</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/contacto"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="ml-2">Carrito (0)</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
