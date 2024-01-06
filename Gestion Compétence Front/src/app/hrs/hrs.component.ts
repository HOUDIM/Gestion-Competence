import { Component } from '@angular/core';
import { UpdateEmployeeComponent } from '../employees/update-employee/update-employee.component';
import { EmployeeService } from '../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HrsService } from '../services/hrs.service';
import { UpdateHrComponent } from './update-hr/update-hr.component';
@Component({
  selector: 'app-hrs',
  templateUrl: './hrs.component.html',
  styleUrls: ['./hrs.component.scss'],
})
export class HrsComponent {
  hrs: any[] = [];
  searchTerm: string = '';
  filteredHrs: any[] = [];

  filterEmployees(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredHrs = [...this.hrs];
    } else {
      this.filteredHrs = this.hrs.filter(
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
  constructor(private hrService: HrsService, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.retrieveAllHrs();
  }

  openUpdateModal(hr: any): void {
    const modalRef = this.modalService.open(UpdateHrComponent);
    modalRef.componentInstance.hr = hr;

    modalRef.result.then(
      (result) => {
        // Handle modal close (e.g., refresh employee list)
        console.log(result);
        this.retrieveAllHrs(); // Refresh employee list after update
      },
      (reason) => {
        // Handle modal dismissal (if needed)
        console.log(reason);
      }
    );
  }

  retrieveAllHrs() {
    this.hrService.getAllHrs().subscribe({
      next: (data) => {
        this.hrs = data;
        this.filteredHrs = data;
      },
    });
  }
  toggleBlockHr(employeeUsername: string): void {
    this.hrService
      .toggleBlocHr(employeeUsername)
      .subscribe((updatedEmployee) => {
        // Handle the success response (e.g., update the employee's block status)
        console.log(
          `Employee with ID ${employeeUsername} block status toggled successfully.`
        );
        const updatedIndex = this.hrs.findIndex(
          (employee) => employee.id === updatedEmployee.id
        );
        if (updatedIndex !== -1) {
          this.hrs[updatedIndex] = updatedEmployee;
        }
      });
  }
  deleteHr(employeeId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.hrService.deleteHr(employeeId).subscribe(() => {
        // Handle the success response (e.g., remove the deleted employee from the list)
        console.log(`Employee with ID ${employeeId} deleted successfully.`);
        this.hrs = this.hrs.filter((employee) => employee.id !== employeeId);
        this.retrieveAllHrs();
      });
    }
  }
}
