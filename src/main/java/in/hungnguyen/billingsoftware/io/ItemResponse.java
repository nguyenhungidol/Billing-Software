package in.hungnguyen.billingsoftware.io;

import java.math.BigDecimal;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponse {
  private String itemId;
  private String name;
  private BigDecimal price;
  private String description;
  private Timestamp createdAt;
  private Timestamp updatedAt;
  private String imgUrl;
  private String categoryId;
  private String categoryName;
}
