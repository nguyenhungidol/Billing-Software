package in.hungnguyen.billingsoftware.io;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {

  private String orderId;
  private String customerName;
  private String phoneNumber;
  private List<OrderRequest.OrderItemRequest> items;
  private Double subTotal;
  private Double tax;
  private Double grandTotal;
  private PaymentMethod paymentMethod;
  private LocalDateTime createdAt;
  private PaymentDetails paymentDetails;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class OrderItemRequest{
    private String itemId;
    private String name;
    private Double price;
    private Integer quantity;
  }

}
