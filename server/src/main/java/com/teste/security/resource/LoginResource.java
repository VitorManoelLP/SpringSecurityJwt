package com.teste.security.resource;

import com.teste.security.config.JwtTokenValidator;
import com.teste.security.domain.User;
import com.teste.security.dto.TokenDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginResource {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TokenDTO> login(@RequestBody User user) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

        if (Objects.nonNull(userDetails)) {
            return ResponseEntity.ok(new TokenDTO(JwtTokenValidator.generateToken(userDetails)));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PostMapping(value = "/verify")
    public ResponseEntity<Boolean> verifyToken(@RequestBody TokenDTO tokenDTO) {
        try {
            String token = tokenDTO.getToken();
            String username = JwtTokenValidator.getUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            return ResponseEntity.ok(JwtTokenValidator.isValidToken(token, userDetails));
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }

}
