import { Component } from '@angular/core';
import { TraningService } from '../services/formation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateFormationComponent } from './update-formation/update-formation.component';
import { CreateFormationComponent } from './create-formation/create-formation.component';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class FormationsComponent {
  formations: any[] = [];
  searchTerm: string = '';
  filteredFormations: any[] = [];

  filterTraning(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredFormations = [...this.formations];
    } else {
      this.filteredFormations = this.formations.filter(
        (employee) =>
          employee.TraningId.toString().includes(
            this.searchTerm.toLowerCase()
          ) ||
          employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          employee.skill.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }
  }
  constructor(
    private formationService: TraningService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.retrieveAllEmployees();
  }

  openUpdateModal(formation: any): void {
    const modalRef = this.modalService.open(UpdateFormationComponent);
    modalRef.componentInstance.formation = formation;

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
  openCreateModal(): void {
    const modalRef = this.modalService.open(CreateFormationComponent);
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
    this.formationService.getAllTranings().subscribe({
      next: (data) => {
        this.formations = data;
        this.filteredFormations = data;
      },
    });
  }

  deleteEmployee(employeeId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.formationService.deleteTraning(employeeId).subscribe(() => {
        // Handle the success response (e.g., remove the deleted employee from the list)
        console.log(`Employee with ID ${employeeId} deleted successfully.`);
        this.retrieveAllEmployees();
      });
    }
  }
}
