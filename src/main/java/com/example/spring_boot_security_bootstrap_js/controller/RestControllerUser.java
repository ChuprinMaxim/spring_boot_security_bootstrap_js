package com.example.spring_boot_security_bootstrap_js.controller;

import com.example.spring_boot_security_bootstrap_js.model.User;
import com.example.spring_boot_security_bootstrap_js.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RestControllerUser {

    @GetMapping("/user")
    public User getUser(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
}
