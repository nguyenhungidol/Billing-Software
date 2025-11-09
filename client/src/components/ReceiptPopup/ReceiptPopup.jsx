import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./ReceiptPopup.css";

// Component nhận 2 props:
// 1. orderDetails: Dữ liệu đơn hàng (từ state của CartSummary)
// 2. onClose: Hàm để đóng popup (từ CartSummary)
const ReceiptPopup = ({ orderDetails, onClose }) => {
  // 1. Tạo một 'ref' để trỏ vào khu vực chúng ta muốn in
  const receiptRef = useRef();

  // 2. Sử dụng hook từ thư viện 'react-to-print'
  const handlePrint = useReactToPrint({
    contentRef: receiptRef, // Đổi 'content' thành 'contentRef'
    documentTitle: `HoaDon-${orderDetails?.orderId || "Order"}`,
  });

  // Nếu không có dữ liệu (dù CartSummary đã kiểm tra, cẩn thận vẫn hơn)
  if (!orderDetails) {
    return null;
  }

  console.log("DỮ LIỆU HÓA ĐƠN ĐANG CÓ:", orderDetails);

  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleString("vi-VN");
  };

  return (
    // Lớp phủ mờ toàn màn hình
    <div className="receipt-overlay" onClick={onClose}>
      {/* Nội dung popup, ngăn cản sự kiện click để không bị đóng */}
      <div className="receipt-popup" onClick={(e) => e.stopPropagation()}>
        {/* ========= PHẦN NỘI DUNG IN (Gắn ref vào đây) ========= */}
        <div className="receipt-content" ref={receiptRef}>
          <h3>Order Invoice</h3>
          <p>
            <strong>OrderID:</strong> {orderDetails.orderId}
          </p>
          <p>
            <strong>Customer:</strong> {orderDetails.customerName}
          </p>
          <p>
            <strong>Phone:</strong> {orderDetails.phoneNumber}
          </p>
          <p>
            <strong>Date:</strong> {formatDateTime(orderDetails.createdAt)}
          </p>
          <p>
            <strong>Pay:</strong> {orderDetails.paymentMethod}
            {orderDetails.paymentStatus}
          </p>
          <hr />

          <h4>Order Details</h4>
          <table className="receipt-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items &&
                orderDetails.items.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <hr />

          <div className="receipt-totals">
            <p>
              <span>Price:</span>
              <strong>${orderDetails.subTotal.toFixed(2)}</strong>
            </p>
            <p>
              <span>Tax (1%):</span>
              <strong>${orderDetails.tax.toFixed(2)}</strong>
            </p>
            <h4 className="grand-total">
              <span>Total:</span>
              <strong>${orderDetails.grandTotal.toFixed(2)}</strong>
            </h4>
          </div>

          <p className="receipt-footer">Thank you for shopping with us!</p>
        </div>

        <div className="receipt-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPopup;
