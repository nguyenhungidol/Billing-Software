import "./../../components/Global/Login.css";
import { register } from "../../service/AuthService";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  // 2. Không cần `useContext` vì chúng ta không đăng nhập ngay sau khi đăng ký
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "", // 3. Thêm trường 'name' (hoặc 'username')
    email: "",
    password: "",
    confirmPassword: "", // 4. Thêm trường 'confirmPassword'
  });

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    // 5. Thêm bước kiểm tra mật khẩu
    if (data.password !== data.confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    try {
      // 6. Chuẩn bị dữ liệu để gửi đi (bỏ `confirmPassword`)
      const requestData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      // 7. Gọi hàm `signup`
      const response = await register(requestData);

      // Thường thì 201 (Created) hoặc 200 là thành công
      if (response.status === 200 || response.status === 201) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        // 8. Chuyển hướng về trang ĐĂNG NHẬP
        navigate("/login");
      } else {
        toast.error("Đăng ký thất bại! Email có thể đã tồn tại.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký thất bại! Email có thể đã tồn tại.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <div className="card shadow-lg w-100" style={{ maxWidth: "480px" }}>
      <div className="card-body">
        <div className="text-center">
          {/* 9. Thay đổi tiêu đề */}
          <h1 className="card-title">Register</h1>
          <p className="card-text text-muted">Create your new account</p>
        </div>
        <div className="mt-4">
          <form onSubmit={onHandleSubmit}>
            {/* 10. Thêm ô nhập Tên */}
            <div className="mb-4">
              <label htmlFor="name" className="form-label text-muted">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg"
                id="name"
                placeholder="Your Name"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>

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

            {/* 11. Thêm ô Xác nhận Mật khẩu */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="form-label text-muted"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control form-control-lg"
                id="confirmPassword"
                placeholder="*********"
                value={data.confirmPassword}
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
                {/* 12. Thay đổi chữ trên nút */}
                {loading ? "Loading..." : "Sign up"}
              </button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-muted">
                {/* 13. Thay đổi link */}
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
