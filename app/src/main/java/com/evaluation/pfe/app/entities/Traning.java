package com.evaluation.pfe.app.entities;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name = "employee_traning")
public class Traning implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long TraningId;

    @Column(name = "name")
    private String name;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "passed_at")
    private Date passedAt;
    @ManyToOne(cascade = {CascadeType.MERGE ,CascadeType.DETACH})
    private Skill skill;


}
