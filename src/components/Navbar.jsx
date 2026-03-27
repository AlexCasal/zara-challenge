import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import Container from "../components/Container"

export default function Navbar() {
    const { cart } = useCart()

    return (

        <nav className="w-full p-5">
            <Container>
                <div className="flex justify-between items-center">

                    <Link to="/" style={{ display: "flex", alignItems: "center", transform: "scale(1.2)" }}>
                        <svg width="110" height="24" viewBox="0 0 90 20" fill="none">
                            <defs>
                                <mask id="logo-mask-shape">
                                    {/* Fondo blanco = visible */}
                                    <rect width="100%" height="100%" fill="white" />

                                    {/* ASTERISCO CON "PADDING" REAL */}
                                    <g transform="translate(14,10)">

                                        {/* BORDE BLANCO (separación) */}
                                        <g stroke="white" strokeWidth="4">
                                            <line x1="-6" y1="0" x2="6" y2="0" />
                                            <line x1="0" y1="-6" x2="0" y2="6" />
                                            <line x1="-4.5" y1="-4.5" x2="4.5" y2="4.5" />
                                            <line x1="-4.5" y1="4.5" x2="4.5" y2="-4.5" />
                                        </g>

                                        {/* ASTERISCO NEGRO */}
                                        <g stroke="black" strokeWidth="1.5">
                                            <line x1="-6" y1="0" x2="6" y2="0" />
                                            <line x1="0" y1="-6" x2="0" y2="6" />
                                            <line x1="-4.5" y1="-4.5" x2="4.5" y2="4.5" />
                                            <line x1="-4.5" y1="4.5" x2="4.5" y2="-4.5" />
                                        </g>

                                    </g>
                                </mask>
                            </defs>

                            {/* CÍRCULO CON RECORTE */}
                            <circle cx="10" cy="10" r="6" fill="black" mask="url(#logo-mask-shape)" />

                            {/* TEXTO */}
                            <text
                                x="26"
                                y="14"
                                fontSize="18"
                                fontFamily="Helvetica, Arial, sans-serif"
                                fill="black"
                                letterSpacing="-3"
                                fontWeight="900"
                            >
                                MBST
                            </text>

                        </svg>
                    </Link>

                    <Link
                        to="/cart"
                        style={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="black"
                            strokeWidth="1.2"
                        >
                            <path d="M6 7h12l-1 13H7L6 7z" />
                            <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                        </svg>

                        <span style={{ fontSize: "13px" }}>{cart.length}</span>
                    </Link>
                </div>
            </Container>
        </nav>
    )
}