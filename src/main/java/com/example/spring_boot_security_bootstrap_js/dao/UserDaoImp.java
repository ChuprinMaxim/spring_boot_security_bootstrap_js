package com.example.spring_boot_security_bootstrap_js.dao;


import com.example.spring_boot_security_bootstrap_js.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDaoImp implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> getAllUsers() {
        return entityManager.createQuery("select user from User user", User.class).getResultList();
    }

    @Override
    public void addUserInformation(User user) {
        if (user.getId() == 0) {
            entityManager.persist(user);
        } else {
            user.setId(user.getId());
            entityManager.merge(user);
        }
    }

    @Override
    public User getUserById(long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public void deleteUserById(long id) {
        entityManager.remove(entityManager.find(User.class, id));
    }

    @Override
    public User getUserByEmail(String email) {
        return entityManager.createQuery("select user from User user where user.email =:ue", User.class)
                .setParameter("ue", email)
                .getSingleResult();
    }
}
