import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  navElements = 'basic-info';

  constructor() {}

  ngOnInit(): void {}

  setNavElements(clickedItem: string) {
    this.navElements = clickedItem;
  }
}
