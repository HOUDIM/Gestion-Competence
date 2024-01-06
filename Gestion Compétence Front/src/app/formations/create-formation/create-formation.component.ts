import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { SkillService } from '../../services/skill.service';
import { forkJoin, map, pairwise } from 'rxjs';
import { TraningService } from '../../services/formation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.scss'],
})
export class CreateFormationComponent implements OnInit {
  employees: any[] = [];
  selectedEmployee: any;
  selectedSkills: any[] = [];
  form: FormGroup;
  constructor(
    private empmoyeeService: EmployeeService,
    private skillService: SkillService,
    private fb: FormBuilder,
    private formationService: TraningService,
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      employee: new FormControl(null, Validators.required),
      skill: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    });
    this.empmoyeeService.getAllEmployees().subscribe({
      next: (data) => (this.employees = data),
    });
    this.skillService.getAllSkills().subscribe({
      next: (data) => (this.selectedSkills = data),
    });

    this.employee.valueChanges.pipe(pairwise()).subscribe({
      next: (emp) => console.log(emp),
    });
  }

  addSkill() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formationService.createTraning(this.form.value);
  }

  get skill() {
    return this.form.controls['skill'];
  }

  get employee() {
    return this.form.controls['employee'];
  }
}
