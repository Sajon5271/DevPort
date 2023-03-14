import { Component, OnInit } from '@angular/core';
import { GithubRepo } from 'src/app/interfaces/github-repo';
import { ProfileService } from 'src/app/profile.service';
import { DateTime } from 'luxon';
import { GitProjectSaved } from 'src/app/interfaces/local_github_projects_interface';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.css'],
})
export class ProjectsDashboardComponent {
  constructor(private profile: ProfileService) {}
  githubRepos: GithubRepo[] = [];
  selectedRepos: GitProjectSaved[] = [];
  languageColors: any;
  ngOnInit() {
    this.profile.getGitHubRepos().subscribe((res) => {
      this.githubRepos = res;
      this.profile
        .getGithubColor()
        .subscribe((res) => (this.languageColors = res));
    });
    const profileId = localStorage.getItem('profileId') || '';
    this.profile
      .getUserSelectedProjectsGithub(profileId)
      .subscribe((res) => (this.selectedRepos = res));
  }

  getBgColorForLanguage(repo: GithubRepo) {
    return this.languageColors[repo.language]
      ? 'background-color:' + this.languageColors[repo.language].color + ';'
      : 'background-color: transparent;';
  }
  getUpdateTime(repo: GithubRepo) {
    const ago = DateTime.fromISO(repo.pushed_at).toRelative();
    return ago;
  }
  updateGitProjects() {
    this.profile
      .updateUserSelectedProjectsGithub(this.selectedRepos)
      .subscribe((res) => console.log(res));
  }
  onCheckChange(event: Event, repo: GithubRepo) {
    const {
      name,
      html_url,
      stargazers_count,
      forks_count,
      language,
      description,
      pushed_at,
    } = repo;
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedRepos.push({
        name,
        html_url,
        stargazers_count,
        forks_count,
        language,
        description,
        pushed_at,
      });
    } else {
      this.selectedRepos = this.selectedRepos.filter((el) => el.name !== name);
    }
  }
  isAlreadySelected(repo: GithubRepo) {
    for (const selected of this.selectedRepos) {
      if (selected.name === repo.name) return true;
    }
    return false;
  }
}
