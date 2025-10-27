import { useState } from "react";
import { addUser } from "../../service/UserService";
import toast from "react-hot-toast";

const UsersForm = ({ setUsers }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await addUser(data);
      setUsers((users) => [...users, response.data]);
      toast.success("User created successfully");
      setData({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER",
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 mx-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Hung Nguyen"
                  value={data.name}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="youremail@gmail.com"
                  value={data.email}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="*********"
                  value={data.password}
                  onChange={onChangeHandler}
                  required
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

export default UsersForm;
