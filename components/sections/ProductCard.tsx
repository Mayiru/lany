'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  showWhatsAppButton?: boolean
}

export function ProductCard({
  product,
  showWhatsAppButton = false,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '573024270876'
  const whatsappMessage = encodeURIComponent(
    `Hola! Me interesa el producto: ${product.name}`
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-t-lg"
        aria-label={`Ver detalles de ${product.name}`}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link
          href={`/product/${product.slug}`}
          className="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        </Link>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            {product.priceRange ? (
              <span className="text-xl font-bold text-primary-600">
                {product.priceRange}
              </span>
            ) : (
              <span className="text-xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          {showWhatsAppButton && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
              aria-label={`Consultar por WhatsApp sobre ${product.name}`}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
