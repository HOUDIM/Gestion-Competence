package com.evaluation.pfe.app.service;

import com.evaluation.pfe.app.dao.*;
import com.evaluation.pfe.app.dto.UserDto;
import com.evaluation.pfe.app.entities.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService implements IEmployeeService{
    private final SkillDao skillDao;
    private final EvaluationDao evaluationDao;
    private  final ModelDao modelDao;
    private final UserDao userDao;
    private final TrainingDao trainingDao;
    @Override
    public Set<User> retrieveAllEmployees() {
        log.info("Find Employees");
        return userDao.findUsersByRoleEmployer();
    }

    @Override
    public Set<Skill> retrieveSkillsByEmployee(Long employeeId) {
        log.info("Find Skills By Employee ID");
        return skillDao.findByEmployeeId(employeeId);
    }

    @Override
    public Set<Traning> retrieveTrainingsByEmployee(Long employeeId) {
        log.info("Find trainings By Employee ID");
        return trainingDao.findTrainingsByEmployeeId(employeeId);
    }

    @Override
    public Set<Model> retrieveModelsByEmployee(Long employeeId) {
        log.info("Find models By Employee ID");
        return modelDao.findModelsByEmployeeId(employeeId);
    }

    @Override
    public Set<Evaluation> retrieveEvaluationsByEmployee(Long employeeId) {
        log.info("Find models By Employee ID");
        return evaluationDao.findEvaluationsByEmployeeId(employeeId);
    }
}
