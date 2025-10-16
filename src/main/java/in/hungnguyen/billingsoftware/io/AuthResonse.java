package in.hungnguyen.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@AllArgsConstructor
public class AuthResonse {
  private String email;
  private String token;
  private String role;
}
