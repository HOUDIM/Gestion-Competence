import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modifier-evaluation',
  templateUrl: './modifier-evaluation.component.html',
  styleUrls: ['./modifier-evaluation.component.scss'],
})
export class ModifierEvaluationComponent implements OnInit {
  form: FormGroup;
  constructor(
    private evaluationService: EvaluationService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      rating: new FormControl(this.evaluation.rating, Validators.required),
    });
  }
  @Input() evaluation: any;

  updateEvaluation(): void {
    console.log(this.evaluation);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Update the employee using the updatedEmployee data
    this.evaluationService
      .updateEvaluation(this.evaluation.id, this.form.value)
      .subscribe(() => {
        // Close the modal on success
        this.activeModal.close('Evaluation created');
      });
  }

  get rating() {
    return this.form.controls['rating'];
  }
}
