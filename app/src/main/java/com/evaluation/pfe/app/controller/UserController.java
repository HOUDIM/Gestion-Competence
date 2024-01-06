package com.evaluation.pfe.app.controller;

import com.evaluation.pfe.app.service.IUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
@AllArgsConstructor
@Slf4j
public class UserController {
    private final IUserService userService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_RH')")
    @GetMapping(value ="/approve-employee/{employeeId}")
    @ResponseBody
    public ResponseEntity<?> approveEmployee(@PathVariable("employeeId") Long employeeId){
        log.info(employeeId.toString());
        return ResponseEntity.ok(userService.approveEmployee(employeeId));
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value ="/approve-rh/{rhId}")
    @ResponseBody
    public ResponseEntity<?> approveRH(@PathVariable("rhId") Long employeeId){
        log.info(employeeId.toString());
        return ResponseEntity.ok(userService.approveEmployee(employeeId));
    }
}
