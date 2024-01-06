package com.evaluation.pfe.app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "employee_skill")
public class Skill implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;

    @Column(name = "name")
    private String skillName;
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

    @ManyToOne
    @JoinColumn(name = "employee_id")
    @JsonIgnoreProperties({"skills"})
    private User employee;

    @Column(name = "last_evaluation")
    private String lastEvaluation ;

    @OneToMany(mappedBy = "skill",cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    private Set<Evaluation> evaluations = new HashSet<>();
}
