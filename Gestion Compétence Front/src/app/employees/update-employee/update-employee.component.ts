import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent {
  @Input() employee: any;

  // Define properties for the updated employee data (e.g., name, email, phone)
  updatedEmployee: any = {
    name: '',
    email: '',
    phone: '',
    // Add more fields as needed
  };

  constructor(
    public activeModal: NgbActiveModal,
    private employeeService: EmployeeService
  ) {}

  // ngOnInit(): void {
  //   // Load the current employee data and populate the updatedEmployee object
  //   this.employeeService.getEmployeeById(this.employeeId).subscribe((data) => {
  //     this.updatedEmployee = data;
  //   });
  // }

  updateEmployee(): void {
    // Update the employee using the updatedEmployee data
    this.employeeService
      .updateEmployee(this.employee.id, this.employee)
      .subscribe(() => {
        // Close the modal on success
        this.activeModal.close('Employee updated');
      });
  }
}
