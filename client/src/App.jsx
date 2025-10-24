import MenuBar from "./components/MenuBar/MenuBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import Explore from "./pages/Explore/Explore";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageItems from "./pages/ManageItems/ManageItems";
import Login from "./pages/Login/Login";

import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/login" && <MenuBar />}
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<ManageCategory />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/items" element={<ManageItems />} />
      </Routes>
    </div>
  );
};

export default App;
