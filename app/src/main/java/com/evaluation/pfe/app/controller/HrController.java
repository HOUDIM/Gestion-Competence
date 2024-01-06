package com.evaluation.pfe.app.controller;

import com.evaluation.pfe.app.dao.UserDao;
import com.evaluation.pfe.app.dto.UserDto;
import com.evaluation.pfe.app.entities.*;
import com.evaluation.pfe.app.service.IEmployeeService;
import com.evaluation.pfe.app.service.IHrService;
import com.evaluation.pfe.app.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/hr")
public class HrController {

    private final IEmployeeService employeeService;
    private final IHrService hrService;
    private final IUserService userService;
    private final UserDao userDao;


    @PatchMapping("/{hrUsername}/block")
    public ResponseEntity<?> toggleBlockHr(@PathVariable String hrUsername) {
        // Implement block/unblock logic here
        User existingHr = userService.findOne(hrUsername);
        if (existingHr == null) {
            return ResponseEntity.notFound().build();
        }

        // Toggle the block status
        existingHr.setIsApproved(!existingHr.getIsApproved());

        // Save the updated status

        userDao.save(existingHr);

        return ResponseEntity.ok().body(existingHr);
    }

    @Transactional
    @DeleteMapping("/{hrUsername}")
    public ResponseEntity<?> deleteHr(@PathVariable String hrUsername) {
        // Implement delete logic here
        User existingEmployee = userService.findOne(hrUsername);
        if (existingEmployee == null) {

            return ResponseEntity.notFound().build();
        }

        // Delete the employee
//        userService.deleteOne(employeeUsername);
        userDao.deleteByUsername(hrUsername);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{hrId}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long hrId, @RequestBody UserDto updatedHr) {
        // Implement update logic here
        User existingHr = userService.findOne(updatedHr.getUsername());
        if (existingHr == null) {
            return ResponseEntity.notFound().build();
        }

        // Update employee fields based on updatedEmployee
        existingHr.setName(updatedHr.getName());
        existingHr.setEmail(updatedHr.getEmail());
        existingHr.setPhone(updatedHr.getPhone());

        // Save the updated employee
        //userService.save(existingEmployee);
        userDao.save(existingHr);

        return ResponseEntity.ok().body(existingHr);
    }

    @GetMapping
    public Set<User> getAllHr() {
        return hrService.retrieveAllHrs();
    }
}

