import "./Explore.css";
import DisplayCategory from "../../components/DisplayCategory/DisplayCategory";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import CustomerForm from "../../components/CustomerForm/CustomerForm";
import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";

import { AppContext } from "../../context/AppContext";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Explore = () => {
  const { categories } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const resultCode = query.get("resultCode");

    if (resultCode) {
      if (resultCode === "0") {
        toast.success("Thanh toán MoMo thành công!");
      } else {
        toast.error("Thanh toán thất bại! Vui lòng thử lại.");
      }

      // ✅ Xóa query param sau khi hiển thị toast
      query.delete("resultCode");
      navigate(
        {
          pathname: location.pathname,
          search: query.toString(),
        },
        { replace: true }
      );
    }
  }, [location.search, navigate]);

  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row" style={{ overflowY: "auto" }}>
          <DisplayCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </div>
        <hr className="horizontal-line" />
        <div className="second-row" style={{ overflowY: "auto" }}>
          <DisplayItem selectedCategory={selectedCategory} />
        </div>
      </div>
      <div className="right-column d-flex flex-column">
        <div className="customer-form-container" style={{ height: "15%" }}>
          <CustomerForm
            customerName={customerName}
            setCustomerName={setCustomerName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
          />
        </div>
        <hr className="my-3 text-light" />
        <div
          className="cart-items-container"
          style={{ height: "55%", overflowY: "auto" }}
        >
          <CartItem />
        </div>
        <div className="cart-summary-container" style={{ height: "30%" }}>
          <CartSummary
            customerName={customerName}
            setCustomerName={setCustomerName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;
