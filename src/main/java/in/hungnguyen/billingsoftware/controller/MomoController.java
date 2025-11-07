package in.hungnguyen.billingsoftware.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.hungnguyen.billingsoftware.entity.OrderEntity;
import in.hungnguyen.billingsoftware.io.PaymentDetails.PaymentStatus;
import in.hungnguyen.billingsoftware.service.Impl.MomoService;
import in.hungnguyen.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment/momo")
@RequiredArgsConstructor
public class MomoController {

  private final MomoService momoService;
  private final OrderService orderService;


  @PostMapping("/create")
  public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> paymentRequest) {
    try {
      String orderId = (String) paymentRequest.get("orderId");
      Double grandTotal = Double.valueOf(paymentRequest.get("grandTotal").toString());

      // Tạo một đối tượng giả để truyền cho MoMo
      OrderEntity fakeOrder = new OrderEntity();
      fakeOrder.setOrderId(orderId);
      fakeOrder.setGrandTotal(grandTotal);

      Map<String, Object> momoRes = momoService.createPayment(fakeOrder);
      return ResponseEntity.ok(momoRes);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("error", e.getMessage()));
    }
  }

  @GetMapping("/return")
  public String returnPayment(@RequestParam Map<String, String> params) {
    return "Thanh toán thành công MoMo! Dữ liệu trả về: " + params;
  }

  @PostMapping("/ipn-handler")
  public ResponseEntity<?> handleIpn(@RequestBody Map<String, Object> body) {
    try {
      if (!momoService.verifySignature(body)) {
        System.out.println("❌ Sai chữ ký IPN!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid signature"));
      }

      String orderId = (String) body.get("orderId");
      String resultCode = String.valueOf(body.get("resultCode"));

      if ("0".equals(resultCode)) {
        orderService.updatePaymentStatus(orderId, PaymentStatus.COMPLETED);
        System.out.println("✅ Thanh toán thành công cho đơn hàng " + orderId);
      } else {
        orderService.updatePaymentStatus(orderId, PaymentStatus.FAILED);
        System.out.println("❌ Thanh toán thất bại cho đơn hàng " + orderId);
      }

      return ResponseEntity.ok(Map.of(
          "message", "Received and processed",
          "resultCode", 0
      ));

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("error", e.getMessage()));
    }
  }
}
