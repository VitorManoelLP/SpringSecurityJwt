package com.teste.security.resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileResource {

    @GetMapping
    public String profiler() {
        return "autorizado profile";
    }

}
