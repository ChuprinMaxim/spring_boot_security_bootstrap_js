package com.example.spring_boot_security_bootstrap_js.controller;

import com.example.spring_boot_security_bootstrap_js.model.User;
import com.example.spring_boot_security_bootstrap_js.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestControllerAdmin {

    private final UserService userService;
    @Autowired
    public RestControllerAdmin(UserService userService) {
        this.userService = userService;
    }

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @PostMapping("/users")
    public User addNewUser(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userService.addUserInformation(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUserInformation(@RequestBody User user) {
        userService.addUserInformation(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public String deleteUserById(@PathVariable int id) {
        userService.deleteUserById(id);
        return "User with ID = " + id + " was deleted";
    }
}
