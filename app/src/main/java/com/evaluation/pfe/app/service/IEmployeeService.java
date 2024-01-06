package com.evaluation.pfe.app.service;

import com.evaluation.pfe.app.dto.UserDto;
import com.evaluation.pfe.app.entities.*;

import java.util.List;
import java.util.Set;

public interface IEmployeeService {
    Set<User>retrieveAllEmployees();
    Set<Skill> retrieveSkillsByEmployee(Long employeeId);
    Set<Traning> retrieveTrainingsByEmployee(Long employeeId);
    Set<Model> retrieveModelsByEmployee(Long employeeId);
    Set<Evaluation> retrieveEvaluationsByEmployee(Long employeeId);
}
