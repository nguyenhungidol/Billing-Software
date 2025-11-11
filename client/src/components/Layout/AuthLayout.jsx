// file: components/Layout/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import "./../../components/Global/Login.css";

const AuthLayout = () => {
  return (
    // Lớp wrapper này sẽ căn giữa mọi thứ
    <div className="bg-light d-flex justify-content-center align-items-center vh-100 login-background">
      <Outlet /> {/* Đây là nơi Login.jsx hoặc SignUp.jsx sẽ hiển thị */}
    </div>
  );
};

export default AuthLayout;
