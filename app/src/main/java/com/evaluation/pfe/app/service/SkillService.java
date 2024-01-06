package com.evaluation.pfe.app.service;

import com.evaluation.pfe.app.dao.SkillDao;
import com.evaluation.pfe.app.dao.UserDao;
import com.evaluation.pfe.app.entities.Skill;
import com.evaluation.pfe.app.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
        import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SkillService {
    private final SkillDao skillRepository;
    private final UserDao userDao;
    public Skill createSkill(Long employeeId,Skill skill) {
        User employee = userDao.findById(employeeId).orElse(null);
        skill.setEmployee(employee);
        // You can add validation logic here if needed.
        return skillRepository.save(skill);
    }

    public Set<Skill> getAllSkillsByEmployee(Long employeeId) {
        return skillRepository.findByEmployeeId(employeeId);
    }
    public List<Skill> getAllSkills() {
        return (List<Skill>) skillRepository.findAll();
    }

    public Optional<Skill> getSkillById(Long skillId) {
        return skillRepository.findById(skillId);
    }

    public Skill updateSkill(Long skillId, Skill updatedSkill) {
        // Check if the skill with the given ID exists.
        Optional<Skill> existingSkill = skillRepository.findById(skillId);

        if (existingSkill.isPresent()) {
            Skill skill = existingSkill.get();
            skill.setSkillName(updatedSkill.getSkillName());
            // You can update other fields here if needed.
            return skillRepository.save(skill);
        } else {
            // Handle the case where the skill with the given ID does not exist.
            return null;
        }
    }

    public void deleteSkill(Long skillId) {
        skillRepository.deleteById(skillId);
    }
}
