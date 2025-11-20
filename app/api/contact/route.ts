import { NextRequest, NextResponse } from 'next/server'
import { ContactPayload } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json()

    // Validación básica
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields', ok: false },
        { status: 400 }
      )
    }

    // Validación de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format', ok: false },
        { status: 400 }
      )
    }

    // TODO: Aquí deberías guardar en tu CMS o enviar un email
    // Ejemplo con Strapi:
    // await fetch(`${process.env.STRAPI_API_URL}/api/contact-forms`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
    //   },
    //   body: JSON.stringify(body)
    // })

    // Por ahora, solo simulamos éxito
    return NextResponse.json({
      ok: true,
      message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error', ok: false },
      { status: 500 }
    )
  }
}

