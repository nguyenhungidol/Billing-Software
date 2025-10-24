import { useState } from "react";
import { deleteItem } from "../../service/ItemService";
import { toast } from "react-hot-toast";

import "./ItemsList.css";

const ItemsList = ({ items, setItems }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      setItems((prevItems) =>
        prevItems.filter((item) => item.itemId !== itemId)
      );
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item");
    }
  };

  return (
    <div
      className="item-list-container"
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
        {filteredItems.map((item, index) => (
          <div key={index} className="col-12">
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center ">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="item-image "
                  />
                </div>
                <div className="flex-grow-1 ">
                  <h5 className="mb-1 text-white">{item.name}</h5>
                  <p className="mb-0 text-white">
                    Category: {item.categoryName}
                  </p>
                  <span className="mb-0 text-black badge rounded-pill text-bg-warning">
                    ${item.price}
                  </span>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item.itemId)}
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

export default ItemsList;
