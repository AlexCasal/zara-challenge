import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import { useProducts } from "../hooks/useProducts"
import "@testing-library/jest-dom"

vi.mock("../hooks/useProducts")

test("renders products list", () => {
  useProducts.mockReturnValue({
    products: [
      { id: "1", name: "iPhone", brand: "Apple", basePrice: 1000 },
    ],
  })

  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )

  expect(screen.getByText(/iphone/i)).toBeInTheDocument()
})