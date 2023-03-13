import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private rootUrl = 'https://api.cloudinary.com/v1_1/dk3znnsme/image/upload';
  constructor(private http: HttpClient) {}

  cloudUpload(file: File, id: string):any {
    const file_name = file.name.split('.')[0];
    const public_id = id + '_' + Date.now() + '_' + file_name;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'helloworld');
    formData.append('public_id', public_id);

    return this.http.post<any>(this.rootUrl, formData);
  }
}
