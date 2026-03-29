import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Cart from "../pages/Cart"
import { useCart } from "../context/CartContext"

vi.mock("../context/CartContext")

test("calculates total price", () => {
  useCart.mockReturnValue({
    cart: [
      { price: 100, cartId: "1" },
      { price: 200, cartId: "2" },
    ],
    removeFromCart: vi.fn(),
  })

  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  )

  expect(screen.getAllByText(/300/i).length).toBeGreaterThan(0)
})