import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Route } from '@angular/router';
import { profile } from '../../interfaces/profile';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-dashboard-components',
  templateUrl: './dashboard-components.component.html',
  styleUrls: ['./dashboard-components.component.css'],
})
export class DashboardComponentsComponent {
  profileInfo!: profile;
  navElements = 'basic-info';
  profileID = '';
  // skillsData = [''];
  skillsInput: string = '';
  skillExists: string = '';
  profileForm = this.formBuilder.group({
    basicInfo: this.formBuilder.group({
      // fullname: new FormControl('',
      // [
      //   Validators.required,
      //   Validators.minLength(4),
      // ]),
      fullname: [''],
      jobTitle: [''],
      email: [''],
      showEmail: [true],
      careerObj: [''],
      // pphoto: [],
    }),

    userAccInfo: this.formBuilder.group({
      githubLink: [],
      soLink: [],
      leetcodeLink: [],
    }),

    education: this.formBuilder.group({
      eduLevel1: [],
      instName1: [],
      eduDescription1: [],
      eduLevel2: [],
      instName2: [],
      eduDescription2: [],
      eduLevel3: [],
      instName3: [],
      eduDescription3: [],
    }),

    experiences: this.formBuilder.group({
      companyName1: [],
      jobRole1: [],
      // job_tags: [],
      jobDescription1: [],

      companyName2: [],
      jobRole2: [],
      // job_tags: [],
      jobDescription2: [],

      companyName3: [],
      jobRole3: [],
      // job_tags: [],
      jobDescription3: [],
    }),

    projects: this.formBuilder.group({
      projectTitle1: [],
      demovideo1: [],
      // project_tags: [],
      projectDescription1: [],

      projectTitle2: [],
      demovideo2: [],
      // project_tags: [],
      projectDescription2: [],

      projectTitle3: [],
      demovideo3: [],
      // project_tags: [],
      projectDescription3: [],
    }),
  });

  educationGroup(): FormGroup {
    return this.formBuilder.group({
      eduLevel: [],
      instName: [],
      eduDescription: [],
    });
  }

  data: any;
  value: any;
  skillsData: any;
  routerJump: any;

  constructor(
    private formBuilder: FormBuilder,
    private profileData: ApiService,
    private profile: ProfileService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
  }

  setNavElements(clickedItem: string) {
    this.navElements = clickedItem;
  }


  handleSubmit() {
    // console.log(this.profileForm.value)
    let finalFormValue: any = this.profileForm.value;
    finalFormValue.basicInfo.skillsData = this.skillsData;
    // console.log(JSON.stringify(finalFormValue, undefined, 3));
    this.profileData
      .updateProfileInformation(this.profileID, finalFormValue)
      .subscribe((res) => {
        alert('Profile Information Successfully Updated');
      });
  }
  onAddSkills() {
    if (
      !this.skillsData.includes(this.skillsInput) &&
      this.skillsInput !== ''
    ) {
      this.skillsData.push(this.skillsInput);
    }
    this.skillsInput = '';
  }
  onRemoveSkill(skill: any) {
    console.log('remove ', skill);
    const index = this.skillsData.indexOf(skill);
    this.skillsData.splice(index, 1);
  }
  // postRegData(){
  //   this.
  // }
}
