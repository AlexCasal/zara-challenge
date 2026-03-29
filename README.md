# 📱 Zara Challenge

Aplicación web SPA desarrollada como prueba técnica para la visualización, búsqueda y gestión de un catálogo de teléfonos móviles.

---

## 🌍 Demo

https://zara-challenge-rouge.vercel.app/

---

## 🚀 Tecnologías

* React
* Vite
* Tailwind CSS
* React Router
* Context API

---

## 🏗️ Arquitectura

El proyecto sigue una arquitectura basada en separación de responsabilidades:

* **api/** → gestión de llamadas a la API
* **hooks/** → lógica reutilizable (custom hooks)
* **components/** → componentes reutilizables de UI
* **pages/** → vistas principales de la aplicación
* **context/** → gestión de estado global (carrito)

Esta estructura facilita la escalabilidad y el mantenimiento del código.

---

## 🧩 Funcionalidades

### 📋 Listado de productos

* Visualización de los primeros productos obtenidos desde la API
* Buscador en tiempo real mediante filtrado por API
* Contador de resultados
* Navegación a detalle de producto

### 📱 Detalle de producto

* Selección de color y almacenamiento
* Actualización dinámica de precio
* Imagen dinámica según color seleccionado
* Cálculo de precio mínimo en función de variantes
* Productos similares

### 🛒 Carrito

* Añadir productos con variantes seleccionadas
* Persistencia mediante `localStorage`
* Eliminación de productos
* Cálculo de precio total

---

## 🧠 Decisiones técnicas

### 🔎 Filtrado de productos

El filtrado se realiza mediante la API utilizando parámetros de búsqueda, evitando el filtrado en cliente para mejorar la escalabilidad.

### 💰 Gestión de precios

* En el listado se muestra el `basePrice` como precio inicial.
* En la vista de detalle se calcula el precio mínimo real a partir de las opciones de almacenamiento.

### 🛒 Identificación de productos en carrito

Se utiliza un identificador único (`cartId`) generado en frontend para evitar conflictos al manejar productos duplicados.

### ⚡ Optimización de peticiones

Se implementa debounce en el buscador para evitar múltiples llamadas a la API por cada pulsación.

---

## 🌐 API

La aplicación consume una API externa protegida mediante API Key.

Todas las peticiones incluyen el header:

```
x-api-key: 87909682e6cd74208f41a6ef39fe4191
```

---

## ⚙️ Modos de ejecución

### Desarrollo

```bash
npm run dev
```

* Assets sin minimizar
* Hot reload activo

### Producción

```bash
npm run build
```

* Código optimizado y minificado

---

## 🐳 Docker

### Development

```bash
docker compose up
```

### Production

```bash
docker build -t zara-challenge .
docker run -p 3000:3000 zara-challenge
```

---

## 📦 Despliegue

La aplicación está desplegada en Vercel, ejecutando automáticamente el proceso de build en cada push a la rama principal.

---

## ♿ Accesibilidad

Se han aplicado mejoras básicas de accesibilidad:

* Uso de atributos `aria-label`
* Mejora en descripciones de imágenes (`alt`)
* Navegación accesible

---

### ⚠️ Mixed Content Warning

En entorno de producción puede aparecer una advertencia de "Mixed Content" en la consola del navegador.

Esto se debe a que la API proporciona algunas imágenes con URLs en protocolo `http`, mientras que la aplicación se sirve bajo `https`.

El navegador actualiza automáticamente estas peticiones a `https`, por lo que no afecta al funcionamiento de la aplicación.

Dado que se trata de un recurso externo (API), no se ha modificado este comportamiento.

---

### 🧪 Testing

Se han implementado tests unitarios con Vitest y Testing Library para validar:

- Renderizado de productos
- Interacción de usuario (añadir al carrito)
- Cálculo de totales

---

## 📌 Mejoras futuras

* Mejora de accesibilidad avanzada
* Optimización de rendimiento
* Paginación o lazy loading