package com.evaluation.pfe.app.service;

import com.evaluation.pfe.app.dao.SkillDao;
import com.evaluation.pfe.app.dao.TrainingDao;
import com.evaluation.pfe.app.entities.EvaluationRating;
import com.evaluation.pfe.app.entities.Traning;
import com.evaluation.pfe.app.entities.Skill;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TrainingService {

    private final TrainingDao traningRepository;
    private final SkillDao skillRepository;


    public List<Traning> getAllTranings() {
        return (List<Traning>) traningRepository.findAll();
    }

    public Optional<Traning> getTraningById(Long id) {
        return traningRepository.findById(id);
    }

    public Traning createTraning(Long skillId,Traning traning) {
        Skill skill = skillRepository.findById(skillId).orElse(null);
        // Check if the associated skill has a lastEvaluation of "PASSER"
        if (skill != null && skill.getLastEvaluation() != null && Objects.equals(skill.getLastEvaluation(), EvaluationRating.REFUSER.toString())) {
            traning.setSkill(skill);
            return traningRepository.save(traning);
        } else {
            // Handle the case where the skill does not have a "PASSER" evaluation
            // You can throw an exception, return null, or handle it as needed.
            throw new IllegalArgumentException("Vous ne pouvez pas créer une Formation que pour les compétances qui non pas validé leur evaluation .");
        }
    }

    public Traning updateTraning(Long id, Traning updatedTraning) {
        Traning t = traningRepository.findById(id).orElse(null);

        if (traningRepository.existsById(id)) {
            updatedTraning.setTraningId(id);
            assert t != null;
            updatedTraning.setSkill(t.getSkill());
            return traningRepository.save(updatedTraning);
        } else {
            // Handle error or throw an exception for not found.
            throw new IllegalArgumentException("Training not found.");
        }
    }

    public void deleteTraning(Long id) {
        traningRepository.deleteById(id);
    }
}
