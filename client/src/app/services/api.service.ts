import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { profile } from '../interfaces/profile';
import { leetcode } from '../interfaces/leetcode';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { signin } from '../interfaces/signin';
import { githubdata } from '../interfaces/githubdata';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  Url = `http://localhost:3000/dashboard`;
  leetcodeURL = 'https://leetcode-stats-api.herokuapp.com/';
  githubURL = 'https://api.github.com/users/';

  constructor(private http: HttpClient, private router: ActivatedRoute) {}

  // profileID:string = this.router.snapshot.params['id']

  getAllProfileData(): Observable<profile[]> {
    return this.http.get<profile[]>(`${this.Url}/`);
  }

  getProfileData(id: string): Observable<profile> {
    return this.http.get<profile>(`${this.Url}/${id}`);
  }

  // getProfileDataPortfolio(id: any): Observable<profile> {

  postProfileData(data: profile) {
    this.http.post(this.Url, data);
  }
  updateProfileInformation(id: string, obj: profile) {
    return this.http.put(`${this.Url}/${id}`, obj);
  }

  getLeetCodeData(username: string): Observable<leetcode> {
    return this.http.get<leetcode>(`${this.leetcodeURL}/${username}`);
  }
  getImage(username: string) {
    console.log(`${this.githubURL}${username}`);
    return this.http.get<githubdata>(`${this.githubURL}${username}`);
  }
}
