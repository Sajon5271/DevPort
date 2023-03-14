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
import { ProfileService } from 'src/app/profile.service';
import { OauthService } from 'src/app/oauth.service';

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
    private authService: AuthService,
    private routerJump: Router,
    private profile: ProfileService,
    private oAuthService: OauthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) this.routerJump.navigate(['/dashboard']);
  }

  handleSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login({ email, password }).subscribe({
        next: (res: any) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('profileId', res.profileId);
          this.profile.updateLocalProfileData(() => {
            this.routerJump.navigate([`/dashboard`]);
          });
        },
        error: (error) => {
          this.errorMsg = error.error.message;
        },
      });
    } else {
      this.errorMsg = 'Please enter email and password.';
    }
  }

  githubLogin() {
    this.oAuthService.githubOauthInit();
  }
  linkedInLogin() {
    this.oAuthService.linkedInOauthInit();
  }
}
