import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { profile } from './interfaces/profile';

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

  get authToken() {
    return localStorage.getItem('accessToken');
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
}
