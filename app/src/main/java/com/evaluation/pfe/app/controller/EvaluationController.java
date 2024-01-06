package com.evaluation.pfe.app.controller;

import com.evaluation.pfe.app.entities.Evaluation;
import com.evaluation.pfe.app.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/evaluations")
public class EvaluationController {

    private final EvaluationService evaluationService;

    @Autowired
    public EvaluationController(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    @GetMapping("/{skillId}")
    public Set<Evaluation> getAllEvaluations(@PathVariable Long skillId) {
        return evaluationService.getAllEvaluations(skillId);
    }

    @PostMapping("/{skillId}")
    public Evaluation createEvaluation(@PathVariable Long skillId,@RequestBody Evaluation evaluation) {
        return evaluationService.createEvaluation(skillId,evaluation);
    }

    @PutMapping("/{id}")
    public Evaluation updateEvaluation(@PathVariable Long id, @RequestBody Evaluation updatedEvaluation) {
        return evaluationService.updateEvaluation(id, updatedEvaluation);
    }

    @DeleteMapping("/{id}")
    public void deleteEvaluation(@PathVariable Long id) {
        evaluationService.deleteEvaluation(id);
    }
}

