package in.hungnguyen.billingsoftware.service.Impl;

import in.hungnguyen.billingsoftware.entity.CategoryEntity;
import in.hungnguyen.billingsoftware.io.CategoryRequest;
import in.hungnguyen.billingsoftware.io.CategoryResponse;
import in.hungnguyen.billingsoftware.repository.CategoryRepository;
import in.hungnguyen.billingsoftware.service.CategoryService;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
  public final CategoryRepository categoryRepository;

  @Override
  public CategoryResponse add(CategoryRequest categoryRequest) {
    CategoryEntity newCategory = convertToEntity(categoryRequest);
    newCategory =  categoryRepository.save(newCategory);
    return convertToResponse(newCategory);
  }

  @Override
  public List<CategoryResponse> read() {
    return categoryRepository.findAll()
        .stream()
        .map(categoryEntity -> convertToResponse(categoryEntity))
        .collect(Collectors.toList());
  }

  @Override
  public void delete(String id) {
    CategoryEntity entity = categoryRepository.
        findCategoryByCategoryId(id).orElseThrow(()->new RuntimeException("Can not found id: " + id));
     categoryRepository.delete(entity);
  }

  private CategoryResponse convertToResponse(CategoryEntity newCategory) {
    return CategoryResponse.builder()
        .categoryId(newCategory.getCategoryId())
        .name(newCategory.getName())
        .description(newCategory.getDescription())
        .bgColor(newCategory.getBgColor())
        .imgUrl(newCategory.getImgUrl())
        .createdAt(newCategory.getCreatedAt())
        .updatedAt(newCategory.getUpdatedAt())
        .build();
  }

  private CategoryEntity convertToEntity(CategoryRequest categoryRequest) {
    return CategoryEntity.builder()
        .categoryId(UUID.randomUUID().toString())
        .name(categoryRequest.getName())
        .description(categoryRequest.getDescription())
        .bgColor(categoryRequest.getBgColor())
        .build();
  }
}
