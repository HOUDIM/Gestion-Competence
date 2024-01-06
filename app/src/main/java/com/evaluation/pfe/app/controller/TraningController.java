package com.evaluation.pfe.app.controller;

import com.evaluation.pfe.app.service.TrainingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.evaluation.pfe.app.entities.Traning;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/tranings")
@RequiredArgsConstructor
public class TraningController {

    private final TrainingService traningService;


    @GetMapping("")
    public List<Traning> getAllTranings() {
        return traningService.getAllTranings();
    }

    @GetMapping("/{id}")
    public Optional<Traning> getTraningById(@PathVariable Long id) {
        return traningService.getTraningById(id);
    }

    @PostMapping("/{skillId}")
    public Traning createTraning(@PathVariable Long skillId, @RequestBody Traning traning) {
        return traningService.createTraning(skillId, traning);
    }

    @PutMapping("/{id}")
    public Traning updateTraning(@PathVariable Long id, @RequestBody Traning updatedTraning) {
        return traningService.updateTraning(id, updatedTraning);
    }

    @DeleteMapping("/{id}")
    public void deleteTraning(@PathVariable Long id) {
        traningService.deleteTraning(id);
    }
}


