import { Component, Input } from '@angular/core';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss'],
})
export class AddEvaluationComponent {
  form: FormGroup;
  constructor(
    private evaluationService: EvaluationService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      rating: new FormControl('', Validators.required),
    });
  }
  @Input() skillId: number;
  evaluation: any = {
    rating: 'PASSER',
  };

  addSkill(): void {
    console.log(this.evaluation);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Update the employee using the updatedEmployee data
    this.evaluationService
      .createEvaluation(this.skillId, this.form.value)
      .subscribe(() => {
        // Close the modal on success
        this.activeModal.close('Evaluation created');
      });
  }

  get rating() {
    return this.form.controls['rating'];
  }
}
