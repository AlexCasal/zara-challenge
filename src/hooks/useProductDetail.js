import { useEffect, useState } from "react"
import { fetchProductById } from "../api/client"

export function useProductDetail(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    fetchProductById(id)
      .then(setProduct)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}