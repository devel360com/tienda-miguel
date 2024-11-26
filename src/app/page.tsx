import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Bienvenido a Pool Paradise</h1>
        <p className="text-xl mb-8">Todo lo que necesitas para tu piscina en un solo lugar</p>
        <Link 
          href="/productos" 
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Ver Productos
        </Link>
      </section>

      {/* Featured Categories */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: 'Químicos',
            image: '/images/chemicals.jpg',
            description: 'Mantén tu piscina limpia y segura'
          },
          {
            title: 'Equipamiento',
            image: '/images/equipment.jpg',
            description: 'Bombas, filtros y más'
          },
          {
            title: 'Accesorios',
            image: '/images/accessories.jpg',
            description: 'Todo para disfrutar al máximo'
          }
        ].map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto bg-gray-50 rounded-xl p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Envío Gratis</h3>
            <p className="text-gray-600">En pedidos superiores a 100€</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Asesoramiento</h3>
            <p className="text-gray-600">Expertos a tu disposición</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Garantía</h3>
            <p className="text-gray-600">Satisfacción garantizada</p>
          </div>
        </div>
      </section>
    </main>
  )
}
