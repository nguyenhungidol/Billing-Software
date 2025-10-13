package in.hungnguyen.billingsoftware.service;

import in.hungnguyen.billingsoftware.io.CategoryRequest;
import in.hungnguyen.billingsoftware.io.CategoryResponse;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface CategoryService  {
  CategoryResponse add(CategoryRequest categoryRequest, MultipartFile file);

  List<CategoryResponse> read();

  void delete(String id);
}
