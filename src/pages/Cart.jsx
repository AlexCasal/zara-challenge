import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

export default function Cart() {
  const { cart, removeFromCart } = useCart()

  const total = cart.reduce((acc, item) => acc + item.price, 0)

  if (cart.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Cart</h1>
        <p>Your cart is empty</p>
        <Link to="/">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart</h1>

      {cart.map((item, index) => (
        <div
          key={index}
          style={{
            borderBottom: "1px solid #eee",
            padding: "10px 0",
          }}
        >
          <img
            src={item.selectedColor?.imageUrl}
            alt={item.name}
            width="100"
          />

          <h3>{item.brand}</h3>
          <p>{item.name}</p>

          <p>Color: {item.selectedColor?.name}</p>
          <p>Storage: {item.selectedStorage?.capacity}</p>

          <strong>{item.price}€</strong>

          <br />

          <button onClick={() => removeFromCart(index)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: {total}€</h2>

      <Link to="/">Continue shopping</Link>
    </div>
  )
}