package com.evaluation.pfe.app.dao;

import com.evaluation.pfe.app.entities.Skill;
import com.evaluation.pfe.app.entities.Traning;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface TrainingDao extends CrudRepository<Traning,Long> {

// Custom query to find trainings by employee ID
    @Query("SELECT t FROM Traning t WHERE t.skill.employee.id = :employeeId")
    Set<Traning> findTrainingsByEmployeeId(@Param("employeeId") Long employeeId);
}
