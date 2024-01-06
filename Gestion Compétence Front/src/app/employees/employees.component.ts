import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  searchTerm: string = '';
  filteredEmployees: any[] = [];

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
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.retrieveAllEmployees();
  }

  openUpdateModal(employee: number): void {
    const modalRef = this.modalService.open(UpdateEmployeeComponent);
    modalRef.componentInstance.employee = employee;

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
  toggleBlockEmployee(employeeUsername: string): void {
    this.employeeService
      .toggleBlockEmployee(employeeUsername)
      .subscribe((updatedEmployee) => {
        // Handle the success response (e.g., update the employee's block status)
        console.log(
          `Employee with ID ${employeeUsername} block status toggled successfully.`
        );
        const updatedIndex = this.employees.findIndex(
          (employee) => employee.id === updatedEmployee.id
        );
        if (updatedIndex !== -1) {
          this.employees[updatedIndex] = updatedEmployee;
        }
      });
  }
  deleteEmployee(employeeId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(() => {
        // Handle the success response (e.g., remove the deleted employee from the list)
        console.log(`Employee with ID ${employeeId} deleted successfully.`);
        this.employees = this.employees.filter(
          (employee) => employee.id !== employeeId
        );
      });
    }
  }
  updateEmployee(employeeUsername: string): void {
    // Implement the logic to retrieve updated employee data (e.g., a form)
    const updatedEmployee = {
      name: 'Updated Name',
      email: 'updated@email.com',
      phone: '123-456-7890',
      // Add more fields as needed
    };

    this.employeeService
      .updateEmployee(employeeUsername, updatedEmployee)
      .subscribe(() => {
        // Handle the success response (e.g., show a message)
        console.log(
          `Employee with ID ${employeeUsername} updated successfully.`
        );
      });
  }
}
