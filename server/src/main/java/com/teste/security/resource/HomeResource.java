package com.teste.security.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class HomeResource {

    @GetMapping
    public ResponseEntity<String> entrar() {
        return ResponseEntity.ok("Seja bem-vindo");
    }

}
