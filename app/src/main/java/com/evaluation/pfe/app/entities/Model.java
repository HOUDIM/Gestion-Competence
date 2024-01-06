package com.evaluation.pfe.app.entities;

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
@EqualsAndHashCode
@Table(name = "job_model")
public class Model implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_model_id")
    private Long id;


    @OneToMany(cascade = {CascadeType.ALL})
    private Set<User> employees = new HashSet<>();

    @Column(name = "created_at")
    @Temporal(TemporalType.DATE)
    private Date createdAt;

    @Column(name = "updatedAt")
    @Temporal(TemporalType.DATE)
    private Date updatedAt;
}
