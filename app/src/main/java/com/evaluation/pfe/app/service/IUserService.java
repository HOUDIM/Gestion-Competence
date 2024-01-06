package com.evaluation.pfe.app.service;

import com.evaluation.pfe.app.dto.UserDto;
import com.evaluation.pfe.app.entities.User;

import java.util.List;

public interface IUserService {
    User save(UserDto user);
    List<User> findAll();
    User findOne(String username);
    User approveEmployee(Long employeeId);
    User approveRH(Long rhId);
    void deleteOne(String username);

}
