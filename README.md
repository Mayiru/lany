# Lany - Tienda de Productos Personalizados

Landing page y mini-tienda moderna para la marca "Lany" especializada en arte y manualidades personalizadas. Construida con Next.js 14 (App Router), TypeScript, Tailwind CSS y las mejores prácticas de desarrollo.

## 🚀 Características

- **Next.js 14** con App Router y React Server Components
- **TypeScript** con configuración estricta
- **Tailwind CSS** para estilos modernos y responsive
- **SWR** para data fetching y cache
- **SEO optimizado** con metadata y JSON-LD
- **Accesibilidad** (WCAG AA) con ARIA labels y navegación por teclado
- **Tests** con Vitest y Testing Library
- **CI/CD** con GitHub Actions
- **Pre-commit hooks** con Husky y lint-staged

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Git

## 🛠️ Instalación

1. **Clonar el repositorio** (si aplica):

   ```bash
   git clone <repository-url>
   cd Lany
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:

   ```bash
   cp .env.local.example .env.local
   ```

   Edita `.env.local` y configura:

   ```env
   NEXT_PUBLIC_API_URL=/api
   NEXT_PUBLIC_WHATSAPP=573024270876
   NEXT_PUBLIC_SITE_URL=http://localhost:3002
   ```

4. **Iniciar el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:3002](http://localhost:3002)

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo en el puerto 3002
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint
- `npm test` - Ejecuta los tests con Vitest
- `npm run format` - Formatea el código con Prettier
- `npm run format:check` - Verifica el formato del código

## 🎨 Personalización

### Cambiar la imagen del Hero

Para cambiar la imagen del hero, edita el componente `components/sections/Hero.tsx` y modifica el estilo de fondo o agrega una imagen usando el componente `next/image`.

### Cambiar el número de WhatsApp

1. Edita el archivo `.env.local`:

   ```env
   NEXT_PUBLIC_WHATSAPP=573024270876
   ```

   (Reemplaza con tu número real, formato: código de país + número sin espacios ni símbolos)

2. Reinicia el servidor de desarrollo para que los cambios surtan efecto.

### Agregar o modificar productos

Los productos están definidos en `lib/products.ts`. Para agregar un nuevo producto:

```typescript
{
  id: 'nuevo-id',
  slug: 'nuevo-producto',
  name: 'Nombre del Producto',
  description: 'Descripción del producto',
  price: 50000,
  image: '/images/nueva-imagen.png',
  category: 'Categoría',
  featured: false, // true para destacarlo
}
```

Luego, agrega la imagen correspondiente en `public/images/`.

## 🧪 Testing

Ejecuta los tests con:

```bash
npm test
```

Para ver la UI de tests:

```bash
npm run test:ui
```

Para generar un reporte de cobertura:

```bash
npm run test:coverage
```

## 🏗️ Estructura del Proyecto

```
Lany/
├── app/                    # App Router de Next.js
│   ├── api/               # Rutas de API
│   ├── product/[slug]/    # Páginas dinámicas de productos
│   ├── about/             # Página "Sobre Nosotros"
│   ├── contact/           # Página de contacto
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/
│   ├── sections/          # Componentes de secciones
│   ├── ui/                # Componentes UI reutilizables
│   └── providers/         # Providers de contexto
├── lib/
│   ├── api.ts             # Servicio de API
│   └── products.ts        # Datos mock de productos
├── types/
│   └── index.ts           # Tipos TypeScript
├── public/
│   └── images/            # Imágenes estáticas
└── .github/
    └── workflows/         # GitHub Actions CI/CD
```

## 🚢 Despliegue en Vercel

### Opción 1: Despliegue desde GitHub

1. **Sube tu código a GitHub**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repositorio>
   git push -u origin main
   ```

2. **Conecta con Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Selecciona tu repositorio
   - Vercel detectará automáticamente Next.js

3. **Configura las variables de entorno**:
   En la configuración del proyecto en Vercel, agrega:
   - `NEXT_PUBLIC_API_URL` = `/api` (o la URL de tu CMS)
   - `NEXT_PUBLIC_WHATSAPP` = Tu número de WhatsApp
   - `NEXT_PUBLIC_SITE_URL` = Tu dominio de Vercel (ej: `https://lany.vercel.app`)

4. **Despliega**:
   - Haz clic en "Deploy"
   - Vercel construirá y desplegará automáticamente

### Opción 2: Despliegue con Vercel CLI

1. **Instala Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Inicia sesión**:

   ```bash
   vercel login
   ```

3. **Despliega**:

   ```bash
   vercel
   ```

4. **Configura variables de entorno**:
   ```bash
   vercel env add NEXT_PUBLIC_WHATSAPP
   vercel env add NEXT_PUBLIC_SITE_URL
   ```

## 🔌 Integración con CMS (Strapi)

El proyecto está preparado para conectarse a un CMS como Strapi. Aquí te explicamos cómo hacerlo:

### 1. Endpoints que debe exponer Strapi

Tu CMS debe exponer los siguientes endpoints:

#### GET `/api/products`

Retorna todos los productos:

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "slug": "camisetas-personalizadas",
        "name": "Camisetas personalizadas",
        "description": "...",
        "price": 35000,
        "image": { "data": { "attributes": { "url": "/uploads/..." } } },
        "category": "Ropa"
      }
    }
  ]
}
```

#### GET `/api/products?filters[slug][$eq]=camisetas-personalizadas`

Retorna un producto por slug.

#### POST `/api/contact-forms`

Recibe formularios de contacto:

```json
{
  "data": {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "3001234567",
    "message": "Mensaje..."
  }
}
```

### 2. Actualizar `lib/api.ts`

Reemplaza las funciones mock con llamadas reales a Strapi:

```typescript
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // Si es necesario
    },
  })
  const data = await res.json()

  // Transformar datos de Strapi al formato esperado
  return data.data.map((item: any) => ({
    id: item.id.toString(),
    slug: item.attributes.slug,
    name: item.attributes.name,
    description: item.attributes.description,
    price: item.attributes.price,
    image: `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.image.data.attributes.url}`,
    category: item.attributes.category,
    featured: item.attributes.featured || false,
  }))
}
```

### 3. Variables de entorno adicionales

Agrega a `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://tu-strapi.com/api
NEXT_PUBLIC_STRAPI_URL=https://tu-strapi.com
STRAPI_API_TOKEN=tu-token-si-es-necesario
```

## 🐛 Solución de Problemas

### Error: "Module not found"

- Asegúrate de haber ejecutado `npm install`
- Verifica que todas las dependencias estén en `package.json`

### Error: "Port 3002 already in use"

- Cambia el puerto en `package.json`: `"dev": "next dev -p 3003"`
- O mata el proceso que está usando el puerto

### Las imágenes no se muestran

- Verifica que las imágenes estén en `public/images/`
- Asegúrate de que las rutas en `lib/products.ts` coincidan con los nombres de archivo

### Tests fallan

- Ejecuta `npm install` para asegurar que todas las dependencias estén instaladas
- Verifica que `vitest.setup.ts` esté configurado correctamente

## 📚 Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de SWR](https://swr.vercel.app/)
- [Documentación de Vitest](https://vitest.dev/)

## 📄 Licencia

Este proyecto es privado y propiedad de Lany.

## 👥 Contribución

Para contribuir al proyecto:

1. Crea una rama desde `main`
2. Realiza tus cambios
3. Ejecuta `npm run lint` y `npm test`
4. Crea un Pull Request

Los pre-commit hooks ejecutarán automáticamente lint-staged antes de cada commit.

---

**Desarrollado con ❤️ para Lany - Arte y Manualidades**
