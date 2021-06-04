import React, { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = (props) => {
  const [cart, setCart] = useState([])

  const [cartTotal, setCartTotal] = useState(0)

  return (
    <CartContext.Provider value={[cart, setCart, cartTotal, setCartTotal]}>
      {props.children}
    </CartContext.Provider>
  )
}
