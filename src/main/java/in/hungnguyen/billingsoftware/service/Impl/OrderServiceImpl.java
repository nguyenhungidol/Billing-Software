package in.hungnguyen.billingsoftware.service.Impl;

import in.hungnguyen.billingsoftware.entity.OrderEntity;
import in.hungnguyen.billingsoftware.entity.OrderItemEntity;
import in.hungnguyen.billingsoftware.io.OrderRequest;
import in.hungnguyen.billingsoftware.io.OrderResponse;
import in.hungnguyen.billingsoftware.io.PaymentDetails;
import in.hungnguyen.billingsoftware.io.PaymentDetails.PaymentStatus;
import in.hungnguyen.billingsoftware.io.PaymentMethod;
import in.hungnguyen.billingsoftware.repository.OrderEntityRepository;
import in.hungnguyen.billingsoftware.service.OrderService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
  private final OrderEntityRepository orderEntityRepository;

  @Override
  public OrderResponse createOrder(OrderRequest orderRequest) {
    OrderEntity order = convertToOrderEntity(orderRequest);
    PaymentDetails paymentDetails = new PaymentDetails();
    PaymentMethod method = PaymentMethod.valueOf(orderRequest.getPaymentMethod().toUpperCase());
    paymentDetails.setPaymentStatus((method == PaymentMethod.CASH) ?
        PaymentStatus.COMPLETED : PaymentStatus.PENDING);
    order.setPaymentDetails(paymentDetails);
    List<OrderItemEntity> orderItem =  orderRequest.getCartItems().stream()
        .map(this::convertToOrderItemEntity)
        .collect(Collectors.toList());
    order.setOrderItemEntity(orderItem);
    order = orderEntityRepository.save(order);
    return convertToOrderResponse(order);
  }

  private OrderEntity convertToOrderEntity(OrderRequest orderRequest) {
    PaymentMethod method = PaymentMethod.CASH;
    if (orderRequest.getPaymentMethod() != null) {
      method = PaymentMethod.valueOf(orderRequest.getPaymentMethod().toUpperCase());
    }
    return  OrderEntity.builder()
        .customerName(orderRequest.getCustomerName())
        .phoneNumber(orderRequest.getPhoneNumber())
        .subTotal(orderRequest.getSubTotal())
        .tax(orderRequest.getTax())
        .grandTotal(orderRequest.getGrandTotal())
        .paymentMethod(method)
        .build();
  }

  private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
    return OrderItemEntity.builder()
        .itemId(orderItemRequest.getItemId())
        .name(orderItemRequest.getName())
        .price(orderItemRequest.getPrice())
        .quantity(orderItemRequest.getQuantity())
        .build();
  }

  private OrderResponse convertToOrderResponse(OrderEntity order) {
    return OrderResponse.builder()
        .orderId(order.getOrderId())
        .customerName(order.getCustomerName())
        .phoneNumber(order.getPhoneNumber())
        .subTotal(order.getSubTotal())
        .tax(order.getTax())
        .grandTotal(order.getGrandTotal())
        .paymentMethod(order.getPaymentMethod())
        .items(order.getOrderItemEntity().stream()
            .map(this::convertToItemResponse)
            .collect(Collectors.toList()))
        .paymentDetails(order.getPaymentDetails())
        .createdAt(order.getCreatedAt())
        .build();
  }

  private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity orderItemEntity) {
    return OrderResponse.OrderItemResponse.builder()
        .itemId(orderItemEntity.getItemId())
        .name(orderItemEntity.getName())
        .price(orderItemEntity.getPrice())
        .quantity(orderItemEntity.getQuantity())
        .build();
  }

  @Override
  public void deleteOrder(String orderId) {
    OrderEntity exitingOrder = orderEntityRepository.findByOrderId(orderId)
        .orElseThrow(() -> new RuntimeException("Not found the order with ID: " + orderId));
    orderEntityRepository.delete(exitingOrder);
  }

  @Override
  public List<OrderResponse> getLatestOrders() {
    return orderEntityRepository.findAllByOrderByCreatedAtDesc()
        .stream().map(this::convertToOrderResponse)
        .collect(Collectors.toList());
  }

  @Override
  public void updatePaymentStatus(String orderId, PaymentStatus status) {
    OrderEntity order = orderEntityRepository.findByOrderId(orderId)
        .orElseThrow(() -> new RuntimeException("Không tìm thấy orderId: " + orderId));
    order.getPaymentDetails().setPaymentStatus(status);
    orderEntityRepository.save(order);
  }
}
