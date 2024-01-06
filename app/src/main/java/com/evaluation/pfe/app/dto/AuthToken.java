package com.evaluation.pfe.app.dto;

import com.evaluation.pfe.app.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthToken {
    private String token;
    private User connectedUser;
}
