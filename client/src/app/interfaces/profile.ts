export interface profile {
  basicInfo?: basicInfo;
  userAccInfo?: userAccInfo;
  education?: education[];
  experiences?: experiences[];
  projects?: projects[];
}

interface basicInfo {
  fullname: string;
  email: string;
  jobTitle: string;
  showEmail: boolean;
  careerObj: string;
  skillsData: string[];
  pphoto?: string;
}

interface userAccInfo {
  githubLink: string;
  soLink: string;
  leetcodeLink: string;
}

interface education {
  eduLevel: string;
  instName: string;
  eduDescription: string;
}

interface experiences {
  companyName: string;
  jobRole: string;
  jobDescription: string;
}

interface projects {
  projectTitle: string;
  demovideo: string;
  projectDescription: string;
}
