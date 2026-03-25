import { useProducts } from "../hooks/useProducts"
import ProductCard from "../components/ProductCard"
import { useState } from "react"

export default function Home() {
  const { products, loading, error } = useProducts()
  const [search, setSearch] = useState("")

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading products</p>

  const filteredProducts = products
  .filter((p) =>
    (p.name + p.brand).toLowerCase().includes(search.toLowerCase())
  )
  .slice(0, 20)

  // Aqui podríamos paginarlos pero en el enunciado me pides mostrar solo 20 resultados.

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>

      <input
        type="text"
        placeholder="Search for a smartphone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <p style={{ marginBottom: "20px", fontSize: "12px", color: "#666" }}>
        {filteredProducts.length} RESULTS
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}