import MenuBar from "./components/MenuBar/MenuBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import Explore from "./pages/Explore/Explore";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageItems from "./pages/ManageItems/ManageItems";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <MenuBar />
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
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
