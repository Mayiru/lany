import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label={`Ver detalles de ${product.name}`}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          {product.priceRange ? (
            <span className="text-lg font-bold text-primary-600">
              {product.priceRange}
            </span>
          ) : (
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
          )}
          <span className="text-sm text-gray-500">Ver más →</span>
        </div>
      </div>
    </Link>
  )
}

