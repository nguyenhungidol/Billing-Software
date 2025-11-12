import { useEffect, useState } from "react";

import "./Dashboard.css";
import { DashboardData } from "../../service/DashboardService";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DashboardData();
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!data) {
    return <div className="error">Failed to load data.</div>;
  }

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

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Sales</h3>
              <p>{formatCurrency(data.totalSales.toFixed(2))}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-cart-check"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Order</h3>
              <p>{data.totalOrderCount}</p>
            </div>
          </div>
        </div>
        <div className="recent-orders-card">
          <h3 className="recent-orders-title">
            <i className="bi bi-clock-history"></i>
            Recent Orders
          </h3>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId.substring(0, 8)}...</td>
                    <td>{order.customerName}</td>
                    <td>{formatCurrency(order.grandTotal.toFixed(2))}</td>
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
                    <td>
                      {new Date(order.createdAt).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
