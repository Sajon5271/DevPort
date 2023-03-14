import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GithubUserData } from 'src/app/interfaces/githubdata';
import { ProfileService } from 'src/app/profile.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-user-accounts-dashboard',
  templateUrl: './user-accounts-dashboard.component.html',
  styleUrls: ['./user-accounts-dashboard.component.css'],
})
export class UserAccountsDashboardComponent {
  constructor(private fb: FormBuilder, private profile: ProfileService) {}

  gitHubUserData: GithubUserData = { name: '', avatar_url: 'assets/plus.png' };
  ngOnInit() {
    this.profile
      .getGitHubProfile()
      .subscribe((res) => (this.gitHubUserData = res));
    // this.userAccounts.patchValue(this.profile.userAccInfo);
  }

  get githubJoined() {
    return DateTime.fromISO(
      this.gitHubUserData.created_at || DateTime.now().toISO()
    ).toRelative();
  }
}
