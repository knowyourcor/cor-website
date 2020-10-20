import React, { useState, useContext, createContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartContext, setCartContext] = useState();

  const [isCartOpen, setCartOpen] = useState();

  console.log("cartContext: ", cartContext);

  const value = {
    cartContext,
    setCartContext,
    isCartOpen,
    setCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
