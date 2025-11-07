import "./CartSummary.css";
import { AppContext } from "../../context/AppContext";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";
import { createPay } from "../../service/MomoService";
import { validatePhoneNumber } from "../../validator/ValidatePhoneNumber";

import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { createOrder } from "../../service/OrderService";

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

  const handleMomopay = async () => {
    if (!customerName || !mobileNumber) {
      toast.error(
        "Vui lòng nhập đầy đủ thông tin khách hàng trước khi thanh toán!"
      );
      return;
    }

    const phoneError = validatePhoneNumber(mobileNumber);
    if (phoneError) {
      toast.error(phoneError);
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }

    try {
      const orderRequest = {
        customerName,
        phoneNumber: mobileNumber,
        cartItems: cartItems.map((item) => ({
          itemId: item.itemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subTotal: totalMount,
        tax,
        grandTotal,
        paymentMethod: "MOMO",
      };
      const orderResponse = await createOrder(orderRequest);
      console.log("✅ Đơn hàng đã được tạo:", orderResponse.data);

      const orderData = {
        orderId: orderResponse.data.orderId, // tạo id đơn hàng ngẫu nhiên
        grandTotal: grandTotal.toFixed(0), // gửi đúng kiểu backend yêu cầu
        paymentMethod: "MOMO",
      };

      const momoResponse = await createPay(orderData);
      console.log("Phản hồi MoMo:", momoResponse.data);

      // Nếu backend trả về response.data.payUrl
      if (momoResponse.data.payUrl) {
        window.location.href = momoResponse.data.payUrl;
      } else {
        alert(
          "Không nhận được URL từ MoMo: " + JSON.stringify(momoResponse.data)
        );
      }
    } catch (error) {
      console.error("❌ Lỗi khi tạo thanh toán MoMo:", error);
      alert("Lỗi khi tạo thanh toán MoMo: " + error.message);
    }
  };

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
          onClick={handleMomopay}
        >
          MoMo Pay
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
