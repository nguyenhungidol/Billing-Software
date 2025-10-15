import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteCategory } from "../../service/CategoryService";
import "./CategoryList.css";

import { toast } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteCategoryById = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response.status === 204) {
        const updateCategories = categories.filter(
          (category) => category.categoryId !== categoryId
        );
        setCategories(updateCategories);
        // display toast message success
        toast.success("Category deleted successfully");
      } else {
        // display error toast message
        toast.error("Error deleting category");
      }
    } catch (error) {
      // display error toast message
      toast.error("Error deleting category");
    }
  };

  return (
    <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            value={searchTerm}
            placeholder="Search by keyword"
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredCategories.map((category, index) => (
          <div key={index} className="col-12">
            <div
              className="card p-3"
              style={{ backgroundColor: category.bgColor }}
            >
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={category.imgUrl}
                    alt={category.name}
                    className="category-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{category.name}</h5>
                  <p className="mb-0 text-white">5 items</p>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCategoryById(category.categoryId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
