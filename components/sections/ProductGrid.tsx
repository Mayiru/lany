'use client'

import React, { useMemo, useState } from 'react'
import useSWR from 'swr'
import { Product } from '@/types'
import { getProducts } from '@/lib/api'
import { ProductCard } from './ProductCard'
import { SearchBar } from '@/components/ui/SearchBar'
import { FilterSidebar } from '@/components/ui/FilterSidebar'
import { SortSelect, SortOption } from '@/components/ui/SortSelect'
import { ActiveFilters } from '@/components/ui/ActiveFilters'

export function ProductGrid() {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR<Product[]>('products', getProducts)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
  const [sortOption, setSortOption] = useState<SortOption>('popular')

  // Calcular estadísticas de productos
  const productStats = useMemo(() => {
    if (!products) return { minPrice: 0, maxPrice: 100000, categories: [] }

    const prices = products.filter(p => !p.priceRange).map(p => p.price)
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 100000

    const categoryMap = new Map<string, number>()
    products.forEach(product => {
      const count = categoryMap.get(product.category) || 0
      categoryMap.set(product.category, count + 1)
    })

    const categories = Array.from(categoryMap.entries()).map(
      ([value, count]) => ({
        value,
        label: value,
        count,
      })
    )

    return { minPrice, maxPrice, categories }
  }, [products])

  // Inicializar rango de precios
  React.useEffect(() => {
    if (productStats.maxPrice > 0) {
      setPriceRange({
        min: productStats.minPrice,
        max: productStats.maxPrice,
      })
    }
  }, [productStats.minPrice, productStats.maxPrice])

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return []

    let filtered = [...products]

    // Filtro de búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
    }

    // Filtro de categorías
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      )
    }

    // Filtro de precio
    filtered = filtered.filter(product => {
      if (product.priceRange) {
        // Para productos con rango de precio, usar el precio base
        return (
          product.price >= priceRange.min && product.price <= priceRange.max
        )
      }
      return product.price >= priceRange.min && product.price <= priceRange.max
    })

    // Ordenamiento
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name-asc':
          return a.name.localeCompare(b.name, 'es')
        case 'name-desc':
          return b.name.localeCompare(a.name, 'es')
        case 'popular':
        default:
          // Los destacados primero, luego por nombre
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.name.localeCompare(b.name, 'es')
      }
    })

    return sorted
  }, [products, searchQuery, selectedCategories, priceRange, sortOption])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setPriceRange({
      min: productStats.minPrice,
      max: productStats.maxPrice,
    })
  }

  const activeFilters = useMemo(() => {
    const filters: Array<{ label: string; onRemove: () => void }> = []

    if (searchQuery.trim()) {
      filters.push({
        label: `Búsqueda: "${searchQuery}"`,
        onRemove: () => setSearchQuery(''),
      })
    }

    selectedCategories.forEach(category => {
      filters.push({
        label: category,
        onRemove: () => {
          setSelectedCategories(prev => prev.filter(c => c !== category))
        },
      })
    })

    if (
      priceRange.min !== productStats.minPrice ||
      priceRange.max !== productStats.maxPrice
    ) {
      filters.push({
        label: `Precio: ${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()}`,
        onRemove: () =>
          setPriceRange({
            min: productStats.minPrice,
            max: productStats.maxPrice,
          }),
      })
    }

    return filters
  }, [searchQuery, selectedCategories, priceRange, productStats])

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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Catálogo de Productos
        </h2>

        {/* Barra de búsqueda y ordenamiento */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Buscar entre ${products.length} productos`}
              totalProducts={filteredAndSortedProducts.length}
            />
          </div>
          <div className="flex items-center gap-4">
            <SortSelect value={sortOption} onChange={setSortOption} />
          </div>
        </div>

        {/* Filtros activos */}
        <ActiveFilters
          filters={activeFilters}
          onClearAll={handleClearFilters}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar de filtros */}
        <FilterSidebar
          priceRange={priceRange}
          onPriceChange={(min, max) => setPriceRange({ min, max })}
          categories={productStats.categories}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          minPrice={productStats.minPrice}
          maxPrice={productStats.maxPrice}
        />

        {/* Grid de productos */}
        <div className="flex-1">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-2">
                No se encontraron productos
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Intenta ajustar tus filtros de búsqueda
              </p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showWhatsAppButton={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
