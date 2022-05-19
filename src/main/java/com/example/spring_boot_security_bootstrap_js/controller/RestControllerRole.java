package com.example.spring_boot_security_bootstrap_js.controller;

import com.example.spring_boot_security_bootstrap_js.dao.RoleDao;
import com.example.spring_boot_security_bootstrap_js.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestControllerRole {

    private final RoleDao roleDao;
    @Autowired
    public RestControllerRole(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @GetMapping("/role")
    public List<Role> getRole() {
        return roleDao.findAll();
    }
}
