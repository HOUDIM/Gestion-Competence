import { Component } from '@angular/core';
import { AddEvaluationComponent } from './add-evaluation/add-evaluation.component';
import { SkillService } from '../services/skill.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModifierEvaluationComponent } from './modifier-evaluation/modifier-evaluation.component';
import { EvaluationService } from '../services/evaluation.service';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss'],
})
export class EvaluationsComponent {
  skills: any[] = [];
  searchTerm: string = '';
  filteredSkills: any[] = [];
  expandedSkillId: number | null = null;

  filterEmployees(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredSkills = [...this.skills];
    } else {
      this.filteredSkills = this.skills.filter(
        (employee) =>
          employee.skillId.toString().includes(this.searchTerm.toLowerCase()) ||
          employee.skillName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }
  }
  constructor(
    private skillService: SkillService,
    private modalService: NgbModal,
    private evaluationService: EvaluationService
  ) {}
  ngOnInit(): void {
    this.retrieveAllSkills();
  }

  openUpdateModal(evaluation: any): void {
    const modalRef = this.modalService.open(ModifierEvaluationComponent);
    modalRef.componentInstance.evaluation = evaluation;

    modalRef.result.then(
      (result) => {
        // Handle modal close (e.g., refresh employee list)
        console.log(result);
        this.retrieveAllSkills(); // Refresh employee list after update
      },
      (reason) => {
        // Handle modal dismissal (if needed)
        console.log(reason);
      }
    );
  }

  retrieveAllSkills() {
    this.skillService.getAllSkills().subscribe({
      next: (data) => {
        this.skills = data;
        this.filteredSkills = data;
      },
    });
  }

  deleteEvaluation(employeeId: number): void {
    if (confirm('Are you sure you want to delete this Skill?')) {
      this.evaluationService.deleteEvaluation(employeeId).subscribe(() => {
        // Handle the success response (e.g., remove the deleted employee from the list)
        console.log(`Skill with ID ${employeeId} deleted successfully.`);
        this.retrieveAllSkills();
      });
    }
  }

  openAddSkill(skillId: number) {
    const modalRef = this.modalService.open(AddEvaluationComponent);
    modalRef.componentInstance.skillId = skillId;

    modalRef.result.then(
      (result) => {
        // Handle modal close (e.g., refresh employee list)
        console.log(result);
        this.retrieveAllSkills(); // Refresh employee list after update
      },
      (reason) => {
        // Handle modal dismissal (if needed)
        console.log(reason);
      }
    );
  }

  openUpdateEvaluation(evaluation: any) {
    const modalRef = this.modalService.open(ModifierEvaluationComponent);
    modalRef.componentInstance.evaluation = evaluation;

    modalRef.result.then(
      (result) => {
        // Handle modal close (e.g., refresh employee list)
        console.log(result);
        this.retrieveAllSkills(); // Refresh employee list after update
      },
      (reason) => {
        // Handle modal dismissal (if needed)
        console.log(reason);
      }
    );
  }

  toggleRow(evaluationId: number) {
    if (this.expandedSkillId === evaluationId) {
      this.expandedSkillId = null;
    } else {
      this.expandedSkillId = evaluationId;
    }
  }
}
