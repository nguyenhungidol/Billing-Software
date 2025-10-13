package in.hungnguyen.billingsoftware.controller;

import in.hungnguyen.billingsoftware.io.CategoryRequest;
import in.hungnguyen.billingsoftware.io.CategoryResponse;
import in.hungnguyen.billingsoftware.service.CategoryService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@Slf4j
public class CategoryController {
  private final CategoryService categoryService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CategoryResponse addCategory(@RequestBody  CategoryRequest categoryRequest){
    return categoryService.add(categoryRequest);
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<CategoryResponse> getAllCategory(){
    return categoryService.read();
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteCategory(@PathVariable String id){
    try{
      categoryService.delete(id);
      log.info("Đã xóa!!!");
    } catch (Exception e) {
      throw new RuntimeException("Cannot delete category with id: " + id);
    }
  }
}


