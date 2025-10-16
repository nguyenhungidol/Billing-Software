package in.hungnguyen.billingsoftware.controller;

import in.hungnguyen.billingsoftware.io.AuthRequest;
import in.hungnguyen.billingsoftware.io.AuthResonse;
import in.hungnguyen.billingsoftware.service.Impl.AppUserDetailServiceImpl;
import in.hungnguyen.billingsoftware.util.JwtUtil;
import java.security.DigestException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
public class AuthController {
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final AppUserDetailServiceImpl appUserDetailService;
  private final JwtUtil jwtUtil;

  @PostMapping("/login")
  public AuthResonse login(@RequestBody AuthRequest request) throws Exception {
    authenticate(request.getEmail(), request.getPassword());
    final UserDetails user = appUserDetailService.loadUserByUsername(request.getEmail());
    String jwtToken = jwtUtil.generateToken(user);
    return new AuthResonse(request.getEmail(), "USER", jwtToken);
  }
  //TODO: fecth the role from repository

  private void authenticate(String email, String password) throws Exception {
    try{
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    } catch (BadCredentialsException e){
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email or password is incorrect");
    }
  }


  @PostMapping("/encode")
  public String encodePassword(@RequestBody Map<String, String> request){
    return passwordEncoder.encode(request.get("password"));
  }
}
