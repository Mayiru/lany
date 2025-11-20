import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <Link
              href="/"
              className="flex items-center space-x-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            >
              <Image
                src="/images/logo.png"
                alt="Lany - Arte y Manualidades"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="text-xl font-bold text-white">Lany</span>
            </Link>
            <p className="text-sm">
              Arte y Manualidades personalizadas para hacer tus momentos
              especiales únicos.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/#productos"
                  className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <p className="text-sm mb-2">
              ¿Tienes alguna pregunta o quieres un producto personalizado?
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Contáctanos
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} Lany - Arte y Manualidades. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

