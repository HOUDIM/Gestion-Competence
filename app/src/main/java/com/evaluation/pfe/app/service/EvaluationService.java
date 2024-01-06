package com.evaluation.pfe.app.service;
import com.evaluation.pfe.app.dao.EvaluationDao;
import com.evaluation.pfe.app.dao.SkillDao;
import com.evaluation.pfe.app.entities.Evaluation;
import com.evaluation.pfe.app.entities.Skill;
import com.evaluation.pfe.app.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final EvaluationDao evaluationDao;
    private final SkillDao skillDao;

    public Set<Evaluation> getAllEvaluations(Long skillId) {
        return  evaluationDao.findEvaluationBySkill_SkillId(skillId);
    }

    public Optional<Evaluation> getEvaluationById(Long id) {
        return evaluationDao.findById(id);
    }

    public Evaluation createEvaluation(Long skillId,Evaluation evaluation) {
        Skill skill  = skillDao.findById(skillId).orElseThrow(()-> new ResourceNotFoundException("Compétance Introuvable"));
        skill.setLastEvaluation(evaluation.getRating().toString());
        skillDao.save(skill);
        evaluation.setSkill(skill);
        return evaluationDao.save(evaluation);
    }

    public Evaluation updateEvaluation(Long id, Evaluation updatedEvaluation) {
        if (evaluationDao.existsById(id)) {
            updatedEvaluation.setId(id);
            updatedEvaluation.setSkill(evaluationDao.findById(id).get().getSkill());
            return evaluationDao.save(updatedEvaluation);
        } else {
            // Handle error or throw an exception for not found.
            return null;
        }
    }

    public void deleteEvaluation(Long id) {
        evaluationDao.deleteById(id);
    }
}

