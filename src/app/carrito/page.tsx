'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Tu carrito está vacío</h2>
          <p className="text-2xl text-gray-600 mb-8">¡Añade algunos productos para empezar!</p>
          <button
            onClick={() => router.push('/productos')}
            className="bg-blue-500 text-white text-2xl px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-7xl font-bold mb-12">Tu Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-6"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 96px) 100vw, 96px"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-3xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-2xl text-blue-600 font-bold">
                    €{item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Minus className="h-8 w-8" />
                  </button>
                  <span className="text-3xl font-semibold min-w-[3ch] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Plus className="h-8 w-8" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-500"
                >
                  <Trash2 className="h-8 w-8" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <h2 className="text-4xl font-bold mb-6">Resumen del pedido</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-2xl">
                  <span>Subtotal</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-3xl font-bold">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full bg-blue-500 text-white text-3xl font-semibold px-8 py-6 rounded-lg transition-colors flex items-center justify-center gap-3 ${
                  isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
              >
                {isProcessing ? 'Procesando...' : 'Realizar pedido'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
