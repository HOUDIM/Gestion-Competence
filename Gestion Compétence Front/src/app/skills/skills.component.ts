import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateEmployeeComponent } from '../employees/update-employee/update-employee.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { UpdateSkillComponent } from './update-skill/update-skill.component';
import { SkillService } from '../services/skill.service';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  employees: any[] = [];
  searchTerm: string = '';
  filteredEmployees: any[] = [];
  expandedEmployeeId: number | null = null;

  filterEmployees(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredEmployees = [...this.employees];
    } else {
      this.filteredEmployees = this.employees.filter(
        (employee) =>
          employee.id.toString().includes(this.searchTerm.toLowerCase()) ||
          employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          employee.phone
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          employee.username
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private skillService: SkillService
  ) {}
  ngOnInit(): void {
    this.retrieveAllEmployees();
  }

  openUpdateModal(skill: any): void {
    const modalRef = this.modalService.open(UpdateSkillComponent);
    modalRef.componentInstance.skill = skill;

    modalRef.result.then(
      (result) => {
        // Handle modal close (e.g., refresh employee list)
        console.log(result);
        this.retrieveAllEmployees(); // Refresh employee list after update
      },
      (reason) => {
        // Handle modal dismissal (if needed)
        console.log(reason);
      }
    );
  }

  retrieveAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
      },
    });
  }

  deleteSkill(employeeId: number): void {
    if (confirm('Are you sure you want to delete this Skill?')) {
      this.skillService.deleteSkill(employeeId).subscribe(() => {
        // Handle the success response (e.g., remove the deleted employee from the list)
        console.log(`Skill with ID ${employeeId} deleted successfully.`);
        this.retrieveAllEmployees();
      });
    }
  }

  openAddSkill(employeeId: number) {
    const modalRef = this.modalService.open(AddSkillComponent);
    modalRef.componentInstance.employeeId = employeeId;

    modalRef.result.then(
      (result) => {
        // Handle modal close (e.g., refresh employee list)
        console.log(result);
        this.retrieveAllEmployees(); // Refresh employee list after update
      },
      (reason) => {
        // Handle modal dismissal (if needed)
        console.log(reason);
      }
    );
  }

  toggleRow(employeeId: number) {
    if (this.expandedEmployeeId === employeeId) {
      this.expandedEmployeeId = null;
    } else {
      this.expandedEmployeeId = employeeId;
    }
  }
}
