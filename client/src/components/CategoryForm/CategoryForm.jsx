import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CategoryForm.css";
import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { addCategory } from "../../service/CategoryService";
import { AppContext } from "../../context/AppContext";

const CategoryForm = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#000000",
  });

  useEffect(() => {}, [data]);

  const handleChange = (e) => {
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
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);
    try {
      const response = await addCategory(formData);
      if (response.status === 201) {
        setCategories([...categories, response.data]);
        toast.success("Category added successfully");
        setData({
          name: "",
          description: "",
          bgColor: "#000000",
        });
        setImage(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 mx-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onHandleSubmit}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={
                      image ? URL.createObjectURL(image) : assets.categoryempty
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
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
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
                  placeholder="Category name"
                  onChange={handleChange}
                  value={data.name}
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
                  onChange={handleChange}
                  value={data.description}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="bgColor">Background color</label>
                <br />
                <input
                  type="color"
                  name="bgColor"
                  id="bgColor"
                  placeholder="#ffffff"
                  onChange={handleChange}
                  value={data.bgColor}
                />
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
  );
};

export default CategoryForm;
