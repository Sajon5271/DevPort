import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-experiences-dashboard',
  templateUrl: './experiences-dashboard.component.html',
  styleUrls: ['./experiences-dashboard.component.css'],
})
export class ExperiencesDashboardComponent {
  constructor(private fb: FormBuilder, private profile: ProfileService) {}

  experienceDetails = this.fb.array<FormGroup>([]);

  ngOnInit() {
    this.profile.experiences.forEach(
      (el: {
        companyName: string;
        jobRole: string;
        jobDescription: string;
      }) => {
        const formGroup = this.fb.group({
          companyName: [''],
          jobRole: [''],
          jobDescription: [''],
        });
        formGroup.patchValue(el);
        this.experienceDetails.push(formGroup);
      }
    );
  }

  onSubmit() {
    console.log(this.experienceDetails.value);
    this.profile
      .updateProfile({ experiences: this.experienceDetails.value })
      .subscribe(() => this.profile.updateLocalProfileData());
  }
  addAnotherExperience() {
    const experienceForm = this.fb.group({
      companyName: [''],
      jobRole: [''],
      jobDescription: [''],
    });
    this.experienceDetails.push(experienceForm);
  }

  removeExperience(index: number) {
    this.experienceDetails.removeAt(index);
  }
}
