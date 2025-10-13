package in.hungnguyen.billingsoftware.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@Slf4j
public class CategoryController {
  private final CategoryService categoryService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CategoryResponse addCategory(@RequestPart("category") String categoryString, @RequestPart("file")
      MultipartFile file){
    ObjectMapper objectMapper = new ObjectMapper();
    CategoryRequest categoryRequest = null;
    try {
      categoryRequest = objectMapper.readValue(categoryString, CategoryRequest.class );
      return categoryService.add(categoryRequest, file);
    } catch (JsonProcessingException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An occured while parse the Json: " + e.getMessage());
    }
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


