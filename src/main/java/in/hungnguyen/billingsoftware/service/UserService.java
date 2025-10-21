package in.hungnguyen.billingsoftware.service;

import in.hungnguyen.billingsoftware.io.UserRequest;
import in.hungnguyen.billingsoftware.io.UserResponse;
import java.util.List;

public interface UserService {
  UserResponse createUser(UserRequest request);
  String getRoleUser(String email);
  List<UserResponse> readUsers();
  void deleteUser(String id);
}
