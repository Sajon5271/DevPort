import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CloudinaryService } from 'src/app/cloudinary.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-basic-info-dashboard',
  templateUrl: './basic-info-dashboard.component.html',
  styleUrls: ['./basic-info-dashboard.component.css'],
})
export class BasicInfoDashboardComponent {
  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileService,
    private cloudinary: CloudinaryService
  ) {}
  skillListStr = '';
  skillList: string[] = [];
  basicInfo = this.formBuilder.group({
    fullname: [''],
    jobTitle: [''],
    email: [''],
    showEmail: [false],
    careerObj: [''],
  });
  profile_pic_path = '';
  profile_pic_url = '';
  ngOnInit() {
    if (this.profile.basicInfo) {
      this.basicInfo.patchValue(this.profile.basicInfo);
      this.skillList = this.profile.basicInfo.skillsData;
      this.profile_pic_url = this.profile.basicInfo.pphoto || '';
    }
  }

  get profilePicChanged() {
    return !this.profile_pic_path;
  }

  get hasProPic() {
    return !!this.profile_pic_url;
  }

  onSubmit() {
    console.log(this.basicInfo.value);
    const { fullname, jobTitle, email, showEmail, careerObj } =
      this.basicInfo.value;

    this.profile
      .updateProfile({
        basicInfo: {
          fullname: fullname || '',
          jobTitle: jobTitle || '',
          email: email || '',
          showEmail: !!showEmail,
          careerObj: careerObj || '',
          skillsData: this.skillList,
          pphoto: this.profile_pic_url,
        },
      })
      .subscribe(() => this.profile.updateLocalProfileData());
  }

  updateSkillList() {
    if (this.skillListStr) this.skillList.push(...this.skillListStr.split(','));
    this.skillListStr = '';
  }

  onRemoveSkill(skill: string) {
    this.skillList = this.skillList.filter((el) => el !== skill);
  }
  picChanged(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.profile_pic_path = fileInput.value.split('\\').at(-1) || '';
    let file: File | null;
    if (fileInput.files) {
      this.cloudinary
        .cloudUpload(fileInput.files[0], this.profile.profileId)
        .subscribe((res: any) => {
          this.profile_pic_url = res.secure_url || '';
        });
      // this.imageFile = fileInput.files[0];
    }
  }
}
