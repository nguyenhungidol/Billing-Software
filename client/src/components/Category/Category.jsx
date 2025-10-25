import "./Category.css";
const Category = ({ name, imgUrl, numberOfItems, bgColor }) => {
  return (
    <div
      className="d-flex align-items-center p-3 rounded gap-1 position-relative category-ondrahover()"
      style={{ backgroundColor: bgColor, cursor: "pointer" }}
    >
      <div style={{ position: "relative", marginRight: "15px" }}>
        <img src={imgUrl} alt={name} className="image-category" />
      </div>
      <div>
        <h6 className="text-white mb-0">{name}</h6>
        <p className="text-white mb-0">{numberOfItems} items</p>
      </div>
    </div>
  );
};

export default Category;
