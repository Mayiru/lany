'use client'

import React from 'react'
import useSWR from 'swr'
import { Product } from '@/types'
import { getProducts } from '@/lib/api'
import { ProductCard } from './ProductCard'

export function ProductGrid() {
  const { data: products, error, isLoading } = useSWR<Product[]>(
    'products',
    getProducts
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-lg aspect-square"
            />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600">
          Error al cargar los productos. Por favor, intenta de nuevo más tarde.
        </p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">No hay productos disponibles.</p>
      </div>
    )
  }

  return (
    <section
      id="productos"
      className="container mx-auto px-4 py-12"
      aria-label="Catálogo de productos"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Nuestros Productos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

