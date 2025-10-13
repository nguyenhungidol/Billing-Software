package in.hungnguyen.billingsoftware.service;

import in.hungnguyen.billingsoftware.io.CategoryRequest;
import in.hungnguyen.billingsoftware.io.CategoryResponse;
import java.util.List;

public interface CategoryService  {
  CategoryResponse add(CategoryRequest categoryRequest);

  List<CategoryResponse> read();

  void delete(String id);
}
