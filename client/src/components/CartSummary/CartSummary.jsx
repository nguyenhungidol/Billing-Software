import "./CartSummary.css";
import { AppContext } from "../../context/AppContext";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";

import { useContext } from "react";

const CartSummary = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  const { cartItems } = useContext(AppContext);
  const totalMount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = totalMount * 0.01;
  const grandTotal = totalMount + tax;

  return (
    <div className="mt-2">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-1">
          <span className="text-light">Item:</span>
          <span className="text-light">${totalMount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <span className="text-light">Tax (1%):</span>
          <span className="text-light">${tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Total:</span>
          <span className="text-light">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="d-flex gap-3">
        <button
          className="btn btn-success flex-grow-1"
          style={{ lineHeight: "1.2rem" }}
        >
          Cash
        </button>
        <button
          className="btn btn-primary flex-grow-1"
          style={{ lineHeight: "1.2rem" }}
        >
          QR Pay
        </button>
      </div>
      <div className="d-flex gap-3 mt-2">
        <button
          className="btn btn-warning flex-grow-1"
          style={{ lineHeight: "1.2rem" }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
