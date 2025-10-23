package in.hungnguyen.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResonse {
  private String email;
  private String role;
  private String token;
}
