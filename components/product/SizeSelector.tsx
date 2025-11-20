'use client'

import React from 'react'

interface SizeSelectorProps {
  sizes: string[]
  selectedSize: string | null
  onSizeChange: (size: string) => void
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        Talla <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <button
            key={size}
            type="button"
            onClick={() => onSizeChange(size)}
            className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
              selectedSize === size
                ? 'border-primary-600 bg-primary-50 text-primary-700 ring-2 ring-primary-200'
                : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:bg-primary-50'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            aria-label={`Seleccionar talla ${size}`}
            aria-pressed={selectedSize === size}
          >
            {size}
          </button>
        ))}
      </div>
      {!selectedSize && (
        <p className="text-sm text-red-600 mt-2">
          Por favor selecciona una talla
        </p>
      )}
    </div>
  )
}
