import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ISignupRequest } from '../types/auth.types';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent {
  form: FormGroup;
  success = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {}

  goBack() {
    this.router.navigateByUrl('/login');
  }
  private mapFormDataToRegisterRequest(): ISignupRequest {
    return {
      password: this.password.value,
      username: this.username.value,
      phone: this.phone.value,
      email: this.email.value,
      role: this.role.value,
      name: this.name.value,
    };
  }
  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.register(this.mapFormDataToRegisterRequest()).subscribe({
      next: (data) => {
        this.success = true;
      },
      error: (err) => this.form.setErrors({ invalid: true }),
    });
  }

  get password() {
    return this.form.controls['password'];
  }
  get username() {
    return this.form.controls['username'];
  }
  get name() {
    return this.form.controls['name'];
  }
  get phone() {
    return this.form.controls['phone'];
  }
  get role() {
    return this.form.controls['role'];
  }
  get email() {
    return this.form.controls['email'];
  }
}
