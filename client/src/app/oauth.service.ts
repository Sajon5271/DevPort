import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import {}

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  backendRoot = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  googleOauth() {}
  linkedInOauth() {}
  githubOauthInit() {
    const client_id = '14b988e7a523c9fd2467';
    const redirect_uri = 'http://localhost:4200/githubLogin';
    const scopes = 'user public_repo';
    const url = new URL('https://github.com/login/oauth/authorize');
    url.searchParams.append('client_id', client_id);
    url.searchParams.append('redirect_uri', redirect_uri);
    url.searchParams.append('scope', scopes);
    window.location.href = url.toString();
  }
  githubOauthGetAccessCode(code: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      this.backendRoot + '/githubAccessCode',
      { code }
    );
  }
  stackOverflowOauth() {}
}