import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'Cloro Granulado',
    price: 24.99,
    image: '/images/chemicals.jpg',
    category: 'Químicos',
    description: 'Cloro granulado de alta calidad para el mantenimiento de tu piscina'
  },
  {
    id: 2,
    name: 'Bomba de Filtración',
    price: 299.99,
    image: '/images/equipment.jpg',
    category: 'Equipamiento',
    description: 'Bomba de filtración eficiente y silenciosa'
  },
  {
    id: 3,
    name: 'Kit de Limpieza',
    price: 49.99,
    image: '/images/accessories.jpg',
    category: 'Accesorios',
    description: 'Kit completo para la limpieza de tu piscina'
  },
  // Añade más productos aquí
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Nuestros Productos</h1>
      
      {/* Filters */}
      <div className="mb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Todos
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            Químicos
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            Equipamiento
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            Accesorios
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <span className="text-lg font-bold text-blue-600">{product.price}€</span>
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{product.category}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
