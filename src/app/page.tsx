'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart, Product } from '@/context/CartContext';

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Bomba DAB Europro 50 M',
    price: 299.99,
    image: '/images/bomba-dab-europro-50-m.jpg',
    category: 'Equipamiento',
    description: 'Bomba de alto rendimiento para piscinas'
  },
  {
    id: 2,
    name: 'Llave de Ajuste Toro Precision',
    price: 24.99,
    image: '/images/llave-ajuste-boquilla-riego-toro-precision-rotating.jpg',
    category: 'Herramientas',
    description: 'Llave de ajuste profesional'
  },
  {
    id: 3,
    name: 'Bromo en Pastillas Quimicamp',
    price: 39.99,
    image: '/images/bromo-pastillas-quimicamp-1kg.jpg',
    category: 'Químicos',
    description: 'Pastillas de bromo de 1kg'
  }
];

const heroImages = [
  '/images/hero1.jpeg',
  '/images/hero2.jpeg',
  '/images/hero3.jpeg',
  '/images/hero4.jpeg',
  '/images/hero5.jpeg'
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        {heroImages.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </motion.div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-8xl font-bold text-white mb-8"
            >
              Pool Paradise
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-4xl text-white mb-12"
            >
              Todo lo que necesitas para tu piscina en un solo lugar
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              onClick={() => router.push('/productos')}
              className="bg-blue-500 text-white text-3xl font-semibold px-12 py-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Ver productos
            </motion.button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-16">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="p-8">
                  <h3 className="text-4xl font-semibold mb-4">{product.name}</h3>
                  <p className="text-2xl text-gray-600 mb-6">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-blue-600">
                      €{product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-500 text-white text-2xl px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-6xl font-bold mb-8">¿Listo para empezar?</h2>
          <p className="text-3xl mb-12">
            Descubre nuestra amplia selección de productos para piscinas
          </p>
          <button
            onClick={() => router.push('/productos')}
            className="bg-white text-blue-500 text-3xl font-semibold px-12 py-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explorar catálogo
          </button>
        </div>
      </section>
    </main>
  );
}
