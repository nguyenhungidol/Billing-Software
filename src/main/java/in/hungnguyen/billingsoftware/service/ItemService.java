package in.hungnguyen.billingsoftware.service;

import in.hungnguyen.billingsoftware.io.ItemRequest;
import in.hungnguyen.billingsoftware.io.ItemResponse;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ItemService {
  ItemResponse addItem(ItemRequest request, MultipartFile multipartFile);
  List<ItemResponse> fetchItems();
  void deleteItem(String id);
}
