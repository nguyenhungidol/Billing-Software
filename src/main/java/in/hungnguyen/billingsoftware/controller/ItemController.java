package in.hungnguyen.billingsoftware.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.hungnguyen.billingsoftware.io.ItemRequest;
import in.hungnguyen.billingsoftware.io.ItemResponse;
import in.hungnguyen.billingsoftware.service.ItemService;
import java.util.List;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
 public class ItemController {
  private final ItemService itemService;

  @PostMapping("/admin/items")
  @ResponseStatus(HttpStatus.CREATED)
  public ItemResponse createItem(@RequestPart("item") String itemString,
                                 @RequestPart("file") MultipartFile file) {
    ObjectMapper objectMapper = new ObjectMapper();
    ItemRequest itemRequest = null;
    try {
      itemRequest = objectMapper.readValue(itemString, ItemRequest.class);
      return itemService.addItem(itemRequest, file);
    } catch (JsonProcessingException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "An occured while parse the Json: " + e.getMessage());
    }
  }

  @GetMapping("/items")
  @ResponseStatus(HttpStatus.OK)
  public List<ItemResponse> readItem(){
    return itemService.fetchItems();
  }

  @DeleteMapping("/admin/items/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteItem(@PathVariable  String id){
    try{
      itemService.deleteItem(id);
    } catch (Exception e) {
      throw new RuntimeException("Cannot delete item with id: " + id);
    }
  }

}
