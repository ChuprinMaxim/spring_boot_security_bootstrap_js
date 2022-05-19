package com.example.spring_boot_security_bootstrap_js.dao;

import com.example.spring_boot_security_bootstrap_js.model.User;

import java.util.List;

public interface UserDao {

    public List<User> getAllUsers();

    public void addUserInformation(User user);

    public User getUserById(long id);

    public void deleteUserById(long id);

    public User getUserByEmail(String email);
}
