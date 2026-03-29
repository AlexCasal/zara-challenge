import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useProductDetail } from "../hooks/useProductDetail"
import { useProducts } from "../hooks/useProducts"
import ProductCard from "../components/ProductCard"
import { useCart } from "../context/CartContext"

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { product, loading, error } = useProductDetail(id)
    const { products } = useProducts()

    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedStorage, setSelectedStorage] = useState(null)

    const scrollRef = useRef(null)
    const [scrollProgress, setScrollProgress] = useState(0)

    const { addToCart } = useCart()

    useEffect(() => {
        if (product) {
            setSelectedColor(product.colorOptions[0])
            setSelectedStorage(null)
        }
    }, [product])

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const handleScroll = () => {
            const scrollLeft = el.scrollLeft
            const maxScroll = el.scrollWidth - el.clientWidth

            const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0

            setScrollProgress(progress)
        }

        handleScroll()

        el.addEventListener("scroll", handleScroll)

        return () => el.removeEventListener("scroll", handleScroll)
    }, [])
    //Filtramos prodctos similares
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error loading product</p>
    if (!product) return null

    const similarProducts = (products ?? [])
    .filter(p => p.brand === product.brand && p.id !== product.id)
    .slice(0, 5)

    const image =
        selectedColor?.imageUrl || product?.colorOptions?.[0]?.imageUrl

    const finalPrice = selectedStorage?.price || product.basePrice

    const minPrice = Math.min(
        ...(product.storageOptions ?? []).map((s) => s.price)
    )

    const hasSelectedStorage = !!selectedStorage

    if (!product) return null

    return (
        <div>
            <div className="bg-[#ffffff] min-h-screen px-6 md:px-8 lg:px-12">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 px-9 text-s text-gray-600 hover:text-black transition"
                >
                    <span className="text-lg">‹</span>
                    BACK
                </button>
                {/* TOP */}
                <div className="max-w-[1400px] mx-auto py-8">
                    <div className="grid md:grid-cols-[1.2fr_1fr] gap-24 items-stretch">

                        {/* IMAGE */}
                        <div>
                            <img
                                src={image}
                                alt={product.name}
                                className="w-full object-contain"
                            />
                        </div>

                        {/* INFO */}
                        <div className="flex items-center">
                            <div className="space-y-12 max-w-[500px]">

                                <div>
                                    <h1 className="text-xl font-medium uppercase">
                                        {product.name}
                                    </h1>

                                    <p className="text-l py-3">
                                        {hasSelectedStorage
                                            ? `${selectedStorage.price} EUR`
                                            : `From ${minPrice} EUR`}
                                    </p>
                                </div>

                                {/* STORAGE */}
                                <div className="mb-6">
                                    <p className="text-xs text-gray-500 mb-2 uppercase">
                                        Storage ¿How much space do you need?
                                    </p>

                                    <div className="flex">
                                        {product?.storageOptions.map((storage) => (
                                            <button
                                                key={storage.capacity}
                                                onClick={() => setSelectedStorage(storage)}
                                                className={`px-6 py-5 text-sm border ${selectedStorage?.capacity === storage.capacity
                                                    ? "border-black"
                                                    : "border-gray-300"
                                                    }`}
                                            >
                                                {storage.capacity}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* COLORS */}
                                <div className="mb-6">
                                    <p className="text-xs text-gray-500 mb-2 uppercase">
                                        Color. Pick your favourite.
                                    </p>

                                    <div className="flex gap-2">
                                        {product?.colorOptions.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => setSelectedColor(color)}
                                                className={`p-[2px] ${selectedColor?.name === color.name
                                                    ? "border border-black"
                                                    : "border border-gray-300"
                                                    }`}
                                            >
                                                <div
                                                    className="w-6 h-6"
                                                    style={{ backgroundColor: color.hexCode }}
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {selectedColor && (
                                        <p className="text-xs mt-2 text-gray-500">
                                            {selectedColor.name}
                                        </p>
                                    )}
                                </div>

                                {/* BUTTON */}
                                {/* CartID ---> Como medida de seguridad para evitar confilctos con los duplicados */}
                                <button
                                    className="w-full bg-black text-white py-3 text-sm mt-6 disabled:bg-gray-100 uppercase"
                                    disabled={!selectedColor || !selectedStorage}
                                    onClick={() =>
                                        addToCart({
                                          id: product.id,
                                          name: product.name,
                                          brand: product.brand,
                                          price: finalPrice,
                                          selectedColor,
                                          selectedStorage,
                                          cartId: crypto.randomUUID() 
                                        })
                                      }
                                >
                                    Añadir
                                </button>

                            </div>
                        </div>

                    </div>
                </div>

                {/* SPECS */}
                <div className="max-w-[1400px] mx-auto pb-16">

                    <h3 className="text-xl mb-8 uppercase text-gray-600">
                        Specifications
                    </h3>

                    <div className="flex flex-col">

                        <div className="grid grid-cols-[120px_1fr] md:grid-cols-[250px_1fr] py-4 border-b border-t border-black">
                            <span className="text-xs text-gray-600 uppercase">
                                Brand
                            </span>
                            <span className="text-sm text-gray-600">
                                {product?.brand}
                            </span>
                        </div>

                        <div className="grid grid-cols-[120px_1fr] md:grid-cols-[250px_1fr] py-4 border-b border-black">
                            <span className="text-xs text-gray-600 uppercase">
                                Name
                            </span>
                            <span className="text-sm text-gray-600">
                                {product.name}
                            </span>
                        </div>

                        <div className="grid grid-cols-[120px_1fr] md:grid-cols-[250px_1fr] py-4 border-b border-black">
                            <span className="text-xs text-gray-600 uppercase">
                                Description
                            </span>
                            <span className="text-xs text-gray-600">
                                {product.description}
                            </span>
                        </div>

                        {Object.entries(product.specs || {}).map(([key, value]) => (
                            <div
                                key={key}
                                className="grid grid-cols-[120px_1fr] md:grid-cols-[250px_1fr] py-4 border-b border-black"
                            >
                                <span className="text-xs text-gray-600 uppercase">
                                    {key.replace(/([A-Z])/g, " $1")}
                                </span>
                                <span className="text-sm text-gray-600">
                                    {value}
                                </span>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            {/* SIMILAR ITEMS */}
            <div className="max-w-[1400px] mx-auto pb-20 overflow-hidden pl-4 md:pl-0">

                <h3 className="text-xl mb-10 uppercase text-gray-600">
                    Similar Items
                </h3>

                <div ref={scrollRef} className="overflow-x-auto no-scrollbar">
                    <div className="flex gap-0 w-max border border-black/20">

                        {similarProducts.map((item) => (
                            <div
                                key={item.id}
                                className="min-w-[320px] md:min-w-[380px] border-r border-black/20"
                            >
                                <ProductCard product={item} />
                            </div>
                        ))}

                    </div>
                </div>

                {/* SCROLL BAR */}
                <div className="mt-6">
                    <div className="relative h-[2px] bg-gray-300">
                        <div
                            className="absolute top-0 h-[2px] bg-black"
                            style={{
                                width: "20%",
                                left: `${scrollProgress * 80}%`
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}