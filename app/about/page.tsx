import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description:
    'Conoce más sobre Lany, especialistas en productos personalizados y arte y manualidades para momentos especiales.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sobre Nosotros
          </h1>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Lany - Arte y Manualidades"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestra Historia
            </h2>
            <p className="text-gray-700 mb-4">
              Lany nació de la pasión por crear productos únicos y
              personalizados que hacen que cada celebración sea especial. Nos
              especializamos en arte y manualidades, transformando ideas en
              realidad.
            </p>
            <p className="text-gray-700">
              Cada producto que creamos está hecho con amor y atención al
              detalle, asegurándonos de que refleje la personalidad y el estilo
              de nuestros clientes.
            </p>
          </div>
        </div>

        <div className="bg-primary-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Nuestra Misión
          </h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto">
            Crear productos personalizados de alta calidad que hagan que cada
            momento especial sea único e inolvidable. Nos comprometemos a
            ofrecer excelente servicio al cliente y productos que superen las
            expectativas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Creatividad
            </h3>
            <p className="text-gray-600">
              Diseños únicos y personalizados para cada cliente
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Calidad
            </h3>
            <p className="text-gray-600">
              Productos de alta calidad que duran en el tiempo
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Pasión
            </h3>
            <p className="text-gray-600">
              Cada producto está hecho con amor y dedicación
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

