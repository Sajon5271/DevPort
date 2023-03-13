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
  selector: 'app-educations-dashboard',
  templateUrl: './educations-dashboard.component.html',
  styleUrls: ['./educations-dashboard.component.css'],
})
export class EducationsDashboardComponent implements OnInit {
  constructor(private fb: FormBuilder, private profile: ProfileService) {}

  educationDetails = this.fb.array<FormGroup>([]);

  ngOnInit() {
    this.profile.education.forEach(
      (el: { eduLevel: string; instName: string; eduDescription: string }) => {
        const formGroup = this.fb.group({
          eduLevel: [''],
          instName: [''],
          eduDescription: [''],
        });
        formGroup.patchValue(el);
        this.educationDetails.push(formGroup);
      }
    );
  }

  onSubmit() {
    console.log(this.educationDetails.value);
    this.profile
      .updateProfile({ education: this.educationDetails.value })
      .subscribe(() => this.profile.updateLocalProfileData());
  }
  addAnotherEducation() {
    const educationForm = this.fb.group({
      eduLevel: [''],
      instName: [''],
      eduDescription: [''],
    });
    this.educationDetails.push(educationForm);
  }

  removeEducation(index: number) {
    this.educationDetails.removeAt(index)
  }
}
