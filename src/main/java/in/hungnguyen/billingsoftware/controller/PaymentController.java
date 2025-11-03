package in.hungnguyen.billingsoftware.controller;

import in.hungnguyen.billingsoftware.entity.OrderEntity;
import in.hungnguyen.billingsoftware.service.Impl.MomoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment/momo")
@RequiredArgsConstructor
public class PaymentController {

  private final MomoService momoService;

  @PostMapping("/create")
  public String createPayment(@RequestBody OrderEntity order) {
    try {
      String payUrl = momoService.createPayment(order);
      return payUrl;
    } catch (Exception e) {
      e.printStackTrace();
      return "Error: " + e.getMessage();
    }
  }

  @GetMapping("/return")
  public String returnPayment(@RequestParam Map<String, String> params) {
    return "Thanh toán thành công MoMo! Dữ liệu trả về: " + params;
  }

  @PostMapping("/ipn")
  public String ipnCallback(@RequestBody String body) {
    System.out.println("MoMo IPN callback: " + body);
    return "OK";
  }
}
