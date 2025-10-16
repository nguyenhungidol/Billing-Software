package in.hungnguyen.billingsoftware.io;

import java.sql.Timestamp;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
  private String userId;
  private String email;
  private String password;
  private String name;
  private Timestamp createdAt;
  private Timestamp updatedAt;
  private String role;
}
