package in.hungnguyen.billingsoftware.repository;

import in.hungnguyen.billingsoftware.entity.UserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByEmail(String email);
  Optional<UserEntity> findByUserId(String userId);
}
