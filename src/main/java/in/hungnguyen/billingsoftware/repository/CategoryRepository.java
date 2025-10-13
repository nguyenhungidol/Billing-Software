package in.hungnguyen.billingsoftware.repository;

import in.hungnguyen.billingsoftware.entity.CategoryEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
//  Khong duoc dat trung ten cac phuong thuc co san
  Optional<CategoryEntity>findCategoryByCategoryId(String id);
}
