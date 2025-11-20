'use client'

import React, { useState } from 'react'
import { Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { ImageGallery } from '@/components/product/ImageGallery'
import { SizeSelector } from '@/components/product/SizeSelector'
import { ColorSelector } from '@/components/product/ColorSelector'

interface ProductPageClientProps {
  product: Product
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Preparar imágenes para la galería
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image, product.image, product.image]

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '573024270876'

  const buildWhatsAppMessage = () => {
    let message = `Hola! Me gustaría validar disponibilidad de ${product.name.toLowerCase()}`

    if (selectedSize) {
      message += ` talla ${selectedSize}`
    }

    if (selectedColor) {
      message += ` color ${selectedColor.toLowerCase()}`
    }

    return encodeURIComponent(message)
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a
                  href="/"
                  className="hover:text-primary-600 transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>/</li>
              <li>
                <a
                  href="/#productos"
                  className="hover:text-primary-600 transition-colors"
                >
                  Productos
                </a>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Galería de imágenes */}
            <div>
              <ImageGallery images={productImages} productName={product.name} />
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              {/* Título y categoría */}
              <div>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                  {product.category}
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
              </div>

              {/* Precio */}
              <div className="py-6 border-y border-gray-200">
                {product.priceRange ? (
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">
                      Precio
                    </span>
                    <span className="text-4xl font-bold text-primary-600">
                      {product.priceRange}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">
                      Precio
                    </span>
                    <span className="text-4xl font-bold text-primary-600">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Descripción */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Descripción
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Selector de tallas */}
              {product.sizes && product.sizes.length > 0 && (
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSizeChange={setSelectedSize}
                />
              )}

              {/* Selector de colores */}
              {product.colors && product.colors.length > 0 && (
                <ColorSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
              )}

              {/* Botones de acción */}
              <div className="space-y-4 pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-lg shadow-lg hover:shadow-xl"
                  aria-label="Contactar por WhatsApp para este producto"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Consultar en WhatsApp
                </a>
                <Button
                  href="/#productos"
                  variant="outline"
                  className="w-full text-lg py-4"
                >
                  Ver más productos
                </Button>
              </div>

              {/* Información adicional */}
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 block mb-1">Categoría</span>
                    <span className="font-medium text-gray-900">
                      {product.category}
                    </span>
                  </div>
                  {product.featured && (
                    <div>
                      <span className="text-gray-600 block mb-1">Estado</span>
                      <span className="font-medium text-primary-600">
                        Producto destacado
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
