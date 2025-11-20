import { describe, it, expect } from 'vitest'
import { POST } from '../contact/route'
import { NextRequest } from 'next/server'

describe('POST /api/contact', () => {
  it('returns success for valid contact form', async () => {
    const body = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.ok).toBe(true)
    expect(data.message).toBeDefined()
  })

  it('returns error for missing required fields', async () => {
    const body = {
      name: 'Test User',
      // Missing email and message
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.ok).toBe(false)
    expect(data.error).toBeDefined()
  })

  it('returns error for invalid email format', async () => {
    const body = {
      name: 'Test User',
      email: 'invalid-email',
      message: 'Test message',
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.ok).toBe(false)
    expect(data.error).toBeDefined()
  })
})
