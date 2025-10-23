import "./Login.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  return (
    <div className="bg-light d-flex justify-content-center align-items-center vh-100 login-background">
      <div className="card shadow-lg w-100" style={{ maxWidth: "480px" }}>
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title">Sign in</h1>
            <p className="card-text text-muted">Sign in to your account</p>
          </div>
          <div className="mt-4">
            <form>
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
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-dark btn-lg">
                  Sign in
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
