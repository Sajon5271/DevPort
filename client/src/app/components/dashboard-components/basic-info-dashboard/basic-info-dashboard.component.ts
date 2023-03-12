import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileService } from 'src/app/profile.service';
import { Cloudinary } from '@cloudinary/url-gen';

@Component({
  selector: 'app-basic-info-dashboard',
  templateUrl: './basic-info-dashboard.component.html',
  styleUrls: ['./basic-info-dashboard.component.css'],
})
export class BasicInfoDashboardComponent {
  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileService,
    private cloudinary: Cloudinary
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

  ngOnInit() {
    if (this.profile.basicInfo) {
      this.basicInfo.patchValue(this.profile.basicInfo);
      this.skillList = this.profile.basicInfo.skillsData;
    }
    this.cloudinary.
  }

  onSubmit() {
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
}
