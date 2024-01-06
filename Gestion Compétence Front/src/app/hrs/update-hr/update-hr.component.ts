import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HrsService } from 'src/app/services/hrs.service';

@Component({
  selector: 'app-update-hr',
  templateUrl: './update-hr.component.html',
  styleUrls: ['./update-hr.component.scss'],
})
export class UpdateHrComponent {
  @Input() hr: any;

  // Define properties for the updated employee data (e.g., name, email, phone)
  updatedEmployee: any = {
    name: '',
    email: '',
    phone: '',
    // Add more fields as needed
  };

  constructor(
    public activeModal: NgbActiveModal,
    private hrService: HrsService
  ) {}

  // ngOnInit(): void {
  //   // Load the current employee data and populate the updatedEmployee object
  //   this.employeeService.getEmployeeById(this.employeeId).subscribe((data) => {
  //     this.updatedEmployee = data;
  //   });
  // }

  updateEmployee(): void {
    // Update the employee using the updatedEmployee data
    this.hrService.updateHr(this.hr.id, this.hr).subscribe(() => {
      // Close the modal on success
      this.activeModal.close('Hr updated');
    });
  }
}
