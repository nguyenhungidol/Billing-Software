package in.hungnguyen.billingsoftware.repository;

import in.hungnguyen.billingsoftware.entity.ItemEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
  Optional<ItemEntity> findByItemId(String id);
  Integer countByCategoryEntity_Id(Long id);
}
