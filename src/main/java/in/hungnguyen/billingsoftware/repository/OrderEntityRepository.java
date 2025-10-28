package in.hungnguyen.billingsoftware.repository;

import in.hungnguyen.billingsoftware.entity.OrderEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long> {
  Optional<OrderEntity> findByOrderId(String orderId);

  List<OrderEntity> findAllByOrderByCreatedDesc();
}
