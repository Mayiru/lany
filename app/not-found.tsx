import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">
        Página no encontrada
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Button href="/">Volver al inicio</Button>
    </div>
  )
}
