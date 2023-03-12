import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { signin } from 'src/app/interfaces/signin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMsg: string | undefined;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: ActivatedRoute,
    private routerJump: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) this.routerJump.navigate(['/dashboard']);
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);

      // this.routerJump.navigate([`/dashboard/'${user._id}`])
    }
  }

  // handleSubmit(){
  //   console.log(this.loginForm.value)
  //   let loginFormValue:any = this.loginForm.value

  //   // this.profileData.postLoginData(loginFormValue).subscribe({
  //   //     next:(res:any)=>{
  //   //       this.routerJump.navigate([`/dashboard/'${res._id}`])
  //   //     },
  //   //     err:(err)=>console.log(err)
  //   // });

  // }

  handleSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login({ email, password }).subscribe({
        next: (res: any) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('profileId', res.profileId);
          this.routerJump.navigate([`/dashboard`]);
        },
        error: (error) => {
          this.errorMsg = error.error.message;
        },
      });
    } else {
      this.errorMsg = 'Please enter email and password.';
    }
  }
}
