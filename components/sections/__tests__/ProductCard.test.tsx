import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductCard } from '../ProductCard'
import { Product } from '@/types'

const mockProduct: Product = {
  id: '1',
  slug: 'test-product',
  name: 'Test Product',
  description: 'This is a test product',
  price: 10000,
  image: '/images/test.png',
  category: 'Test',
}

describe('ProductCard', () => {
  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('This is a test product')).toBeInTheDocument()
  })

  it('renders price correctly', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText(/COP/)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<ProductCard product={mockProduct} />)
    const link = screen.getByLabelText(/Ver detalles de Test Product/i)
    expect(link).toBeInTheDocument()
  })
})

