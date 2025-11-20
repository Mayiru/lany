import { NextRequest, NextResponse } from 'next/server'
import { mockProducts } from '@/lib/products'
import { Product } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')
    const id = searchParams.get('id')

    if (slug) {
      const product = mockProducts.find((p) => p.slug === slug)
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ product })
    }

    if (id) {
      const product = mockProducts.find((p) => p.id === id)
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ product })
    }

    return NextResponse.json({ products: mockProducts })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

