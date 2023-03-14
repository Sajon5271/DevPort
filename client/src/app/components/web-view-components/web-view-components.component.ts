import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitProjectSaved } from 'src/app/interfaces/local_github_projects_interface';
import { ProfileService } from 'src/app/profile.service';
import { ApiService } from 'src/app/services/api.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-web-view-components',
  templateUrl: './web-view-components.component.html',
  styleUrls: ['./web-view-components.component.css'],
})
export class WebViewComponentsComponent {
  profileInfo!: any;
  gitContribution: any;
  leetcodeInfo: any;
  profilePic: string = '';
  gitHubProjects: GitProjectSaved[] = [];
  profileID: string = '';
  languageColors: any;

  constructor(
    private profileData: ApiService,
    private router: ActivatedRoute,
    private profile: ProfileService
  ) {}
  getProfile(): void {
    this.profileData.getProfileData(this.profileID).subscribe((res) => {
      this.profileInfo = res;
      this.gitContribution =
        'https://ghchart.rshah.org/' + this.profileInfo.userAccInfo.githubLink;

      this.getLeetData();

      this.profilePic = this.profile.basicInfo.pphoto;
    });
  }

  getLeetData(): void {
    this.profileData
      .getLeetCodeData(this.profileInfo.userAccInfo.leetcodeLink)
      .subscribe((res: any) => {
        this.leetcodeInfo = res;
      });
  }

  ngOnInit(): void {
    this.profileID = this.router.snapshot.params['id'];
    this.getProfile();
    this.profile
      .getUserSelectedProjectsGithub(this.profileID)
      .subscribe((res) => (this.gitHubProjects = res));
    this.profile
      .getGithubColor()
      .subscribe((res) => (this.languageColors = res));
  }

  getBgColorForLanguage(repo: GitProjectSaved) {
    return this.languageColors[repo.language]
      ? 'background-color:' + this.languageColors[repo.language].color + ';'
      : 'background-color: transparent;';
  }
  getUpdateTime(repo: GitProjectSaved) {
    const ago = DateTime.fromISO(repo.pushed_at).toRelative();
    return ago;
  }
}
