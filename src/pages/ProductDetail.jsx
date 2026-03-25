import { useParams } from "react-router-dom"
import { useProductDetail } from "../hooks/useProductDetail"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"

export default function ProductDetail() {
    const { id } = useParams()
    const { product, loading, error } = useProductDetail(id)

    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedStorage, setSelectedStorage] = useState(null)

    const { addToCart } = useCart()

    useEffect(() => {
        if (product) {
            setSelectedColor(product.colorOptions[0])
            setSelectedStorage(product.storageOptions[0])
        }
    }, [product])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error loading product</p>

    const image =
        selectedColor?.imageUrl || product.colorOptions?.[0]?.imageUrl

    const finalPrice = selectedStorage?.price || product.basePrice

    return (
        <div className="pd-wrapper">

            {/* 🔹 BLOQUE SUPERIOR */}
            <div className="pd-container">

                {/* IMAGE */}
                <div className="pd-detail">
                    <img src={image} alt={product.name} />
                </div>

                {/* INFO */}
                <div className="pd-detail">
                    <p className="pd-brand">{product.brand}</p>
                    <h1 className="pd-name">{product.name}</h1>

                    <p className="pd-price">{finalPrice} EUR</p>

                    {/* STORAGE */}
                    <div className="pd-section">
                        <p className="pd-label">Storage</p>
                        <div className="pd-options">
                            {product.storageOptions.map((storage) => (
                                <button
                                    key={storage.capacity}
                                    onClick={() => setSelectedStorage(storage)}
                                    className={`pd-option ${
                                        selectedStorage?.capacity === storage.capacity
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    {storage.capacity}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* COLORS */}
                    <div className="pd-section">
                        <p className="pd-label">Color</p>
                        <div className="pd-colors">
                            {product.colorOptions.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color)}
                                    className={`pd-color ${
                                        selectedColor?.name === color.name ? "active" : ""
                                    }`}
                                    style={{ backgroundColor: color.hexCode }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        className="pd-button"
                        disabled={!selectedColor || !selectedStorage}
                        onClick={() =>
                            addToCart({
                                id: product.id,
                                name: product.name,
                                brand: product.brand,
                                price: finalPrice,
                                selectedColor,
                                selectedStorage,
                            })
                        }
                    >
                        Add to cart
                    </button>
                </div>
            </div>

            {/* 🔹 BLOQUE INFERIOR (FULL WIDTH) */}
            <div className="pd-specs-full">
                <h3 className="pd-specs-title">Specifications</h3>

                <div className="pd-specs-list">

                    <div className="pd-spec-row">
                        <span>Brand</span>
                        <span>{product.brand}</span>
                    </div>

                    <div className="pd-spec-row">
                        <span>Name</span>
                        <span>{product.name}</span>
                    </div>

                    <div className="pd-spec-row">
                        <span>Description</span>
                        <span>{product.description}</span>
                    </div>

                    {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="pd-spec-row">
                            <span>
                                {key.replace(/([A-Z])/g, " $1")}
                            </span>
                            <span>{value}</span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}