import { AppContext } from "../../context/AppContext";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";
import { createPay } from "../../service/MomoService";
import { validatePhoneNumber } from "../../validator/ValidatePhoneNumber";
import { createOrder } from "../../service/OrderService";
import { getOrderById } from "../../service/OrderService";

import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const CartSummary = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  const { cartItems, setCartItems } = useContext(AppContext);

  const [showReceipt, setShowReceipt] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const totalMount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = totalMount * 0.01;
  const grandTotal = totalMount + tax;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const resultCode = query.get("resultCode");
    const orderId = query.get("orderId"); // MoMo sẽ trả về orderId này

    if (resultCode && orderId) {
      if (resultCode === "0") {
        toast.success("Thanh toán MoMo thành công!");

        // GỌI API ĐỂ LẤY LẠI THÔNG TIN ĐƠN HÀNG
        getOrderById(orderId)
          .then((response) => {
            // Lưu thông tin vào state
            setOrderDetails(response.data);

            // Tùy chọn: Tự động mở popup hóa đơn
            // setShowReceipt(true);

            // Xóa giỏ hàng và form sau khi thành công
            setCartItems([]);
            setCustomerName("");
            setMobileNumber("");
          })
          .catch((err) => {
            toast.error("Lỗi: Không thể tải thông tin đơn hàng.");
          });
      } else {
        // Lấy mã lỗi từ MoMo (ví dụ: message=...)
        const message = query.get("message") || "Thanh toán thất bại!";
        toast.error(`Thanh toán thất bại: ${message}`);
      }

      // ✅ Xóa query param sau khi đã xử lý xong
      query.delete("resultCode");
      query.delete("orderId");
      query.delete("message"); // Xóa hết các param của MoMo
      // ...
      navigate(
        {
          pathname: location.pathname,
          search: query.toString(),
        },
        { replace: true }
      );
    }
  }, [
    location.search,
    navigate,
    setCartItems,
    setCustomerName,
    setMobileNumber,
  ]);

  const validateInput = () => {
    if (!customerName || !mobileNumber) {
      toast.error(
        "Vui lòng nhập đầy đủ thông tin khách hàng trước khi thanh toán!"
      );
      return false;
    }
    const phoneError = validatePhoneNumber(mobileNumber);
    if (phoneError) {
      toast.error(phoneError);
      return false;
    }
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng trống!");
      return false;
    }
    return true; // Tất cả đều hợp lệ
  };

  const handleCashPay = async () => {
    if (!validateInput()) return;

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
        paymentMethod: "CASH",
      };

      const orderResponse = await createOrder(orderRequest);
      console.log(
        "✅ Đơn hàng TIỀN MẶT đã được tạo:",
        orderResponse.data.orderId
      );
      toast.success("Tạo đơn hàng thành công!");

      setOrderDetails(orderResponse.data); // Lưu dữ liệu đơn hàng để in hóa đơn

      setCartItems([]);
      setCustomerName("");
      setMobileNumber("");
    } catch (error) {
      console.error("❌ Lỗi khi tạo đơn hàng:", error);
      toast.error("Lỗi khi tạo đơn hàng: " + error.message);
    }
  };

  const handleMomopay = async () => {
    if (!validateInput()) return;

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

      setOrderDetails(orderResponse.data); // Lưu dữ liệu đơn hàng để in hóa đơn

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

  const placeOrder = () => {
    if (orderDetails) {
      setShowReceipt(true);
    } else {
      toast.error("Chưa có thông tin hóa đơn để hiển thị!");
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
          onClick={handleCashPay}
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
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
      {showReceipt && (
        <ReceiptPopup
          orderDetails={orderDetails}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};

export default CartSummary;
