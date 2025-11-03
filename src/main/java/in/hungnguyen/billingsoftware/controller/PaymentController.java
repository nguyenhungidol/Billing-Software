package in.hungnguyen.billingsoftware.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.hungnguyen.billingsoftware.config.MomoConfig;
import in.hungnguyen.billingsoftware.entity.OrderEntity;
import in.hungnguyen.billingsoftware.service.Impl.MomoService;
import java.nio.charset.StandardCharsets;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment/momo")
@RequiredArgsConstructor
public class PaymentController {

  private final MomoService momoService;
  private final MomoConfig momoConfig;

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

  @PostMapping("/ipn-handler")
  public ResponseEntity<String> handleIpn(@RequestBody Map<String, Object> body) {
    try {
      System.out.println("MoMo IPN callback: " + body);

      String partnerCode = (String) body.get("partnerCode");
      String orderId = (String) body.get("orderId");
      String requestId = (String) body.get("requestId");
      String amount = String.valueOf(((Number) body.get("amount")).longValue());
      String orderInfo = (String) body.get("orderInfo");
      String orderType = (String) body.get("orderType");
      String transId = String.valueOf(((Number) body.get("transId")).longValue());
      String resultCode = String.valueOf(body.get("resultCode"));
      String message = (String) body.get("message");
      String payType = (String) body.get("payType");
      String responseTime = String.valueOf(((Number) body.get("responseTime")).longValue());
      String extraData = body.get("extraData") == null ? "" : (String) body.get("extraData");
      String signature = (String) body.get("signature");

      // 🔑 Chuỗi rawSignature theo quy định của MoMo
      String rawSignature = String.format(
          "accessKey=%s&amount=%s&extraData=%s&message=%s&orderId=%s&orderInfo=%s&orderType=%s&partnerCode=%s&payType=%s&requestId=%s&responseTime=%s&resultCode=%s&transId=%s",
          momoConfig.getACCESS_KEY(),
          body.get("amount").toString(),
          body.get("extraData") == null ? "" : (String) body.get("extraData"),
          (String) body.get("message"),
          (String) body.get("orderId"),
          (String) body.get("orderInfo"),
          (String) body.get("orderType"),
          (String) body.get("partnerCode"),
          (String) body.get("payType"),
          (String) body.get("requestId"),
          body.get("responseTime").toString(),
          body.get("resultCode").toString(),
          body.get("transId").toString()
      );

      // ✅ Tạo lại chữ ký
      String secretKey = momoConfig.getSECRET_KEY(); // Lấy từ momoConfig
      String computedSignature = hmacSHA256(rawSignature, secretKey);
      System.out.println("Raw signature IPN: " + rawSignature);
      System.out.println("Computed signature: " + computedSignature);
      System.out.println("Signature from MoMo: " + signature);

      System.out.println("✅ [IPN] Received from MoMo: " + new ObjectMapper().writeValueAsString(body));
      System.out.println("✅ [IPN] Verified signature: " + computedSignature.equals(signature));


      if (!computedSignature.equals(signature)) {
        System.out.println("❌ Sai chữ ký IPN!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
      }

      // ✅ Nếu resultCode == 0 => Thanh toán thành công
      if ("0".equals(resultCode)) {
        System.out.println("✅ Thanh toán thành công cho orderId: " + orderId);
        // TODO: Cập nhật trạng thái order trong DB: PAID
      } else {
        System.out.println("❌ Thanh toán thất bại: " + message);
        // TODO: Cập nhật trạng thái order: FAILED
      }


      return ResponseEntity.ok(Map.of(
          "message", "Received",
          "resultCode", 0
      ).toString());
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing IPN");
    }
  }

  private String hmacSHA256(String data, String key) throws Exception {
    Mac mac = Mac.getInstance("HmacSHA256");
    SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    mac.init(secretKeySpec);
    byte[] bytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
    StringBuilder hash = new StringBuilder();
    for (byte b : bytes) {
      hash.append(String.format("%02x", b));
    }
    return hash.toString();
  }

}
