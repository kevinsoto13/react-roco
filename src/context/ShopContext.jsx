import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopComponentContext = ({ children }) => {

    const [cart, setCart] = useState([])
    const [contador, setContador] = useState(1)

    const handleAddToCart = (product) => {
        
        const productInCart = cart.find(item => item.idProducto === product.idProducto)
        
        if (productInCart) {
          setCart(
            cart.map(item => 
              item.idProducto === product.idProducto ? { ...item, quantity: item.quantity + product.quantity } : item
            )
          )
        } else {
          setCart([...cart, product]);
        }
      }

      const handleRemoveFromCart = (id) => {
        setCart(cart.filter(item => item.idProducto !== id));
      }

      const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
      }

      const updateCartItemQuantity = (productId, newQuantity) => {
        setCart(prevCart => {
          
          const clampedQuantity = Math.max(1, Math.min(10, newQuantity))
          
          return prevCart.map(item => 
            item.idProducto === productId 
              ? { ...item, quantity: clampedQuantity } 
              : item
          )
        })
      }

      const clearCart = () => {
        setCart([])
      }

    return (
        <ShopContext.Provider value={{handleAddToCart, handleRemoveFromCart,getTotalItems,updateCartItemQuantity ,contador, setContador, cart, clearCart}}>
            {children}
        </ShopContext.Provider>
    )
}