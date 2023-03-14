import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { profile } from './interfaces/profile';
import { GithubRepo } from './interfaces/github-repo';
import { GitProjectSaved } from './interfaces/local_github_projects_interface';
import { GithubUserData } from './interfaces/githubdata';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  profileUpdateLink = 'http://localhost:3000/dashboard';

  get basicInfo() {
    return JSON.parse(localStorage.getItem('profileData') || '""').basicInfo;
  }

  get userAccInfo() {
    return JSON.parse(localStorage.getItem('profileData') || '""').userAccInfo;
  }

  get education() {
    return JSON.parse(localStorage.getItem('profileData') || '""').education;
  }

  get experiences() {
    return JSON.parse(localStorage.getItem('profileData') || '""').experiences;
  }

  get projects() {
    return JSON.parse(localStorage.getItem('profileData') || '""').projects;
  }

  updateProfile(profile: profile): Observable<profile> {
    return this.http.put<profile>(this.profileUpdateLink, profile, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }

  get profileId() {
    return localStorage.getItem('profileId') || '';
  }

  get authToken() {
    return localStorage.getItem('accessToken');
  }

  get gitAccessToken() {
    return localStorage.getItem('githubAccessToken');
  }
  updateLocalProfileData(cb?: () => void) {
    const profileID = localStorage.getItem('profileId') || '';
    if (profileID)
      this.http
        .get<profile>(`${this.profileUpdateLink}/${profileID}`)
        .subscribe((res) => {
          localStorage.setItem('profileData', JSON.stringify(res));
          if (cb) cb();
        });
  }
  getGitHubRepos(): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${this.gitAccessToken}`,
      },
    });
  }
  getGitHubProfile(): Observable<GithubUserData> {
    return this.http.get<GithubUserData>('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${this.gitAccessToken}`,
      },
    });
  }

  getGithubColor(): Observable<any> {
    return this.http.get('assets/git-colors.json');
  }

  getUserSelectedProjectsGithub(profileId: string): Observable<GitProjectSaved[]> {
    return this.http.get<GitProjectSaved[]>(
      'http://localhost:3000/githubProjects/'+profileId
    );
  }
  updateUserSelectedProjectsGithub(
    repos: GitProjectSaved[]
  ): Observable<GitProjectSaved[]> {
    return this.http.put<GitProjectSaved[]>(
      'http://localhost:3000/updateGithubProjects',
      repos,
      {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      }
    );
  }
}
