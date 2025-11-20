'use client'

import React from 'react'

interface ColorSelectorProps {
  colors: string[]
  selectedColor: string | null
  onColorChange: (color: string) => void
}

const colorMap: Record<string, { bg: string; border: string; name: string }> = {
  Rojo: { bg: 'bg-red-500', border: 'border-red-700', name: 'Rojo' },
  Morado: { bg: 'bg-purple-500', border: 'border-purple-700', name: 'Morado' },
  Verde: { bg: 'bg-green-500', border: 'border-green-700', name: 'Verde' },
  Blanco: { bg: 'bg-white', border: 'border-gray-300', name: 'Blanco' },
  Naranja: {
    bg: 'bg-orange-500',
    border: 'border-orange-700',
    name: 'Naranja',
  },
  Beige: { bg: 'bg-amber-100', border: 'border-amber-300', name: 'Beige' },
}

export function ColorSelector({
  colors,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        Color
      </label>
      <div className="flex flex-wrap gap-3">
        {colors.map(color => {
          const colorInfo = colorMap[color] || {
            bg: 'bg-gray-400',
            border: 'border-gray-600',
            name: color,
          }

          return (
            <button
              key={color}
              type="button"
              onClick={() => onColorChange(color)}
              className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                colorInfo.bg
              } ${colorInfo.border} ${
                selectedColor === color
                  ? 'ring-4 ring-primary-300 ring-offset-2 scale-110'
                  : 'hover:scale-105'
              } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              aria-label={`Seleccionar color ${colorInfo.name}`}
              aria-pressed={selectedColor === color}
              title={colorInfo.name}
            >
              {selectedColor === color && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white drop-shadow-md"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>
      {selectedColor && (
        <p className="text-sm text-gray-600 mt-2">
          Color seleccionado: {selectedColor}
        </p>
      )}
    </div>
  )
}
