import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Toast } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent, 
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [
    LoginService,
    Toast,
    ToastrService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private loginService: LoginService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
      
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      // next: () => this.toastService.success.show()("Login feito com sucesso!!!"),
      // error: () => this.toastService.error.show()("Erro inesperado, tente novamente")
   
      next: () => this.toastService.success("Login efetuado com sucesso!"),
      error: () => this.toastService.error("Erro inesperado ! Tente novamente mais tarde")

    })
  }

  navigate() {
    this.router.navigate(["/signup"])
  }
}
