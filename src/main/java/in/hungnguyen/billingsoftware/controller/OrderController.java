package in.hungnguyen.billingsoftware.controller;

import in.hungnguyen.billingsoftware.io.OrderRequest;
import in.hungnguyen.billingsoftware.io.OrderResponse;
import in.hungnguyen.billingsoftware.service.OrderService;
import java.util.List;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
  private final OrderService orderService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public OrderResponse createOrder(@RequestBody OrderRequest orderRequest){
    return orderService.createOrder(orderRequest);
  }

  @DeleteMapping("/{orderId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteOrder(@PathVariable String orderId){
    orderService.deleteOrder(orderId);
  }

  @GetMapping("/latest")
  @ResponseStatus(HttpStatus.OK)
  public List<OrderResponse> getLatestOrders(){
    return orderService
        .getLatestOrders();
  }
}
