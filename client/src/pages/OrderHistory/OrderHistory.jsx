import { latestOrder } from "../../service/OrderService";
import "./OrderHistory.css";

import { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await latestOrder();
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatItems = (items) => {
    return items.map((item) => `${item.name} x ${item.quantity}`).join(", ");
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // formart total for VND
  const formatCurrency = (number, currency = "USD", locale = "en-US") => {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      // Bỏ 2 số 0 ở cuối nếu là số chẵn (ví dụ: $1,200 thay vì $1,200.00)
      maximumFractionDigits: number % 1 === 0 ? 0 : 2,
      minimumFractionDigits: 0,
    });

    return formatter.format(number);
  };

  if (loading)
    return <div className="text-center py-4">Loading orders ...</div>;

  if (orders.length === 0)
    return <div className="text-center py-4">No orders found.</div>;

  return (
    <div>
      <div className="orders-history-container">
        <h2 className="mb-2 text-light">All Orders</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover ">
            <thead className="table-dark">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Items</th>
                <th scope="col">Total</th>
                <th scope="col">Payment</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>
                    {order.customerName} <br />
                    <small className="text-muted">{order.phoneNumber}</small>
                  </td>
                  <td>{formatItems(order.items)}</td>
                  <td>{formatCurrency(order.grandTotal)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.paymentDetails?.paymentStatus === "COMPLETED"
                          ? "bg-success"
                          : order.paymentDetails?.paymentStatus === "PENDING"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {order.paymentDetails?.paymentStatus}
                    </span>
                  </td>

                  <td>{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
