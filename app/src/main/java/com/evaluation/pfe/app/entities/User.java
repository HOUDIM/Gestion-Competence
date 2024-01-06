package com.evaluation.pfe.app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "vuser")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String username;

    @Column
    @JsonIgnore
    private String password;

    @Column
    private String email;

    @Column
    private String phone;

    @Column
    private String name;

    @Column
    private String businessTitle;

    @Column(name = "is_approved")
    private Boolean isApproved = false;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private Set<Skill> skills = new HashSet<>();
    // Constructors, getters, and setters
}
