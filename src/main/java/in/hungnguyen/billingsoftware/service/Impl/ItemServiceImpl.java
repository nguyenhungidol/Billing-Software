package in.hungnguyen.billingsoftware.service.Impl;

import in.hungnguyen.billingsoftware.entity.CategoryEntity;
import in.hungnguyen.billingsoftware.entity.ItemEntity;
import in.hungnguyen.billingsoftware.io.ItemRequest;
import in.hungnguyen.billingsoftware.io.ItemResponse;
import in.hungnguyen.billingsoftware.repository.CategoryRepository;
import in.hungnguyen.billingsoftware.repository.ItemRepository;
import in.hungnguyen.billingsoftware.service.FileUploadService;
import in.hungnguyen.billingsoftware.service.ItemService;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@Service
public class ItemServiceImpl implements ItemService {
  private final ItemRepository itemRepository;
  private final FileUploadService fileUploadService;
  private final CategoryRepository categoryRepository;

  @Override
  public ItemResponse addItem(ItemRequest request, MultipartFile multipartFile) {
    String imgUrl = fileUploadService.uploadFile(multipartFile);
    ItemEntity newItem = convertToEntity(request);
    newItem.setImgUrl(imgUrl);
    CategoryEntity exitingCategory = categoryRepository.findCategoryByCategoryId(request.getCategoryId())
        .orElseThrow(() -> new RuntimeException("Not found category with id: " + request.getCategoryId()));
    newItem.setCategoryEntity(exitingCategory);
    return convertToResponse(itemRepository.save(newItem));
  }

  private ItemResponse convertToResponse(ItemEntity itemEntity) {
    return ItemResponse.builder()
        .itemId(itemEntity.getItemId())
        .name(itemEntity.getName())
        .price(itemEntity.getPrice())
        .description(itemEntity.getDescription())
        .createdAt(itemEntity.getCreatedAt())
        .updatedAt(itemEntity.getUpdatedAt())
        .imgUrl(itemEntity.getImgUrl())
        .categoryId(itemEntity.getCategoryEntity().getCategoryId())
        .categoryName(itemEntity.getCategoryEntity().getName())
        .build();
  }

  private ItemEntity convertToEntity(ItemRequest request) {
    return ItemEntity.builder()
        .itemId(UUID.randomUUID().toString())
        .name(request.getName())
        .price(request.getPrice())
        .description(request.getDescription())
        .build();
  }

  @Override
  public List<ItemResponse> fetchItems() {
    return itemRepository.findAll()
        .stream()
        .map(itemEntity -> convertToResponse(itemEntity))
        .collect(Collectors.toList());
  }

  @Override
  public void deleteItem(String id) {
    ItemEntity exitingItem = itemRepository.findByItemId(id)
        .orElseThrow(() -> new RuntimeException("Not found the item with id: " + id));
    boolean isFileDelete = fileUploadService.deleteFile(exitingItem.getImgUrl());
    if(isFileDelete){
      itemRepository.delete(exitingItem);
    }else{
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete the image");
    }
  }
}
