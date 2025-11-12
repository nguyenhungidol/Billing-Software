import "./MenuBar.css";
import { assets } from "../../assets/assets";

// 1. IMPORT <Outlet /> TỪ react-router-dom
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isAdmin = () => auth.role === "ROLE_ADMIN";

  return (
    // 2. DÙNG FRAGMENT ĐỂ BỌC
    <>
      {}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-2">
        <Navbar.Brand as={Link} to="/dashboard">
          <img src={assets.logo} alt="Logo" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="p-2">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={`${
                isActive("/dashboard") ? "fw-bold text-warning" : ""
              }`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/explore"
              className={`${
                isActive("/explore") ? "fw-bold text-warning" : ""
              }`}
            >
              Explore
            </Nav.Link>
            {isAdmin() && (
              <>
                <Nav.Link
                  as={Link}
                  to="/items"
                  className={`${
                    isActive("/items") ? "fw-bold text-warning" : ""
                  }`}
                >
                  Manage Items
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/category"
                  className={`${
                    isActive("/category") ? "fw-bold text-warning" : ""
                  }`}
                >
                  Manage Category
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/users"
                  className={`${
                    isActive("/users") ? "fw-bold text-warning" : ""
                  }`}
                >
                  Manage Users
                </Nav.Link>
              </>
            )}
            <Nav.Link
              as={Link}
              to="/orders"
              className={`${isActive("/orders") ? "fw-bold text-warning" : ""}`}
            >
              Orders History
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto ms-md-0 me-3 me-lg-4">
            <NavDropdown
              title={
                <img
                  src={assets.profile}
                  alt="Profile"
                  style={{ borderRadius: "50%", width: "32px", height: "32px" }}
                />
              }
              id="navbarDropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/activitylog">
                Activity log
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* 3. ĐÂY LÀ PHẦN "CỬA RA" QUAN TRỌNG NHẤT
        Nội dung của trang (Dashboard, Explore...) sẽ được render ở đây.
      */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MenuBar;
