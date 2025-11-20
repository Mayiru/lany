import React from 'react'

export type SortOption =
  | 'popular'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Más populares' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name-asc', label: 'Nombre: A-Z' },
  { value: 'name-desc', label: 'Nombre: Z-A' },
]

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">
        Ordenar por:
      </label>
      <select
        id="sort"
        value={value}
        onChange={e => onChange(e.target.value as SortOption)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
        aria-label="Ordenar productos"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
