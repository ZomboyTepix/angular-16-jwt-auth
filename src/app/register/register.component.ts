import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    name: null,
    last_name: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/user']);
    }
  }

  onSubmit(): void {
    const { name, last_name, email, password } = this.form;

    this.authService.register(name, last_name, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  handlerName() {
    let control = this.form.name;
    control = control.replace(/[^a-zA-Z\s]/g, ''); 
        const inputElement = document.getElementById('name') as HTMLInputElement;
        if (inputElement.value !==control) {
            inputElement.value = control;
        }
        this.form.name = control;
  }

  handlerApellido() {
    let control = this.form.last_name;
    control = control.replace(/[^a-zA-Z\s]/g, ''); 
        const inputElement = document.getElementById('apellidos') as HTMLInputElement;
        if (inputElement.value !==control) {
            inputElement.value = control;
        }
        this.form.last_name = control;
  }
}