import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { assets } from "../../assets/assets";
import { addItem } from "../../service/ItemService";
import { AppContext } from "../../context/AppContext";

const ItemsForm = ({ setItems }) => {
  const { categories, setCategories } = useContext(AppContext);
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);

  const onChangeHandler = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image");
      setLoading(false);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("item", JSON.stringify(data));
    try {
      const response = await addItem(formData);
      if (response.status === 201) {
        setItems((items) => [...items, response.data]);
        toast.success("Item added successfully");
        setCategories((categories) =>
          categories.map((category) => {
            if (category.categoryId === data.categoryId) {
              return {
                ...category,
                items: category.items + 1,
              };
            }
            return category;
          })
        );
        setData({
          name: "",
          categoryId: "",
          price: "",
          description: "",
        });
        setImage(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mt-2 ms-2 me-4  ">
        <div className="row">
          <div className="card col-md-12 form-container">
            <div className="card-body">
              <form onSubmit={onHandleSubmit}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : assets.categoryempty
                      }
                      alt=""
                      width={48}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Item name"
                    value={data.name}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    id="category"
                    className="form-control"
                    value={data.categoryId}
                    onChange={onChangeHandler}
                  >
                    <option value="">--SELECT CATAGORY--</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="$ 0.00"
                    value={data.price}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows="5"
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Write content here..."
                    value={data.description}
                    onChange={onChangeHandler}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsForm;
