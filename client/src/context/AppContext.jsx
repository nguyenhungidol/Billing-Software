import { createContext, useState, useEffect, use } from "react";
import { getCategories } from "../service/CategoryService";
import { getItems } from "../service/ItemService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState({
    token: null,
    role: null,
  });
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.itemId === item.itemId
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.itemId === item.itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getCategories(auth.token);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }
    loadData();
  }, [auth.token]);

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await getItems();
        setItems(response.data);
      } catch (error) {
        console.error("Failed to load items:", error);
      }
    }
    loadItems();
  }, [auth.token]);

  const setAuthData = async (token, role) => {
    setAuth({
      token,
      role,
    });
  };

  const contextValue = {
    categories,
    setCategories,
    items,
    setItems,
    auth,
    setAuthData,
    addToCart,
    cartItems,
    setCartItems,
    removeFromCart,
    updateQuantity,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
