package com.evaluation.pfe.app.dao;

import com.evaluation.pfe.app.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserDao extends CrudRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
    // Custom query to retrieve users by role
    @Query("SELECT u FROM User u WHERE u.role = 'ROLE_EMPLOYER'")
    Set<User> findUsersByRoleEmployer();
    @Query("SELECT u FROM User u WHERE u.role = 'ROLE_RH'")
    Set<User> findUserByRoleHr();
    void deleteByUsername(String username);
}
