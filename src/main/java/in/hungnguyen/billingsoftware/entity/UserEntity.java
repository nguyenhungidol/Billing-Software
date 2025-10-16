package in.hungnguyen.billingsoftware.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "tbl_users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true)
  private String userId;

  private String email;
  private String password;
  private String role;
  private String name;

  @CreationTimestamp
  @Column(updatable = false)
  private Timestamp createdAt;

  @UpdateTimestamp
  private Timestamp updatedAt;
}
