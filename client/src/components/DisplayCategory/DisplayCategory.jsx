import Category from "../Category/Category";
import "./DisplayCategory.css";

const DisplayCategory = ({ categories }) => {
  return (
    <div className="row g-3" style={{ width: "100%", margin: 0 }}>
      {categories.map((category) => (
        <div
          key={category.categoryId}
          className="col-md-3 col-sm-6"
          style={{ padding: "0 10px" }}
        >
          <Category
            name={category.name}
            imgUrl={category.imgUrl}
            numberOfItems={category.items}
            bgColor={category.bgColor}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayCategory;
