package com.example.spring_boot_security_bootstrap_js.dao;

import com.example.spring_boot_security_bootstrap_js.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role, Long> {
}
