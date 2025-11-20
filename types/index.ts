export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  priceRange?: string
  image: string
  images?: string[] // Galería de imágenes adicionales
  category: string
  featured?: boolean
  sizes?: string[] // Tallas disponibles (ej: ['S', 'M', 'L', 'XL'])
  colors?: string[] // Colores disponibles
}

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  ok: boolean
}
