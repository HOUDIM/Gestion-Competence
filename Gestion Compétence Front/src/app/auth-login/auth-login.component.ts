import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ILoginRequest } from '../types/auth.types';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {}

  private mapFormDataToLoginRequest(): ILoginRequest {
    return {
      password: this.password.value,
      username: this.username.value,
    };
  }
  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.login(this.mapFormDataToLoginRequest()).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.password.setErrors({ invalid: true });
        this.username.setErrors({ invalid: true });
      },
    });
  }

  get password() {
    console.log('hi');
    console.log(this.form.controls['password']);

    return this.form.controls['password'];
  }
  get username() {
    return this.form.controls['username'];
  }
}
