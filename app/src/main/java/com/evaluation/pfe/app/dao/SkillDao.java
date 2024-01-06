package com.evaluation.pfe.app.dao;

import com.evaluation.pfe.app.entities.Skill;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface SkillDao extends CrudRepository<Skill,Long> {
    Set<Skill> findByEmployeeId(Long employeeId);
}
