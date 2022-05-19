package com.example.spring_boot_security_bootstrap_js.service;

import com.example.spring_boot_security_bootstrap_js.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    public List<User> getAllUsers();

    public void addUserInformation(User user);

    public User getUserById(long id);

    public void deleteUserById(long id);

    public User getUserByEmail(String email);
}
