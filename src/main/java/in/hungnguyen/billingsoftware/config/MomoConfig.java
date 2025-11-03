package in.hungnguyen.billingsoftware.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MomoService {

  @Value("${momo.partnerCode}")
  private String PARTNER_CODE; // Giá trị mới: MOMO

  @Value("${momo.accessKey}")
  private String ACCESS_KEY; // Giá trị mới: MIIBIjANBgk...

  @Value("${momo.secretKey}")
  private String SECRET_KEY; // Giá trị mới: MIIEvgIBAD...

  @Value("${momo.endpoint}")
  private String ENDPOINT; // Giá trị mới: https://test-payment.momo.vn/v2/gateway/api

  @Value("${momo.redirectUrl}")
  private String REDIRECT_URL; // Giá trị mới: http://localhost:3000/

  @Value("${momo.ipnUrl}")
  private String IPN_URL; // Giá trị mới: https://localhost:8080/api/momo/ipn-handler

  @Value("${momo.requestType}")
  private String REQUEST_TYPE; // Giá trị mới: captureWallet

}
