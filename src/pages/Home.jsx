import { useProducts } from "../hooks/useProducts"
import ProductCard from "../components/ProductCard"
import { useState, useEffect } from "react"

export default function Home() {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  const { products } = useProducts(debouncedSearch)

  return (
    <div className="max-w-[1800px] mx-auto my-12 px-6 md:px-8 lg:px-12">
      <input
        type="text"
        placeholder="Search for a smartphone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pb-[5px] mb-6 md:mb-8 border-0 border-b border-[#222] outline-none text-[13px] font-light bg-transparent text-[#111] placeholder:text-[#aaa] focus:border-black focus:ring-0 appearance-none"
      />

      <p className="text-[11px] mt-4 mb-6 md:mt-6 text-[#010101] ">
        {products.length} RESULTS
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}