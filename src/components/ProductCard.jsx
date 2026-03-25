import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="card">
        
        {/* IMAGE */}
        <div className="card-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        {/* INFO */}
        <div className="card-info">
          <p className="brand">{product.brand}</p>
          <p className="name">{product.name}</p>
          <p className="price">{product.basePrice} EUR</p>
        </div>

      </div>
    </Link>
  )
}