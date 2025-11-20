import { Product, ContactPayload, ApiResponse } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

/**
 * Obtiene todos los productos
 * 
 * TODO: Cuando conectes un CMS (ej: Strapi), reemplaza esta función para hacer:
 * const res = await fetch(`${API_URL}/products?populate=*`)
 * return res.json()
 */
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  const data = await res.json()
  return data.products || []
}

/**
 * Obtiene un producto por su slug
 * 
 * TODO: Cuando conectes un CMS, reemplaza para hacer:
 * const res = await fetch(`${API_URL}/products?filters[slug][$eq]=${slug}&populate=*`)
 * return res.json()
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/products?slug=${slug}`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    return null
  }
  const data = await res.json()
  return data.product || null
}

/**
 * Obtiene un producto por su ID
 * 
 * TODO: Cuando conectes un CMS, reemplaza para hacer:
 * const res = await fetch(`${API_URL}/products/${id}?populate=*`)
 * return res.json()
 */
export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    return null
  }
  const data = await res.json()
  return data.product || null
}

/**
 * Envía un formulario de contacto
 * 
 * TODO: Cuando conectes un CMS, reemplaza para hacer:
 * const res = await fetch(`${API_URL}/contact-forms`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(payload)
 * })
 * return res.json()
 */
export async function submitContact(
  payload: ContactPayload
): Promise<ApiResponse<{ message: string }>> {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    return {
      ok: false,
      error: 'Failed to submit contact form',
    }
  }

  const data = await res.json()
  return {
    ok: true,
    data: { message: data.message || 'Mensaje enviado correctamente' },
  }
}

