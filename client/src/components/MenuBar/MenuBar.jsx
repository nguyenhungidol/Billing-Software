import "./MenuBar.css";
import { assets } from "../../assets/assets";

import { Link, useNavigate } from "react-router-dom";
// Import các component cần thiết của react-bootstrap
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const MenuBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    // 1. Dùng <Navbar> thay cho <nav>
    <Navbar bg="dark" variant="dark" expand="lg" className="px-2">
      {/* 2. Dùng <Navbar.Brand> và 'as={Link}' */}
      <Navbar.Brand as={Link} to="/dashboard">
        <img src={assets.logo} alt="Logo" height="40" />
      </Navbar.Brand>

      {/* 3. Dùng <Navbar.Toggle> (tự động xử lý click) */}
      <Navbar.Toggle aria-controls="navbarNav" />

      {/* 4. Dùng <Navbar.Collapse> */}
      <Navbar.Collapse id="navbarNav" className="p-2">
        {/* 5. Dùng <Nav> thay cho <ul> */}
        <Nav className="me-auto mb-2 mb-lg-0">
          {/* 6. Dùng <Nav.Link> và 'as={Link}' */}
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/explore">
            Explore
          </Nav.Link>
          <Nav.Link as={Link} to="/items">
            Manage Items
          </Nav.Link>
          <Nav.Link as={Link} to="/category">
            Manage Category
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            Manage Users
          </Nav.Link>
        </Nav>

        {/* 7. Đây là phần Dropdown đã sửa */}
        <Nav className="ms-auto ms-md-0 me-3 me-lg-4">
          <NavDropdown
            // 'title' nhận JSX, chính là nút bấm (ảnh profile)
            title={
              <img
                src={assets.profile}
                alt="Profile"
                style={{ borderRadius: "50%", width: "32px", height: "32px" }}
              />
            }
            id="navbarDropdown"
            align="end" // Tự động căn lề phải (thay cho dropdown-menu-end)
          >
            {/* 8. Dùng <NavDropdown.Item> */}
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
  );
};

export default MenuBar;
