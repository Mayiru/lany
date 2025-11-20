import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '../Header'

describe('Header', () => {
  it('renders the logo and brand name', () => {
    render(<Header />)
    expect(screen.getByText('Lany')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Productos')).toBeInTheDocument()
    expect(screen.getByText('Sobre Nosotros')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('has proper ARIA labels', () => {
    render(<Header />)
    const nav = screen.getByRole('banner')
    expect(nav).toBeInTheDocument()
  })
})

