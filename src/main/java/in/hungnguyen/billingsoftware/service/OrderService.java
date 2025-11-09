package in.hungnguyen.billingsoftware.service;

import in.hungnguyen.billingsoftware.io.OrderRequest;
import in.hungnguyen.billingsoftware.io.OrderResponse;
import in.hungnguyen.billingsoftware.io.PaymentDetails.PaymentStatus;
import java.util.List;

public interface OrderService  {
  OrderResponse createOrder(OrderRequest orderRequest);
  void deleteOrder(String orderId);
  List<OrderResponse> getLatestOrders();
  OrderResponse getOrderById(String orderId);
  void updatePaymentStatus(String orderId, PaymentStatus status);
}
