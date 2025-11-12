import MenuBar from "./components/MenuBar/MenuBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import Explore from "./pages/Explore/Explore";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageItems from "./pages/ManageItems/ManageItems";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AuthLayout from "./components/Layout/AuthLayout";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import { AppContext } from "./context/AppContext";
import NotFound from "./pages/NotFound/NotFound";

import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  const { auth } = useContext(AppContext);

  const LoginRoute = ({ element }) => {
    if (auth.token) {
      return <Navigate to="/dashboard" replace />;
    }
    return element;
  };

  const ProtectedRoute = ({ element, allowRoles }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }
    if (allowRoles && !allowRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }
    return element;
  };
  return (
    <div>
      {/* {location.pathname !== "/login" && <MenuBar />} */}
      <Toaster />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<LoginRoute element={<Login />} />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<MenuBar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          {/* admin only */}
          <Route
            path="/category"
            element={
              <ProtectedRoute
                element={<ManageCategory />}
                allowRoles={["ROLE_ADMIN"]}
              />
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute
                element={<ManageUsers />}
                allowRoles={["ROLE_ADMIN"]}
              />
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoute
                element={<ManageItems />}
                allowRoles={["ROLE_ADMIN"]}
              />
            }
          />
          <Route path="/orders" element={<OrderHistory />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
