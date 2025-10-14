import axios from "axios";

export const addCategory = async (category) => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/categories",
    category
  );
};

export const deleteCategory = async (id) => {
  return await axios.delete(`http://localhost:8080/api/v1.0/categories/${id}`);
};

export const getCategories = async () => {
  return await axios.get("http://localhost:8080/api/v1.0/categories");
};
