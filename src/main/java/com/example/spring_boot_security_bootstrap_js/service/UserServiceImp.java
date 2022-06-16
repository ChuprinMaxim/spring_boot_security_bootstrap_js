package com.example.spring_boot_security_bootstrap_js.service;

import com.example.spring_boot_security_bootstrap_js.dao.RoleDao;
import com.example.spring_boot_security_bootstrap_js.dao.UserDao;
import com.example.spring_boot_security_bootstrap_js.model.Role;
import com.example.spring_boot_security_bootstrap_js.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImp implements UserService {

    private final RoleDao roleDao;
    private final UserDao userDao;

    @Autowired
    public UserServiceImp(RoleDao roleDao, UserDao userDao) {
        this.roleDao = roleDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }

    @Override
    @Transactional
    public void addUserInformation(User user) {
        userDao.addUserInformation(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(long id) {
        return userDao.getUserById(id);
    }

    @Override
    @Transactional
    public void deleteUserById(long id) {
        userDao.deleteUserById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userDao.getUserByEmail(email);
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userDao.getUserByEmail(email);
    }

    @Transactional(readOnly = true)
    public Set<Role> getRoles() {
        return Set.copyOf(roleDao.findAll());
    }
}
