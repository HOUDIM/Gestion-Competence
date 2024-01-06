import { Component, Input } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss'],
})
export class AddSkillComponent {
  constructor(
    private skillService: SkillService,
    public activeModal: NgbActiveModal
  ) {}
  @Input() employeeId: number;
  newSkill: any = {
    skillName: '',
  };

  addSkill(): void {
    console.log(this.newSkill);

    // Update the employee using the updatedEmployee data
    this.skillService
      .createSkill(this.employeeId, this.newSkill)
      .subscribe(() => {
        // Close the modal on success
        this.activeModal.close('Employee updated');
      });
  }
}
