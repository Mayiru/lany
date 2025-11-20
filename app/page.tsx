import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ProductGrid } from '@/components/sections/ProductGrid'

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Bienvenido a Lany - Productos personalizados para momentos especiales. Bolsas, camisetas, pines, stickers, llaveros y más.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <section className="bg-white py-16" id="sobre-nosotros">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Sobre Nosotros
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              En Lany nos especializamos en crear productos personalizados que
              hacen tus celebraciones y momentos especiales únicos e
              inolvidables.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Desde bolsas personalizadas hasta accesorios decorativos, cada
              producto está hecho con amor y atención al detalle para que
              refleje tu estilo y personalidad.
            </p>
            <a
              href="/about"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Conoce más sobre nosotros
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

