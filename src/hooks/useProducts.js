import { useEffect, useState } from "react"
import { fetchProducts } from "../api/client"

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}