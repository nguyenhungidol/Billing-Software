package in.hungnguyen.billingsoftware.io;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDetails {
  private PaymentStatus paymentStatus;
  public enum PaymentStatus{
    PENDING, COMPLETED, FAILED
  }
}
