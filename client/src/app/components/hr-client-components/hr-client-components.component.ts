import { Component } from '@angular/core';
import { profile } from 'src/app/interfaces/profile';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hr-client-components',
  templateUrl: './hr-client-components.component.html',
  styleUrls: ['./hr-client-components.component.css'],
})
export class HrClientComponentsComponent {
  allProfileData: profile[] = [];
  skills: { skill: string; count: number }[] = [];
  selectedSkills: { skill: string; count: number }[] = [];

  constructor(private profileData: ApiService) {}

  ngOnInit(): void {
    this.getAllProfile();
    this.profileData.getAllSkills().subscribe((res) => {
      let total = 0;
      res.forEach((el, idx) => {
        if (idx < 10) this.skills.push(el);
        total += el.count;
      });
      this.skills.unshift({ skill: 'All', count: total });
      this.selectedSkills.push(this.skills[0]);
    });
  }

  getAllProfile() {
    this.profileData.getAllProfileData().subscribe({
      next: (res: profile[]) => {
        this.allProfileData = res ? res : [];
      },
      error: (err) => {
        console.log('Error : ', err);
      },
    });
  }

  getFilteredData() {
    if (this.selectedSkills[0]?.skill === 'All') {
      return this.allProfileData;
    } else {
      return this.allProfileData.filter((profile: profile) =>
        profile.basicInfo?.skillsData.some((skill: string) => {
          return this.selectedSkills.filter(
            (el) => el.skill === skill.toLowerCase().trim()
          ).length;
        })
      );
    }
  }

  skillClickEvent(skillObj: { skill: string; count: number }) {
    if (skillObj.skill === 'All') {
      this.selectedSkills = [this.skills[0]];
    } else {
      this.selectedSkills = this.selectedSkills.filter(
        (el) => el.skill !== 'All'
      );
      if (this.isSelected(skillObj)) {
        this.selectedSkills.splice(this.selectedSkills.indexOf(skillObj), 1);
        if (!this.selectedSkills.length) this.selectedSkills = [this.skills[0]];
      } else this.selectedSkills.push(skillObj);
    }
  }

  getPPImage(profile: profile) {
    if (profile.basicInfo?.pphoto) return profile.basicInfo.pphoto;
    else
      return 'https://res.cloudinary.com/dk3znnsme/image/upload/v1678689567/no-photo_lzfpmg.webp';
  }

  isSelected(skillObj: { skill: string; count: number }) {
    if (this.selectedSkills.includes(skillObj)) return true;
    else return false;
  }
}
