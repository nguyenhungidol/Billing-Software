package in.hungnguyen.billingsoftware.service;

import in.hungnguyen.billingsoftware.io.OrderRequest;
import in.hungnguyen.billingsoftware.io.OrderResponse;
import java.util.List;

public interface OrderService  {
  OrderResponse createOrder(OrderRequest orderRequest);
  void deleteOrder(String orderId);
  List<OrderResponse> getLatestOrders();

}
