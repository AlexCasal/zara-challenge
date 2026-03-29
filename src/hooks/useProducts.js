import { useEffect, useState } from "react"
import { fetchProducts } from "../api/client"

export function useProducts(search = "") {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    fetchProducts(search)
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [search])

  return { products, loading, error }
}