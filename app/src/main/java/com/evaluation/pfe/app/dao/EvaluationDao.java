package com.evaluation.pfe.app.dao;

import com.evaluation.pfe.app.entities.Evaluation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface EvaluationDao extends CrudRepository<Evaluation,Long> {
    // Custom query to find evaluations by employee ID
    @Query("SELECT e FROM Evaluation e WHERE e.skill.employee.id = :employeeId")
    Set<Evaluation> findEvaluationsByEmployeeId(@Param("employeeId") Long employeeId);

    Set<Evaluation> findEvaluationBySkill_SkillId(Long skillId);
}
