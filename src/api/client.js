const BASE_URL = "https://prueba-tecnica-api-tienda-moviles.onrender.com"

const API_KEY = "87909682e6cd74208f41a6ef39fe4191"

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`, {
    headers: {
      "x-api-key": API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Error fetching products")
  }

  const data = await response.json()

  // quitar duplicados (IMPORTANTE)
  const uniqueProducts = Array.from(
    new Map(data.map(p => [p.id, p])).values()
  )

  return uniqueProducts
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Error fetching product")
  }

  return response.json()
}