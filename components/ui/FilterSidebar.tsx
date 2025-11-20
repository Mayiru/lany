'use client'

import React from 'react'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterSidebarProps {
  priceRange: { min: number; max: number }
  onPriceChange: (min: number, max: number) => void
  categories: FilterOption[]
  selectedCategories: string[]
  onCategoryToggle: (category: string) => void
  minPrice: number
  maxPrice: number
}

export function FilterSidebar({
  priceRange,
  onPriceChange,
  categories,
  selectedCategories,
  onCategoryToggle,
  minPrice,
  maxPrice,
}: FilterSidebarProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <aside
      className="w-full md:w-64 flex-shrink-0 space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      aria-label="Filtros de productos"
    >
      {/* Filtro de Precio */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Precio</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label
                htmlFor="min-price"
                className="block text-sm text-gray-600 mb-1"
              >
                Desde
              </label>
              <input
                type="number"
                id="min-price"
                min={minPrice}
                max={maxPrice}
                value={priceRange.min}
                onChange={e =>
                  onPriceChange(Number(e.target.value), priceRange.max)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="max-price"
                className="block text-sm text-gray-600 mb-1"
              >
                Hasta
              </label>
              <input
                type="number"
                id="max-price"
                min={minPrice}
                max={maxPrice}
                value={priceRange.max}
                onChange={e =>
                  onPriceChange(priceRange.min, Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
          </div>
        </div>
      </div>

      {/* Filtro de Categoría */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categoría</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label
              key={category.value}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.value)}
                onChange={() => onCategoryToggle(category.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                aria-label={`Filtrar por ${category.label}`}
              />
              <span className="text-gray-700 flex-1">{category.label}</span>
              {category.count !== undefined && (
                <span className="text-sm text-gray-500">
                  ({category.count})
                </span>
              )}
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
