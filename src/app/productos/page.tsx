'use client';
import { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import ProductImage from '@/components/ProductImage';
import ProductSkeleton from '@/components/ProductSkeleton';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Bomba DAB Europro 50 M',
    price: 299.99,
    image: '/images/bomba-dab-europro-50-m.jpg',
    category: 'Equipamiento',
    description: 'Bomba de alto rendimiento para piscinas con máxima eficiencia energética'
  },
  {
    id: 2,
    name: 'Llave de Ajuste Toro Precision',
    price: 24.99,
    image: '/images/llave-ajuste-boquilla-riego-toro-precision-rotating.jpg',
    category: 'Herramientas',
    description: 'Llave de ajuste profesional para un mantenimiento preciso'
  },
  {
    id: 3,
    name: 'Bromo en Pastillas Quimicamp',
    price: 39.99,
    image: '/images/bromo-pastillas-quimicamp-1kg.jpg',
    category: 'Químicos',
    description: 'Pastillas de bromo de 1kg para un tratamiento efectivo del agua'
  },
  {
    id: 4,
    name: 'Piscina Elevada Summer Oasis',
    price: 1299.99,
    image: '/images/piscina-elevada-madera-summer-oasis.jpg',
    category: 'Piscinas',
    description: 'Piscina elevada de madera con diseño elegante y gran durabilidad'
  },
  {
    id: 5,
    name: 'Skimmer Premium',
    price: 79.99,
    image: '/images/496-small_default.jpg',
    category: 'Equipamiento',
    description: 'Skimmer de alta calidad para una limpieza eficiente de la superficie del agua'
  }
];

const categories = ['Todos', 'Equipamiento', 'Herramientas', 'Químicos', 'Piscinas'] as const;
type Category = typeof categories[number];

const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return selectedCategory === 'Todos'
      ? products
      : products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleCategoryChange = (category: Category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-7xl font-bold mb-12">Nuestros Productos</h1>

        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-8 py-4 text-3xl rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <>
                {[...Array(6)].map((_, index) => (
                  <ProductSkeleton key={`skeleton-${index}`} />
                ))}
              </>
            ) : (
              <>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
                    layout
                  >
                    <ProductImage src={product.image} alt={product.name} />

                    <div className="p-8 flex-1 flex flex-col">
                      <h2 className="text-4xl font-semibold mb-2">{product.name}</h2>
                      <div className="mb-4">
                        <StarRating />
                      </div>
                      <p className="text-3xl text-gray-600">{product.description}</p>
                      
                      <div className="mt-auto space-y-4">
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-4xl font-bold text-blue-600">€{product.price.toFixed(2)}</span>
                          <span className="text-2xl text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                            {product.category}
                          </span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-blue-500 text-white text-3xl font-semibold px-8 py-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-3"
                        >
                          <ShoppingCart className="h-8 w-8" />
                          Añadir al carrito
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
