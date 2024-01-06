package com.evaluation.pfe.app.dto;

import com.evaluation.pfe.app.entities.Role;
import com.evaluation.pfe.app.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserResponse {
    private Long id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String name;
    private String businessTitle;
    private Role role;

    public User getUserFromDto(){
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setPhone(phone);
        user.setName(name);
        user.setBusinessTitle(businessTitle);
        user.setRole(role);

        return user;
    }
}
