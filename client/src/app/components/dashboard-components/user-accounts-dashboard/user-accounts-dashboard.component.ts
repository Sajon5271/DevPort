import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-user-accounts-dashboard',
  templateUrl: './user-accounts-dashboard.component.html',
  styleUrls: ['./user-accounts-dashboard.component.css'],
})
export class UserAccountsDashboardComponent {
  constructor(private fb: FormBuilder, private profile: ProfileService) {}

  userAccounts = this.fb.group({
    githubLink: [''],
    soLink: [''],
    leetcodeLink: [''],
  });

  ngOnInit() {
    console.log(this.profile.userAccInfo);
    this.userAccounts.patchValue(this.profile.userAccInfo);
  }
}
