'use client';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('Mensaje enviado correctamente');
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">Contacto</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Ponte en contacto con nosotros y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            <div className="bg-white rounded-xl shadow-lg p-10">
              <h2 className="text-4xl font-semibold mb-8">Información de Contacto</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Dirección</h3>
                    <p className="text-xl text-gray-600">
                      Calle Principal 123<br />
                      28001 Madrid, España
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Teléfono</h3>
                    <p className="text-xl text-gray-600">
                      +34 900 123 456<br />
                      +34 910 123 456
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Email</h3>
                    <p className="text-xl text-gray-600">
                      info@poolparadise.com<br />
                      soporte@poolparadise.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Horario</h3>
                    <p className="text-xl text-gray-600">
                      Lunes a Viernes: 9:00 - 20:00<br />
                      Sábados: 10:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-lg p-10">
              <h2 className="text-4xl font-semibold mb-8">Ubicación</h2>
              <div className="aspect-video bg-gray-200 rounded-lg">
                {/* Aquí iría el mapa de Google Maps o similar */}
                <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
                  Mapa de ubicación
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-10">
            <h2 className="text-4xl font-semibold mb-8">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-2xl text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-6 py-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-2xl text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-6 py-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-2xl text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-6 py-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tu teléfono"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-2xl text-gray-700 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-6 py-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Asunto del mensaje"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-2xl text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-6 py-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tu mensaje"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white text-2xl font-semibold px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
