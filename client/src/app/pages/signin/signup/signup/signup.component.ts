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
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  errorMessage = '';
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private authService: AuthService,
    private routerJump: Router,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) this.routerJump.navigate(['/dashboard']);
  }

  handleSubmit() {
    const { email, password } = this.signInForm.value;
    if (email && password)
      this.authService.register({ email, password }).subscribe({
        next: (res: any) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('profileId', res.profileId);
          this.profile.updateLocalProfileData(() => {
            this.routerJump.navigate([`/dashboard`]);
          });
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
  }
}
