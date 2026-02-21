import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('kicksCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('kicksCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      // Check if item with same id, size, and color already exists
      const existingIndex = prev.findIndex(
        item => item.id === product.id && 
                item.selectedSize === product.selectedSize && 
                item.selectedColor === product.selectedColor
      );

      if (existingIndex > -1) {
        // Update quantity if exists
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1
        };
        return updated;
      } else {
        // Add new item with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCartItems((prev) => prev.filter(
      (item) => !(item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
    ));
  };

  const updateQuantity = (id, selectedSize, selectedColor, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, selectedSize, selectedColor);
      return;
    }
    
    setCartItems((prev) => prev.map((item) =>
      item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
