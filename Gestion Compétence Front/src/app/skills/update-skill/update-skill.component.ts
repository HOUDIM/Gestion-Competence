import { Component, Input } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.scss'],
})
export class UpdateSkillComponent {
  constructor(
    private skillService: SkillService,
    public activeModal: NgbActiveModal
  ) {}
  @Input() skill: any;

  addSkill(): void {
    // Update the employee using the updatedEmployee data
    this.skillService
      .updateSkill(this.skill.skillId, this.skill)
      .subscribe(() => {
        // Close the modal on success
        this.activeModal.close('Skill updated');
      });
  }
}
