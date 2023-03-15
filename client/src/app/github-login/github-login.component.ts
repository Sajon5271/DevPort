import { Component } from '@angular/core';
import { OauthService } from '../oauth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-github-login',
  templateUrl: './github-login.component.html',
  styleUrls: ['./github-login.component.css'],
})
export class GithubLoginComponent {
  constructor(
    private oauthService: OauthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private profile: ProfileService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('githubAccessToken')) {
      this.router.navigate(['dashboard']);
      return;
    }
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      if (params['code']) {
        this.oauthService
          .githubOauthGetAccessCode(params['code'])
          .subscribe((res) => {
            localStorage.setItem('githubAccessToken', res.access_token);
            this.authService.oauthLoginGithub().subscribe((res: any) => {
              localStorage.setItem('accessToken', res.accessToken);
              localStorage.setItem('profileId', res.profileId);
              this.profile.updateLocalProfileData(() => {
                this.profile.refreshLocalAccessTokens();
                this.router.navigate([`/dashboard`]);
              });
            });
          });
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
