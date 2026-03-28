import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

export default function Cart() {
  const { cart, removeFromCart } = useCart()

  const total = cart.reduce((acc, item) => acc + item.price, 0)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl mb-4">Cart</h1>
        <p className="mb-4">Your cart is empty</p>
        <Link to="/" className="underline">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 md:px-12 pb-32 border-t border-black">
      {/* TOP */}
      <div>
        <h1 className="mt-10 mb-12 uppercase text-sm">
          CART ({cart.length})
        </h1>

        {/* ITEMS */}
        <div className="flex flex-col gap-12">

          {cart.map((item, index) => (
            <div key={index} className="flex items-start gap-14 md:gap-20">

              {/* IMAGE */}
              <img
                src={item.selectedColor?.imageUrl}
                alt={item.name}
                className="w-[200px] md:w-[240px] object-contain"
              />

              {/* INFO */}
              <div className="text-sm">

                <p className="text-gray-900 uppercase">
                  {item.name}
                </p>

                <p className="text-gray-900 mt-1 uppercase">
                  {item.selectedStorage?.capacity} | {item.selectedColor?.name}
                </p>

                <p className="mt-3 text-gray-900">
                  {item.price} EUR
                </p>

                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 text-xs mt-4"
                >
                  Eliminar
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-white px-6 md:px-12 py-6 z-50">
        {/* MOBILE */}
        <div className="flex flex-col gap-6 md:hidden">

          <p className="text-xs uppercase">
            Total &nbsp; {total} EUR
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="border py-3 text-xs uppercase text-center"
            >
              Continue shopping
            </Link>

            <button className="bg-black text-white py-3 text-xs uppercase">
              Pay
            </button>
          </div>

        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex justify-between items-end">

          {/* LEFT */}
          <Link
            to="/"
            className="border px-10 py-3 text-xs uppercase"
          >
            Continue shopping
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-10">

            <p className="text-xs uppercase">
              Total &nbsp; {total} EUR
            </p>

            <button className="bg-black text-white px-16 py-3 text-xs uppercase">
              Pay
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}