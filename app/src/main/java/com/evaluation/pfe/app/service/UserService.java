package com.evaluation.pfe.app.service;

import com.evaluation.pfe.app.dao.UserDao;
import com.evaluation.pfe.app.dto.UserDto;
import com.evaluation.pfe.app.entities.Role;
import com.evaluation.pfe.app.entities.User;
import com.evaluation.pfe.app.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service(value = "userService")
@RequiredArgsConstructor
public class UserService implements UserDetailsService, IUserService {
    private final UserDao userDao;
    private final BCryptPasswordEncoder bcryptEncoder;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();

        authorities.add(new SimpleGrantedAuthority(user.getRole().toString()));

        return authorities;
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<>();
        userDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public User findOne(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public User approveEmployee(Long userId) {
        User user = userDao.findById(userId).orElse(null);
        if(user==null){
            throw new  BadRequestException("USER_NOT_FOUND");
        }
        if(user.getIsApproved()){
            throw new BadRequestException("USER_ALREADY_APPROVED");
        }
        user.setIsApproved(true);
        return userDao.save(user);
    }
    @Override
    public User approveRH(Long userId) {
        User user = userDao.findById(userId).orElse(null);
        System.out.println(user.getIsApproved());
        if(user==null){
            throw new  BadRequestException("USER_NOT_FOUND");
        }
        if(user.getIsApproved()){
            throw new BadRequestException("USER_ALREADY_APPROVED");
        }
        user.setIsApproved(true);
        return userDao.save(user);
    }

    @Override
    public void deleteOne(String username) {
        userDao.deleteByUsername(username);
    }

    @Override
    public User save(UserDto user) {
        // Validate required fields
        if (Objects.equals(user.getPassword(), "") || user.getPassword() == null) {
            throw new BadRequestException("PASSWORD_REQUIRED");
        }
        if (Objects.equals(user.getUsername(), "") || user.getUsername() == null) {
            throw new BadRequestException("USERNAME_REQUIRED");
        }
        if (Objects.equals(user.getEmail(), "") || user.getEmail() == null) {
            throw new BadRequestException("EMAIL_REQUIRED");
        }

        // Check if the user already exists
        if (userDao.findByUsername(user.getUsername()) != null) {
            throw new BadRequestException("USERNAME_ALREADY_EXIST");
        }
        if (userDao.findByEmail(user.getEmail()) != null) {
            throw new BadRequestException("EMAIL_ALREADY_EXIST");
        }

        if(user.getRole() == null || !EnumSet.allOf(Role.class).contains(user.getRole())) {
            throw new BadRequestException("INVALID_ROLE");
        }

        User nUser = user.getUserFromDto();
        nUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        return userDao.save(nUser);
    }


}
