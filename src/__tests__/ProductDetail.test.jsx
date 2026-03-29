import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import ProductDetail from "../pages/ProductDetail"
import { useProductDetail } from "../hooks/useProductDetail"
import { useCart } from "../context/CartContext"

vi.mock("../hooks/useProductDetail")
vi.mock("../context/CartContext")

test("adds product to cart", () => {
    const addToCart = vi.fn()
  
    useCart.mockReturnValue({ addToCart })
  
    useProductDetail.mockReturnValue({
      product: {
        id: "1",
        name: "iPhone",
        brand: "Apple",
        basePrice: 1000,
        colorOptions: [{ name: "Black", imageUrl: "img" }],
        storageOptions: [{ capacity: "128GB", price: 1000 }],
      },
      loading: false,
      error: null,
    })
  
    render(
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
    )
  
    // seleccionar storage
    const storageBtn = screen.getByText(/128GB/i)
    fireEvent.click(storageBtn)
  
    // botón ya habilitado
    const button = screen.getByText(/añadir/i)
    fireEvent.click(button)
  
    expect(addToCart).toHaveBeenCalled()
  })