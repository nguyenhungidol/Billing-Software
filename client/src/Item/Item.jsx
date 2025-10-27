import "./Item.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Item = ({ name, imgUrl, price, itemId }) => {
  const { addToCart } = useContext(AppContext);
  const handleAddToCart = () => {
    addToCart({
      name: name,
      imgUrl: imgUrl,
      price: price,
      quantity: 1,
      itemId: itemId,
    });
  };
  return (
    <div className="item-card p-3 bg-dark rounded shadow-sm h-100 d-flex align-items-center">
      <div style={{ position: "relative", marginRight: "15px" }}>
        <img src={imgUrl} alt={name} className="image-item" />
      </div>
      <div className="flex-grow-1 ms-2">
        <h5 className="mb-1 text-light">{name}</h5>
        <p className="mb-0 fw-bold text-light">${price}</p>
      </div>
      <div
        className="d-flex flex-column justify-content-between align-items-center ms-3"
        style={{ height: "100%" }}
      >
        <i className="bi bi-cart-plus text-warning fs-4"></i>
        <button className="btn btn-success btn-stm" onClick={handleAddToCart}>
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Item;
