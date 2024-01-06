package com.evaluation.pfe.app.controller;

import com.evaluation.pfe.app.entities.Skill;
import com.evaluation.pfe.app.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/skills")
public class SkillController {
    private final SkillService skillService;

    @Autowired
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }
@Transactional
    @PostMapping("/{employeeId}")
    public ResponseEntity<Skill> createSkill(
            @PathVariable Long employeeId,
            @RequestBody Skill skill
    ) {
        Skill createdSkill = skillService.createSkill(employeeId, skill);
        if (createdSkill != null) {
            return ResponseEntity.ok(createdSkill);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> skills = skillService.getAllSkills();
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<Set<Skill>> getAllSkillsByEmployee(@PathVariable Long employeeId) {
        Set<Skill> skills = skillService.getAllSkillsByEmployee(employeeId);
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/{skillId}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long skillId) {
        Optional<Skill> skill = skillService.getSkillById(skillId);
        return skill.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{skillId}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long skillId, @RequestBody Skill updatedSkill) {
        Skill updated = skillService.updateSkill(skillId, updatedSkill);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long skillId) {
        skillService.deleteSkill(skillId);
        return ResponseEntity.noContent().build();
    }
}

