import { Link } from "react-router-dom"

export default function ProductCard({ product }) {

  const minPrice = product.storageOptions
  ? Math.min(...product.storageOptions.map(s => s.price))
  : product.basePrice



  return (
    <Link to={`/product/${product.id}`}>
      <div className="h-[320px] flex flex-col justify-between border border-[#b4adad] bg-white relative overflow-hidden group">
        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-in-out z-10"></div>
        {/* IMG */}
        <div className="flex items-center justify-center relative z-30 h-44 md:h-52 lg:h-56 py-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full max-w-[80%] object-contain"
          />
        </div>

        {/* INFO */}
        <div className="h-[25%] w-full p-[10px] flex flex-col justify-end relative z-30">

          {/* TOP ROW */}
          <div className="flex justify-between items-center text-[10px] text-[#999] group-hover:text-white">
            <span>{product.brand.toUpperCase()}</span>
            <span>{minPrice.toFixed(2)} EUR</span>
          </div>

          {/* NAME */}
          <p className="text-[13px] mt-1 uppercase text-[#656565] group-hover:text-white">
            {product.name}
          </p>

        </div>

      </div>
    </Link>
  )
}