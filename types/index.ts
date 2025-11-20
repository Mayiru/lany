export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  priceRange?: string
  image: string
  category: string
  featured?: boolean
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

