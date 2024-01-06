package com.evaluation.pfe.app.controller;

import com.evaluation.pfe.app.configuration.TokenProvider;
import com.evaluation.pfe.app.dao.UserDao;
import com.evaluation.pfe.app.dto.AuthToken;
import com.evaluation.pfe.app.dto.LoginUser;
import com.evaluation.pfe.app.dto.UserDto;
import com.evaluation.pfe.app.entities.Role;
import com.evaluation.pfe.app.entities.User;
import com.evaluation.pfe.app.exceptions.BadRequestException;
import com.evaluation.pfe.app.service.IUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@Slf4j
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final TokenProvider jwtTokenUtil;

    private final IUserService userService;
    private final UserDao userDao;

    @PostMapping(value = "/login")
    public ResponseEntity<?> generateToken(@RequestBody LoginUser loginUser) throws AuthenticationException {
        try {

            //check if the user is approved
            User user = userDao.findByUsername(loginUser.getUsername());

            if ((user.getRole().equals(Role.ROLE_EMPLOYER) || user.getRole().equals(Role.ROLE_RH)) && user.getIsApproved().equals(false)){
                throw new BadRequestException("USER_NOT_APPROVED_YET");
            }
            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginUser.getUsername(),
                            loginUser.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            final String token = jwtTokenUtil.generateToken(authentication);

            return ResponseEntity.ok(new AuthToken(token,user));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            
            Map<String,String> errorMap = new HashMap<>();
            if (e.getMessage()==null){
                errorMap.put("error","INVALID_DATA");
            }
            else{
                errorMap.put("error",e.getLocalizedMessage());
            }

            return ResponseEntity.status(400).body(errorMap);
        }

    }


    @RequestMapping(value="/register/", method = RequestMethod.POST)
    @ResponseBody
    public User saveUser(@RequestBody UserDto user){
        return userService.save(user);
    }

    @PreAuthorize("hasRole('ROLE_EMPLOYER')")
    @RequestMapping(value="/userping", method = RequestMethod.GET)
    public String userPing(){
        return "Any User Can Read This";
    }

}

