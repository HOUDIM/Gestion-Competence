package com.evaluation.pfe.app.controller;

import com.evaluation.pfe.app.dao.UserDao;
import com.evaluation.pfe.app.dto.UserDto;
import com.evaluation.pfe.app.entities.*;
import com.evaluation.pfe.app.service.IEmployeeService;
import com.evaluation.pfe.app.service.IUserService;
import com.evaluation.pfe.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Set;
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/employees")
public class EmployeeController {

    private final IEmployeeService employeeService;
    private final IUserService userService;
    private final UserDao userDao;


    @PatchMapping("/{employeeUSername}/block")
    public ResponseEntity<?> toggleBlockEmployee(@PathVariable String employeeUSername) {
        // Implement block/unblock logic here
        User existingEmployee = userService.findOne(employeeUSername);
        if (existingEmployee == null) {
            return ResponseEntity.notFound().build();
        }

        // Toggle the block status
        existingEmployee.setIsApproved(!existingEmployee.getIsApproved());

        // Save the updated status

        userDao.save(existingEmployee);

        return ResponseEntity.ok().body(existingEmployee);
    }

    @Transactional
    @DeleteMapping("/{employeeUsername}")
    public ResponseEntity<?> deleteEmployee(@PathVariable String employeeUsername) {
        // Implement delete logic here
        User existingEmployee = userService.findOne(employeeUsername);
        if (existingEmployee == null) {

            return ResponseEntity.notFound().build();
        }

        // Delete the employee
//        userService.deleteOne(employeeUsername);
        userDao.deleteByUsername(employeeUsername);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long employeeId, @RequestBody UserDto updatedEmployee) {
        // Implement update logic here
        User existingEmployee = userService.findOne(updatedEmployee.getUsername());
        if (existingEmployee == null) {
            return ResponseEntity.notFound().build();
        }

        // Update employee fields based on updatedEmployee
        existingEmployee.setName(updatedEmployee.getName());
        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setPhone(updatedEmployee.getPhone());

        // Save the updated employee
        //userService.save(existingEmployee);
        userDao.save(existingEmployee);

        return ResponseEntity.ok().body(existingEmployee);
    }

    @GetMapping
    public Set<User> getAllEmployees() {
        return employeeService.retrieveAllEmployees();
    }

    @GetMapping("/{employeeId}/skills")
    public Set<Skill> getSkillsByEmployee(@PathVariable Long employeeId) {
        return employeeService.retrieveSkillsByEmployee(employeeId);
    }

    @GetMapping("/{employeeId}/trainings")
    public Set<Traning> getTrainingsByEmployee(@PathVariable Long employeeId) {
        return employeeService.retrieveTrainingsByEmployee(employeeId);
    }

    @GetMapping("/{employeeId}/models")
    public Set<Model> getModelsByEmployee(@PathVariable Long employeeId) {
        return employeeService.retrieveModelsByEmployee(employeeId);
    }

    @GetMapping("/{employeeId}/evaluations")
    public Set<Evaluation> getEvaluationsByEmployee(@PathVariable Long employeeId) {
        return employeeService.retrieveEvaluationsByEmployee(employeeId);
    }
}

