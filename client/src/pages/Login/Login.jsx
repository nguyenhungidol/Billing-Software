import "./Login.css";
import { login } from "../../service/AuthService";
import { AppContext } from "../../context/AppContext";

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { setAuthData } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(data);
      if (response.status === 200) {
        toast.success("Đăng nhập thành công!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/dashboard");
        setAuthData(response.data.token, response.data.role);
      } else {
        toast.error("Tài khoản hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Tài khoản hoặc mật khẩu không đúng!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-light d-flex justify-content-center align-items-center vh-100 login-background">
      <div className="card shadow-lg w-100" style={{ maxWidth: "480px" }}>
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title">Sign in</h1>
            <p className="card-text text-muted">Sign in to your account</p>
          </div>
          <div className="mt-4">
            <form onSubmit={onHandleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  id="email"
                  placeholder="youraddress@gmail.com"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  id="password"
                  placeholder="*********"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign in"}
                </button>
              </div>
              <div className="mt-3 text-center">
                <p className="text-muted">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
