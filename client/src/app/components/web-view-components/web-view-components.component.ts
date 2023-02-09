import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-web-view-components',
  templateUrl: './web-view-components.component.html',
  styleUrls: ['./web-view-components.component.css'],
})
export class WebViewComponentsComponent {
  profileInfo!: any;
  imgSrc: any;
  leetCode: string | undefined;
  leetcodeData: any;
  leetcodeInfo: any;
  // gitInfo: any;
  gitImg: any;

  // profileID: String="";
  // @Output()
  // navClicked = new EventEmitter();
  // navElements = 'getAbout'
  // navclick(clickedElements: string){
  //   this.navElements = clickedElements
  //   console.log(this.navElements)
  // }
  // setNavElements(clickedItem: string) {
  //   this.navElements = clickedItem;
  // }
  constructor(
    private profileData: ApiService,
    private router: ActivatedRoute
  ) {}
  profileID: String = this.router.snapshot.params['id'];
  getProfile(): void {
    this.profileData.getProfileData(this.profileID).subscribe((res) => {
      this.profileInfo = res;
      this.imgSrc =
        'https://ghchart.rshah.org/' + this.profileInfo.userAccInfo.githubLink;
      // this.leetCode = "https://leetcode-stats-api.herokuapp.com/"+this.profileInfo.leetcodeLink
      console.log('profileInfo', this.profileInfo);
      // console.log(this.imgSrc);

      // this.profileData.getLeetCodeData(this.profileInfo.leetcodeLink)

      this.getLeetData();
      // this.profileForm.patchValue(res);
      // this.profileForm.get('basicInfo.email')?.setValue(res.email);
      // console.log('GitHub img link :',this.getGithubInfo())
      // console.log("git Img URL :", gitImgURL)
      this.getGithubInfo();
    });
  }

  getLeetData(): void {
    this.profileData
      .getLeetCodeData(this.profileInfo.userAccInfo.leetcodeLink)
      .subscribe((res: any) => {
        this.leetcodeInfo = res;
        // console.log(this.leetcodeInfo)

        // console.log(this.imgSrc);

        // this.profileData.getLeetCodeData(this.profileInfo.leetcodeLink)

        // this.profileForm.patchValue(res);
        // this.profileForm.get('basicInfo.email')?.setValue(res.email);
      });
  }

  getGithubInfo(): void {
    this.profileData
      .getImage(this.profileInfo.userAccInfo.githubLink)
      .subscribe((res: any) => {
        // console.log('github link res :', res);
        this.gitImg = res.avatar_url;
        // return this.gitImg
      });
  }

  ngOnInit(): void {
    // console.log(this.imgSrc)
    this.getProfile();

    // console.log(this.profileID)
    // this.getProfile();
  }

}
