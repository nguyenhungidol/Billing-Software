import { createContext, useState, useEffect } from "react";
import { getCategories } from "../service/CategoryService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useState({
    token: null,
    role: null,
  });

  useEffect(() => {
    async function loadData() {
      const response = await getCategories();
      setCategories(response.data);
    }
    loadData();
  }, []);

  const setAuthData = async (token, role) => {
    setAuth({
      token,
      role,
    });
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
