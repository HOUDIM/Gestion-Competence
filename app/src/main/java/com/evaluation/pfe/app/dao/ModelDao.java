package com.evaluation.pfe.app.dao;

import com.evaluation.pfe.app.entities.Model;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ModelDao extends CrudRepository<Model,Long> {
    // Custom query to find models by employee ID
    @Query("SELECT m FROM Model m JOIN m.employees e WHERE e.id = :employeeId")
    Set<Model> findModelsByEmployeeId(@Param("employeeId") Long employeeId);

}
